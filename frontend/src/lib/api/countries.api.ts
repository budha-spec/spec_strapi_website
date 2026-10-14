/**
 * Country options for the enquiry form, built on the server so the large
 * phone metadata never reaches the browser — the form only gets each
 * country's dial code and mobile-number length.
 *
 * Names and dial codes come from a third-party API (fails soft to the list
 * bundled with libphonenumber-js); lengths come from libphonenumber-js.
 */

import { Metadata, getCountries, getCountryCallingCode } from 'libphonenumber-js/core';
import type { CountryCode, NumberingPlan } from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/metadata.max.json';
import { COUNTRIES_API_URL, REVALIDATE } from '@/lib/api/endpoints';
import type { Country } from '@/types/contact.types';

/** Used when a country has no mobile length data. */
export const DEFAULT_PHONE_LENGTH = 10;

interface CountriesNowResponse {
  error: boolean;
  data?: { name: string; code: string; dial_code: string }[];
}

/** `type()` exists at runtime on the max metadata but is not in the typings. */
type TypedNumberingPlan = NumberingPlan & {
  type?: (type: 'MOBILE') => { possibleLengths(): number[] } | undefined;
};

const phoneMetadata = new Metadata(metadata);
const knownCountries = new Set<string>(getCountries(metadata));

/** Min/max digits of a mobile number, falling back to the whole plan, then 10. */
function mobileLengths(iso: string): { minLength: number; maxLength: number } {
  if (knownCountries.has(iso)) {
    phoneMetadata.selectNumberingPlan(iso as CountryCode);
    const plan = phoneMetadata.numberingPlan as TypedNumberingPlan | undefined;
    const lengths = plan?.type?.('MOBILE')?.possibleLengths() ?? plan?.possibleLengths() ?? [];
    if (lengths.length > 0) {
      return { minLength: Math.min(...lengths), maxLength: Math.max(...lengths) };
    }
  }
  return { minLength: 1, maxLength: DEFAULT_PHONE_LENGTH };
}

/** The API runs some names together ("AmericanSamoa"). */
function tidyName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
}

/** Offline list: every region libphonenumber knows, named by `Intl`. */
function bundledCountries(): Country[] {
  const names = new Intl.DisplayNames(['en'], { type: 'region' });
  return [...knownCountries].map((iso) => ({
    name: names.of(iso) ?? iso,
    iso,
    dialCode: `+${getCountryCallingCode(iso as CountryCode, metadata)}`,
    ...mobileLengths(iso),
  }));
}

async function apiCountries(): Promise<Country[]> {
  const res = await fetch(COUNTRIES_API_URL, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REVALIDATE.STATIC },
  });
  if (!res.ok) throw new Error(`[countries] ${res.status} ${res.statusText}`);

  const body = (await res.json()) as CountriesNowResponse;
  if (body.error || !body.data?.length) throw new Error('[countries] empty response');

  return body.data
    .filter((c) => c.name && /^[A-Z]{2}$/.test(c.code) && c.dial_code)
    .map((c) => ({
      name: tidyName(c.name),
      iso: c.code,
      dialCode: c.dial_code.trim(),
      ...mobileLengths(c.code),
    }));
}

/** Every country, A–Z. Never throws — the form is on every page. */
export async function fetchCountries(): Promise<Country[]> {
  let countries: Country[];
  try {
    countries = await apiCountries();
  } catch (error) {
    console.error('[countries] using the bundled list:', error);
    countries = bundledCountries();
  }
  return countries.sort((a, b) => a.name.localeCompare(b.name));
}

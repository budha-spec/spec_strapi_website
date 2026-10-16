/**
 * Industries landing API (`/industries`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { Industry, IndustriesPage } from '../types/industries.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/**
 * The landing page entry, or null when it is not published yet — the page
 * then falls back to the Figma hero copy and skips the logo gallery.
 */
export async function fetchIndustriesPage(): Promise<IndustriesPage | null> {
  try {
    const { data } = await strapiGet<StrapiListResponse<IndustriesPage>>(
      ENDPOINTS.INDUSTRIES_PAGE,
      CONTENT
    );
    return data[0] ?? null;
  } catch (error) {
    console.error('[industries] page unavailable:', error);
    return null;
  }
}

/** Slug of the Industry entry that holds the landing page's own copy. */
export const INDUSTRIES_LANDING_SLUG = 'industries';

/**
 * Every published industry, split into the landing entry (slug
 * `industries` — its title/description are the hero, not a list item) and
 * the real industries. Fails soft to an empty list, which hides the explorer.
 */
export async function fetchIndustries(): Promise<{
  landing: Industry | null;
  industries: Industry[];
}> {
  try {
    const { data } = await strapiGet<StrapiListResponse<Industry>>(
      ENDPOINTS.INDUSTRIES,
      CONTENT
    );
    const valid = data.filter((industry) => industry.title);
    return {
      landing: valid.find((industry) => industry.slug === INDUSTRIES_LANDING_SLUG) ?? null,
      industries: valid.filter((industry) => industry.slug !== INDUSTRIES_LANDING_SLUG),
    };
  } catch (error) {
    console.error('[industries] list unavailable:', error);
    return { landing: null, industries: [] };
  }
}

/**
 * Client-side rules for the enquiry form. They mirror the backend
 * `contact-us.submit` controller so most errors show inline before the
 * request is sent; the server still has the final say.
 */

import type { ContactFieldErrors, ContactFormValues, Country } from '@/types/contact.types';

/** Same caps the backend enforces. */
export const CONTACT_MAX_LENGTH: Record<keyof ContactFormValues, number> = {
  name: 150,
  email: 254,
  country: 100,
  phone: 40,
  company: 150,
  designation: 150,
  message: 10000,
};

const REQUIRED = ['name', 'email', 'country', 'message'] as const;

const REQUIRED_MESSAGE: Record<(typeof REQUIRED)[number], string> = {
  name: 'Please enter your name.',
  email: 'Please enter your email address.',
  country: 'Please select your country.',
  message: 'Please tell us about your requirement.',
};

export const ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;
export const ATTACHMENT_EXTENSIONS = ['doc', 'docx', 'pdf'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Used when no country is known (e.g. re-checking a server error). */
const DEFAULT_PHONE_MAX = 10;

/** "Phone number must be 10 digits." or "… 10–11 digits." for the selected country. */
export function phoneLengthHint(min: number, max: number): string {
  return `Phone number must be ${min === max ? max : `${min}–${max}`} digits.`;
}

/**
 * Inline errors for the text fields; empty object when valid. The phone is
 * national digits only, checked against the selected country's lengths.
 */
export function validateContactValues(
  values: ContactFormValues,
  country?: Country
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  for (const field of REQUIRED) {
    if (!values[field].trim()) errors[field] = REQUIRED_MESSAGE[field];
  }

  const email = values.email.trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phone = values.phone.trim();
  if (phone) {
    const min = country?.minLength ?? 1;
    const max = country?.maxLength ?? DEFAULT_PHONE_MAX;
    if (!/^\d+$/.test(phone)) errors.phone = 'Phone number can contain digits only.';
    else if (phone.length < min || phone.length > max) errors.phone = phoneLengthHint(min, max);
  }

  for (const field of Object.keys(CONTACT_MAX_LENGTH) as (keyof ContactFormValues)[]) {
    const max = CONTACT_MAX_LENGTH[field];
    if (!errors[field] && values[field].trim().length > max) {
      errors[field] = `Must be ${max.toLocaleString()} characters or fewer.`;
    }
  }

  return errors;
}

/** Error for the optional attachment, or `undefined` when it is fine. */
export function validateAttachment(file: File | null): string | undefined {
  if (!file) return undefined;
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!ATTACHMENT_EXTENSIONS.includes(ext)) {
    return 'Only .doc, .docx and .pdf files are allowed.';
  }
  if (file.size > ATTACHMENT_MAX_BYTES) {
    return 'File must be 5MB or smaller.';
  }
  return undefined;
}

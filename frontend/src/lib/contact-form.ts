/**
 * Client-side rules for the enquiry form. They mirror the backend
 * `contact-us.submit` controller so most errors show inline before the
 * request is sent; the server still has the final say.
 */

import type { ContactFieldErrors, ContactFormValues } from '@/types/contact.types';

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
const PHONE_PATTERN = /^[\d\s()+-]{6,20}$/;

/** Inline errors for the text fields; empty object when valid. */
export function validateContactValues(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  for (const field of REQUIRED) {
    if (!values[field].trim()) errors[field] = REQUIRED_MESSAGE[field];
  }

  const email = values.email.trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phone = values.phone.trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
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

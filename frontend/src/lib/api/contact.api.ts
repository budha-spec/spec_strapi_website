/**
 * Enquiry form submission — `POST /api/contact-us/submit` (multipart).
 * Called from the browser; the backend verifies the hCaptcha token.
 */

import { strapiPostForm } from '@/lib/api/strapi';
import { ENDPOINTS } from '@/lib/api/endpoints';
import { validateContactValues } from '@/lib/contact-form';
import type {
  ContactField,
  ContactFieldErrors,
  ContactFormValues,
  ContactSubmitResponse,
  ContactSubmitResult,
  StrapiErrorResponse,
} from '@/types/contact.types';

const FALLBACK_ERROR = 'Unable to submit your inquiry. Please try again.';

const FIELDS: readonly ContactField[] = [
  'name', 'email', 'country', 'phone', 'company', 'designation', 'message', 'attachment', 'captcha',
];

function isStrapiError(body: unknown): body is StrapiErrorResponse {
  return typeof body === 'object' && body !== null && 'error' in body;
}

/**
 * The backend answers with one `badRequest` message rather than per-field
 * errors, so pin it to the field(s) it is about. Strapi `ValidationError`
 * details (`path: ['email']`) are used too, should the backend add them.
 */
function fieldErrorsFrom(
  message: string,
  body: StrapiErrorResponse | null,
  values: ContactFormValues
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  for (const item of body?.error.details?.errors ?? []) {
    const field = item.path[0] as ContactField;
    if (FIELDS.includes(field)) errors[field] = item.message;
  }

  if (/captcha/i.test(message)) errors.captcha = message;
  else if (/attachment/i.test(message)) errors.attachment = message;
  else if (/valid email/i.test(message)) errors.email = message;
  else if (/required|exceed/i.test(message)) Object.assign(errors, validateContactValues(values));

  return errors;
}

export async function submitContactForm(
  values: ContactFormValues,
  attachment: File | null,
  captchaToken: string
): Promise<ContactSubmitResult> {
  const form = new FormData();
  for (const [key, value] of Object.entries(values)) form.append(key, value.trim());
  form.append('captchaToken', captchaToken);
  if (attachment) form.append('attachment', attachment);

  try {
    const { ok, data } = await strapiPostForm<ContactSubmitResponse | StrapiErrorResponse>(
      ENDPOINTS.CONTACT_SUBMIT,
      form
    );

    if (ok && data && !isStrapiError(data) && data.success) {
      return { ok: true, message: data.message, reference: data.reference };
    }

    const strapiError = isStrapiError(data) ? data : null;
    const message =
      strapiError?.error.message ||
      (data && !isStrapiError(data) ? data.message : '') ||
      FALLBACK_ERROR;

    return { ok: false, message, fieldErrors: fieldErrorsFrom(message, strapiError, values) };
  } catch {
    return {
      ok: false,
      message: 'Network error — please check your connection and try again.',
      fieldErrors: {},
    };
  }
}

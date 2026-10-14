/** Text fields of the "Share Your Project's Vision" enquiry form. */
export interface ContactFormValues {
  name: string;
  email: string;
  country: string;
  phone: string;
  company: string;
  designation: string;
  message: string;
}

/** Every control that can show an inline error. */
export type ContactField = keyof ContactFormValues | 'attachment' | 'captcha';

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/** `POST /api/contact-us/submit` — 200, and the 500 fallback. */
export interface ContactSubmitResponse {
  success: boolean;
  message: string;
  reference?: string;
  emailStatus?: 'pending' | 'sent' | 'partial' | 'failed';
}

/** Strapi's standard error body (`ctx.badRequest`, validation errors). */
export interface StrapiErrorResponse {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: {
      errors?: { path: string[]; message: string; name?: string }[];
    };
  };
}

export type ContactSubmitResult =
  | { ok: true; message: string; reference?: string }
  | { ok: false; message: string; fieldErrors: ContactFieldErrors };

/** One option of the enquiry form's country select. */
export interface Country {
  name: string;
  /** ISO 3166-1 alpha-2, e.g. `IN`. */
  iso: string;
  /** e.g. `+91`, or `+1 684` for NANP territories. */
  dialCode: string;
  /** Digits allowed in a national mobile number (without the dial code). */
  minLength: number;
  maxLength: number;
}

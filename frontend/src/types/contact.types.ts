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

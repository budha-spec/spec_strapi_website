'use client';

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { submitContactForm } from '@/lib/api/contact.api';
import { validateAttachment, validateContactValues } from '@/lib/contact-form';
import type { ContactField, ContactFieldErrors, ContactFormValues } from '@/types/contact.types';

const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY?.trim() ?? '';

const COUNTRIES = [
  { name: 'India', dialCode: '+91' },
  { name: 'USA', dialCode: '+1' },
  { name: 'UK', dialCode: '+44' },
];

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  country: 'India',
  phone: '',
  company: '',
  designation: '',
  message: '',
};

/** hCaptcha's normal widget is 303px wide — too wide for the card below this. */
const COMPACT_CAPTCHA_QUERY = '(max-width: 419px)';

const fieldBase =
  'w-full rounded-[10px] border bg-transparent px-[clamp(12px,0.94vw,18px)] text-d14 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-brand-cta-blue';

const inputStyles = `${fieldBase} h-[clamp(40px,2.4vw,46px)]`;

function borderFor(error: string | undefined) {
  return error ? 'border-status-error' : 'border-stroke-outline';
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-d12 text-status-error">
      {message}
    </p>
  );
}

/**
 * "Share Your Project's Vision" enquiry form. Posts to the Strapi
 * `contact-us/submit` route with an hCaptcha token, shows server and client
 * validation under each field, and reports the outcome in a toast.
 */
export function LetsTalkForm() {
  const uid = useId();
  const captchaRef = useRef<HCaptcha>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [captchaToken, setCaptchaToken] = useState('');
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [compactCaptcha, setCompactCaptcha] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(COMPACT_CAPTCHA_QUERY);
    const update = () => setCompactCaptcha(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const errorId = (field: ContactField) => `${uid}-${field}-error`;

  /** Props that wire a control to its inline error. */
  const a11y = (field: ContactField) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? errorId(field) : undefined,
  });

  const clearError = (field: ContactField) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const handleChange =
    (field: keyof ContactFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      clearError(field);
    };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    const error = validateAttachment(file);
    setAttachment(error ? null : file);
    setErrors((prev) => ({ ...prev, attachment: error }));
    if (error) event.target.value = '';
  };

  const removeFile = () => {
    setAttachment(null);
    clearError('attachment');
    if (fileRef.current) fileRef.current.value = '';
  };

  /** Tokens are single-use: get a fresh one after every attempt. */
  const resetCaptcha = () => {
    captchaRef.current?.resetCaptcha();
    setCaptchaToken('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: ContactFieldErrors = validateContactValues(values);
    if (!HCAPTCHA_SITEKEY) nextErrors.captcha = 'Captcha is not configured. Please try again later.';
    else if (!captchaToken) nextErrors.captcha = 'Please verify that you are human.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error('Please correct the highlighted fields.');
      return;
    }

    setSubmitting(true);
    const country = COUNTRIES.find((c) => c.name === values.country);
    const phone = values.phone.trim();
    const result = await submitContactForm(
      { ...values, phone: phone && country ? `${country.dialCode} ${phone}` : phone },
      attachment,
      captchaToken
    );
    setSubmitting(false);
    resetCaptcha();

    if (result.ok) {
      toast.success(result.message || 'Your inquiry has been received.', {
        description: result.reference ? `Reference: ${result.reference}` : undefined,
      });
      setValues(INITIAL_VALUES);
      setErrors({});
      removeFile();
      return;
    }

    setErrors(result.fieldErrors);
    toast.error(result.message);
  };

  const dialCode = COUNTRIES.find((c) => c.name === values.country)?.dialCode ?? '';

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="mt-[clamp(16px,1.56vw,30px)] flex flex-col gap-[clamp(12px,1.04vw,20px)]"
    >
      <div className="grid gap-[clamp(12px,1.25vw,24px)] sm:grid-cols-2">
        <div>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your Name*"
            aria-label="Your Name*"
            required
            value={values.name}
            onChange={handleChange('name')}
            className={cn(inputStyles, borderFor(errors.name))}
            {...a11y('name')}
          />
          <FieldError id={errorId('name')} message={errors.name} />
        </div>
        <div>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email Address*"
            aria-label="Email Address*"
            required
            value={values.email}
            onChange={handleChange('email')}
            className={cn(inputStyles, borderFor(errors.email))}
            {...a11y('email')}
          />
          <FieldError id={errorId('email')} message={errors.email} />
        </div>
      </div>

      <div className="grid gap-[clamp(12px,1.25vw,24px)] sm:grid-cols-2">
        <div>
          <select
            name="country"
            aria-label="Country*"
            required
            value={values.country}
            onChange={handleChange('country')}
            className={cn(inputStyles, 'appearance-none text-text-secondary', borderFor(errors.country))}
            {...a11y('country')}
          >
            {COUNTRIES.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <FieldError id={errorId('country')} message={errors.country} />
        </div>
        <div>
          <div className="flex">
            <span
              className={cn(
                'flex h-[clamp(40px,2.4vw,46px)] shrink-0 items-center rounded-l-[10px] border border-r-0 px-[clamp(10px,0.78vw,15px)] text-d14 text-text-secondary',
                borderFor(errors.phone)
              )}
            >
              {dialCode}
            </span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel-national"
              placeholder="Phone Number"
              aria-label="Phone Number"
              value={values.phone}
              onChange={handleChange('phone')}
              className={cn(inputStyles, 'min-w-0 rounded-l-none', borderFor(errors.phone))}
              {...a11y('phone')}
            />
          </div>
          <FieldError id={errorId('phone')} message={errors.phone} />
        </div>
      </div>

      <div className="grid gap-[clamp(12px,1.25vw,24px)] sm:grid-cols-2">
        <div>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            placeholder="Company Name"
            aria-label="Company Name"
            value={values.company}
            onChange={handleChange('company')}
            className={cn(inputStyles, borderFor(errors.company))}
            {...a11y('company')}
          />
          <FieldError id={errorId('company')} message={errors.company} />
        </div>
        <div>
          <input
            type="text"
            name="designation"
            autoComplete="organization-title"
            placeholder="Designation"
            aria-label="Designation"
            value={values.designation}
            onChange={handleChange('designation')}
            className={cn(inputStyles, borderFor(errors.designation))}
            {...a11y('designation')}
          />
          <FieldError id={errorId('designation')} message={errors.designation} />
        </div>
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Requirement Brief*"
          aria-label="Requirement Brief*"
          required
          rows={4}
          value={values.message}
          onChange={handleChange('message')}
          className={cn(fieldBase, 'block h-[clamp(72px,4.69vw,90px)] resize-none py-[clamp(10px,0.73vw,14px)]', borderFor(errors.message))}
          {...a11y('message')}
        />
        <FieldError id={errorId('message')} message={errors.message} />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <label
            className={cn(
              'flex min-w-0 flex-1 cursor-pointer items-center gap-[clamp(8px,0.63vw,12px)] rounded-[10px] border p-[clamp(8px,0.63vw,12px)] transition-colors hover:border-text-primary focus-within:border-brand-cta-blue',
              borderFor(errors.attachment)
            )}
          >
            <input
              ref={fileRef}
              type="file"
              name="attachment"
              accept=".doc,.docx,.pdf"
              onChange={handleFile}
              className="sr-only"
              {...a11y('attachment')}
            />
            <span className="flex size-[clamp(26px,1.67vw,32px)] shrink-0 items-center justify-center rounded-[6px] bg-bg-dark text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M21.4 11 12.3 20a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
              </svg>
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-d14 text-text-primary">
                {attachment ? attachment.name : 'Attach a file'}
              </span>
              <span className="text-d10 text-text-muted">
                .doc, .docx and .pdf files below 5MB size allowed.
              </span>
            </span>
          </label>
          {attachment && (
            <button
              type="button"
              onClick={removeFile}
              aria-label={`Remove ${attachment.name}`}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-text-primary focus-visible:text-text-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <FieldError id={errorId('attachment')} message={errors.attachment} />
      </div>

      {/*
        Captcha and submit share a row so the card keeps Figma's 615px
        height — the design leaves only 37px below the captcha, which is
        padding, not space for a button.
      */}
      <div className="flex flex-wrap items-end justify-between gap-[clamp(12px,1.04vw,20px)]">
        <div className="min-w-0">
          <p className="text-d12 font-medium text-text-secondary">Verify that you are human*</p>
          <div className="mt-[clamp(8px,0.63vw,12px)]" {...a11y('captcha')}>
            {HCAPTCHA_SITEKEY && (
              <HCaptcha
                key={compactCaptcha ? 'compact' : 'normal'}
                ref={captchaRef}
                sitekey={HCAPTCHA_SITEKEY}
                size={compactCaptcha ? 'compact' : 'normal'}
                onVerify={(token) => {
                  setCaptchaToken(token);
                  clearError('captcha');
                }}
                onExpire={() => setCaptchaToken('')}
                onError={() => setCaptchaToken('')}
              />
            )}
          </div>
          <FieldError id={errorId('captcha')} message={errors.captcha} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="gradient-btn inline-flex h-[clamp(32px,1.88vw,36px)] w-fit shrink-0 cursor-pointer items-center justify-center rounded-full px-[clamp(14px,1.04vw,20px)] text-d16 text-white transition-[filter] hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

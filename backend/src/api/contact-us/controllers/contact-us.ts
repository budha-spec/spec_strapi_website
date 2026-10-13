/**
 * contact-us controller
 */

import { factories } from '@strapi/strapi';
import type { Context } from 'koa';
import { sendMail, escapeHtml } from '../../../utils/microsoft-mail';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES = new Set<string>([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

type EmailStatus = 'pending' | 'sent' | 'partial' | 'failed';
type YesNo = 'Yes' | 'No';

interface ContactFormBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  company?: unknown;
  designation?: unknown;
  message?: unknown;
  captchaToken?: unknown;
}

interface HCaptchaResult {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

interface UploadedMedia {
  id: number;
  documentId?: string;
  name: string;
  mime?: string;
  size?: number;
  url?: string;
}

interface UploadResultFile {
  originalFilename?: string;
  mimetype?: string;
  size: number;
  filepath?: string;
  path?: string;
  hash?: string;
  ext?: string;
  buffer?: Buffer;
}

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getEmailStatus(
  hrEmailSent: boolean,
  confirmationEmailSent: boolean
): EmailStatus {
  if (hrEmailSent && confirmationEmailSent) {
    return 'sent';
  }

  if (hrEmailSent || confirmationEmailSent) {
    return 'partial';
  }

  return 'failed';
}

/**
 * Verify hCaptcha using the server-side Siteverify endpoint.
 * Never expose HCAPTCHA_SECRET to the frontend.
 */
async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;
  const sitekey = process.env.HCAPTCHA_SITEKEY;

  if (!token || !secret || !sitekey) {
    return false;
  }

  try {
    const response = await fetch(
      'https://api.hcaptcha.com/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret,
          sitekey,
          response: token,
        }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as HCaptchaResult;

    if (result.success !== true) {
      return false;
    }

    // Optional production hardening:
    // Check result.hostname against your configured website hostname.
    // First confirm the actual hostname returned by hCaptcha.

    return true;
  } catch {
    // Fail closed if verification fails or times out.
    return false;
  }
}

export default factories.createCoreController(
  'api::contact-us.contact-us',
  ({ strapi }) => ({
    async submit(ctx: Context) {
      let inquiryDocumentId: string | undefined;

      try {
        const body = (ctx.request.body ?? {}) as ContactFormBody;

        const name = cleanString(body.name);
        const email = cleanString(body.email).toLowerCase();
        const phone = cleanString(body.phone);
        const country = cleanString(body.country);
        const company = cleanString(body.company);
        const designation = cleanString(body.designation);
        const message = cleanString(body.message);
        const captchaToken = cleanString(body.captchaToken);

        // 1. Validate required fields.
        if (!name || !email || !country || !message) {
          return ctx.badRequest(
            'Name, email, country and message are required.'
          );
        }

        if (!validEmail(email)) {
          return ctx.badRequest('Please enter a valid email address.');
        }

        if (
          name.length > 150 ||
          email.length > 254 ||
          phone.length > 40 ||
          country.length > 100 ||
          company.length > 150 ||
          designation.length > 150 ||
          message.length > 10000
        ) {
          return ctx.badRequest(
            'One or more fields exceed the allowed length.'
          );
        }

        // 2. Verify hCaptcha before saving the inquiry.
        const captchaValid = await verifyCaptcha(captchaToken);

        if (!captchaValid) {
          return ctx.badRequest(
            'CAPTCHA verification failed. Please complete hCaptcha and try again.'
          );
        }

        // 3. Read the optional attachment from multipart/form-data.
        const files = ctx.request.files;
        const attachmentEntry = files?.attachment;

        const attachmentFile = Array.isArray(attachmentEntry)
          ? attachmentEntry[0]
          : attachmentEntry;

        let uploadedMedia: UploadedMedia | null = null;

        if (attachmentFile) {
          const file = attachmentFile as unknown as UploadResultFile;
          const fileName = file.originalFilename ?? 'attachment';
          const mimeType = file.mimetype ?? '';

          if (
            file.size > MAX_FILE_SIZE ||
            !ALLOWED_MIME_TYPES.has(mimeType)
          ) {
            return ctx.badRequest(
              'Attachment must be a PDF, JPG, PNG, DOC or DOCX file up to 5 MB.'
            );
          }

          // The upload service expects a multipart upload file object.
          const uploadedFiles = (await strapi
            .plugin('upload')
            .service('upload')
            .upload({
              data: {
                fileInfo: {
                  name: fileName,
                },
              },
              files: attachmentFile as never,
            })) as UploadedMedia[];

          uploadedMedia = uploadedFiles?.[0] ?? null;

          if (!uploadedMedia) {
            throw new Error('Attachment upload failed.');
          }
        }

        // 4. Save the inquiry before attempting email delivery.
        const inquiry = await strapi
          .documents('api::contact-us.contact-us')
          .create({
            status: 'published',
            data: {
              name,
              email,
              phone: phone || null,
              country,
              company: company || null,
              designation: designation || null,
              message,
              attachment: uploadedMedia?.id ?? null,
              emailStatus: 'pending' satisfies EmailStatus,
              hrEmailSent: false,
              confirmationEmailSent: 'No' satisfies YesNo,
              captchaVerified: 'Yes' satisfies YesNo,
            },
          });

        inquiryDocumentId = inquiry.documentId;

        // 5. Prepare escaped HTML email content.
        const attachmentInfo = uploadedMedia
          ? `<p>Attachment: ${escapeHtml(uploadedMedia.name)}</p>`
          : '<p>Attachment: None</p>';

        const inquiryHtml = `
          <h2>New Contact Form Inquiry</h2>
          <p><strong>Inquiry ID:</strong> ${escapeHtml(inquiryDocumentId)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
          <p><strong>Country:</strong> ${escapeHtml(country)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || 'Not provided')}</p>
          <p><strong>Designation:</strong> ${escapeHtml(designation || 'Not provided')}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>
          ${attachmentInfo}
        `;

        const confirmationHtml = `
          <p>Hello ${escapeHtml(name)},</p>
          <p>Thank you for contacting us. We have received your inquiry.</p>
          <p>Our team will review your message and get back to you.</p>
          <p>Your reference number is: ${escapeHtml(inquiryDocumentId)}</p>
          <p>Regards,<br>Website Team</p>
        `;

        // 6. Send HR notification and user confirmation independently.
        let hrEmailSent = false;
        let confirmationEmailSent = false;

        const hrEmail = process.env.HR_EMAIL;

        if (!hrEmail) {
          strapi.log.error('HR_EMAIL is not configured.');
        } else {
          try {
            await sendMail({
              to: hrEmail,
              subject: `New website inquiry: ${name}`,
              html: inquiryHtml,
              replyTo: email,
            });

            hrEmailSent = true;
          } catch (error) {
            strapi.log.error(
              'HR notification email failed',
              error
            );
          }
        }

        try {
          await sendMail({
            to: email,
            subject: 'We received your inquiry',
            html: confirmationHtml,
          });

          confirmationEmailSent = true;
        } catch (error) {
          strapi.log.error(
            'Customer confirmation email failed',
            error
          );
        }

        // 7. Persist delivery status.
        const emailStatus = getEmailStatus(
          hrEmailSent,
          confirmationEmailSent
        );

        try {
          await strapi
            .documents('api::contact-us.contact-us')
            .update({
              documentId: inquiryDocumentId,
              data: {
                hrEmailSent,
                confirmationEmailSent: (
                  confirmationEmailSent ? 'Yes' : 'No'
                ) satisfies YesNo,
                emailStatus,
              },
            });
        } catch (error) {
          strapi.log.error(
            'Failed to update inquiry email status',
            error
          );

          ctx.status = 200;
          ctx.body = {
            success: true,
            message:
              'Your inquiry was received. Email status may be delayed.',
            reference: inquiryDocumentId,
            emailStatus: 'pending',
          };

          return;
        }

        // 8. The inquiry is saved even if one or both emails fail.
        ctx.status = 200;
        ctx.body = {
          success: true,
          message: 'Your inquiry has been received.',
          reference: inquiryDocumentId,
          emailStatus,
        };
      } catch (error) {
        strapi.log.error(
          'Contact form submission failed',
          error
        );

        if (inquiryDocumentId) {
          ctx.status = 200;
          ctx.body = {
            success: true,
            message:
              'Your inquiry was received. Email delivery may be delayed.',
            reference: inquiryDocumentId,
            emailStatus: 'pending',
          };

          return;
        }

        ctx.status = 500;
        ctx.body = {
          success: false,
          message:
            'Unable to submit your inquiry. Please try again.',
        };
      }
    },
  })
);
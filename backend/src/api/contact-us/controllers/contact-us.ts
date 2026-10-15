/**
 * Contact Us controller
 * Strapi v5
 */

import { factories } from '@strapi/strapi';
import type { Context } from 'koa';
import { sendMail } from '../../../utils/microsoft-mail';
import { renderEmailTemplate } from '../../../utils/email-template';

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
type ReadStatus = 'read' | 'unread';

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
 * Collect request details for use in email templates.
 *
 * FRONTEND_URL should be configured in the backend environment.
 * The Referer header may be absent and should not be treated as
 * a trusted source for authorization or security decisions.
 */
function getRequestDetails(ctx: Context): {
  requestIp: string;
  pageUrl: string;
  websiteBaseUrl: string;
} {
  const referer = ctx.get('referer') || '';
  let websiteBaseUrl = cleanString(process.env.FRONTEND_URL);

  if (!websiteBaseUrl && referer) {
    try {
      websiteBaseUrl = new URL(referer).origin;
    } catch {
      websiteBaseUrl = '';
    }
  }

  return {
    requestIp: ctx.ip || 'Unknown',
    pageUrl: referer || 'Not available',
    websiteBaseUrl: websiteBaseUrl || 'Not configured',
  };
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

    return result.success === true;
  } catch {
    // Fail closed if verification fails or times out.
    return false;
  }
}

export default factories.createCoreController(
  'api::contact-us.contact-us',
  ({ strapi }) => ({

    /**
     * GET: List contact inquiries for HR.
     *
     * Query parameters:
     * ?readStatus=all|read|unread&page=1&pageSize=10
     *
     * Protect this route with appropriate authentication and
     * authorization in your Strapi route configuration.
     */
    async findForHr(ctx: Context) {
      const query = ctx.query as Record<string, unknown>;

      const requestedStatus =
        typeof query.readStatus === 'string'
          ? query.readStatus
          : 'all';

      if (!['all', 'read', 'unread'].includes(requestedStatus)) {
        return ctx.badRequest(
          'readStatus must be all, read or unread.'
        );
      }

      const page = Math.max(
        1,
        Number.parseInt(String(query.page ?? '1'), 10) || 1
      );

      const pageSize = Math.min(
        50,
        Math.max(
          1,
          Number.parseInt(String(query.pageSize ?? '10'), 10) || 10
        )
      );

      const filters =
        requestedStatus === 'all'
          ? {}
          : {
              readStatus: {
                $eq: requestedStatus as ReadStatus,
              },
            };

      const [inquiries, total] = await Promise.all([
        strapi.documents('api::contact-us.contact-us').findMany({
          filters,
          sort: { createdAt: 'desc' },
          pagination: { page, pageSize },
        }),

        strapi.documents('api::contact-us.contact-us').count({
          filters,
        }),
      ]);

      ctx.body = {
        data: inquiries.map((item) => ({
          documentId: item.documentId,
          name: item.name,
          email: item.email,
          phone: item.phone,
          country: item.country,
          company: item.company,
          designation: item.designation,
          message: item.message,
          readStatus: item.readStatus,
          readAt: item.readAt,
          createdAt: item.createdAt,
          emailStatus: item.emailStatus,
          hrEmailSent: item.hrEmailSent,
          confirmationEmailSent: item.confirmationEmailSent,
        })),

        meta: {
          pagination: {
            page,
            pageSize,
            total,
            pageCount: Math.ceil(total / pageSize),
          },
        },
      };
    },

    /**
     * GET: Fetch a single inquiry.
     * Opening an unread inquiry marks it as read.
     */
    async findOneForHr(ctx: Context) {
      const { documentId } = ctx.params;

      if (!documentId) {
        return ctx.badRequest('Inquiry documentId is required.');
      }

      const inquiry = await strapi
        .documents('api::contact-us.contact-us')
        .findOne({
          documentId,
          populate: { attachment: true },
        });

      if (!inquiry) {
        return ctx.notFound('Inquiry not found.');
      }

      if (inquiry.readStatus === 'unread') {
        await strapi
          .documents('api::contact-us.contact-us')
          .update({
            documentId,
            data: {
              readStatus: 'read',
              readAt: new Date(),
            },
          });
      }

      // Fetch again to return the updated record and populated attachment.
      const viewedInquiry = await strapi
        .documents('api::contact-us.contact-us')
        .findOne({
          documentId,
          populate: { attachment: true },
        });

      ctx.body = {
        data: viewedInquiry,
      };
    },

    /**
     * PUT: Bulk update inquiry read status.
     */
    async updateReadStatusBulk(ctx: Context) {
      const body = ctx.request.body as {
        documentIds?: unknown;
        readStatus?: unknown;
      };

      const documentIds = body?.documentIds;
      const readStatus = body?.readStatus;

      if (!Array.isArray(documentIds) || documentIds.length === 0) {
        return ctx.badRequest(
          'documentIds must be a non-empty array.'
        );
      }

      if (
        documentIds.some(
          (id) => typeof id !== 'string' || !id.trim()
        ) ||
        documentIds.length > 100
      ) {
        return ctx.badRequest(
          'documentIds must contain up to 100 valid document IDs.'
        );
      }

      if (readStatus !== 'read' && readStatus !== 'unread') {
        return ctx.badRequest(
          'readStatus must be read or unread.'
        );
      }

      const uniqueIds = [...new Set(documentIds as string[])];

      const results = await Promise.all(
        uniqueIds.map(async (documentId) => {
          const existing = await strapi
            .documents('api::contact-us.contact-us')
            .findOne({ documentId });

          if (!existing) {
            return {
              documentId,
              success: false,
              reason: 'not_found',
            };
          }

          const updated = await strapi
            .documents('api::contact-us.contact-us')
            .update({
              documentId,
              data: {
                readStatus,
                readAt: readStatus === 'read' ? new Date() : null,
              },
            });

          return {
            documentId: updated.documentId,
            success: true,
            readStatus: updated.readStatus,
            readAt: updated.readAt,
          };
        })
      );

      ctx.body = {
        data: results,
        meta: {
          updated: results.filter((item) => item.success).length,
          failed: results.filter((item) => !item.success).length,
        },
      };
    },

    /**
     * PUT: Update a single inquiry's read status.
     */
    async updateReadStatus(ctx: Context) {
      const { documentId } = ctx.params;

      const body = ctx.request.body as {
        readStatus?: unknown;
      };

      const readStatus = body?.readStatus;

      if (!documentId) {
        return ctx.badRequest('Inquiry documentId is required.');
      }

      if (readStatus !== 'read' && readStatus !== 'unread') {
        return ctx.badRequest(
          'readStatus must be read or unread.'
        );
      }

      const existing = await strapi
        .documents('api::contact-us.contact-us')
        .findOne({ documentId });

      if (!existing) {
        return ctx.notFound('Inquiry not found.');
      }

      const updated = await strapi
        .documents('api::contact-us.contact-us')
        .update({
          documentId,
          data: {
            readStatus,
            readAt: readStatus === 'read' ? new Date() : null,
          },
        });

      ctx.body = {
        data: {
          documentId: updated.documentId,
          readStatus: updated.readStatus,
          readAt: updated.readAt,
        },
      };
    },

    /**
     * POST: Submit the public contact form.
     *
     * Saves the inquiry first, then independently attempts:
     * 1. HR notification email.
     * 2. Customer confirmation email.
     *
     * Both email bodies and subjects are loaded from Strapi-managed
     * Email Template entries.
     */
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
          return ctx.badRequest(
            'Please enter a valid email address.'
          );
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
          const file =
            attachmentFile as unknown as UploadResultFile;

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
              readStatus: 'unread',
              readAt: null,
            },
          });

        inquiryDocumentId = inquiry.documentId;

        // 5. Prepare template variables.
        const requestDetails = getRequestDetails(ctx);

        const templateVariables: Record<string, string> = {
          inquiryId: inquiryDocumentId,
          name,
          email,
          phone: phone || 'Not provided',
          country,
          company: company || 'Not provided',
          designation: designation || 'Not provided',
          message,
          attachment: uploadedMedia?.name || 'None',
          requestIp: requestDetails.requestIp,
          pageUrl: requestDetails.pageUrl,
          websiteBaseUrl: requestDetails.websiteBaseUrl,
        };

        // 6. Send HR notification and customer confirmation independently.
        let hrEmailSent = false;
        let confirmationEmailSent = false;

        const hrEmail = cleanString(process.env.HR_EMAIL);

        // HR notification.
        if (!hrEmail) {
          strapi.log.error(
            'HR notification email was not sent: HR_EMAIL is not configured.'
          );
        } else {
          try {
            const hrTemplate = await renderEmailTemplate(
              strapi,
              'contact-inquiry-lead',
              templateVariables
            );

            await sendMail({
              to: hrEmail,
              subject: hrTemplate.subject,
              html: hrTemplate.html,
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

        // Customer confirmation.
        try {
          const confirmationTemplate = await renderEmailTemplate(
            strapi,
            'contact-inquiry-confirmation',
            templateVariables
          );

          await sendMail({
            to: email,
            subject: confirmationTemplate.subject,
            html: confirmationTemplate.html,
          });

          confirmationEmailSent = true;
        } catch (error) {
          strapi.log.error(
            'Customer confirmation email failed',
            error
          );
        }

        // 7. Persist email delivery status.
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

        // 8. Return success even if email delivery fails.
        // The inquiry has already been saved.
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

        // If the inquiry was already saved, do not report that the
        // entire submission failed merely because a later step failed.
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

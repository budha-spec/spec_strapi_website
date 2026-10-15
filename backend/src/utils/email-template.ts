import type { Core } from '@strapi/strapi';
import { escapeHtml } from './microsoft-mail';

type TemplateVariables = Record<string, string>;

type EmailTemplateKey =
  | 'contact-inquiry-lead'
  | 'contact-inquiry-confirmation';

export async function renderEmailTemplate(
  strapi: Core.Strapi,
  templateKey: EmailTemplateKey,
  variables: TemplateVariables
): Promise<{ subject: string; html: string }> {
  const matches = await strapi
    .documents('api::email-template.email-template')
    .findMany({
      filters: {
        templateKey: { $eq: templateKey },
        isActive: { $eq: 'true' },
      },
      pagination: {
        page: 1,
        pageSize: 2,
      },
    });

  if (matches.length !== 1) {
    throw new Error(
      `Expected exactly one active email template for "${templateKey}".`
    );
  }

  const template = matches[0];

  if (!template.subject || !template.htmlBody) {
    throw new Error(
      `Email template "${templateKey}" is incomplete.`
    );
  }

  const replaceVariables = (content: string): string =>
    content.replace(
      /\{\{([a-zA-Z0-9_]+)\}\}/g,
      (placeholder, key: string) => {
        if (
          !Object.prototype.hasOwnProperty.call(variables, key)
        ) {
          throw new Error(
            `Unsupported placeholder "${placeholder}" in email template.`
          );
        }

        return escapeHtml(variables[key]);
      }
    );

  return {
    subject: replaceVariables(template.subject),
    html: replaceVariables(template.htmlBody),
  };
}
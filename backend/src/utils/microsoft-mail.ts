import { ConfidentialClientApplication } from '@azure/msal-node';

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface GraphTokenResponse {
  accessToken: string;
}

interface GraphErrorResponse {
  error?: {
    message?: string;
    code?: string;
  };
}

const tenantId = process.env.MS_TENANT_ID;
const clientId = process.env.MS_CLIENT_ID;
const clientSecret = process.env.MS_CLIENT_SECRET;

if (!tenantId || !clientId || !clientSecret) {
  throw new Error(
    'Missing Microsoft environment variables: ' +
      'MS_TENANT_ID, MS_CLIENT_ID, or MS_CLIENT_SECRET'
  );
}

const senderEmail = process.env.MS_SENDER_EMAIL;

if (!senderEmail) {
  throw new Error('Missing environment variable: MS_SENDER_EMAIL');
}

const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret,
  },
});

export function escapeHtml(value: unknown = ''): string {
  return String(value).replace(/[&<>"']/g, (char: string) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char] as string);
}

export async function sendMail({
  to,
  subject,
  html,
  replyTo,
}: SendMailOptions): Promise<void> {
  const token = await msalClient.acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/.default'],
  });

  if (!token?.accessToken) {
    throw new Error(
      'Unable to obtain Microsoft Graph access token'
    );
  }

  const message = {
    subject,
    body: {
      contentType: 'HTML',
      content: html,
    },
    toRecipients: [
      {
        emailAddress: {
          address: to,
        },
      },
    ],
    ...(replyTo
      ? {
          replyTo: [
            {
              emailAddress: {
                address: replyTo,
              },
            },
          ],
        }
      : {}),
  };

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      senderEmail
    )}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        saveToSentItems: true,
      }),
    }
  );

  if (!response.ok) {
    let details: string;

    try {
      const errorData =
        (await response.json()) as GraphErrorResponse;

      details =
        errorData.error?.message ??
        errorData.error?.code ??
        'Unknown Microsoft Graph error';
    } catch {
      details = await response.text().catch(
        () => 'Unable to read error response'
      );
    }

    throw new Error(
      `Microsoft Graph sendMail failed (${response.status}): ${details}`
    );
  }
}
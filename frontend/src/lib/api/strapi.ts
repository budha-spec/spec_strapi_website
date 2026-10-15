/**
 * Base Strapi fetcher — use this for ALL API calls.
 * Never call fetch() directly in components or features.
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

/** Ignore .env.example placeholders so they don't get sent as Bearer tokens. */
const STRAPI_TOKEN = (() => {
  const raw = process.env.STRAPI_API_TOKEN?.trim();
  if (!raw || raw === 'your_strapi_api_token_here') return undefined;
  return raw;
})();

/**
 * Fetch data from the Strapi REST API.
 *
 * @param path  - API path, e.g. `/home-page?populate=deep`
 * @param init  - Optional RequestInit overrides (cache, revalidate, etc.)
 * @returns     - Parsed JSON response
 * @throws      - Error if the response is not OK
 */
export async function strapiGet<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } }
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
  };

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers,
    next: { revalidate: 60 }, // default ISR — override per call as needed
    ...init,
  });

  if (!res.ok) {
    throw new Error(
      `[Strapi] ${res.status} ${res.statusText} — ${STRAPI_URL}/api${path}`
    );
  }

  return res.json() as Promise<T>;
}

/**
 * POST multipart form data to a public Strapi route. Safe to call from the
 * browser: it sends no API token, so the route must allow public access.
 *
 * An HTTP error does not throw — the caller reads Strapi's error body to show
 * the reason. A network failure still throws.
 */
export async function strapiPostForm<T>(
  path: string,
  body: FormData
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    method: 'POST',
    body,
  });

  const data = (await res.json().catch(() => null)) as T | null;
  return { ok: res.ok, status: res.status, data };
}

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

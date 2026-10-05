/**
 * Base Strapi fetcher — use this for ALL API calls.
 * Never call fetch() directly in components or features.
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

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

/**
 * Base WordPress fetcher — use this for ALL calls to the live spec-india.com
 * WordPress REST API. Never call fetch() directly in components or features.
 */

const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ?? 'https://www.spec-india.com';

/**
 * Fetch data from the WordPress REST API.
 *
 * Unlike Strapi, this is a third-party origin we do not control, so callers
 * are expected to tolerate failure rather than let it take the page down.
 *
 * @param path - API path, e.g. `/wp-json/custom/v1/blogs?limit=8`
 * @param init - Optional RequestInit overrides (cache, revalidate, etc.)
 * @throws     - Error if the response is not OK
 */
export async function wordpressGet<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } }
): Promise<T> {
  const res = await fetch(`${WORDPRESS_URL}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 }, // default ISR — override per call as needed
    ...init,
  });

  if (!res.ok) {
    throw new Error(
      `[WordPress] ${res.status} ${res.statusText} — ${WORDPRESS_URL}${path}`
    );
  }

  return res.json() as Promise<T>;
}

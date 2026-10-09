/**
 * Service pages API. Every service — the landing page included — is one
 * Services entry.
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { ServiceEntry } from '../types/service.types';

async function firstService(path: string): Promise<ServiceEntry | null> {
  const { data } = await strapiGet<StrapiListResponse<ServiceEntry>>(path, {
    next: { revalidate: REVALIDATE.CONTENT },
  });
  return data[0] ?? null;
}

/** The services landing page (`slug=services`), or null when unpublished. */
export function fetchServiceBySlug(slug: string) {
  return firstService(ENDPOINTS.SERVICE_BY_SLUG(slug));
}

/**
 * A service detail page, matched on its `url` field (e.g.
 * `services/digital-transformation`) — that is the public path, and it does
 * not always equal the slug.
 */
export function fetchServiceByUrl(url: string) {
  return firstService(ENDPOINTS.SERVICE_BY_URL(url));
}

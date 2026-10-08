/**
 * Service landing page API.
 * Each service is one Services entry, looked up by its `slug`.
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { ServiceEntry } from '../types/service.types';

/** The published service for `slug`, or null when none matches. */
export async function fetchServiceBySlug(
  slug: string
): Promise<ServiceEntry | null> {
  const { data } = await strapiGet<StrapiListResponse<ServiceEntry>>(
    ENDPOINTS.SERVICE_BY_SLUG(slug),
    { next: { revalidate: REVALIDATE.CONTENT } }
  );
  return data[0] ?? null;
}

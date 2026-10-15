/**
 * Industries landing API (`/industries`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { Industry, IndustriesPage } from '../types/industries.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/**
 * The landing page entry, or null when it is not published yet — the page
 * then falls back to the Figma hero copy and skips the logo gallery.
 */
export async function fetchIndustriesPage(): Promise<IndustriesPage | null> {
  try {
    const { data } = await strapiGet<StrapiListResponse<IndustriesPage>>(
      ENDPOINTS.INDUSTRIES_PAGE,
      CONTENT
    );
    return data[0] ?? null;
  } catch (error) {
    console.error('[industries] page unavailable:', error);
    return null;
  }
}

/**
 * Every published industry. Fails soft to an empty list (e.g. while the
 * Public role still lacks `find` on Industry), which hides the explorer.
 */
export async function fetchIndustries(): Promise<Industry[]> {
  try {
    const { data } = await strapiGet<StrapiListResponse<Industry>>(
      ENDPOINTS.INDUSTRIES,
      CONTENT
    );
    return data.filter((industry) => industry.title);
  } catch (error) {
    console.error('[industries] list unavailable:', error);
    return [];
  }
}

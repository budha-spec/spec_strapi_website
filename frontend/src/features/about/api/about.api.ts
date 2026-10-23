/**
 * About page API (`/about/overview`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { AboutPage } from '../types/about.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/** The about page entry, or null when it is not published. */
export async function fetchAboutPage(): Promise<AboutPage | null> {
  const { data } = await strapiGet<StrapiListResponse<AboutPage>>(
    ENDPOINTS.ABOUT_PAGE,
    CONTENT
  );
  return data[0] ?? null;
}

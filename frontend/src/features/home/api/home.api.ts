/**
 * Home page API.
 * The whole landing page is one Pages entry (`slug=home`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { HomePageEntry } from '../types/home.types';

export async function fetchHomePage() {
  return strapiGet<StrapiListResponse<HomePageEntry>>(ENDPOINTS.HOME_PAGE, {
    next: { revalidate: REVALIDATE.CONTENT },
  });
}

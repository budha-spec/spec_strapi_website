/**
 * Testimonials listing API (`/about/testimonials`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { TestimonialsPage } from '../types/testimonials.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/** The testimonials page entry, or null when it is not published. */
export async function fetchTestimonialsPage(): Promise<TestimonialsPage | null> {
  const { data } = await strapiGet<StrapiListResponse<TestimonialsPage>>(
    ENDPOINTS.TESTIMONIALS_PAGE,
    CONTENT
  );
  return data[0] ?? null;
}

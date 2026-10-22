/**
 * Case-study listing API (`/case-study`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type {
  CaseStudyDetail,
  CaseStudyEntry,
  CaseStudyListingPage,
} from '../types/case-study.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/**
 * The listing's page entry — hero copy and CTA, section heading, filter chips
 * and testimonials — or null when it is not published yet (those are skipped).
 */
export async function fetchCaseStudyListingPage(): Promise<CaseStudyListingPage | null> {
  try {
    const { data } = await strapiGet<StrapiListResponse<CaseStudyListingPage>>(
      ENDPOINTS.CASE_STUDY_PAGE,
      CONTENT
    );
    return data[0] ?? null;
  } catch (error) {
    console.error('[case-study] listing page unavailable:', error);
    return null;
  }
}

/** Every published case study, newest first. */
export async function fetchCaseStudies(): Promise<CaseStudyEntry[]> {
  const { data } = await strapiGet<StrapiListResponse<CaseStudyEntry>>(
    ENDPOINTS.CASE_STUDIES,
    CONTENT
  );
  return data;
}

/**
 * One case study with its page content, or null when no published study has
 * this slug (the route then 404s). Throws on a Strapi error so a broken query
 * shows the error page instead of a silent 404.
 */
export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  const { data } = await strapiGet<StrapiListResponse<CaseStudyDetail>>(
    ENDPOINTS.CASE_STUDY_BY_SLUG(slug),
    CONTENT
  );
  return data[0] ?? null;
}

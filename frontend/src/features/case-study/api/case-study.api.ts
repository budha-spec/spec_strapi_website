/**
 * Case-study listing API (`/case-study`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { TestimonialsBlock } from '@/types/sections.types';
import type {
  CaseStudyDetail,
  CaseStudyEntry,
  CaseStudyListingPage,
  CaseStudyTerm,
} from '../types/case-study.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/**
 * The listing's page entry (hero copy and CTA), or null when it is not
 * published yet — the hero is then skipped.
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
 * All case-study industries (the "Industries" filter). Fails soft to an empty
 * list, which just hides that filter row.
 */
export async function fetchCaseStudyIndustries(): Promise<CaseStudyTerm[]> {
  try {
    const { data } = await strapiGet<StrapiListResponse<CaseStudyTerm>>(
      ENDPOINTS.CASE_STUDY_INDUSTRIES,
      CONTENT
    );
    return data;
  } catch (error) {
    console.error('[case-study] industries unavailable:', error);
    return [];
  }
}

/**
 * The "Client Spotlight" block for the listing: the first case study that has
 * one in its `content`. It supplies both the heading above the filters and
 * the testimonials section. Null hides both.
 */
export function spotlightFromStudies(
  studies: CaseStudyEntry[]
): TestimonialsBlock | null {
  for (const study of studies) {
    const block = study.content?.find(
      (item): item is TestimonialsBlock =>
        item.__component === 'shared.testimonial-section'
    );
    if (block) return block;
  }
  return null;
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

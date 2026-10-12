/**
 * Case-study listing API (`/case-study`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { TestimonialsBlock } from '@/types/sections.types';
import type {
  CaseStudyEntry,
  CaseStudyTerm,
} from '../types/case-study.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

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

import type { CmsMedia } from '@/lib/media';
import type { TestimonialsBlock } from '@/types/sections.types';

/** A tag, industry or service attached to a case study. */
export interface CaseStudyTerm {
  id: number;
  title?: string | null;
  slug?: string | null;
}

/** One entry from the Strapi `case-studies` collection, as the listing uses it. */
export interface CaseStudyEntry {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  /** Public path, e.g. `case-study/ai-ml-based-attendance-management-system`. */
  url?: string | null;
  featuredImage?: CmsMedia | null;
  tags?: CaseStudyTerm[] | null;
  industries?: CaseStudyTerm[] | null;
  services?: CaseStudyTerm[] | null;
  /** Dynamic zone; the listing reads its `shared.testimonial-section`. */
  content?: Array<TestimonialsBlock | { __component: string; id: number }> | null;
}

/** A filter chip: `slug` is the value matched against a study's terms. */
export interface CaseStudyFilterOption {
  slug: string;
  title: string;
}

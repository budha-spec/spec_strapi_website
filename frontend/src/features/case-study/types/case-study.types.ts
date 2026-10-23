import type { CmsMedia } from '@/lib/media';
import type {
  ChallengesBlock,
  ContactBlock,
  GalleryBlock,
  Metric,
  RichTextBlock,
  TestimonialsBlock,
  TitledPoint,
} from '@/types/sections.types';

/** A tag, industry or service attached to a case study. */
export interface CaseStudyTerm {
  id: number;
  title?: string | null;
  slug?: string | null;
}

/**
 * `shared.case-study-section` — the listing's eyebrow + heading and the
 * Services / Industries filter chips (CMS may include its own "All" entry).
 */
export interface CaseStudySectionBlock {
  __component: 'shared.case-study-section';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  services?: CaseStudyTerm[] | null;
  industries?: CaseStudyTerm[] | null;
}

/** The `case-study` entry of the Strapi `pages` collection — the listing page. */
export interface CaseStudyListingPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  content?: Array<
    | ContactBlock
    | CaseStudySectionBlock
    | TestimonialsBlock
    | { __component: string; id: number }
  > | null;
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
}

/** A filter chip: `slug` is the value matched against a study's terms. */
export interface CaseStudyFilterOption {
  slug: string;
  title: string;
}

/** A titled paragraph — one card in Challenges, Solutions or Results. */
export type CaseStudyPoint = TitledPoint;

/** `shared.solutions` — the white cards under the outcomes gallery. */
export interface CaseStudySolutionsBlock {
  __component: 'shared.solutions';
  id: number;
  title?: string | null;
  solution?: CaseStudyPoint[] | null;
}

/** `shared.cs-result` — "Proven Impact / Delivering Measurable Business Outcomes…". */
export interface CaseStudyResultBlock {
  __component: 'shared.cs-result';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  result?: {
    id: number;
    keyMetrics?: Metric[] | null;
    csResult?: CaseStudyPoint[] | null;
  } | null;
}

export type CaseStudyDetailBlock =
  | RichTextBlock
  | ChallengesBlock
  | GalleryBlock
  | CaseStudySolutionsBlock
  | CaseStudyResultBlock
  | TestimonialsBlock;

/** A case study with everything its detail page (`/case-study/:slug`) shows. */
export interface CaseStudyDetail extends Omit<CaseStudyEntry, 'content' | 'services'> {
  client?: string | null;
  country?: string | null;
  /** Headline outcome, e.g. "4X Faster insights". */
  scale?: string | null;
  services?: Array<CaseStudyTerm & { url?: string | null }> | null;
  content?: Array<CaseStudyDetailBlock | { __component: string; id: number }> | null;
}

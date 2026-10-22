/**
 * Strapi `shared.*` blocks that more than one page renders. Page-specific
 * blocks stay in `src/features/[page]/types/`.
 */

import type { RichTextNode } from '@/components/ui/RichText';
import type { CmsMedia } from '@/lib/media';

/** `shared.gallery` — the "Trusted by global leaders" logo strip. */
/**
 * `shared.blogs` — eyebrow and heading for the "Latest Insights" carousel.
 * The posts themselves come from WordPress, so the `blog` relation is unused.
 */
export interface BlogsBlock {
  __component: 'shared.blogs';
  id: number;
  title: string;
  subTitle?: string | null;
}

export interface GalleryBlock {
  __component: 'shared.gallery';
  id: number;
  title?: string | null;
  /** Section heading where one is shown (case-study "Outcomes & Business Impact"). */
  subTitle?: string | null;
  images?: CmsMedia[] | null;
}

/** An entry a Content Item points at (a service, industry, visualization or whitepaper). */
export interface LinkedEntry {
  id: number;
  title?: string | null;
  slug?: string | null;
  /** Public path. Industries have none yet. */
  url?: string | null;
}

export type ContentItemType = 'service' | 'industry' | 'visualization' | 'whitepaper';

/**
 * `content-items` collection — a group of category chips on a home "Core
 * Capabilities" card. `type` says which of the four relations holds the
 * entries; each of those entries is one chip (e.g. "Service" → AI Agent,
 * AI Development, AI/ML).
 */
export interface ContentItem {
  id: number;
  title?: string | null;
  slug?: string | null;
  type?: ContentItemType | null;
  service?: LinkedEntry[] | null;
  industry?: LinkedEntry[] | null;
  visualization?: LinkedEntry[] | null;
  whitepaper?: LinkedEntry[] | null;
}

export interface SolutionItem {
  id: number;
  title: string;
  description?: string | null;
  txt?: string | null;
  url?: string | null;
  image?: CmsMedia | null;
  /** Category chips shown on hover (Content Items). */
  pages?: ContentItem[] | null;
}

/** `shared.enterprise-solution` — the "Core Capabilities" block. */
export interface SolutionsBlock {
  __component: 'shared.enterprise-solution';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  enterpriseSolution?: SolutionItem[] | null;
}

export interface Testimonial {
  id: number;
  name: string;
  designation?: string | null;
  description?: string | null;
  videoUrl?: string | null;
  image?: CmsMedia | null;
}

/** `shared.testimonial-section` — the "Client Spotlight" carousel. */
export interface TestimonialsBlock {
  __component: 'shared.testimonial-section';
  id: number;
  title: string;
  subTitle?: string | null;
  url?: string | null;
  testimonials?: Testimonial[] | null;
}

export interface Metric {
  id: number;
  number: string;
  name: string;
  description?: string | null;
}

/** `shared.key-metrics-section` — the "Proven Impact" stats band. */
export interface MetricsBlock {
  __component: 'shared.key-metrics-section';
  id: number;
  title: string;
  description?: string | null;
  keyMetrics?: Metric[] | null;
}

export interface LabeledItem {
  id: number;
  title?: string | null;
}

/**
 * One story in the carousel (`shared.case-study-item`), entered by hand in
 * the block rather than linked from the Case Study collection.
 */
export interface CaseStudyItem {
  id: number;
  title: string;
  description?: string | null;
  /** Optional chips under the copy (`cs-tag` relation). */
  tags?: LabeledItem[] | null;
  /** Explore More label; defaults to "Explore More". */
  btnText?: string | null;
  /** Explore More target — the button is hidden without it. */
  url?: string | null;
  /** Slide image. Not in the schema yet; a placeholder shows until it is. */
  image?: CmsMedia | null;
}

/** `shared.case-studies` — the "Client Success Stories" carousel. */
export interface CaseStudiesBlock {
  __component: 'shared.case-studies';
  id: number;
  title: string;
  subTitle?: string | null;
  /** "Explore All" target, e.g. `case-study`. */
  url?: string | null;
  caseStudy?: CaseStudyItem[] | null;
}

export interface FaqItem {
  id: number;
  question: string;
  answer?: string | null;
}

/** `shared.faqs` — the "Frequently Asked Questions" accordion. */
export interface FaqsBlock {
  __component: 'shared.faqs';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  faq?: FaqItem[] | null;
}

/** `shared.cta` — the gradient call-to-action banner. */
export interface CtaBlock {
  __component: 'shared.cta';
  id: number;
  title: string;
  description?: string | null;
  txt?: string | null;
  url?: string | null;
  image?: CmsMedia | null;
}

/** `shared.contact-us` — feeds the page hero's button; not rendered on its own. */
export interface ContactBlock {
  __component: 'shared.contact-us';
  id: number;
  txt?: string | null;
  url?: string | null;
}

/** One logo tile in the "Client & Industry" gallery. */
export interface IndustryLogo {
  id: number;
  description?: string | null;
  image?: CmsMedia | null;
}

/** `shared.industry-gallery` — "Client & Industry" logo grid (testimonials, industries). */
export interface IndustryGalleryBlock {
  __component: 'shared.industry-gallery';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  gallery?: IndustryLogo[] | null;
}

/** `shared.rich-text` — the overview beside the gradient heading (service, case study). */
export interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  title?: string | null;
  content?: RichTextNode[] | null;
  url?: string | null;
}

/** A titled paragraph — one card in a Challenges grid (and case-study Solutions / Results). */
export interface TitledPoint {
  id: number;
  title: string;
  description?: string | null;
}

/**
 * `shared.challenges` — titled-card grid: case-study "Our Business
 * Challenges", Live BI "What can leadership see at a glance?".
 */
export interface ChallengesBlock {
  __component: 'shared.challenges';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  /** Spelled this way in the Strapi schema. */
  challange?: TitledPoint[] | null;
}

/** One hand-entered use-case card (`shared.text-block`). */
export interface UseCaseItem {
  id: number;
  title: string;
  description?: string | null;
  image?: CmsMedia | null;
  /** Explore More target — the button is hidden without it. */
  url?: string | null;
  /** Explore More label; defaults to "Explore More". */
  btnText?: string | null;
}

/**
 * `shared.industry-case-study` — "Industry Use Cases" cards on a sub-service
 * page. The whitepaper listing uses the same block for its cards (title,
 * summary, image, link + `btnText`).
 */
export interface UseCasesBlock {
  __component: 'shared.industry-case-study';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  caseStudy?: UseCaseItem[] | null;
}

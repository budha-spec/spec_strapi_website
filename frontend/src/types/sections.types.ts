/**
 * Strapi `shared.*` blocks that more than one page renders. Page-specific
 * blocks stay in `src/features/[page]/types/`.
 */

import type { CmsMedia } from '@/lib/media';

/** `shared.gallery` — the "Trusted by global leaders" logo strip. */
export interface GalleryBlock {
  __component: 'shared.gallery';
  id: number;
  title?: string | null;
  images?: CmsMedia[] | null;
}

export interface RelatedPage {
  id: number;
  title?: string | null;
  slug?: string | null;
}

export interface SolutionItem {
  id: number;
  title: string;
  description?: string | null;
  txt?: string | null;
  url?: string | null;
  image?: CmsMedia | null;
  pages?: RelatedPage[] | null;
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

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  featuredImage?: CmsMedia | null;
  industries?: LabeledItem[] | null;
  tags?: LabeledItem[] | null;
}

/** `shared.case-studies` — the "Client Success Stories" carousel. */
export interface CaseStudiesBlock {
  __component: 'shared.case-studies';
  id: number;
  title: string;
  subTitle?: string | null;
  url?: string | null;
  case_studies?: CaseStudy[] | null;
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

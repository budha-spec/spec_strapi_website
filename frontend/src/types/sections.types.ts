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

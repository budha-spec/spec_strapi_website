import type { CmsMedia } from '@/lib/media';
import type { ContactBlock, TestimonialsBlock } from '@/types/sections.types';

/** One logo tile in the "Client & Industry" gallery. */
export interface IndustryLogo {
  id: number;
  description?: string | null;
  image?: CmsMedia | null;
}

/** `shared.industry-gallery` — "Client & Industry" logo grid. */
export interface IndustryGalleryBlock {
  __component: 'shared.industry-gallery';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  gallery?: IndustryLogo[] | null;
}

export type TestimonialsPageBlock =
  | ContactBlock
  | TestimonialsBlock
  | IndustryGalleryBlock
  | { __component: string; id: number };

/** The `testimonials` entry of the Strapi `pages` collection. */
export interface TestimonialsPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  /** Public path: `about/testimonials`. */
  url?: string | null;
  content?: TestimonialsPageBlock[] | null;
}

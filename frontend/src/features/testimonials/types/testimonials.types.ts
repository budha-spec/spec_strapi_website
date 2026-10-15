import type {
  ContactBlock,
  IndustryGalleryBlock,
  TestimonialsBlock,
} from '@/types/sections.types';

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

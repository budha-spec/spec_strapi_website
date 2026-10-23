import type { RichTextNode } from '@/components/ui/RichText';
import type { CmsMedia } from '@/lib/media';
import type {
  ContactBlock,
  IndustryGalleryBlock,
  MetricsBlock,
  RichTextBlock,
  Testimonial,
  TestimonialsBlock,
} from '@/types/sections.types';

/** `shared.text-block` — the image + statement card under the overview. */
export interface TextBlock {
  __component: 'shared.text-block';
  id: number;
  title?: string | null;
  /** Rich text (Blocks). */
  description?: RichTextNode[] | null;
  image?: CmsMedia | null;
}

/** One "Our Guiding Principles" slide (`shared.text-block`): title, copy and image. */
export interface PrincipleItem {
  id: number;
  title: string;
  /** Rich text (Blocks). */
  description?: RichTextNode[] | null;
  image?: CmsMedia | null;
}

/** `shared.industry-case-study` — "Our Guiding Principles" carousel on this page. */
export interface PrinciplesBlock {
  __component: 'shared.industry-case-study';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  caseStudy?: PrincipleItem[] | null;
}

/** `shared.leaders` — "Client Spotlight" leader cards (portrait + quote). */
export interface LeadersBlock {
  __component: 'shared.leaders';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  leader?: Testimonial[] | null;
}

export type AboutBlock =
  | ContactBlock
  | RichTextBlock
  | TextBlock
  | PrinciplesBlock
  | MetricsBlock
  | LeadersBlock
  | IndustryGalleryBlock
  | TestimonialsBlock;

/** The `about` entry of the Strapi `pages` collection. */
export interface AboutPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  /** Public path: `about/overview`. */
  url?: string | null;
  content?: Array<AboutBlock | { __component: string; id: number }> | null;
}

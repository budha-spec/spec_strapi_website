import type { RichTextNode } from '@/components/ui/RichText';
import type { CmsMedia } from '@/lib/media';
import type {
  CaseStudiesBlock,
  CtaBlock,
  FaqsBlock,
  GalleryBlock,
  MetricsBlock,
  TestimonialsBlock,
} from '@/types/sections.types';

/** A child service shown as a chip link under its capability tab. */
export interface ServiceLink {
  id: number;
  title: string;
  slug?: string | null;
  url?: string | null;
}

/** A Service entry related from a `shared.services` block. */
export interface ServiceCard {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;
  url?: string | null;
  image?: CmsMedia | null;
  children?: ServiceLink[] | null;
}

/**
 * `shared.services` — "Core Capabilities" tabs on the landing page,
 * numbered "Capabilities" cards on a detail page.
 */
export interface ServicesBlock {
  __component: 'shared.services';
  id: number;
  title: string;
  subTitle?: string | null;
  services?: ServiceCard[] | null;
}

/** `shared.rich-text` — the overview beside the gradient heading. */
export interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  title?: string | null;
  content?: RichTextNode[] | null;
  url?: string | null;
}

/** `shared.contact-us` — feeds the hero button; not rendered on its own. */
export interface ContactBlock {
  __component: 'shared.contact-us';
  id: number;
  txt?: string | null;
  url?: string | null;
}

export type ServiceBlock =
  | GalleryBlock
  | ServicesBlock
  | TestimonialsBlock
  | RichTextBlock
  | CtaBlock
  | MetricsBlock
  | CaseStudiesBlock
  | FaqsBlock
  | ContactBlock;

export interface ServiceSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface ServiceEntry {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  seo?: ServiceSeo | null;
  content?: Array<ServiceBlock | { __component: string; id: number }> | null;
}

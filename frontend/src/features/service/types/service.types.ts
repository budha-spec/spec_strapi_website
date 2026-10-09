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
 * numbered "Capabilities" cards on a detail page, and the two-column
 * "Services We Are Offering" list on a sub-service page.
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

/** An Industry entry linked from a `shared.industries` block. */
export interface IndustryCard {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;
  image?: CmsMedia | null;
}

/** `shared.industries` — "Business Application and Use Cases" cards. */
export interface IndustriesBlock {
  __component: 'shared.industries';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  industries?: IndustryCard[] | null;
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
  | IndustriesBlock
  | ContactBlock;

/**
 * Which service page an entry is, which decides how blocks render:
 * - `landing`     — `/services` itself
 * - `detail`      — a service whose parent is the landing (e.g. AI/ML)
 * - `sub-service` — a service under a detail service (e.g. AI Development)
 */
export type ServiceTemplate = 'landing' | 'detail' | 'sub-service';

export interface ServiceRelation {
  id: number;
  title?: string | null;
  slug?: string | null;
  url?: string | null;
}

/** Strapi blog category; its `slug` matches the WordPress category slug. */
export interface ServiceBlogCategory {
  id: number;
  name?: string | null;
  slug?: string | null;
}

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
  parent?: ServiceRelation[] | null;
  blog_category?: ServiceBlogCategory | null;
  content?: Array<ServiceBlock | { __component: string; id: number }> | null;
}

import type { CmsMedia } from '@/lib/media';
import type {
  CaseStudiesBlock,
  ContactBlock,
  CtaBlock,
  FaqsBlock,
  GalleryBlock,
  MetricsBlock,
  RichTextBlock,
  TestimonialsBlock,
} from '@/types/sections.types';

export type { ContactBlock, RichTextBlock };

/** A child service shown as a chip link under its capability tab. */
export interface ServiceLink {
  id: number;
  title: string;
  slug?: string | null;
  url?: string | null;
}

/**
 * One card in a `shared.services` block. Detail pages now get hand-entered
 * `shared.service-item`s (title, description, image, optional `url` +
 * `btnText`, `subServices`); the landing tabs still read the older
 * Service-relation fields (`slug`, `children`).
 */
export interface ServiceCard {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;
  /** Explore More target — the button is hidden without it. */
  url?: string | null;
  /** Explore More label; defaults to "Explore More". */
  btnText?: string | null;
  image?: CmsMedia | null;
  /** Services linked from a `shared.service-item`. */
  subServices?: ServiceLink[] | null;
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

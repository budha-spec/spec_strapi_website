import type { CmsMedia } from '@/lib/media';
import type {
  CaseStudiesBlock,
  ContactBlock,
  CtaBlock,
  FaqsBlock,
  IndustryGalleryBlock,
  LabeledItem,
  MetricsBlock,
} from '@/types/sections.types';

/** One entry from the Strapi `industries` collection, as the explorer uses it. */
export interface Industry {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  image?: CmsMedia | null;
  /** Public path, once the collection has one (it has no `url` field yet). */
  url?: string | null;
}

/** `shared.industry-section` — eyebrow and heading above the industry explorer. */
export interface IndustrySectionBlock {
  __component: 'shared.industry-section';
  id: number;
  title: string;
  subTitle?: string | null;
}

export type IndustriesPageBlock =
  | ContactBlock
  | IndustryGalleryBlock
  | IndustrySectionBlock
  | { __component: string; id: number };

/** The `industries` entry of the Strapi `pages` collection. */
export interface IndustriesPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  content?: IndustriesPageBlock[] | null;
}

/** One card in "Services We Are Offering". */
export interface IndustryServiceItem {
  id: number;
  title: string;
  description?: string | null;
  /** Explore More label; defaults to "Explore More". */
  txt?: string | null;
  url?: string | null;
}

/** `shared.industry-service` — "Industry Solutions / Services We Are Offering". */
export interface IndustryServiceBlock {
  __component: 'shared.industry-service';
  id: number;
  title: string;
  subTitle?: string | null;
  industryServices?: IndustryServiceItem[] | null;
}

/** One "Tech Stack" card: a group title and its Technology entries as chips. */
export interface TechnologyGroup {
  id: number;
  title: string;
  technologies?: LabeledItem[] | null;
}

/** `shared.technologies` — "Tech Stack / Technology and Integration". */
export interface TechnologiesBlock {
  __component: 'shared.technologies';
  id: number;
  title: string;
  subTitle?: string | null;
  technology?: TechnologyGroup[] | null;
}

export type IndustryDetailBlock =
  | MetricsBlock
  | IndustryServiceBlock
  | CaseStudiesBlock
  | CtaBlock
  | IndustryGalleryBlock
  | TechnologiesBlock
  | FaqsBlock;

/** An Industry entry with its `content` zone, for `/industries/:slug`. */
export interface IndustryDetail extends Industry {
  content?: (IndustryDetailBlock | { __component: string; id: number })[] | null;
}

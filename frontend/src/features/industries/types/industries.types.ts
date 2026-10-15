import type { CmsMedia } from '@/lib/media';
import type { ContactBlock, IndustryGalleryBlock } from '@/types/sections.types';

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

export type IndustriesPageBlock =
  | ContactBlock
  | IndustryGalleryBlock
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

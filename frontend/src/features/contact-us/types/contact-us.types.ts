import type { GalleryBlock } from '@/types/sections.types';

export type ContactPageBlock = GalleryBlock | { __component: string; id: number };

/** The `contact-us` entry of the Strapi `pages` collection. */
export interface ContactPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  content?: ContactPageBlock[] | null;
}

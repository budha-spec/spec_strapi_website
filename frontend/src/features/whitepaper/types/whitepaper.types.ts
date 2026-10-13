import type { CmsMedia } from '@/lib/media';
import type { ContactBlock } from '@/types/sections.types';

/** One entry from the Strapi `whitepapers` collection. */
export interface Whitepaper {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  featuredImage?: CmsMedia | null;
  /** Where "Download Now" goes — a page path or a file URL. */
  url?: string | null;
}

/** `shared.whitepapers` — heading + the whitepaper cards. */
export interface WhitepapersBlock {
  __component: 'shared.whitepapers';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  whitepapers?: Whitepaper[] | null;
}

export type WhitepaperPageBlock =
  | ContactBlock
  | WhitepapersBlock
  | { __component: string; id: number };

/** The `whitepaper` entry of the Strapi `pages` collection. */
export interface WhitepaperPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  content?: WhitepaperPageBlock[] | null;
}

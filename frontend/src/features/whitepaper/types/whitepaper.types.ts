import type { CmsMedia } from '@/lib/media';
import type { ContactBlock, UseCasesBlock } from '@/types/sections.types';

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

/**
 * `shared.whitepapers` — heading + related whitepaper entries. The page now
 * uses `shared.industry-case-study` instead; this one is still read as a
 * fallback while it is allowed in the page's dynamic zone.
 */
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
  | UseCasesBlock
  | { __component: string; id: number };

/** One card as the listing draws it, whichever block it came from. */
export interface WhitepaperCardItem {
  id: number;
  title: string;
  description?: string | null;
  image?: CmsMedia | null;
  /** Card and button target — a page path or a file URL. */
  url?: string | null;
  /** Button label from the CMS; ExploreMore's default when empty. */
  btnText?: string | null;
}

/** The listing section: heading + cards. */
export interface WhitepaperListing {
  title?: string | null;
  subTitle?: string | null;
  items: WhitepaperCardItem[];
}

/** The `whitepaper` entry of the Strapi `pages` collection. */
export interface WhitepaperPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  content?: WhitepaperPageBlock[] | null;
}

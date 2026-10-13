import type { CmsMedia } from '@/lib/media';
import type { ContactBlock } from '@/types/sections.types';

/** A `visualization-categories` entry — one tab on the listing. */
export interface VisualizationCategory {
  id: number;
  title?: string | null;
  slug?: string | null;
}

/** One entry from the Strapi `visualizations` collection, as a card uses it. */
export interface Visualization {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  /** Public path, e.g. `live-bi-visualization/ceo-dashboard`. */
  url?: string | null;
  featuredImage?: CmsMedia | null;
  category?: VisualizationCategory[] | null;
}

/** `shared.live-bi-visualization` — heading + the cards on the listing. */
export interface LiveBiBlock {
  __component: 'shared.live-bi-visualization';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  visualizations?: Visualization[] | null;
}

export type LiveBiPageBlock =
  | LiveBiBlock
  | ContactBlock
  | { __component: string; id: number };

/** The `live-bi-visualization` entry of the Strapi `pages` collection. */
export interface LiveBiPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  content?: LiveBiPageBlock[] | null;
}

/** A tab: `slug` is matched against a visualization's categories. */
export interface VisualizationTab {
  slug: string;
  title: string;
}

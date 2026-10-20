import type { CmsMedia } from '@/lib/media';
import type {
  ChallengesBlock,
  ContactBlock,
  CtaBlock,
  FaqsBlock,
  LabeledItem,
  RichTextBlock,
} from '@/types/sections.types';

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

/* ─── Detail page (`/live-bi-visualization/:slug`) ─────────────────────── */

/** `shared.audience-section` — Dashboard / Platform / Focus + audience chips. */
export interface AudienceBlock {
  __component: 'shared.audience-section';
  id: number;
  dashboard?: string | null;
  platform?: VisualizationCategory | null;
  focus?: string | null;
  audience?: LabeledItem[] | null;
}

/** `shared.dashboard-action` — "See the dashboard in action": the live embed. */
export interface DashboardActionBlock {
  __component: 'shared.dashboard-action';
  id: number;
  title?: string | null;
  /** Public embed URL (Power BI "publish to web", Tableau Public, …). */
  url?: string | null;
  /** Starts with "Disclaimer:"; that word gets the gradient. */
  disclaimerTxt?: string | null;
}

/** One `shared.kpi-category` row: a label and its KPI chips. */
export interface KpiCategory {
  id: number;
  title?: string | null;
  subCategory?: LabeledItem[] | null;
}

/** `shared.kpi-business-impact` — "Outcomes & Business Impact": image + KPI rows. */
export interface KpiImpactBlock {
  __component: 'shared.kpi-business-impact';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  image?: CmsMedia | null;
  category?: KpiCategory[] | null;
}

/** One `shared.text-block` metric card: `title` is the figure, `description` the caption. */
export interface ImprovementItem {
  id: number;
  title?: string | null;
  description?: string | null;
  image?: CmsMedia | null;
}

/** `shared.dashboard-improvement` — "What … Dashboard Can Improve?" metric cards. */
export interface DashboardImprovementBlock {
  __component: 'shared.dashboard-improvement';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  improvement?: ImprovementItem[] | null;
}

export type VisualizationDetailBlock =
  | ContactBlock
  | RichTextBlock
  | AudienceBlock
  | DashboardActionBlock
  | ChallengesBlock
  | KpiImpactBlock
  | DashboardImprovementBlock
  | CtaBlock
  | FaqsBlock;

/** A visualization with everything its detail page shows. */
export interface VisualizationDetail extends Omit<Visualization, 'category'> {
  content?: Array<VisualizationDetailBlock | { __component: string; id: number }> | null;
}

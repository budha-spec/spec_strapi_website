/**
 * Header mega menu — the Strapi `header-menus` tree and the panel shapes the
 * header renders from it.
 */

import type { RichTextNode } from '@/components/ui/RichText';
import type { CmsMedia } from '@/lib/media';
import type { RichTextBlock, Testimonial } from '@/types/sections.types';

/* ─── Strapi response ─────────────────────────────────────── */

/** `shared.text-block` — the image card in a panel ("SPEC AI", "40+ Years"). */
export interface MenuTextBlock {
  __component: 'shared.text-block';
  id: number;
  title: string;
  description?: string | null;
  url?: string | null;
  btnText?: string | null;
  image?: CmsMedia | null;
}

/** `shared.about-menu-social` — the "Follow Us" bar under Who we are. */
export interface MenuSocialBlock {
  __component: 'shared.about-menu-social';
  id: number;
  title: string;
  social?: { id: number; url: string; icon?: CmsMedia | null }[] | null;
}

/** `shared.industry-menu-section` — the Industries image carousel + portfolio pills. */
export interface MenuIndustryBlock {
  __component: 'shared.industry-menu-section';
  id: number;
  txt?: string | null;
  image?: CmsMedia[] | null;
  industryPortfolio?: { id: number; title: string; url: string; logo?: CmsMedia | null }[] | null;
}

/** `shared.insights-menu-section` — the testimonial carousel under Insights. */
export interface MenuInsightsBlock {
  __component: 'shared.insights-menu-section';
  id: number;
  testimonial?: Testimonial[] | null;
}

export type HeaderMenuBlock =
  | RichTextBlock
  | MenuTextBlock
  | MenuSocialBlock
  | MenuIndustryBlock
  | MenuInsightsBlock;

/**
 * One `header-menus` entry. Entries nest through `child_menu`: the
 * `header-menu-items` root → top menus (What we do, …) → a heading entry
 * (Service Offering, …) → links, and for services one more level of links.
 */
export interface HeaderMenuEntry {
  id: number;
  title?: string | null;
  slug: string;
  url?: string | null;
  menuOrder?: number | null;
  content?: HeaderMenuBlock[] | null;
  child_menu?: HeaderMenuEntry[] | null;
}

/* ─── Panels the header renders ───────────────────────────── */

export interface MenuLink {
  id: number;
  title: string;
  href: string;
}

/** A services category ("Software Engineering") with its links. */
export interface MenuGroup extends MenuLink {
  links: MenuLink[];
}

/** The title + paragraph in a panel's first column ("Who we are", …). */
export interface MenuIntro {
  title: string;
  content: RichTextNode[];
}

export interface MenuCard {
  title: string;
  description: string;
  href: string | null;
  image: CmsMedia | null;
}

export interface MenuSocialLink {
  id: number;
  href: string;
  icon: CmsMedia | null;
}

export interface MenuPortfolioLink {
  id: number;
  title: string;
  href: string;
  logo: CmsMedia | null;
}

/** One thumbnail row in the Insights panel (a blog, case study, …). */
export interface InsightItem {
  id: number;
  title: string;
  href: string;
  image: CmsMedia | null;
}

/** An Insights category ("Blogs") and its latest entries, shown on hover. */
export interface InsightCategory extends MenuLink {
  items: InsightItem[];
}

interface PanelBase {
  id: number;
  slug: string;
  /** Top-bar label, e.g. "What we do". */
  label: string;
  /** The arrow link heading the panel ("Service Offering ↗"). */
  heading: MenuLink | null;
  intro: MenuIntro | null;
}

export interface ServicesPanelData extends PanelBase {
  kind: 'services';
  groups: MenuGroup[];
  feature: MenuCard | null;
}

export interface AboutPanelData extends PanelBase {
  kind: 'about';
  links: MenuLink[];
  card: MenuCard | null;
  social: { title: string; links: MenuSocialLink[] } | null;
}

export interface IndustriesPanelData extends PanelBase {
  kind: 'industries';
  links: MenuLink[];
  showcase: { text: string; images: CmsMedia[]; portfolio: MenuPortfolioLink[] } | null;
}

export interface InsightsPanelData extends PanelBase {
  kind: 'insights';
  categories: InsightCategory[];
  testimonials: Testimonial[];
}

export type MegaMenuPanel =
  | ServicesPanelData
  | AboutPanelData
  | IndustriesPanelData
  | InsightsPanelData;

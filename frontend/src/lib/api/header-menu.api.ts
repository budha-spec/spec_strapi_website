/**
 * Header mega menu from the Strapi `header-menus` tree, plus the latest
 * blogs / case studies / visualizations / whitepapers the Insights panel
 * previews. Fetched once on the server for every page and cached like the
 * rest of the layout, so opening a menu never waits on the network.
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import { fetchLatestBlogs } from '@/lib/api/blogs.api';
import { cmsText, hrefPath, type CmsMedia } from '@/lib/media';
import { richTextPlain } from '@/components/ui/RichText';
import type { StrapiListResponse } from '@/types/strapi';
import type { RichTextBlock } from '@/types/sections.types';
import type {
  HeaderMenuBlock,
  HeaderMenuEntry,
  InsightItem,
  MegaMenuPanel,
  MenuCard,
  MenuGroup,
  MenuIndustryBlock,
  MenuIntro,
  MenuLink,
  MenuSocialBlock,
  MenuTextBlock,
} from '@/types/header-menu.types';

/** Thumbnails per Insights category (Figma shows three). */
const INSIGHT_LIMIT = 3;

interface LatestEntry {
  id: number;
  title: string;
  url?: string | null;
  featuredImage?: CmsMedia | null;
}

async function fetchLatestEntries(
  collection: 'case-studies' | 'visualizations' | 'whitepapers'
): Promise<InsightItem[]> {
  try {
    const { data } = await strapiGet<StrapiListResponse<LatestEntry>>(
      ENDPOINTS.LATEST_ENTRIES(collection, INSIGHT_LIMIT),
      { next: { revalidate: REVALIDATE.CONTENT } }
    );
    return data.map((entry) => ({
      id: entry.id,
      title: cmsText(entry.title),
      href: hrefPath(entry.url),
      image: entry.featuredImage ?? null,
    }));
  } catch (error) {
    console.error(`[header-menu] no ${collection} previews:`, error);
    return [];
  }
}

/**
 * Where each Insights category's previews come from, keyed by the category's
 * slug in the menu. A category not listed here just shows no thumbnails.
 */
const INSIGHT_SOURCES: Record<string, () => Promise<InsightItem[]>> = {
  blog: async () =>
    (await fetchLatestBlogs()).slice(0, INSIGHT_LIMIT).map((post) => ({
      id: post.id,
      title: post.title,
      href: post.href,
      image: post.image ?? null,
    })),
  'case-study': () => fetchLatestEntries('case-studies'),
  'live-bi-visualization': () => fetchLatestEntries('visualizations'),
  whitepaper: () => fetchLatestEntries('whitepapers'),
};

/** Editor order: `menuOrder` where set, otherwise the order Strapi returns. */
function sorted(entries?: HeaderMenuEntry[] | null): HeaderMenuEntry[] {
  const rank = (entry: HeaderMenuEntry) => entry.menuOrder ?? Number.MAX_SAFE_INTEGER;
  return [...(entries ?? [])].sort((a, b) => rank(a) - rank(b));
}

/** Top menus use `#` for "no page of its own". */
function menuHref(url?: string | null): string {
  return !url || url.startsWith('#') ? '#' : hrefPath(url);
}

function toLink(entry: HeaderMenuEntry): MenuLink {
  return { id: entry.id, title: cmsText(entry.title), href: menuHref(entry.url) };
}

function findBlock<C extends HeaderMenuBlock['__component']>(
  blocks: HeaderMenuBlock[],
  component: C
): Extract<HeaderMenuBlock, { __component: C }> | undefined {
  return blocks.find(
    (block): block is Extract<HeaderMenuBlock, { __component: C }> =>
      block.__component === component
  );
}

function toIntro(block?: RichTextBlock): MenuIntro | null {
  if (!block) return null;
  // Editors leave an empty paragraph after the copy; it would add a blank gap.
  const content = (block.content ?? []).filter(
    (node) =>
      node.type !== 'paragraph' ||
      node.children.some((child) => child.type === 'link' || child.text.trim())
  );
  return { title: cmsText(block.title), content };
}

function toCard(block?: MenuTextBlock): MenuCard | null {
  if (!block) return null;
  return {
    title: cmsText(block.title),
    // The whole card is a link, so its copy is flattened to text.
    description: richTextPlain(block.description),
    href: block.url ? hrefPath(block.url) : null,
    image: block.image ?? null,
  };
}

function toSocial(block?: MenuSocialBlock) {
  if (!block) return null;
  return {
    title: cmsText(block.title),
    links: (block.social ?? []).map((item) => ({
      id: item.id,
      href: item.url,
      icon: item.icon ?? null,
    })),
  };
}

function toShowcase(block?: MenuIndustryBlock) {
  if (!block) return null;
  return {
    text: cmsText(block.txt),
    images: (block.image ?? []).filter((media) => media.url),
    portfolio: (block.industryPortfolio ?? []).map((item) => ({
      id: item.id,
      title: cmsText(item.title),
      href: item.url,
      logo: item.logo ?? null,
    })),
  };
}

/**
 * One top menu → one panel. The panel layout follows the blocks the editor
 * added (a social bar means Who we are, …) rather than fixed slugs.
 */
async function toPanel(top: HeaderMenuEntry): Promise<MegaMenuPanel> {
  const children = sorted(top.child_menu);
  // Most menus hang everything off one heading entry (What we do → Service
  // Offering → …). Who we are lists its heading as the first sibling instead
  // (About SPEC INDIA, Leadership, Testimonials, …).
  const section = children.length === 1 ? children[0] : null;
  const headingEntry = children[0] ?? null;
  const items = section ? sorted(section.child_menu) : children.slice(1);
  const blocks = [...(top.content ?? []), ...(section?.content ?? [])];

  const heading = headingEntry ? toLink(headingEntry) : null;
  const links = items.map(toLink);
  const base = {
    id: top.id,
    slug: top.slug,
    // Titles are unique in Strapi, so the top "Insights" entry is stored as
    // "Insights Main" to leave "Insights" for its heading.
    label: cmsText(top.title).replace(/\s+main$/i, ''),
    heading,
    intro: toIntro(findBlock(blocks, 'shared.rich-text')),
  };

  const insights = findBlock(blocks, 'shared.insights-menu-section');
  if (insights) {
    const categories = await Promise.all(
      items.map(async (item) => ({
        ...toLink(item),
        items: (await INSIGHT_SOURCES[item.slug]?.()) ?? [],
      }))
    );
    return {
      ...base,
      kind: 'insights',
      categories,
      testimonials: insights.testimonial ?? [],
    };
  }

  const industry = findBlock(blocks, 'shared.industry-menu-section');
  if (industry) {
    return {
      ...base,
      kind: 'industries',
      links,
      showcase: toShowcase(industry),
    };
  }

  const social = findBlock(blocks, 'shared.about-menu-social');
  if (social) {
    return {
      ...base,
      kind: 'about',
      links,
      card: toCard(findBlock(blocks, 'shared.text-block')),
      social: toSocial(social),
    };
  }

  const groups: MenuGroup[] = items.map((item) => ({
    ...toLink(item),
    links: sorted(item.child_menu).map(toLink),
  }));
  return {
    ...base,
    kind: 'services',
    groups,
    feature: toCard(findBlock(blocks, 'shared.text-block')),
  };
}

/**
 * Every top menu as a panel, in editor order. Fails soft to an empty list:
 * the header is on every page, so a CMS outage must not take pages down.
 */
export async function fetchHeaderMenu(): Promise<MegaMenuPanel[]> {
  try {
    const { data } = await strapiGet<StrapiListResponse<HeaderMenuEntry>>(
      ENDPOINTS.HEADER_MENU,
      { next: { revalidate: REVALIDATE.LAYOUT } }
    );
    return await Promise.all(sorted(data[0]?.child_menu).map(toPanel));
  } catch (error) {
    console.error('[header-menu] rendering the header without menus:', error);
    return [];
  }
}

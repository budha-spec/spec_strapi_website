/**
 * Whitepaper listing API (`/whitepaper`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { ContactBlock, UseCasesBlock } from '@/types/sections.types';
import type {
  WhitepaperListing,
  WhitepaperPage,
  WhitepaperPageBlock,
  WhitepapersBlock,
} from '../types/whitepaper.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/** The whitepaper page entry, or null when it is not published. */
export async function fetchWhitepaperPage(): Promise<WhitepaperPage | null> {
  const { data } = await strapiGet<StrapiListResponse<WhitepaperPage>>(
    ENDPOINTS.WHITEPAPER_PAGE,
    CONTENT
  );
  return data[0] ?? null;
}

/**
 * The listing heading and cards. Prefers the `shared.industry-case-study`
 * block the page uses now (its items carry their own button text), and falls
 * back to the older `shared.whitepapers` relation block.
 */
export function findWhitepaperListing(
  blocks: WhitepaperPageBlock[]
): WhitepaperListing | undefined {
  const cards = blocks.find(
    (block): block is UseCasesBlock => block.__component === 'shared.industry-case-study'
  );
  if (cards) {
    return {
      title: cards.title,
      subTitle: cards.subTitle,
      items: (cards.caseStudy ?? []).filter((item) => item.title),
    };
  }

  const legacy = blocks.find(
    (block): block is WhitepapersBlock => block.__component === 'shared.whitepapers'
  );
  if (!legacy) return undefined;
  return {
    title: legacy.title,
    subTitle: legacy.subTitle,
    items: (legacy.whitepapers ?? [])
      .filter((item) => item.title)
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.featuredImage,
        url: item.url,
      })),
  };
}

export function findWhitepaperContact(
  blocks: WhitepaperPageBlock[]
): ContactBlock | undefined {
  return blocks.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );
}

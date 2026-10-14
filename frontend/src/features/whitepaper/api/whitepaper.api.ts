/**
 * Whitepaper listing API (`/whitepaper`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { ContactBlock } from '@/types/sections.types';
import type {
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

export function findWhitepapersBlock(
  blocks: WhitepaperPageBlock[]
): WhitepapersBlock | undefined {
  return blocks.find(
    (block): block is WhitepapersBlock => block.__component === 'shared.whitepapers'
  );
}

export function findWhitepaperContact(
  blocks: WhitepaperPageBlock[]
): ContactBlock | undefined {
  return blocks.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );
}

/**
 * Live BI visualization listing API (`/live-bi-visualization`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { ContactBlock } from '@/types/sections.types';
import type {
  LiveBiBlock,
  LiveBiPage,
  LiveBiPageBlock,
  VisualizationCategory,
} from '../types/live-bi.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/** The listing page entry, or null when it is not published. */
export async function fetchLiveBiPage(): Promise<LiveBiPage | null> {
  const { data } = await strapiGet<StrapiListResponse<LiveBiPage>>(
    ENDPOINTS.LIVE_BI_PAGE,
    CONTENT
  );
  return data[0] ?? null;
}

/**
 * Every visualization category (the tabs). Fails soft to an empty list,
 * which hides the tab bar and shows every card.
 */
export async function fetchVisualizationCategories(): Promise<
  VisualizationCategory[]
> {
  try {
    const { data } = await strapiGet<StrapiListResponse<VisualizationCategory>>(
      ENDPOINTS.VISUALIZATION_CATEGORIES,
      CONTENT
    );
    return data;
  } catch (error) {
    console.error('[live-bi] categories unavailable:', error);
    return [];
  }
}

export function findLiveBiBlock(blocks: LiveBiPageBlock[]): LiveBiBlock | undefined {
  return blocks.find(
    (block): block is LiveBiBlock =>
      block.__component === 'shared.live-bi-visualization'
  );
}

export function findLiveBiContact(blocks: LiveBiPageBlock[]): ContactBlock | undefined {
  return blocks.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );
}

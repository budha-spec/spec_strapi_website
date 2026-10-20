/**
 * Live BI visualization API — listing (`/live-bi-visualization`) and
 * dashboard detail (`/live-bi-visualization/:slug`).
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
  VisualizationDetail,
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

/** One dashboard with its detail-page blocks, or null when it is not published. */
export async function fetchVisualizationBySlug(
  slug: string
): Promise<VisualizationDetail | null> {
  const { data } = await strapiGet<StrapiListResponse<VisualizationDetail>>(
    ENDPOINTS.VISUALIZATION_BY_SLUG(slug),
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

export function findLiveBiContact(
  blocks: Array<LiveBiPageBlock | { __component: string; id: number }>
): ContactBlock | undefined {
  return blocks.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );
}

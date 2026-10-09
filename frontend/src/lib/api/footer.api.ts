/**
 * Footer content (Let's Talk card + certifications strip) from the Strapi
 * `footer` single type. Rendered by the Footer on every page.
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiResponse } from '@/types/strapi';
import type { FooterData } from '@/types/footer.types';

/**
 * The footer entry, or null when Strapi is unreachable or it is unpublished.
 * Fails soft: the footer is on every page, so it must never take one down.
 */
export async function fetchFooter(): Promise<FooterData | null> {
  try {
    const { data } = await strapiGet<StrapiResponse<FooterData | null>>(
      ENDPOINTS.FOOTER,
      { next: { revalidate: REVALIDATE.LAYOUT } }
    );
    return data ?? null;
  } catch (error) {
    console.error('[footer] rendering without CMS content:', error);
    return null;
  }
}

/**
 * Contact page API (`/contact-us`).
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiListResponse } from '@/types/strapi';
import type { GalleryBlock } from '@/types/sections.types';
import type { ContactPage, ContactPageBlock } from '../types/contact-us.types';

const CONTENT = { next: { revalidate: REVALIDATE.CONTENT } };

/** The contact page entry, or null when it is not published. */
export async function fetchContactPage(): Promise<ContactPage | null> {
  const { data } = await strapiGet<StrapiListResponse<ContactPage>>(
    ENDPOINTS.CONTACT_PAGE,
    CONTENT
  );
  return data[0] ?? null;
}

/** "Trusted by global leaders" logos. */
export function findContactGallery(
  blocks: ContactPageBlock[]
): GalleryBlock | undefined {
  return blocks.find(
    (block): block is GalleryBlock => block.__component === 'shared.gallery'
  );
}

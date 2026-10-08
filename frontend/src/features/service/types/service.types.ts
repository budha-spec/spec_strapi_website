import type { CmsMedia } from '@/lib/media';
import type { GalleryBlock, TestimonialsBlock } from '@/types/sections.types';

/** A child service shown as a chip link under its capability tab. */
export interface ServiceLink {
  id: number;
  title: string;
  slug?: string | null;
  url?: string | null;
}

/** A Service entry related from a `shared.services` block — one capability tab. */
export interface ServiceCard {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;
  url?: string | null;
  image?: CmsMedia | null;
  children?: ServiceLink[] | null;
}

/** `shared.services` — the "Core Capabilities" tabs. */
export interface ServicesBlock {
  __component: 'shared.services';
  id: number;
  title: string;
  subTitle?: string | null;
  services?: ServiceCard[] | null;
}

export type ServiceBlock = GalleryBlock | ServicesBlock | TestimonialsBlock;

export interface ServiceEntry {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  content?: Array<ServiceBlock | { __component: string; id: number }> | null;
}

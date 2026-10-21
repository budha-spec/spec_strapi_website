import type { GalleryBlock } from '@/types/sections.types';

/** `shared.challenges-item` — the intro heading and text beside the offices. */
export interface ContactIntroBlock {
  __component: 'shared.challenges-item';
  id: number;
  title: string;
  description?: string | null;
}

/** `shared.career-inquiry-cta` — "For Career Inquiry" banner. */
export interface CareerInquiryBlock {
  __component: 'shared.career-inquiry-cta';
  id: number;
  title: string;
  /** HR phone numbers and email, one per item. */
  inquiryItems?: { id: number; item?: string | null }[] | null;
}

export type ContactPageBlock =
  | GalleryBlock
  | ContactIntroBlock
  | CareerInquiryBlock
  | { __component: string; id: number };

/** The `contact-us` entry of the Strapi `pages` collection. */
export interface ContactPage {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  url?: string | null;
  content?: ContactPageBlock[] | null;
}

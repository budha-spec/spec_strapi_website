import { getStrapiMediaUrl } from '@/types/strapi';

/** Local stand-ins used only when a Strapi media field is empty. */
export const PLACEHOLDER = {
  card: '/placeholders/card.svg',
  cover: '/placeholders/cover.svg',
  portrait: '/placeholders/portrait.svg',
  logo: '/placeholders/logo.svg',
} as const;

export type PlaceholderKind = keyof typeof PLACEHOLDER;

export interface CmsMedia {
  url?: string | null;
  alternativeText?: string | null;
  name?: string | null;
  width?: number | null;
  height?: number | null;
}

/** Strapi upload URL, or a public-folder placeholder when the field is empty. */
export function mediaSrc(
  media: CmsMedia | null | undefined,
  fallback: PlaceholderKind
): string {
  if (media?.url) return getStrapiMediaUrl(media.url);
  return PLACEHOLDER[fallback];
}

export function mediaAlt(
  media: CmsMedia | null | undefined,
  fallback = ''
): string {
  return media?.alternativeText || fallback;
}

/** Strapi sometimes stores non-breaking spaces in rich labels. */
export function cmsText(value?: string | null): string {
  return (value ?? '').replace(/\u00a0/g, ' ');
}

/** Accepts `/services`, `about/testimonials`, and absolute URLs. */
export function hrefPath(url?: string | null): string {
  if (!url) return '#';
  if (/^https?:\/\//i.test(url)) return url;
  return url.startsWith('/') ? url : `/${url}`;
}

export function joinPath(base: string, slug?: string | null): string {
  const root = hrefPath(base).replace(/\/$/, '');
  if (!slug) return root === '#' ? '#' : root;
  return `${root}/${slug}`;
}

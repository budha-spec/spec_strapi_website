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

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '\u2026',
  rsquo: '\u2019',
  lsquo: '\u2018',
  rdquo: '\u201d',
  ldquo: '\u201c',
  ndash: '\u2013',
  mdash: '\u2014',
};

/**
 * Decodes the HTML entities WordPress leaves in `title`, `excerpt`, and
 * category names \u2014 `&#8217;`, `&amp;`, `&hellip;` and friends.
 *
 * Everything is handled in one pass so `&amp;lt;` decodes to the literal
 * `&lt;` rather than being unescaped twice.
 */
export function decodeEntities(value?: string | null): string {
  if (!value) return '';
  return value.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
    (match, entity: string) => {
      if (entity.startsWith('#x') || entity.startsWith('#X')) {
        return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
      }
      if (entity.startsWith('#')) {
        return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
      }
      return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
    }
  );
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

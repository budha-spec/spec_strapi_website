import { mediaAlt, mediaSrc, type CmsMedia, type PlaceholderKind } from '@/lib/media';

interface CmsImageProps {
  media?: CmsMedia | null;
  /** Public-folder image used when `media` has no URL. */
  fallback: PlaceholderKind;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Renders a Strapi upload. Missing media falls back to an SVG in `/public/placeholders`.
 */
export function CmsImage({
  media,
  fallback,
  alt,
  className,
  width,
  height,
}: CmsImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mediaSrc(media, fallback)}
      alt={mediaAlt(media, alt)}
      width={width}
      height={height}
      className={className}
    />
  );
}

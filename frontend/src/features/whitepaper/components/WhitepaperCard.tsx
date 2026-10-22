import Link from 'next/link';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { cmsText, hrefPath } from '@/lib/media';
import type { WhitepaperCardItem } from '../types/whitepaper.types';

/**
 * One whitepaper (Figma): cover image flush to the card's left edge, title,
 * summary and the CMS button (`btnText`) on the right; image on top on
 * phones. The title link covers the card. Hovering anywhere on the card
 * lights up the button — gradient text + gradient-border arrow
 * (`.whitepaper-card` rules at the end of globals.css). The image itself
 * does not move.
 */
export function WhitepaperCard({ item }: { item: WhitepaperCardItem }) {
  const href = hrefPath(item.url);

  return (
    <article className="whitepaper-card group relative grid h-full overflow-hidden rounded-[14px] bg-bg-white sm:grid-cols-[minmax(0,285fr)_minmax(0,550fr)]">
      <div className="whitepaper-card-media bg-bg-chip">
        <CmsImage
          media={item.image}
          fallback="cover"
          alt={cmsText(item.image?.alternativeText) || ''}
          width={item.image?.width ?? 600}
          height={item.image?.height ?? 600}
          className="aspect-[16/10] size-full object-cover sm:aspect-auto sm:min-h-[clamp(240px,19.27vw,370px)]"
        />
      </div>

      <div className="flex flex-col p-[clamp(18px,1.56vw,30px)] sm:py-[clamp(24px,2.6vw,50px)]">
        <h3 className="text-d22 font-medium leading-[1.3] text-text-primary">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-[14px] focus-visible:outline-none"
          >
            {cmsText(item.title)}
          </Link>
        </h3>

        {item.description && (
          <p className="mt-[clamp(8px,0.73vw,14px)] line-clamp-4 text-d16 leading-[1.45] text-text-secondary">
            {cmsText(item.description)}
          </p>
        )}

        <ExploreMore
          href={href}
          label={cmsText(item.btnText) || undefined}
          className="relative z-10 mt-auto self-start pt-[clamp(16px,1.56vw,30px)]"
        />
      </div>
    </article>
  );
}

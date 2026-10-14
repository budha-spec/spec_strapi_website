import Link from 'next/link';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { cmsText, hrefPath } from '@/lib/media';
import type { Whitepaper } from '../types/whitepaper.types';

/**
 * One whitepaper: cover image on the left, title, summary and Download Now
 * on the right; image on top on phones. The title link covers the card.
 */
export function WhitepaperCard({ item }: { item: Whitepaper }) {
  const href = hrefPath(item.url);

  return (
    <article className="whitepaper-card group relative grid h-full gap-[clamp(14px,1.25vw,24px)] rounded-[14px] bg-bg-white p-[clamp(10px,0.73vw,14px)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgb(0_0_0/0.08)] focus-within:shadow-[0_12px_32px_rgb(0_0_0/0.08)] sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="whitepaper-card-media overflow-hidden rounded-[10px] bg-bg-chip">
        <CmsImage
          media={item.featuredImage}
          fallback="cover"
          alt={cmsText(item.featuredImage?.alternativeText) || ''}
          width={item.featuredImage?.width ?? 600}
          height={item.featuredImage?.height ?? 600}
          className="aspect-[16/10] size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transition-none sm:aspect-auto sm:min-h-[clamp(200px,14.58vw,280px)]"
        />
      </div>

      <div className="flex flex-col px-[clamp(4px,0.31vw,6px)] pb-[clamp(4px,0.42vw,8px)] sm:py-[clamp(6px,0.63vw,12px)] sm:pr-[clamp(6px,0.83vw,16px)]">
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
          label="Download Now"
          className="relative z-10 mt-auto self-start pt-[clamp(16px,1.56vw,30px)]"
        />
      </div>
    </article>
  );
}

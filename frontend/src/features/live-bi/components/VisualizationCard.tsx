import Link from 'next/link';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { cmsText, hrefPath } from '@/lib/media';
import type { Visualization } from '../types/live-bi.types';

/**
 * One dashboard on the Live BI listing: screenshot on a light tile, title,
 * then Explore More. The title link covers the whole card, so any tap opens it.
 */
export function VisualizationCard({ item }: { item: Visualization }) {
  const href = hrefPath(item.url || `live-bi-visualization/${item.slug}`);

  return (
    <article className="visualization-card group relative flex h-full flex-col rounded-[14px] bg-bg-white p-[clamp(10px,0.63vw,12px)] transition-shadow duration-300 hover:shadow-[0_12px_32px_rgb(0_0_0/0.08)] focus-within:shadow-[0_12px_32px_rgb(0_0_0/0.08)]">
      <div className="visualization-card-media overflow-hidden rounded-[10px] bg-bg-chip">
        <CmsImage
          media={item.featuredImage}
          fallback="cover"
          alt={cmsText(item.featuredImage?.alternativeText) || ''}
          width={item.featuredImage?.width ?? 1296}
          height={item.featuredImage?.height ?? 816}
          className="aspect-[1296/816] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04] motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col px-[clamp(4px,0.42vw,8px)] pt-[clamp(14px,1.04vw,20px)] pb-[clamp(6px,0.52vw,10px)]">
        <h3 className="line-clamp-2 text-d18 font-medium leading-[1.35] text-text-primary">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-[14px] focus-visible:outline-none"
          >
            {cmsText(item.title)}
          </Link>
        </h3>

        <ExploreMore
          href={href}
          className="relative z-10 mt-auto self-start pt-[clamp(16px,1.25vw,24px)]"
        />
      </div>
    </article>
  );
}

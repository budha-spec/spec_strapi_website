import { CmsImage } from '@/components/ui/CmsImage';
import { RichText } from '@/components/ui/RichText';
import { cmsText } from '@/lib/media';
import type { TextBlock } from '../types/about.types';

/**
 * White card under the overview copy (Figma 525:9314): image on the left,
 * statement and copy on the right; image on top on phones. The CMS
 * description is rich text.
 */
export function AboutOverview({ data }: { data: TextBlock }) {
  if (!data.title && !data.description?.length) return null;

  return (
    <section className="sp-section sp-about-overview w-full bg-bg-light pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        <div className="about-overview-card grid overflow-hidden rounded-[14px] bg-bg-white md:grid-cols-[minmax(0,721fr)_minmax(0,979fr)]">
          <div className="relative aspect-[721/400] md:aspect-auto md:min-h-[clamp(300px,20.83vw,400px)]">
            <CmsImage
              media={data.image}
              fallback="cover"
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <div className="px-[clamp(20px,3vw,115px)] py-[clamp(24px,3.13vw,60px)] md:pr-[clamp(20px,2.4vw,46px)]">
            {data.title && (
              <h2 className="sp-title max-w-[640px] text-d26 font-medium leading-[1.3] text-text-primary">
                {cmsText(data.title)}
              </h2>
            )}
            <RichText
              content={data.description}
              className="mt-[clamp(16px,1.98vw,38px)] max-w-[749px] gap-[1.4em]! text-d18 leading-[1.4] text-text-secondary"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { cmsText, hrefPath } from '@/lib/media';
import type { UseCasesBlock } from '../../types/service.types';

interface UseCaseGridProps {
  data: UseCasesBlock;
}

/**
 * "Industry Use Cases" — dark band of hand-entered cards, three to a row
 * from `lg`: copy on top, image below. Hovering a card turns its image
 * greyscale and zooms it, matching the home Services cards. Explore More
 * only shows on a card that has a link. Hidden while the block is empty.
 */
export function UseCaseGrid({ data }: UseCaseGridProps) {
  const items = (data.caseStudy ?? []).filter((item) => item.title);
  if (items.length === 0) return null;

  return (
    <section className="sp-section sp-service-use-cases w-full bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact">
            {cmsText(data.title)}
          </SectionEyebrow>
        )}

        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        <ul className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const href = item.url?.trim() ? hrefPath(item.url.trim()) : null;
            return (
              <li
                key={item.id}
                className="use-case-card group flex flex-col overflow-hidden rounded-[12px] bg-bg-white"
              >
                <div className="flex flex-1 flex-col p-[clamp(16px,1.25vw,24px)]">
                  <h3 className="text-d22 font-medium leading-[1.3] text-text-primary">
                    {cmsText(item.title)}
                  </h3>
                  {item.description && (
                    <p className="mt-[clamp(8px,0.73vw,14px)] whitespace-pre-line text-d14 leading-[1.5] text-text-secondary">
                      {cmsText(item.description)}
                    </p>
                  )}
                  {href && (
                    <ExploreMore
                      href={href}
                      label={cmsText(item.btnText) || undefined}
                      className="mt-auto w-fit pt-[clamp(12px,1.04vw,20px)]"
                    />
                  )}
                </div>

                <div className="aspect-[505/170] w-full shrink-0 overflow-hidden">
                  <CmsImage
                    media={item.image}
                    fallback="card"
                    alt=""
                    className="size-full object-cover transition-[scale,filter] duration-[550ms] ease-out group-hover:scale-[1.08] group-hover:grayscale motion-reduce:transition-none"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { IndustriesBlock } from '../../types/service.types';

interface UseCaseGridProps {
  data: IndustriesBlock;
}

/**
 * "Business Application and Use Cases" — dark band of industry cards, three
 * to a row from `lg`: copy on top, image below. Hovering a card turns its
 * image greyscale and zooms it, matching the home Services cards.
 * Hidden until industries are linked to the block in Strapi.
 */
export function UseCaseGrid({ data }: UseCaseGridProps) {
  const items = (data.industries ?? []).filter((item) => item.title);
  if (items.length === 0) return null;

  return (
    <section className="w-full bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact">{cmsText(data.title)}</SectionEyebrow>
        )}

        {data.subTitle && (
          <h2 className="mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        <ul className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="use-case-card group flex flex-col overflow-hidden rounded-[12px] bg-bg-white"
            >
              <div className="flex-1 p-[clamp(16px,1.25vw,24px)]">
                <h3 className="text-d22 font-medium leading-[1.3] text-text-primary">
                  {cmsText(item.title)}
                </h3>
                {item.description && (
                  <p className="mt-[clamp(8px,0.73vw,14px)] text-d14 leading-[1.5] text-text-secondary">
                    {cmsText(item.description)}
                  </p>
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
          ))}
        </ul>
      </div>
    </section>
  );
}

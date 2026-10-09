import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText, hrefPath } from '@/lib/media';
import type { ServicesBlock } from '../../types/service.types';

interface CapabilityGridProps {
  data: ServicesBlock;
}

/**
 * "Capabilities" on a service detail page — numbered cards, one per related
 * service, four to a row on desktop. Hover (or keyboard focus inside a card)
 * cross-fades it to black with the service image behind white copy; see
 * `.capability-grid-card` in globals.css for the title and Explore More.
 */
export function CapabilityGrid({ data }: CapabilityGridProps) {
  const items = data.services ?? [];
  if (items.length === 0) return null;

  return (
    <section className="w-full bg-bg-light pt-[clamp(32px,3.65vw,70px)] pb-[clamp(48px,4.69vw,90px)]">
      <div className="shell">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}

        {data.subTitle && (
          <h2 className="mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text font-semibold"
            />
          </h2>
        )}

        <ul className="mt-[clamp(24px,2.6vw,50px)] grid gap-[clamp(16px,1.46vw,28px)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="capability-grid-card group relative isolate flex flex-col overflow-hidden rounded-[16px] bg-bg-white p-[clamp(18px,1.46vw,28px)]"
            >
              {/* Hover layers: black base, then the service image. */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-bg-black opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {item.image?.url && (
                  <CmsImage
                    media={item.image}
                    fallback="cover"
                    alt=""
                    className="size-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-100"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
              </div>

              <span
                aria-hidden
                className="text-d60 font-light leading-none text-stroke-outline transition-colors duration-500 group-hover:text-white/35 group-focus-within:text-white/35"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="capability-grid-title gradient-text mt-[clamp(28px,3.65vw,70px)] w-fit text-d22 font-semibold leading-[1.3]">
                {cmsText(item.title)}
              </h3>

              {item.description && (
                <p className="mt-[clamp(10px,0.83vw,16px)] text-d16 leading-[1.5] text-text-secondary transition-colors duration-500 group-hover:text-white group-focus-within:text-white">
                  {cmsText(item.description)}
                </p>
              )}

              <div className="mt-auto pt-[clamp(20px,1.67vw,32px)]">
                <div className="border-t border-stroke-outline pt-[clamp(14px,1.04vw,20px)] transition-colors duration-500 group-hover:border-white/25 group-focus-within:border-white/25">
                  <ExploreMore href={hrefPath(item.url)} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

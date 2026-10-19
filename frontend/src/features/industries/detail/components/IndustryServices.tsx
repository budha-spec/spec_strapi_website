import { AccentHeading } from '@/components/ui/AccentHeading';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText, hrefPath } from '@/lib/media';
import type { IndustryServiceBlock } from '../../types/industries.types';

interface IndustryServicesProps {
  data: IndustryServiceBlock;
}

/**
 * "Services We Are Offering" on an industry page — dark band, two cards to a
 * row from `md`. On hover or focus (a tap on touch) the title rolls up and a
 * brand-gradient copy rolls in from below, and the Explore More pill lights
 * up (`.industry-service-card` in globals.css). Explore More shows only when
 * the card has a `url`.
 */
export function IndustryServices({ data }: IndustryServicesProps) {
  const items = (data.industryServices ?? []).filter((item) => item.title);
  if (items.length === 0) return null;

  return (
    <section className="sp-section sp-industry-services w-full bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact">{cmsText(data.title)}</SectionEyebrow>
        )}

        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        <ul className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] md:grid-cols-2">
          {items.map((item) => {
            const title = cmsText(item.title);

            return (
              <li
                key={item.id}
                className="industry-service-card group flex flex-col rounded-[12px] border border-white/5 bg-white/[0.07] p-[clamp(18px,1.46vw,28px)] transition-colors duration-300 hover:border-white/15 focus-within:border-white/15"
              >
                {/* Rolling title: both copies move up one line-box together. */}
                <h3 className="relative overflow-hidden text-d22 font-normal leading-[1.35]">
                  <span className="block text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus-within:-translate-y-full motion-reduce:transition-none">
                    {title}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0 motion-reduce:transition-none"
                  >
                    <span
                      className="gradient-text-impact"
                      style={{ ['--grad-angle' as string]: '-70deg' }}
                    >
                      {title}
                    </span>
                  </span>
                </h3>

                {item.description && (
                  <p className="mt-[clamp(14px,1.25vw,24px)] border-t border-white/10 pt-[clamp(14px,1.25vw,24px)] text-d16 leading-[1.5] text-text-light">
                    {cmsText(item.description)}
                  </p>
                )}

                {item.url && (
                  <ExploreMore
                    href={hrefPath(item.url)}
                    label={cmsText(item.txt) || undefined}
                    className="mt-auto w-fit pt-[clamp(18px,1.67vw,32px)]"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText, hrefPath } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { ServicesBlock } from '../../types/service.types';

interface OfferingGridProps {
  data: ServicesBlock;
}

/**
 * "Services We Are Offering" on a sub-service page — numbered cards, two to
 * a row from `md`. Hovering anywhere on a card fades its title into the
 * brand gradient, like the Let's Talk links. A card with a `url` also gets
 * an arrow-only pill beside its number (Figma 549:11333; `btnText` is
 * ignored); its link is stretched over the whole card, so hovering anywhere
 * shows the pointer and fills the pill. See `.offering-card` in globals.css.
 */
export function OfferingGrid({ data }: OfferingGridProps) {
  const items = data.services ?? [];
  if (items.length === 0) return null;

  return (
    <section className="sp-section sp-service-offerings w-full bg-bg-light pt-[clamp(40px,3.65vw,70px)] pb-[clamp(48px,5.21vw,100px)]">
      <div className="shell">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}

        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text font-semibold"
            />
          </h2>
        )}

        <ul className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] md:grid-cols-2">
          {items.map((item, index) => {
            const href = item.url?.trim() ? hrefPath(item.url.trim()) : null;

            return (
              <li
                key={item.id}
                className={cn(
                  'offering-card flex flex-col rounded-[16px] bg-bg-white p-[clamp(18px,1.46vw,28px)]',
                  href && 'offering-card--link group relative'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden
                    className="text-d60 font-light leading-none text-stroke-outline"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {href && (
                    <Link
                      href={href}
                      aria-label={cmsText(item.title)}
                      className="offering-card-link shrink-0 rounded-[16px] outline-none after:absolute after:inset-0 after:rounded-[16px] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-blue"
                    >
                      <span className="offering-card-arrow gradient-hover flex h-[clamp(20px,1.25vw,24px)] w-[clamp(34px,2.08vw,40px)] items-center justify-center rounded-full border border-stroke-main text-text-primary group-hover:border-transparent group-hover:text-white group-focus-within:border-transparent group-focus-within:text-white">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                          className="size-[clamp(14px,0.94vw,18px)]"
                        >
                          <path d="M5 12h13" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  )}
                </div>

                <h3 className="offering-card-title mt-[clamp(20px,2.08vw,40px)] w-fit text-d22 font-medium leading-[1.3] text-text-primary">
                  {cmsText(item.title)}
                </h3>

                {item.description && (
                  <p className="mt-[clamp(12px,0.94vw,18px)] border-t border-stroke-outline pt-[clamp(12px,0.94vw,18px)] text-d16 leading-[1.5] text-text-secondary">
                    {cmsText(item.description)}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

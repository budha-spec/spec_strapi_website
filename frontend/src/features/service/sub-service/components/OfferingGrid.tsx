import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { ServicesBlock } from '../../types/service.types';

interface OfferingGridProps {
  data: ServicesBlock;
}

/**
 * "Services We Are Offering" on a sub-service page — numbered cards, two to
 * a row from `md`. Static (no link): hovering anywhere on a card fades its
 * title into the brand gradient, like the Let's Talk links. See
 * `.offering-card` in globals.css.
 */
export function OfferingGrid({ data }: OfferingGridProps) {
  const items = data.services ?? [];
  if (items.length === 0) return null;

  return (
    <section className="w-full bg-bg-light pt-[clamp(40px,3.65vw,70px)] pb-[clamp(48px,5.21vw,100px)]">
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

        <ul className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] md:grid-cols-2">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="offering-card flex flex-col rounded-[16px] bg-bg-white p-[clamp(18px,1.46vw,28px)]"
            >
              <span
                aria-hidden
                className="text-d60 font-light leading-none text-stroke-outline"
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="offering-card-title mt-[clamp(20px,2.08vw,40px)] w-fit text-d22 font-medium leading-[1.3] text-text-primary">
                {cmsText(item.title)}
              </h3>

              {item.description && (
                <p className="mt-[clamp(12px,0.94vw,18px)] border-t border-stroke-outline pt-[clamp(12px,0.94vw,18px)] text-d16 leading-[1.5] text-text-secondary">
                  {cmsText(item.description)}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

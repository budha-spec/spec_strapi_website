import { AccentHeading } from '@/components/ui/AccentHeading';
import { cmsText } from '@/lib/media';
import type { CaseStudySolutionsBlock } from '../../types/case-study.types';

interface CaseStudySolutionsProps {
  data: CaseStudySolutionsBlock;
}

/**
 * The white solution cards under "Outcomes & Business Impact" — three to a
 * row from `lg` (Figma 421:5686). Hovering (or tapping) a card fades its title
 * into the brand gradient (`.cs-solution-card` in globals.css); the card
 * itself does not change. The design has no heading;
 * the block's optional `title` is shown when an editor sets one.
 */
export function CaseStudySolutions({ data }: CaseStudySolutionsProps) {
  const items = (data.solution ?? []).filter((item) => item.title);
  if (items.length === 0) return null;

  return (
    <section className="sp-section sp-case-study-solutions w-full bg-bg-light pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && (
          <h2 className="sp-title mb-[clamp(20px,2.08vw,40px)] text-d30 font-medium leading-[1.2] text-text-heading">
            <AccentHeading text={cmsText(data.title)} accentClassName="gradient-text font-semibold" />
          </h2>
        )}

        <ul className="grid gap-[clamp(12px,1.46vw,28px)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              tabIndex={0}
              className="cs-solution-card rounded-[14px] bg-bg-white px-[clamp(18px,1.3vw,25px)] py-[clamp(20px,1.56vw,30px)] outline-none"
            >
              <h3 className="cs-solution-card-title w-fit text-d22 font-medium leading-[1.3] text-text-primary">
                {cmsText(item.title)}
              </h3>
              {item.description && (
                <p className="mt-[clamp(12px,1.04vw,20px)] text-d18 leading-[1.3] tracking-[0.01em] text-text-secondary">
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

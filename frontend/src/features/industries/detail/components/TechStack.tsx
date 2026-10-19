import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { TechnologiesBlock } from '../../types/industries.types';

interface TechStackProps {
  data: TechnologiesBlock;
}

/**
 * "Tech Stack / Technology and Integration" — white cards, three to a row
 * from `lg`, each a group title over its technologies as outlined chips.
 * Hovering a card fades its title into the brand gradient (same rule as the
 * sub-service offering cards: `.tech-stack-card` in globals.css).
 */
export function TechStack({ data }: TechStackProps) {
  const groups = (data.technology ?? []).filter((group) => group.title);
  if (groups.length === 0) return null;

  return (
    <section className="sp-section sp-industry-tech-stack w-full bg-bg-light pt-[clamp(40px,3.65vw,70px)] pb-[clamp(48px,6.25vw,120px)]">
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

        <ul className="mt-[clamp(24px,2.6vw,50px)] grid gap-[clamp(12px,1.04vw,20px)] sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const chips = (group.technologies ?? []).filter((tech) => tech.title);

            return (
              <li
                key={group.id}
                tabIndex={0}
                className="tech-stack-card rounded-[12px] bg-bg-white p-[clamp(16px,1.25vw,24px)] outline-none transition-shadow duration-300 hover:shadow-[0_10px_28px_rgb(0_0_0/0.06)] focus-visible:shadow-[0_0_0_2px_var(--color-stroke-main)]"
              >
                <h3 className="tech-stack-card-title w-fit text-d22 font-medium leading-[1.3] text-text-primary">
                  {cmsText(group.title)}
                </h3>

                {chips.length > 0 && (
                  <ul className="mt-[clamp(14px,1.25vw,24px)] flex flex-wrap gap-[clamp(6px,0.52vw,10px)]">
                    {chips.map((tech) => (
                      <li
                        key={tech.id}
                        className="tech-chip flex h-[clamp(30px,2.08vw,40px)] items-center rounded-full border border-stroke-outline px-[clamp(12px,0.94vw,18px)] text-d14 text-text-secondary"
                      >
                        {cmsText(tech.title)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

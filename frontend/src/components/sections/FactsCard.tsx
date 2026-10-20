import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { LabeledItem } from '@/types/sections.types';

export interface Fact {
  label: string;
  value?: string | null;
}

interface FactsCardProps {
  /** Gradient label over a plain value; facts without a value are left out. */
  facts: Fact[];
  /** Labelled chip row under the facts ("Technology & Integration", "Audience"). */
  chips?: { label: string; items: LabeledItem[] } | null;
  /** The page's own section hook, e.g. `sp-case-study-facts`. */
  className?: string;
  /**
   * `none` drops the band's own spacing when the sections around it already
   * space it (Live BI, where it sits between the overview and the dashboard).
   */
  spacing?: 'default' | 'none';
}

/** Small gradient label above each fact ("Client", "Platform", …). */
function FactLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="gradient-text w-fit text-d16 font-medium leading-[1.21]">
      {children}
    </span>
  );
}

/**
 * The white card under the hero: a row of labelled facts, then one labelled
 * row of chips — case study (Client / Country / Services / Scale +
 * technology chips) and Live BI dashboards (Dashboard / Platform / Focus +
 * audience chips). Hides when there is nothing to show.
 */
export function FactsCard({ facts, chips, className, spacing = 'default' }: FactsCardProps) {
  const shown = facts
    .map((fact) => ({ label: fact.label, value: cmsText(fact.value).trim() }))
    .filter((fact) => fact.value);
  const chipItems = (chips?.items ?? []).filter((item) => item.title);

  if (shown.length === 0 && chipItems.length === 0) return null;

  return (
    <section
      className={cn(
        'sp-section sp-facts-card w-full bg-bg-light',
        spacing === 'default' && 'pt-[clamp(32px,3.13vw,60px)] pb-[clamp(0px,2.6vw,50px)]',
        className
      )}
    >
      <div className="shell">
        <div className="rounded-[14px] bg-bg-white px-[clamp(18px,2.08vw,40px)] py-[clamp(18px,1.56vw,30px)]">
          {shown.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-[clamp(16px,2.6vw,50px)] gap-y-[clamp(16px,1.25vw,24px)] md:flex md:flex-wrap md:gap-x-[clamp(40px,6.25vw,120px)]">
              {shown.map((fact) => (
                <div key={fact.label} className="flex min-w-0 flex-col gap-[clamp(4px,0.31vw,6px)]">
                  <dt>
                    <FactLabel>{fact.label}</FactLabel>
                  </dt>
                  <dd className="text-d18 leading-[1.21] text-text-primary">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {chips && chipItems.length > 0 && (
            <div
              className={cn(
                'flex flex-col gap-[clamp(10px,0.83vw,16px)]',
                shown.length > 0 && 'mt-[clamp(20px,2.08vw,40px)]'
              )}
            >
              <FactLabel>{chips.label}</FactLabel>
              <ul className="flex flex-wrap gap-[clamp(8px,0.83vw,16px)]">
                {chipItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center rounded-full border border-stroke-main bg-bg-white px-[clamp(14px,1.04vw,20px)] py-[clamp(7px,0.52vw,10px)] text-[clamp(0.8125rem,0.78vw,0.9375rem)] leading-[1.21] text-text-primary"
                  >
                    {cmsText(item.title)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

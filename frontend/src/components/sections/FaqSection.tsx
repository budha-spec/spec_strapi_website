'use client';

import { useId, useState } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { FaqsBlock } from '@/types/sections.types';

interface FaqSectionProps {
  data: FaqsBlock;
}

/**
 * "Frequently Asked Questions" — dark accordion, one answer open at a time.
 * The first question starts open, as in the design.
 */
export function FaqSection({ data }: FaqSectionProps) {
  const items = (data.faq ?? []).filter((item) => item.question);
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  if (items.length === 0) return null;

  return (
    <section className="faq-section w-full bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && (
          <h2 className="text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.title)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        {data.subTitle && (
          <p className="mt-[clamp(8px,0.83vw,16px)] max-w-[900px] text-d16 leading-[1.5] text-text-light">
            {cmsText(data.subTitle)}
          </p>
        )}

        <ul className="mt-[clamp(24px,2.6vw,50px)] flex flex-col gap-[clamp(10px,0.83vw,16px)]">
          {items.map((item, index) => {
            const expanded = open === index;
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;

            return (
              <li
                key={item.id}
                className={cn(
                  'faq-item rounded-[10px] border transition-colors',
                  expanded
                    ? 'border-white/15 bg-white/[0.08]'
                    : 'border-white/5 bg-white/[0.05] hover:border-white/15'
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-[clamp(16px,1.25vw,24px)] py-[clamp(14px,1.15vw,22px)] text-left text-d18 font-normal leading-[1.4] text-white"
                  >
                    {cmsText(item.question)}
                    <span
                      aria-hidden
                      className="relative size-4 shrink-0 text-white"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
                      <span
                        className={cn(
                          'absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300',
                          expanded && 'scale-y-0'
                        )}
                      />
                    </span>
                  </button>
                </h3>

                {/* Grid rows animate the height without measuring the answer. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden" inert={!expanded}>
                    <p className="whitespace-pre-line px-[clamp(16px,1.25vw,24px)] pb-[clamp(16px,1.25vw,24px)] text-d16 leading-[1.6] text-text-light">
                      {cmsText(item.answer)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

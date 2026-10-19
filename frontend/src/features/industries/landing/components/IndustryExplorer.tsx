'use client';

import { useId, useState, type KeyboardEvent } from 'react';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import { industryHref } from '../../lib/industry-href';
import type { Industry } from '../../types/industries.types';

/**
 * Industries landing explorer (Figma 331:7265): industry list on the left,
 * the selected industry's image, summary and Explore More on the right.
 * Click (or arrow keys) picks an industry — hover only highlights it — and
 * the panel fades in. On phones the list becomes a scrolling row above it.
 */
export function IndustryExplorer({ industries }: { industries: Industry[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const current = industries[active];
  if (!current) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? -1
          : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + industries.length) % industries.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };


  return (
    <div className="sp-industry-explorer grid overflow-hidden rounded-[14px] lg:grid-cols-[minmax(0,690fr)_minmax(0,1010fr)]">
      <div
        role="tablist"
        aria-label="Industries"
        aria-orientation="vertical"
        className="no-scrollbar flex gap-[clamp(18px,2.6vw,28px)] overflow-x-auto bg-white/[0.08] px-[clamp(20px,3.65vw,70px)] py-[clamp(18px,4.17vw,80px)] lg:flex-col lg:gap-[clamp(14px,1.3vw,25px)] lg:overflow-visible"
      >
        {industries.map((industry, index) => {
          const selected = index === active;
          return (
            <button
              key={industry.id}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                // w-fit keeps the gradient as wide as the word (a full-width button
                // stretches it so short names look solid green). Long names still
                // wrap in the desktop column; the phone row scrolls instead.
                'industry-tab w-fit max-w-full shrink-0 cursor-pointer whitespace-nowrap text-left text-d22 leading-[1.3] transition-colors duration-300 lg:whitespace-normal',
                selected
                  ? 'gradient-text-impact font-medium'
                  : 'text-white/90 hover:text-white focus-visible:text-white'
              )}
              style={selected ? { ['--grad-angle' as string]: '-54.53deg' } : undefined}
            >
              {cmsText(industry.title)}
            </button>
          );
        })}
      </div>

      <div
        key={current.id}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="industry-panel flex flex-col bg-bg-chip"
      >
        <div className="relative h-[clamp(200px,26.72vw,513px)] overflow-hidden bg-bg-dark">
          <CmsImage
            media={current.image}
            fallback="cover"
            alt={cmsText(current.image?.alternativeText) || ''}
            width={current.image?.width ?? 1010}
            height={current.image?.height ?? 513}
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col px-[clamp(18px,1.82vw,35px)] pt-[clamp(18px,1.82vw,35px)] pb-[clamp(20px,1.82vw,35px)]">
          <h3 className="text-d24 font-medium leading-[1.3] text-text-primary">
            {cmsText(current.title)}
          </h3>
          {current.description && (
            <p className="mt-[clamp(10px,1.04vw,20px)] max-w-[800px] text-d16 leading-[1.45] text-text-secondary">
              {cmsText(current.description)}
            </p>
          )}
          <ExploreMore
            href={industryHref(current)}
            className="mt-auto self-start pt-[clamp(18px,1.82vw,35px)]"
          />
        </div>
      </div>
    </div>
  );
}

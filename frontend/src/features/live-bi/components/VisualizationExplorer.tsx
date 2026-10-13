'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Visualization, VisualizationTab } from '../types/live-bi.types';
import { VisualizationCard } from './VisualizationCard';

interface VisualizationExplorerProps {
  items: Visualization[];
  /** Tabs in Strapi order; the first one starts selected. Empty shows every card. */
  tabs: VisualizationTab[];
}

/**
 * Category tabs + card grid for the Live BI listing. Filtering is
 * client-side over the block's visualizations, keeping the editor's order.
 */
export function VisualizationExplorer({ items, tabs }: VisualizationExplorerProps) {
  const [active, setActive] = useState(tabs[0]?.slug ?? '');

  const visible = useMemo(
    () =>
      active
        ? items.filter((item) =>
            (item.category ?? []).some((category) => category.slug === active)
          )
        : items,
    [items, active]
  );

  return (
    <>
      {tabs.length > 1 && (
        <div
          role="group"
          aria-label="Filter by platform"
          className="sp-live-bi-tabs mt-[clamp(28px,2.6vw,50px)] rounded-[14px] bg-bg-white px-[clamp(12px,1.04vw,20px)] py-[clamp(10px,0.83vw,16px)]"
        >
          <ul className="flex flex-wrap justify-center gap-[clamp(8px,0.63vw,12px)]">
            {tabs.map((tab) => {
              const selected = tab.slug === active;
              return (
                <li key={tab.slug}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(tab.slug)}
                    className={cn(
                      'live-bi-tab inline-flex h-[clamp(32px,1.98vw,38px)] cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-[clamp(14px,1.04vw,20px)] text-[clamp(0.8125rem,0.78vw,0.9375rem)] leading-none transition-[color,background-color,filter]',
                      selected
                        ? 'gradient-btn text-white'
                        : 'bg-bg-chip text-text-secondary hover:bg-text-secondary hover:text-white focus-visible:bg-text-secondary focus-visible:text-white'
                    )}
                    style={selected ? { ['--grad-angle' as string]: '-68.41deg' } : undefined}
                  >
                    {tab.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {visible.length === 0 ? (
        <p className="sp-live-bi-empty mt-[clamp(24px,2.08vw,40px)] rounded-[14px] bg-bg-white px-6 py-[clamp(40px,4.17vw,80px)] text-center text-d18 text-text-secondary">
          No dashboards in this category yet.
        </p>
      ) : (
        <ul className="sp-live-bi-grid mt-[clamp(24px,2.08vw,40px)] grid gap-[clamp(16px,1.25vw,24px)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <li key={item.id}>
              <VisualizationCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

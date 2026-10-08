'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText, hrefPath } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { ServicesBlock } from '../types/service.types';

interface CapabilityTabsProps {
  data: ServicesBlock;
}

/**
 * "Core Capabilities" on a service page — a pill tab bar over one card per
 * related service: image on the left, copy and its child services right.
 */
export function CapabilityTabs({ data }: CapabilityTabsProps) {
  const items = data.services ?? [];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  if (items.length === 0) return null;

  const current = items[Math.min(active, items.length - 1)];
  const links = (current.children ?? []).filter((child) => child.title);

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(active + 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(items.length - 1),
    };
    const handler = keys[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  return (
    <section
      id="services"
      className="w-full bg-bg-light pt-[clamp(32px,4.53vw,87px)] pb-[clamp(48px,6.7vw,128px)]"
    >
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

        <div
          role="tablist"
          aria-label={cmsText(data.title) || 'Capabilities'}
          className="no-scrollbar mx-auto mt-[clamp(24px,3.13vw,60px)] flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-bg-white p-[clamp(5px,0.42vw,8px)] lg:w-[1316px]"
        >
          {items.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
                className={cn(
                  'h-[clamp(36px,2.6vw,50px)] shrink-0 cursor-pointer whitespace-nowrap rounded-full px-[clamp(14px,1.25vw,24px)] text-d16 transition-colors lg:flex-1',
                  selected
                    ? 'gradient-btn text-white'
                    : 'text-text-primary hover:bg-bg-light'
                )}
                style={
                  selected ? { ['--grad-angle' as string]: '-68.41deg' } : undefined
                }
              >
                {cmsText(item.title)}
              </button>
            );
          })}
        </div>

        <div
          key={current.id}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="capability-panel mt-[clamp(24px,3.33vw,64px)] grid overflow-hidden rounded-[16px] bg-bg-white md:grid-cols-[clamp(240px,21vw,403px)_1fr] md:min-h-[clamp(360px,25.5vw,490px)]"
        >
          <div className="h-[clamp(200px,40vw,320px)] overflow-hidden bg-bg-dark md:h-auto">
            <CmsImage
              media={current.image}
              fallback="card"
              alt={cmsText(current.title)}
              className="size-full object-cover"
            />
          </div>

          <div className="flex flex-col p-[clamp(20px,4.17vw,80px)] md:py-[clamp(28px,3.33vw,64px)]">
            <h3 className="gradient-text w-fit text-d24 font-semibold">
              {cmsText(current.title)}
            </h3>

            {current.description && (
              <p className="mt-[clamp(10px,0.83vw,16px)] max-w-[1050px] text-d16 leading-[1.45] text-text-secondary">
                {cmsText(current.description)}
              </p>
            )}

            {links.length > 0 && (
              <ul className="mt-[clamp(20px,2.5vw,48px)] flex max-w-[1000px] flex-wrap gap-x-[clamp(10px,1.25vw,24px)] gap-y-[clamp(10px,1.04vw,20px)]">
                {links.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={hrefPath(child.url || child.slug)}
                      className="flex h-[clamp(34px,2.19vw,42px)] items-center rounded-full border border-stroke-main px-[clamp(14px,1.04vw,20px)] text-d16 text-text-primary transition-colors hover:border-brand-cta-blue hover:text-brand-cta-blue"
                    >
                      {cmsText(child.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <ExploreMore
              href={hrefPath(current.url)}
              variant="filled"
              className="mt-auto pt-[clamp(24px,2.5vw,48px)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

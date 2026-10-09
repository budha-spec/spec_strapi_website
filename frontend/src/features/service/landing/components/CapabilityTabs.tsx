'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import Link from 'next/link';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText, hrefPath } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { ServicesBlock } from '../../types/service.types';

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
  const [overflow, setOverflow] = useState({ start: false, end: false });
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  /** Tracks whether tabs are hidden past either edge of the bar. */
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const max = list.scrollWidth - list.clientWidth;
    setOverflow({ start: list.scrollLeft > 1, end: list.scrollLeft < max - 1 });
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure, items.length]);

  // Keep the active tab in view; scrolls the bar only, never the page.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.offsetLeft;
    const right = left + tab.offsetWidth;
    const pad = 48;
    if (left < list.scrollLeft + pad) {
      list.scrollTo({ left: left - pad, behavior: 'smooth' });
    } else if (right > list.scrollLeft + list.clientWidth - pad) {
      list.scrollTo({
        left: right - list.clientWidth + pad,
        behavior: 'smooth',
      });
    }
  }, [active]);

  if (items.length === 0) return null;

  const scrollBy = (dir: -1 | 1) => {
    const list = listRef.current;
    list?.scrollBy({ left: dir * list.clientWidth * 0.6, behavior: 'smooth' });
  };

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

        <div className="relative mx-auto mt-[clamp(24px,3.13vw,60px)] w-fit max-w-full overflow-hidden rounded-full bg-bg-white lg:min-w-[min(1316px,100%)]">
          <div
            ref={listRef}
            role="tablist"
            aria-label={cmsText(data.title) || 'Capabilities'}
            onScroll={measure}
            className="no-scrollbar flex gap-1 overflow-x-auto scroll-smooth p-[clamp(5px,0.42vw,8px)]"
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
                    'h-[clamp(36px,2.6vw,50px)] shrink-0 cursor-pointer whitespace-nowrap rounded-full px-[clamp(14px,1.25vw,24px)] text-d16 transition-colors lg:grow',
                    selected
                      ? 'gradient-btn text-white'
                      : 'gradient-hover text-text-primary hover:text-white focus-visible:text-white',
                  )}
                  style={
                    selected
                      ? { ['--grad-angle' as string]: '-68.41deg' }
                      : undefined
                  }
                >
                  {cmsText(item.title)}
                </button>
              );
            })}
          </div>

          {(['start', 'end'] as const).map((edge) =>
            overflow[edge] ? (
              <div
                key={edge}
                className={cn(
                  'pointer-events-none absolute inset-y-0 flex w-[clamp(56px,5vw,96px)] items-center from-bg-white from-45% to-transparent',
                  edge === 'start'
                    ? 'left-0 justify-start bg-gradient-to-r pl-[clamp(5px,0.42vw,8px)]'
                    : 'right-0 justify-end bg-gradient-to-l pr-[clamp(5px,0.42vw,8px)]',
                )}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={
                    edge === 'start'
                      ? 'Show previous categories'
                      : 'Show more categories'
                  }
                  onClick={() => scrollBy(edge === 'start' ? -1 : 1)}
                  className="pointer-events-auto flex size-[clamp(30px,2.08vw,40px)] cursor-pointer items-center justify-center rounded-full border border-stroke-outline bg-bg-white text-text-primary transition-colors hover:border-text-primary"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={edge === 'start' ? 'rotate-180' : undefined}
                    aria-hidden
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </button>
              </div>
            ) : null,
          )}
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
                      className="flex h-[clamp(34px,2.19vw,42px)] items-center rounded-full border border-stroke-main px-[clamp(14px,1.04vw,20px)] gradient-hover text-d16 text-text-primary hover:border-transparent hover:text-white focus-visible:border-transparent focus-visible:text-white"
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

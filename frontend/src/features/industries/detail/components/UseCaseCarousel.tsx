'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { MetricsBlock } from '@/types/sections.types';

interface UseCaseCarouselProps {
  data: MetricsBlock;
}

/** Matches the track's `duration-200` fade before it jumps between ends. */
const WRAP_FADE_MS = 200;

/**
 * "Key Use Cases" on an industry page (Figma 411:4615) — the industry's
 * `shared.key-metrics-section`, drawn as a row of numbered cards with the
 * fifth peeking, a progress bar and arrows. The track scrolls natively, so
 * touch swipes work; the arrows step one card and the bar follows.
 *
 * At rest a card shows its faded number and the title at the bottom. On
 * hover or focus (a tap on touch) that title fades out while a gradient copy
 * rises into the middle with a divider and the description underneath.
 */
export function UseCaseCarousel({ data }: UseCaseCarouselProps) {
  const items = (data.keyMetrics ?? []).filter((item) => item.name);
  const trackRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ index: 0, count: 1 });

  /** Which "stop" the track is at, counting each card the user can scroll past. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const stride = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    const maxScroll = track.scrollWidth - track.clientWidth;
    const count = maxScroll > 1 ? Math.round(maxScroll / stride) + 1 : 1;
    const index = Math.min(Math.round(track.scrollLeft / stride), count - 1);
    setPosition((prev) =>
      prev.index === index && prev.count === count ? prev : { index, count }
    );
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  /** True while the track fades out to jump between its ends. */
  const [wrapping, setWrapping] = useState(false);

  const go = (dir: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card || wrapping) return;
    const stride = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    const next = (position.index + dir + position.count) % position.count;
    const wraps = next !== position.index + dir;

    // Stepping within the row scrolls smoothly. Past either end the native
    // scroll would rewind across every card, so it fades out, jumps to the
    // other end and fades back in instead.
    if (!wraps || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.scrollTo({ left: next * stride, behavior: wraps ? 'instant' : 'smooth' });
      return;
    }
    setWrapping(true);
    window.setTimeout(() => {
      track.scrollTo({ left: next * stride, behavior: 'instant' });
      setWrapping(false);
    }, WRAP_FADE_MS);
  };

  if (items.length === 0) return null;

  return (
    <section className="sp-section sp-industry-use-cases w-full overflow-hidden bg-bg-light pt-[clamp(40px,3.65vw,70px)] pb-[clamp(48px,5.21vw,100px)]">
      {/* `@container` so the cards size from the shell width (cqw), not the bleeding track. */}
      <div className="shell @container">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}

        {data.description && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading
              text={cmsText(data.description)}
              accentClassName="gradient-text font-semibold"
            />
          </h2>
        )}

        {/*
          Bleeds from the shell's right edge to the viewport's (the shell is
          centred, so that gutter is 50vw − 50%) so the fifth card peeks out,
          as in the design; the matching padding lets the last card scroll
          back to the shell edge. The scrollbar is hidden (`.no-scrollbar`).
        */}
        <ul
          ref={trackRef}
          onScroll={measure}
          className={cn(
            'use-case-track no-scrollbar mt-[clamp(24px,3.13vw,60px)] mr-[calc(50%-50vw)] flex snap-x snap-mandatory gap-[clamp(12px,1.46vw,28px)] overflow-x-auto pr-[calc(50vw-50%)] pb-1 transition-opacity duration-200 ease-out',
            wrapping && 'opacity-0'
          )}
        >
          {items.map((item, index) => {
            const number = cmsText(item.number) || String(index + 1).padStart(2, '0');
            const title = cmsText(item.name);

            return (
              <li
                key={item.id}
                tabIndex={0}
                // Figma: four 404×440 cards fill the 1700 shell (28px gaps), the fifth peeks.
                className="use-case-card group grid min-h-[clamp(280px,22.92vw,440px)] w-[78cqw] shrink-0 snap-start grid-rows-[auto_1fr] rounded-[14px] bg-bg-white p-[clamp(18px,1.46vw,28px)] outline-none transition-shadow duration-300 hover:shadow-[0_10px_28px_rgb(0_0_0/0.06)] focus-visible:shadow-[0_0_0_2px_var(--color-stroke-main)] sm:w-[calc((100cqw-clamp(12px,1.46vw,28px))/2)] lg:w-[calc((100cqw-3*clamp(12px,1.46vw,28px))/4)]"
              >
                <span
                  aria-hidden
                  className="text-d60 font-normal leading-none text-stroke-outline/60"
                >
                  {number}
                </span>

                {/* Both states share one grid cell, so the card is always tall enough for the open one. */}
                <div className="mt-[clamp(32px,3.13vw,60px)] grid items-end">
                  <h3
                    aria-hidden
                    className="use-case-card-title col-start-1 row-start-1 max-w-[clamp(180px,12.5vw,240px)] text-d22 font-normal leading-[1.25] text-text-heading transition-[opacity,translate] duration-500 ease-out group-hover:-translate-y-2 group-hover:opacity-0 group-focus-visible:-translate-y-2 group-focus-visible:opacity-0 motion-reduce:transition-none"
                  >
                    {title}
                  </h3>

                  <div className="use-case-card-detail col-start-1 row-start-1 translate-y-3 opacity-0 transition-[opacity,translate] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
                    <h3 className="w-fit max-w-[clamp(180px,12.5vw,240px)] text-d22 font-normal leading-[1.25]">
                      <span className="gradient-text" style={{ ['--grad-angle' as string]: '-60deg' }}>
                        {title}
                      </span>
                    </h3>
                    {item.description && (
                      <p className="mt-[clamp(10px,0.83vw,16px)] border-t border-stroke-outline pt-[clamp(10px,0.83vw,16px)] text-d14 leading-[1.5] text-text-secondary">
                        {cmsText(item.description)}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {position.count > 1 && (
          <CarouselControls
            pill="dark"
            showExploreAll={false}
            progress={position}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </div>
    </section>
  );
}

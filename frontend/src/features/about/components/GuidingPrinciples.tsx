'use client';

import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { RichText } from '@/components/ui/RichText';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { loopSlides, useLoopCarousel } from '@/hooks/useLoopCarousel';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { PrinciplesBlock } from '../types/about.types';

/**
 * "Our Guiding Principles" (Figma 525:9333) — dark band with one wide slide
 * at a time (copy left, image right; stacked on phones) and the next one
 * peeking past the shell, then the progress bar and arrows. Loops endlessly
 * via `useLoopCarousel`, like the other carousels.
 */
export function GuidingPrinciples({ data }: { data: PrinciplesBlock }) {
  const slides = (data.caseStudy ?? []).filter((item) => item.title);
  const count = slides.length;
  const { index, animate, go, onTransitionEnd, swipe } = useLoopCarousel(count);

  if (count === 0) return null;

  return (
    <section className="sp-section sp-guiding-principles w-full overflow-hidden bg-bg-darker pt-[clamp(48px,5.21vw,100px)] pb-[clamp(48px,5.21vw,100px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact" className="text-d26">
            {cmsText(data.title)}
          </SectionEyebrow>
        )}
        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={cmsText(data.title) || 'Guiding principles'}
        className="mt-[clamp(24px,3.13vw,60px)]"
      >
        {/* The track may run past the shell's right edge (the next slide
            peeks into the gutter); the clip-path hides slides moved off left. */}
        <div {...swipe} className="shell touch-pan-y touch-pinch-zoom [clip-path:inset(0_-100vw_0_0)]">
          <ul
            onTransitionEnd={onTransitionEnd}
            className={cn(
              'principles-track flex gap-(--gp-gap) [--gp-card:90%] [--gp-gap:clamp(16px,2.08vw,40px)] lg:[--gp-card:100%]',
              animate &&
                'transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
            )}
            style={{
              transform: `translate3d(calc(${-index} * (var(--gp-card) + var(--gp-gap)) + var(--drag, 0px)), 0, 0)`,
            }}
          >
            {loopSlides(slides, 2).map((item, i) => (
              <li
                key={`${item.id}-${i}`}
                aria-roledescription="slide"
                aria-label={`${(i % count) + 1} of ${count}`}
                aria-hidden={i % count !== index % count || undefined}
                className="shrink-0 basis-(--gp-card)"
              >
                <article className="principle-card grid h-full grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-[14px] bg-bg-white md:grid-cols-[minmax(0,920fr)_minmax(0,780fr)] md:grid-rows-1">
                  <div className="order-2 px-[clamp(20px,3.13vw,60px)] py-[clamp(24px,3.13vw,60px)] md:order-1">
                    <h3 className="text-d26 font-medium leading-[1.3] text-text-primary">
                      {cmsText(item.title)}
                    </h3>
                    <RichText
                      content={item.description}
                      className="mt-[clamp(14px,1.56vw,30px)] max-w-[749px] text-d18 leading-[1.4] text-text-secondary"
                    />
                  </div>
                  <div className="relative order-1 aspect-[780/513] md:order-2 md:aspect-auto md:min-h-[clamp(300px,26.72vw,513px)]">
                    <CmsImage
                      media={item.image}
                      fallback="cover"
                      alt=""
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {count > 1 && (
          <div className="shell">
            <CarouselControls
              showExploreAll={false}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              progress={{ index, count, loop: true, animate }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

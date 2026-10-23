'use client';

import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { loopSlides, useLoopCarousel } from '@/hooks/useLoopCarousel';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { LeadersBlock } from '../types/about.types';

/**
 * Leaders "Client Spotlight" (Figma 525:9266) — dark band of white cards:
 * portrait on the pastel gradient left, quote and name right. Two per row
 * from `lg`; below that an endless one-card carousel (next card peeking)
 * with the same arrows as the team testimonials.
 */
export function LeaderSpotlight({ data }: { data: LeadersBlock }) {
  const leaders = (data.leader ?? []).filter((person) => person.name);
  const count = leaders.length;
  const { index, animate, go, onTransitionEnd, swipe } = useLoopCarousel(count);

  if (count === 0) return null;

  return (
    <section className="sp-section sp-leader-spotlight w-full overflow-hidden bg-bg-darker pt-[clamp(48px,6.56vw,126px)] pb-[clamp(48px,11.35vw,218px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact" angle="-54.53deg" className="text-d22">
            {cmsText(data.title)}
          </SectionEyebrow>
        )}
        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(8px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        {/* Below `lg` the list is a sliding track (the clip-path hides cards
            moved off left, the next one peeks right); from `lg` it is a grid,
            the transform is off and the loop clones are hidden. */}
        <div
          {...swipe}
          className="mt-[clamp(24px,3.44vw,66px)] touch-pan-y touch-pinch-zoom [clip-path:inset(0_-100vw_0_0)]"
        >
          <ul
            onTransitionEnd={onTransitionEnd}
            className={cn(
              'leader-track flex gap-(--ls-gap) [--ls-card:88%] [--ls-gap:clamp(16px,1.46vw,28px)] [transform:translate3d(calc(var(--ls-index)*-1*(var(--ls-card)+var(--ls-gap))+var(--drag,0px)),0,0)] lg:grid lg:grid-cols-2 lg:transform-none',
              animate &&
                'transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
            )}
            style={{ ['--ls-index' as string]: index }}
          >
            {loopSlides(leaders, 2).map((person, i) => {
              const name = cmsText(person.name);
              const clone = i >= count;
              return (
                <li
                  key={`${person.id}-${i}`}
                  aria-hidden={clone || undefined}
                  aria-label={`${(i % count) + 1} of ${count}`}
                  className={cn('shrink-0 basis-(--ls-card)', clone && 'lg:hidden')}
                >
                  <figure className="leader-card grid h-full overflow-hidden rounded-[14px] bg-bg-white sm:grid-cols-[minmax(0,383fr)_minmax(0,453fr)]">
                    <div className="leader-portrait relative h-[clamp(280px,70vw,380px)] sm:h-auto sm:min-h-[clamp(320px,25.1vw,482px)]">
                      <CmsImage
                        media={person.image}
                        fallback="portrait"
                        alt={clone ? '' : name}
                        className="absolute inset-0 size-full object-cover object-bottom"
                      />
                    </div>
                    <figcaption className="flex flex-col px-[clamp(18px,1.56vw,30px)] py-[clamp(20px,2.08vw,40px)]">
                      {person.description && (
                        <blockquote className="whitespace-pre-line text-d18 leading-[1.4] text-text-primary">
                          {cmsText(person.description)}
                        </blockquote>
                      )}
                      <div className="mt-auto pt-[clamp(20px,2.6vw,50px)]">
                        <p className="text-d24 font-medium leading-[1.3] text-text-primary">{name}</p>
                        {person.designation && (
                          <p className="mt-[6px] text-d16 leading-[1.3] text-text-secondary">
                            {cmsText(person.designation)}
                          </p>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>

        {count > 1 && (
          <CarouselControls
            className="lg:hidden"
            showExploreAll={false}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </div>
    </section>
  );
}

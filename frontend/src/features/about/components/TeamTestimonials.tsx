'use client';

import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { loopSlides, useLoopCarousel } from '@/hooks/useLoopCarousel';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { TestimonialsBlock } from '@/types/sections.types';

/**
 * Team "Client Spotlight" (Figma 525:9285) — dark band of white quote cards
 * with a round avatar, name and role. 1 / 2 / 4 cards per view with the next
 * one peeking past the shell; the arrows move one card.
 *
 * Loops endlessly via `useLoopCarousel`; up to five cards (four + the
 * peek) are in view, so short lists are repeated more than twice.
 */
export function TeamTestimonials({ data }: { data: TestimonialsBlock }) {
  const people = (data.testimonials ?? []).filter((person) => person.name);
  const count = people.length;
  const { index, animate, go, onTransitionEnd, swipe } = useLoopCarousel(count);

  if (count === 0) return null;
  const slides = loopSlides(people, 5);

  return (
    <section className="sp-section sp-team-testimonials w-full overflow-hidden bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
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
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Team testimonials"
        className="mt-[clamp(24px,3.65vw,70px)]"
      >
        <div {...swipe} className="shell touch-pan-y touch-pinch-zoom [clip-path:inset(0_-100vw_0_0)]">
          <ul
            onTransitionEnd={onTransitionEnd}
            className={cn(
              'team-testimonial-track flex gap-(--tt-gap) [--tt-card:85%] [--tt-gap:clamp(16px,1.46vw,28px)] sm:[--tt-card:calc((100%-var(--tt-gap))/2)] lg:[--tt-card:calc((100%-3*var(--tt-gap))/4)]',
              animate &&
                'transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
            )}
            style={{
              transform: `translate3d(calc(${-index} * (var(--tt-card) + var(--tt-gap)) + var(--drag, 0px)), 0, 0)`,
            }}
          >
            {slides.map((person, i) => (
              <li
                key={`${person.id}-${i}`}
                // Only the first copy is announced; the others are clones.
                aria-hidden={i >= count || undefined}
                aria-roledescription="slide"
                aria-label={`${(i % count) + 1} of ${count}`}
                className="shrink-0 basis-(--tt-card)"
              >
                <figure className="team-testimonial-card flex h-full flex-col rounded-[14px] bg-bg-white px-[clamp(18px,1.56vw,30px)] pt-[clamp(24px,3.28vw,63px)] pb-[clamp(20px,1.56vw,30px)]">
                  {person.description && (
                    <blockquote className="text-d18 leading-[1.4] text-text-primary">
                      {cmsText(person.description)}
                    </blockquote>
                  )}
                  <figcaption className="mt-auto pt-[clamp(20px,1.56vw,30px)]">
                    <div aria-hidden className="mb-[clamp(14px,1.09vw,21px)] h-px w-full bg-stroke-divider" />
                    <div className="flex items-center gap-[clamp(10px,0.78vw,15px)]">
                      <CmsImage
                        media={person.image}
                        fallback="portrait"
                        alt=""
                        width={65}
                        height={65}
                        className="size-[clamp(48px,3.39vw,65px)] shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-d22 font-medium leading-[1.3] text-text-primary">
                          {cmsText(person.name)}
                        </p>
                        {person.designation && (
                          <p className="mt-[clamp(4px,0.52vw,10px)] text-d16 leading-[1.3] text-text-secondary">
                            {cmsText(person.designation)}
                          </p>
                        )}
                      </div>
                    </div>
                  </figcaption>
                </figure>
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
            />
          </div>
        )}
      </div>
    </section>
  );
}

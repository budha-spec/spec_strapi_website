'use client';

import { useState } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { VideoModal } from '@/components/ui/VideoModal';
import { loopSlides, useLoopCarousel } from '@/hooks/useLoopCarousel';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import { toEmbedUrl } from '@/lib/video';
import type { Testimonial, TestimonialsBlock } from '@/types/sections.types';

const PlayIcon = () => (
  <span className="spotlight-play-icon flex size-[clamp(34px,2.19vw,42px)] shrink-0 items-center justify-center rounded-full">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <polygon points="6 5.5 18 12 6 18.5" />
    </svg>
  </span>
);

interface CardProps {
  person: Testimonial;
  onPlay: (src: string, title: string) => void;
}

/**
 * One wide testimonial: portrait + Play on the left, quote and the
 * client's name on the right; stacked on phones. The portrait panel reuses
 * the `.spotlight-card` hover (grayscale photo, gradient Play).
 */
function FeaturedCard({ person, onPlay }: CardProps) {
  const name = cmsText(person.name);
  const quote = cmsText(person.description);
  const embedUrl = toEmbedUrl(person.videoUrl);

  return (
    <figure
      className="testimonial-feature-card grid h-full gap-[clamp(16px,1.56vw,30px)] rounded-[14px] bg-bg-white p-[clamp(12px,1.04vw,20px)] md:grid-cols-[minmax(0,383fr)_minmax(0,845fr)]"
    >
      <div
        className="spotlight-card relative flex h-[clamp(300px,80vw,380px)] flex-col items-center justify-end overflow-hidden rounded-[10px] pb-[clamp(16px,1.25vw,24px)] md:h-[clamp(340px,24vw,460px)]"
        style={{
          backgroundImage: 'linear-gradient(-80.31deg, #56F72F 73.097%, #0C3CED 134.19%)',
        }}
      >
        <CmsImage
          media={person.image}
          fallback="portrait"
          alt={name}
          className="absolute inset-0 size-full object-cover object-top"
        />
        {embedUrl && (
          <button
            type="button"
            onClick={() => onPlay(embedUrl, name)}
            aria-label={`Play video: ${name}`}
            className="spotlight-play relative z-10 flex h-[clamp(40px,2.5vw,48px)] w-[clamp(110px,6.93vw,133px)] cursor-pointer items-center rounded-full p-[3px]"
          >
            <PlayIcon />
            <span className="flex-1 text-center text-d18 font-light leading-none">Play</span>
          </button>
        )}
      </div>

      <figcaption className="flex flex-col px-[clamp(4px,0.52vw,10px)] pb-[clamp(4px,0.52vw,10px)] md:py-[clamp(8px,1.04vw,20px)]">
        {quote && (
          <blockquote className="whitespace-pre-line text-d18 leading-[1.5] text-text-secondary">
            {quote}
          </blockquote>
        )}
        <div className="mt-auto pt-[clamp(20px,2.08vw,40px)]">
          <p className="gradient-text w-fit text-d24 font-medium leading-[1.3]">{name}</p>
          {person.designation && (
            <p className="mt-1 text-d16 leading-[1.3] text-text-secondary">
              {cmsText(person.designation)}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Light "Client Spotlight" carousel at the top of the testimonials listing:
 * one wide card with the next peeking past the shell, progress bar + arrows.
 * It loops endlessly over a doubled list: after the last card the first one
 * slides in, then the track snaps back to the original without animating.
 */
export function FeaturedTestimonials({ data }: { data: TestimonialsBlock }) {
  const people = (data.testimonials ?? []).filter((person) => person.name);
  const count = people.length;
  const { index, animate, go, onTransitionEnd } = useLoopCarousel(count);
  const [video, setVideo] = useState<{ src: string; title: string } | null>(null);

  if (count === 0) return null;
  const slides = loopSlides(people);

  return (
    <section className="sp-section sp-testimonial-feature w-full overflow-hidden bg-bg-light pt-[clamp(40px,3.13vw,60px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}
        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text font-semibold"
            />
          </h2>
        )}
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        className="mt-[clamp(24px,2.6vw,50px)]"
      >
        {/* Same peek as the case-study carousel: the track may run past the
            shell's right edge, the clip-path hides slides moved off left. */}
        <div className="shell [clip-path:inset(0_-100vw_0_0)]">
          <ul
            onTransitionEnd={onTransitionEnd}
            className={cn(
              'testimonial-feature-track flex gap-(--tf-gap) [--tf-card:88%] [--tf-gap:clamp(16px,1.46vw,28px)] md:[--tf-card:82%] lg:[--tf-card:74.6%]',
              animate && 'transition-transform duration-500 ease-out motion-reduce:transition-none'
            )}
            style={{
              transform: `translate3d(calc(${-index} * (var(--tf-card) + var(--tf-gap))), 0, 0)`,
            }}
          >
            {slides.map((person, i) => (
              <li
                key={`${person.id}-${i}`}
                aria-roledescription="slide"
                aria-label={`${(i % count) + 1} of ${count}`}
                // Loop clones stay out of the tab order and screen readers.
                inert={i >= count || undefined}
                aria-hidden={i >= count || undefined}
                className="shrink-0 basis-(--tf-card)"
              >
                {/* Not inert: the peeking card hovers and plays too (prototype). */}
                <FeaturedCard
                  person={person}
                  onPlay={(src, title) => setVideo({ src, title })}
                />
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

      {video && (
        <VideoModal src={video.src} title={video.title} onClose={() => setVideo(null)} />
      )}
    </section>
  );
}

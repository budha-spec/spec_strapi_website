'use client';

import { useCallback, useEffect, useRef, useState, type TransitionEvent } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { VideoModal } from '@/components/ui/VideoModal';
import { cmsText, hrefPath } from '@/lib/media';
import { cn } from '@/lib/utils';
import { toEmbedUrl } from '@/lib/video';
import type { Testimonial, TestimonialsBlock } from '@/types/sections.types';

interface TestimonialsProps {
  data: TestimonialsBlock;
  /**
   * `carousel` (default) slides 1 / 2 / 4 cards at a time. `grid` shows every
   * card at once (testimonials listing, Figma 502:7353): written testimonials
   * only — no Play pill; the quote opens on hover. Video testimonials live in
   * that page's featured carousel.
   */
  layout?: 'carousel' | 'grid';
}

export function Testimonials({
  data,
  layout = 'carousel',
}: TestimonialsProps) {
  const grid = layout === 'grid';
  const people = data.testimonials ?? [];
  const count = people.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  /** Player currently open in the lightbox, or null when it is closed. */
  const [activeVideo, setActiveVideo] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // The carousel loops over a doubled list; the grid shows each card once
  // (and, on phones, is swapped for the same looping carousel).
  const slides = count > 0 ? [...people, ...people] : [];

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = viewport?.querySelector<HTMLElement>('.spotlight-track');
    if (!viewport || !track) return;

    const measure = () => {
      const n = Number.parseFloat(getComputedStyle(track).getPropertyValue('--spotlight-n')) || 4;
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 28;
      setStep((viewport.clientWidth + gap) / n);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [count, grid]);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count === 0) return;
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce) {
        setAnimate(false);
        setIndex((current) => (current + dir + count) % count);
        return;
      }

      if (dir === -1 && index === 0) {
        setAnimate(false);
        setIndex(count);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimate(true);
            setIndex(count - 1);
          });
        });
        return;
      }

      setAnimate(true);
      setIndex((current) => current + dir);
    },
    [count, index]
  );

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    // Card hover transitions bubble up here too — only the track's own counts.
    if (event.target !== event.currentTarget) return;
    if (index >= count) {
      setAnimate(false);
      setIndex(0);
    }
  };

  const renderCard = (person: Testimonial, i: number) => {
    const quote = cmsText(person.description);
    const embedUrl = grid ? null : toEmbedUrl(person.videoUrl);
    const play = (
      <>
        <span className="spotlight-play-icon flex size-[42px] shrink-0 items-center justify-center rounded-full">
          {/* 24x24 icon frame holding Figma's 12x13 triangle. */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <polygon points="6 5.5 18 12 6 18.5" />
          </svg>
        </span>
        <span className="flex-1 text-center text-d18 font-light leading-none">
          Play
        </span>
      </>
    );

    return (
      <figure
        key={`${person.id}-${i}`}
        aria-hidden={i >= count || undefined}
        className={cn(
          'spotlight-card relative flex h-[clamp(400px,27.08vw,520px)] flex-col justify-end overflow-hidden rounded-[14px]',
          quote && 'has-quote'
        )}
        style={{
          backgroundImage:
            'linear-gradient(-80.31deg, #56F72F 73.097%, #0C3CED 134.19%)',
        }}
      >
        <CmsImage
          media={person.image}
          fallback="portrait"
          alt={i < count ? person.name : ''}
          className="absolute inset-0 size-full object-cover object-top"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-black"
        />
        {/* Deeper shade faded in on hover so the longer quote stays legible. */}
        <div
          aria-hidden
          className="spotlight-shade pointer-events-none absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-b from-transparent via-black/60 to-black"
        />

        <figcaption className="relative z-10 flex flex-col items-center px-[clamp(16px,1.25vw,24px)] pb-[clamp(18px,1.56vw,30px)]">
          {embedUrl ? (
            <button
              type="button"
              onClick={() =>
                setActiveVideo({
                  src: embedUrl,
                  title: cmsText(person.name),
                })
              }
              aria-label={`Play video: ${cmsText(person.name)}`}
              tabIndex={i >= count ? -1 : undefined}
              /* Tailwind v4 preflight leaves buttons with the
                 default cursor, unlike the link this replaced. */
              className="spotlight-play flex h-12 w-[133px] cursor-pointer items-center rounded-full p-[3px]"
            >
              {play}
            </button>
          ) : null}

          {/*
            Name and quote each sit in a collapsible grid row: on hover the
            name collapses and the quote opens, so the Play pill rides up
            with however long the quote is (see `.spotlight-*` in globals.css).
          */}
          <div className="spotlight-identity w-full">
            <div className="min-h-0 overflow-hidden">
              <div className="pt-[clamp(10px,1.3vw,25px)] text-center">
                <h4 className="text-d24 font-medium leading-[1.3] text-white">
                  {cmsText(person.name)}
                </h4>
                {person.designation && (
                  <p className="mt-[clamp(2px,0.42vw,8px)] text-d16 leading-[1.3] text-white">
                    {cmsText(person.designation)}
                  </p>
                )}
              </div>
            </div>
          </div>
          {quote && (
            <div className="spotlight-quote w-full">
              <div className="min-h-0 overflow-hidden">
                <p className="pt-[clamp(10px,1.04vw,20px)] text-left text-d16 leading-[1.45] text-white">
                  {quote}
                </p>
              </div>
            </div>
          )}
        </figcaption>
      </figure>
    );
  };

  return (
    <section className="sp-section sp-testimonials relative w-full overflow-hidden bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact" angle="-54.53deg" className="text-d22">
            {cmsText(data.title)}
          </SectionEyebrow>
        )}

        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(8px,0.78vw,15px)] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        {count > 0 && grid && (
          <ul className="sp-testimonials-grid mt-[clamp(24px,3.33vw,64px)] hidden gap-[clamp(16px,1.46vw,28px)] sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {people.map((person, i) => (
              <li key={person.id}>{renderCard(person, i)}</li>
            ))}
          </ul>
        )}

        {/* In grid layout the carousel is the phone view only. */}
        {count > 0 && (
          <div
            ref={viewportRef}
            className={cn('mt-[clamp(24px,3.33vw,64px)] overflow-hidden', grid && 'sm:hidden')}
          >
            <div
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translate3d(${-index * step}px, 0, 0)`,
                transition: animate ? 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                willChange: 'transform',
              }}
            >
              <div className="spotlight-track">
                {slides.map((person, i) => renderCard(person, i))}
              </div>
            </div>
          </div>
        )}

        {count > 1 && (
          <CarouselControls
            pill="gradient"
            href={hrefPath(data.url)}
            showExploreAll={!grid}
            className={grid ? 'sm:hidden' : undefined}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </div>

      {activeVideo && (
        <VideoModal
          src={activeVideo.src}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}

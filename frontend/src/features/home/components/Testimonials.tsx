'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { HomeTestimonialsBlock } from '../types/home.types';

interface TestimonialsProps {
  data: HomeTestimonialsBlock;
}

export function Testimonials({ data }: TestimonialsProps) {
  const people = data.testimonials ?? [];
  const count = people.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

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
  }, [count]);

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

  const handleTransitionEnd = () => {
    if (index >= count) {
      setAnimate(false);
      setIndex(0);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact" angle="-54.53deg" className="text-d22">
            {cmsText(data.title)}
          </SectionEyebrow>
        )}

        {data.subTitle && (
          <h2 className="mt-[clamp(8px,0.78vw,15px)] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        {count > 0 && (
          <div ref={viewportRef} className="mt-[clamp(24px,3.33vw,64px)] overflow-hidden">
            <div
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translate3d(${-index * step}px, 0, 0)`,
                transition: animate ? 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                willChange: 'transform',
              }}
            >
              <div className="spotlight-track">
                {slides.map((person, i) => {
                  const quote = cmsText(person.description);
                  const play = (
                    <>
                      <span className="spotlight-play-icon flex size-[38px] shrink-0 items-center justify-center rounded-full">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <polygon points="6 3 21 12 6 21" />
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
                      className="spotlight-card relative flex h-[clamp(400px,27.08vw,520px)] flex-col justify-end overflow-hidden rounded-[14px]"
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

                      <figcaption className="relative z-10 flex flex-col items-center px-[clamp(16px,1.25vw,24px)] pb-[clamp(18px,1.56vw,30px)]">
                        {person.videoUrl ? (
                          <a
                            href={person.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={i >= count ? -1 : undefined}
                            className="spotlight-play flex h-11 w-[120px] items-center rounded-full p-[3px]"
                          >
                            {play}
                          </a>
                        ) : (
                          <span className="spotlight-play flex h-11 w-[120px] items-center rounded-full p-[3px]">
                            {play}
                          </span>
                        )}

                        <div className="relative mt-[clamp(10px,1.3vw,25px)] grid h-[5.5rem] w-full items-start">
                          <div className="spotlight-identity col-start-1 row-start-1 text-center">
                            <h4 className="text-d24 font-medium leading-[1.3] text-white">
                              {cmsText(person.name)}
                            </h4>
                            {person.designation && (
                              <p className="mt-[clamp(2px,0.42vw,8px)] text-d16 leading-[1.3] text-white">
                                {cmsText(person.designation)}
                              </p>
                            )}
                          </div>
                          {quote && (
                            <p className="spotlight-quote col-start-1 row-start-1 px-1 text-center text-d16 leading-[1.4] text-white">
                              {quote}
                            </p>
                          )}
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {count > 1 && (
          <CarouselControls
            pill="gradient"
            className="mt-[clamp(16px,1.56vw,30px)]"
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </div>
    </section>
  );
}

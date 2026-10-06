'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { CarouselControls } from '@/components/ui/CarouselControls';

/**
 * Static portraits from `.tmp/Group 1597883515*.png` until Strapi media
 * is wired. Swap `image` for the API URL later — names and roles stay.
 */
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marwa Abdelfattah',
    role: 'Founder, CoAuthor INC',
    image: '/spotlight/marwa.png',
    quote:
      'It was good experience. Very grateful. Professional and patient developers. Accessible and can reach out at any anytime.',
  },
  {
    id: 2,
    name: 'Fredrik Wittboldt',
    role: 'CEO, Dynamic Documents',
    image: '/spotlight/fredrik.png',
    quote:
      'Very well managed & good delivery. They deliver insights, ideas and suggestions so we can deliver a better project. Happy with the delivery.',
  },
  {
    id: 3,
    name: 'Kriti Anand',
    role: 'CoFounder, CAREERKUL',
    image: '/spotlight/kriti.png',
    quote:
      'SPEC helped us adapt to the changing needs and create a comprehensive portal that could do AI Psychometric Analysis and track incoming data. I thank SPEC INDIA and hope the support continues in the future too.',
  },
  {
    id: 4,
    name: 'Johan Scott',
    role: 'CTO, Redeal STHLM',
    image: '/spotlight/johan.png',
    quote:
      'SPEC provided competent and a dedicated team, we are very happy with team work, competence and quick support. Would highly recommend them.',
  },
];

export function Testimonials() {
  const count = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const slides = [...TESTIMONIALS, ...TESTIMONIALS];

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
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
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
        <SectionEyebrow
          gradient="impact"
          angle="-54.53deg"
          className="text-d22"
        >
          Client Spotlight
        </SectionEyebrow>

        <h2 className="mt-[clamp(8px,0.78vw,15px)] flex flex-wrap items-baseline gap-x-[13px] text-d40 font-medium leading-[1.2] text-white">
          <span>What Enterprise Leaders Say About</span>
          <span
            className="gradient-text-impact font-semibold"
            style={{ ['--grad-angle' as string]: '-57.76deg' }}
          >
            Partnering Us
          </span>
        </h2>

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
            {slides.map((person, i) => (
              <figure
                key={`${person.id}-${i}`}
                aria-hidden={i >= count || undefined}
                className="spotlight-card relative flex h-[clamp(400px,27.08vw,520px)] flex-col justify-end overflow-hidden rounded-[14px]"
                style={{
                  backgroundImage:
                    'linear-gradient(-80.31deg, #56F72F 73.097%, #0C3CED 134.19%)',
                }}
              >
                <Image
                  src={person.image}
                  alt={i < count ? person.name : ''}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-black"
                />

                <figcaption className="relative z-10 flex flex-col items-center px-[clamp(16px,1.25vw,24px)] pb-[clamp(18px,1.56vw,30px)]">
                  <button
                    type="button"
                    tabIndex={i >= count ? -1 : undefined}
                    className="spotlight-play flex h-11 w-[120px] items-center rounded-full p-[3px]"
                  >
                    <span className="spotlight-play-icon flex size-[38px] shrink-0 items-center justify-center rounded-full">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <polygon points="6 3 21 12 6 21" />
                      </svg>
                    </span>
                    <span className="flex-1 pr-1 text-d18 font-light">Play</span>
                  </button>

                  <div className="relative mt-[clamp(10px,1.3vw,25px)] grid w-full min-h-[5.5rem]">
                    <div className="spotlight-identity col-start-1 row-start-1 text-center">
                      <h4 className="text-d24 font-medium leading-[1.3] text-white">
                        {person.name}
                      </h4>
                      <p className="mt-[clamp(2px,0.42vw,8px)] text-d16 leading-[1.3] text-white">
                        {person.role}
                      </p>
                    </div>
                    <p className="spotlight-quote col-start-1 row-start-1 px-1 text-center text-d16 leading-[1.4] text-white">
                      {person.quote}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
            </div>
          </div>
        </div>

        <CarouselControls
          pill="gradient"
          className="mt-[clamp(16px,1.56vw,30px)]"
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      </div>
    </section>
  );
}

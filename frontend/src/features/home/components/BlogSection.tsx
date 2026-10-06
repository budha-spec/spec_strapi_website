'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { CarouselControls } from '@/components/ui/CarouselControls';

const BLOG_POSTS = [
  {
    id: 1,
    title:
      'Enterprise Data Management: A Strategic Foundation for Data-Driven Business Growth',
    category: 'App Development',
    image: '/blogs/blog01.png',
  },
  {
    id: 2,
    title: 'How Much Does It Cost to Develop an App in UK?',
    category: 'App Development',
    image: '/blogs/blog02.png',
  },
  {
    id: 3,
    title: 'How Much Does It Cost to Develop an App in UK?',
    category: 'App Development',
    image: '/blogs/blog03.png',
  },
  {
    id: 4,
    title: 'How Much Does It Cost to Develop an App in UK?',
    category: 'App Development',
    image: '/blogs/blog04.png',
  },
];

export function BlogSection() {
  const count = BLOG_POSTS.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const slides = [...BLOG_POSTS, ...BLOG_POSTS];

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const track = viewport.querySelector<HTMLElement>('.blog-track');
      if (!track) return;
      const n = Number.parseFloat(getComputedStyle(track).getPropertyValue('--blog-n')) || 4;
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 32;
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
    <section
      id="insights"
      className="w-full bg-bg-light pt-[clamp(40px,3.33vw,64px)] pb-[clamp(40px,3.65vw,70px)]"
    >
      <div className="shell">
        <SectionEyebrow>Latest Insights</SectionEyebrow>

        <h2 className="mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-text-heading">
          Expert Perspectives on Technology &{' '}
          <span className="gradient-text font-bold">Growth</span>
        </h2>

        <div ref={viewportRef} className="mt-[clamp(24px,3.33vw,64px)] overflow-hidden">
          <div
            style={{
              transform: `translate3d(${-index * step}px, 0, 0)`,
              transition: animate ? 'transform 480ms ease' : 'none',
              willChange: 'transform',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className="blog-track">
              {slides.map((post, i) => (
                <article
                  key={`${post.id}-${i}`}
                  className="blog-card group flex flex-col overflow-hidden rounded-[16px] bg-bg-white"
                >
                  <div className="h-[clamp(150px,10.57vw,203px)] w-full shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt=""
                      className="blog-card-image size-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-[clamp(12px,0.83vw,16px)]">
                    <span className="gradient-btn inline-flex h-[clamp(24px,1.67vw,32px)] w-fit items-center rounded-full px-[clamp(10px,0.78vw,15px)] text-d12 text-white">
                      {post.category}
                    </span>

                    <h4 className="mt-[clamp(10px,0.94vw,18px)] text-d18 font-medium leading-[1.4] text-text-primary">
                      {post.title}
                    </h4>

                    <ExploreMore className="mt-auto pt-[clamp(14px,1.09vw,21px)]" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <CarouselControls
          pill="gradient-light"
          className="mt-[clamp(16px,1.98vw,38px)]"
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      </div>
    </section>
  );
}

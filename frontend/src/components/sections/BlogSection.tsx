'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText, type CmsMedia } from '@/lib/media';

export interface BlogCardData {
  id: number;
  title: string;
  href: string;
  excerpt?: string | null;
  category?: string | null;
  image?: CmsMedia | null;
}

interface BlogSectionProps {
  title?: string | null;
  subTitle?: string | null;
  posts: BlogCardData[];
}

/**
 * "Latest Insights" carousel. Posts come from the WordPress feed
 * (`fetchLatestBlogs`, optionally filtered by category); the heading defaults
 * to the Figma copy so the section needs no CMS block.
 */
export function BlogSection({
  title = 'Latest Insights',
  subTitle = 'Expert Perspectives on Technology & Growth',
  posts,
}: BlogSectionProps) {
  const count = posts.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  // Cards visible at the current breakpoint — 1, 2, or 4. Drives whether the
  // prev/next controls are worth showing at all.
  const [perView, setPerView] = useState(4);
  const viewportRef = useRef<HTMLDivElement>(null);

  const slides = count > 0 ? [...posts, ...posts] : [];

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const track = viewport.querySelector<HTMLElement>('.blog-track');
      if (!track) return;
      const n = Number.parseFloat(getComputedStyle(track).getPropertyValue('--blog-n')) || 4;
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 32;
      setPerView(n);
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

  // Nothing to show when the WordPress feed is down or empty.
  if (count === 0) return null;

  return (
    <section
      id="insights"
      className="w-full bg-bg-light pt-[clamp(40px,3.33vw,64px)] pb-[clamp(40px,3.65vw,70px)]"
    >
      <div className="shell">
        {title && <SectionEyebrow>{cmsText(title)}</SectionEyebrow>}

        {subTitle && (
          <h2 className="mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading text={cmsText(subTitle)} accentClassName="gradient-text font-bold" />
          </h2>
        )}

        {count > 0 && (
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
                {slides.map((post, i) => {
                  const category = cmsText(post.category);

                  return (
                    <article
                      key={`${post.id}-${i}`}
                      className="blog-card group flex flex-col overflow-hidden rounded-[16px] bg-bg-white"
                    >
                      {/* Figma 404×203 — a ratio, not a height, so narrow cards never crop the text baked into post images. */}
                      <div className="aspect-[404/203] w-full shrink-0 overflow-hidden">
                        <CmsImage
                          media={post.image}
                          fallback="card"
                          alt=""
                          className="blog-card-image size-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-[clamp(12px,0.83vw,16px)]">
                        {category && (
                          <span className="gradient-btn inline-flex h-[clamp(24px,1.67vw,32px)] w-fit items-center rounded-full px-[clamp(10px,0.78vw,15px)] text-d12 text-white">
                            {category}
                          </span>
                        )}

                        <h4 className="mt-[clamp(10px,0.94vw,18px)] text-d18 font-medium leading-[1.4] text-text-primary">
                          {cmsText(post.title)}
                        </h4>

                        {post.excerpt && (
                          <p className="mt-2 line-clamp-3 text-d14 leading-[1.4] text-text-secondary">
                            {cmsText(post.excerpt)}
                          </p>
                        )}

                        <ExploreMore
                          href={post.href}
                          className="mt-auto pt-[clamp(14px,1.09vw,21px)]"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/*
          Explore All is always offered. The arrows only earn their place once
          there are more posts than fit on screen — at 4 or fewer on desktop
          there is nothing to scroll to.
        */}
        <CarouselControls
          pill="gradient-light"
          showArrows={count > perView}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      </div>
    </section>
  );
}

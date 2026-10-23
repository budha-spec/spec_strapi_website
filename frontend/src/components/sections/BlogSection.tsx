'use client';

import { useEffect, useRef, useState } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { loopSlides, useLoopCarousel } from '@/hooks/useLoopCarousel';
import { cmsText, type CmsMedia } from '@/lib/media';
import { cn } from '@/lib/utils';

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
 * (`fetchLatestBlogs`, optionally filtered by category); the eyebrow and
 * heading come only from the page's CMS blog block.
 */
export function BlogSection({ title, subTitle, posts }: BlogSectionProps) {
  const count = posts.length;
  // Cards visible at the current breakpoint — 1, 2, or 4. With no more posts
  // than that there is nothing to slide: no arrows, no swipe.
  const [perView, setPerView] = useState(4);
  const sliding = count > perView;
  const { index, animate, go, onTransitionEnd, swipe } = useLoopCarousel(sliding ? count : 0);
  const trackRef = useRef<HTMLDivElement>(null);

  const slides = loopSlides(posts, 4);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setPerView(Number.parseFloat(getComputedStyle(track).getPropertyValue('--blog-n')) || 4);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [count]);

  // Nothing to show when the WordPress feed is down or empty.
  if (count === 0) return null;

  return (
    <section
      id="insights"
      className="sp-section sp-blog w-full bg-bg-light pt-[clamp(40px,3.33vw,64px)] pb-[clamp(40px,3.65vw,70px)]"
    >
      <div className="shell">
        {title && <SectionEyebrow>{cmsText(title)}</SectionEyebrow>}

        {subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading text={cmsText(subTitle)} accentClassName="gradient-text font-bold" />
          </h2>
        )}

        {count > 0 && (
          <div {...swipe} className="mt-[clamp(24px,3.33vw,64px)] overflow-hidden touch-pan-y touch-pinch-zoom">
            <div
              ref={trackRef}
              onTransitionEnd={onTransitionEnd}
              className={cn(
                'blog-track will-change-transform',
                animate &&
                  'transition-transform duration-[480ms] ease-in-out motion-reduce:transition-none'
              )}
              style={{
                // Everything fits: the track stays put whatever the index.
                transform: `translate3d(calc(${sliding ? -index : 0} * (var(--blog-card) + var(--blog-gap)) + var(--drag, 0px)), 0, 0)`,
              }}
            >
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
        )}

        {/*
          Explore All is always offered. The arrows only earn their place once
          there are more posts than fit on screen — at 4 or fewer on desktop
          there is nothing to scroll to.
        */}
        <CarouselControls
          pill="gradient-light"
          showArrows={sliding}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      </div>
    </section>
  );
}

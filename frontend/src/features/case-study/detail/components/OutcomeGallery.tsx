'use client';

import { useState } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { GalleryBlock } from '@/types/sections.types';

/** Gap between slides; the track offset below uses the same value. */
const GAP = 'clamp(10px,0.83vw,16px)';

/**
 * "Proven Impact / Outcomes & Business Impact" — product screenshots in a
 * white panel. The current image takes two thirds of the panel and the next
 * one peeks in, blurred and greyed; the progress bar and arrows step through
 * them (the peek is also clickable). On phones the current image is wider so
 * the peek stays a hint.
 */
export function OutcomeGallery({ data }: { data: GalleryBlock }) {
  const images = (data.images ?? []).filter((image) => image.url);
  const [index, setIndex] = useState(0);
  const count = images.length;
  if (count === 0) return null;

  const go = (dir: -1 | 1) => setIndex((current) => (current + dir + count) % count);

  return (
    <section className="sp-section sp-case-study-gallery w-full bg-bg-light pt-[clamp(40px,3.65vw,70px)] pb-[clamp(20px,2.08vw,40px)]">
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

        <div className="mt-[clamp(24px,2.6vw,50px)] rounded-[16px] bg-bg-white p-[clamp(12px,1.04vw,20px)] pb-[clamp(16px,1.56vw,30px)]">
          <div className="overflow-hidden rounded-[10px]">
            <ul
              // `--slide`: the current image's share of the panel (Figma 1070 of ~1620).
              className="outcome-gallery-track flex [--slide:86%] transition-transform md:[--slide:66%] duration-500 ease-out motion-reduce:transition-none"
              style={{
                gap: GAP,
                // Each step moves one slide (its % of the track) plus one gap.
                transform: `translateX(calc(${index} * -1 * (var(--slide) + ${GAP})))`,
              }}
            >
              {images.map((image, slide) => {
                const active = slide === index;
                const next = slide === (index + 1) % count && count > 1;
                return (
                  <li
                    key={image.url}
                    aria-hidden={!active}
                    onClick={next ? () => go(1) : undefined}
                    className={cn(
                      'outcome-gallery-slide aspect-[1070/672] shrink-0 basis-(--slide) overflow-hidden rounded-[10px] bg-bg-light transition-[filter,opacity] duration-500 motion-reduce:transition-none',
                      !active && 'opacity-60 blur-[6px] grayscale',
                      next && 'cursor-pointer'
                    )}
                  >
                    <CmsImage
                      media={image}
                      fallback="cover"
                      alt={active ? cmsText(image.alternativeText) : ''}
                      width={image.width ?? undefined}
                      height={image.height ?? undefined}
                      className="size-full object-cover"
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          {count > 1 && (
            <CarouselControls
              pill="dark"
              showExploreAll={false}
              progress={{ index, count }}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

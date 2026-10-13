'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

/** Long thin arrow used inside the 68×40 Figma pills. */
const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg
    width="22"
    height="16"
    viewBox="0 0 22 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={flip ? 'rotate-180' : undefined}
    aria-hidden
  >
    <path d="M1 8h20" />
    <path d="M14.5 2.5 20.5 8 14.5 13.5" />
  </svg>
);

interface CarouselControlsProps {
  href?: string;
  /** `dark` near-black pill, `gradient` on dark bars, `gradient-light` on white sections. */
  pill?: 'dark' | 'gradient' | 'gradient-light';
  className?: string;
  onPrev?: () => void;
  onNext?: () => void;
  /** Hide the arrows when everything already fits — Explore All stays. */
  showArrows?: boolean;
  /** Hide the Explore All pill when the carousel is already the full list. */
  showExploreAll?: boolean;
  /**
   * Optional progress bar left of Explore All (Figma case-study listing:
   * 821×5 grey track, gradient thumb one slide wide). Hidden on phones.
   */
  progress?: { index: number; count: number };
}

/**
 * "Explore All" pill plus previous / next arrow buttons, right aligned.
 *
 * Shared style hooks (same on every carousel):
 *   .carousel-controls  wrapper
 *   .explore-all        the pill — plus one of .explore-all-gradient,
 *                       .explore-all-on-light, .explore-all-dark
 *   .carousel-arrows    the prev/next pair
 *   .carousel-arrow     each arrow — plus .carousel-arrow-prev / -next
 *   .carousel-progress  optional progress track (+ .carousel-progress-thumb)
 */
export function CarouselControls({
  href = '#',
  pill = 'dark',
  className,
  onPrev,
  onNext,
  showArrows = true,
  showExploreAll = true,
  progress,
}: CarouselControlsProps) {
  const slides = Math.max(progress?.count ?? 0, 1);

  return (
    <div
      className={cn(
        // Figma (all carousels): 30px below the cards, and the group's right
        // edge sits 144px inside the 1700 shell (x 1666 of 1810) on desktop.
        'carousel-controls mt-[clamp(16px,1.56vw,30px)] flex items-center justify-end gap-[clamp(16px,1.56vw,30px)] lg:pr-[clamp(0px,7.5vw,144px)]',
        className
      )}
    >
      {progress && progress.count > 1 && (
        <div
          role="progressbar"
          aria-label="Carousel position"
          aria-valuemin={1}
          aria-valuemax={slides}
          aria-valuenow={progress.index + 1}
          className="carousel-progress relative hidden h-[5px] w-[clamp(140px,42.76vw,821px)] shrink overflow-hidden rounded-full bg-stroke-main sm:block"
        >
          <span
            className="carousel-progress-thumb gradient-btn absolute inset-y-0 rounded-full transition-[left] duration-500 ease-out motion-reduce:transition-none"
            style={{
              ['--grad-angle' as string]: '-7.82deg',
              width: `${100 / slides}%`,
              left: `${(progress.index * 100) / slides}%`,
            }}
          />
        </div>
      )}

      {showExploreAll && (
        <Link
          href={href}
          className={cn(
            'explore-all inline-flex h-[clamp(34px,2.19vw,42px)] min-w-[clamp(110px,7.29vw,140px)] items-center justify-center rounded-full px-[clamp(18px,1.56vw,30px)] text-d16',
            pill === 'gradient-light'
              ? 'explore-all-on-light'
              : pill === 'gradient'
                ? 'explore-all-gradient'
                : 'explore-all-dark'
          )}
          style={
            pill === 'gradient-light'
              ? { ['--grad-angle' as string]: '-66.1deg' }
              : undefined
          }
        >
          Explore All
        </Link>
      )}

      {showArrows && (
        <div className="carousel-arrows flex items-center gap-[13px]">
          <button
            type="button"
            aria-label="Previous"
            onClick={onPrev}
            className="carousel-arrow carousel-arrow-prev flex h-[clamp(34px,2.13vw,40.8px)] w-[clamp(52px,3.54vw,68px)] items-center justify-center rounded-full"
          >
            {/* Wrapper carries the hover slide so flip rotate on the SVG is never overridden. */}
            <span className="carousel-arrow-icon inline-flex">
              <Arrow flip />
            </span>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={onNext}
            className="carousel-arrow carousel-arrow-next flex h-[clamp(34px,2.13vw,40.8px)] w-[clamp(52px,3.54vw,68px)] items-center justify-center rounded-full"
          >
            <span className="carousel-arrow-icon inline-flex">
              <Arrow />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

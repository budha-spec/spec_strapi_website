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
}

/** "Explore All" pill plus previous / next arrow buttons, right aligned. */
export function CarouselControls({
  href = '#',
  pill = 'dark',
  className,
  onPrev,
  onNext,
  showArrows = true,
}: CarouselControlsProps) {
  return (
    <div className={cn('flex items-center justify-end gap-[clamp(16px,1.56vw,30px)]', className)}>
      <Link
        href={href}
        className={cn(
          'inline-flex h-[clamp(34px,2.19vw,42px)] min-w-[clamp(110px,7.29vw,140px)] items-center justify-center rounded-full px-[clamp(18px,1.56vw,30px)] text-d16',
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

      {showArrows && (
        <div className="flex items-center gap-[13px]">
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

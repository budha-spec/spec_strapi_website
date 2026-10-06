'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={flip ? 'rotate-180' : undefined}
    aria-hidden
  >
    <path d="M5 12h13" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface CarouselControlsProps {
  href?: string;
  /** `dark` near-black pill, `gradient` on dark bars, `gradient-light` on white sections. */
  pill?: 'dark' | 'gradient' | 'gradient-light';
  className?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

/** "Explore All" pill plus previous / next arrow buttons, right aligned. */
export function CarouselControls({
  href = '#',
  pill = 'dark',
  className,
  onPrev,
  onNext,
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
          pill !== 'dark'
            ? { ['--grad-angle' as string]: '-66.1deg' }
            : undefined
        }
      >
        Explore All
      </Link>

      <div className="flex items-center gap-[13px]">
        <button
          type="button"
          aria-label="Previous"
          onClick={onPrev}
          className="carousel-arrow flex h-[clamp(34px,2.13vw,40.8px)] w-[clamp(52px,3.54vw,68px)] items-center justify-center rounded-full"
        >
          <Arrow flip />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={onNext}
          className="carousel-arrow flex h-[clamp(34px,2.13vw,40.8px)] w-[clamp(52px,3.54vw,68px)] items-center justify-center rounded-full"
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}

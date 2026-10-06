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
  /** `dark` is the near-black pill, `gradient` the brand-gradient pill. */
  pill?: 'dark' | 'gradient';
  /** Arrow buttons are white on dark sections, outlined on light ones. */
  arrows?: 'light' | 'outline';
  className?: string;
}

/** "Explore All" pill plus previous / next arrow buttons, right aligned. */
export function CarouselControls({
  href = '#',
  pill = 'dark',
  arrows = 'outline',
  className,
}: CarouselControlsProps) {
  const arrowStyles =
    arrows === 'light'
      ? 'bg-white text-black hover:bg-white/85'
      : 'bg-white text-text-primary border border-stroke-outline hover:bg-bg-light';

  return (
    <div className={cn('flex items-center justify-end gap-3', className)}>
      <Link
        href={href}
        className={cn(
          'inline-flex h-[clamp(34px,2.19vw,42px)] items-center justify-center rounded-full px-[clamp(18px,1.56vw,30px)] text-d16 text-white transition-[filter,background-color]',
          pill === 'gradient'
            ? 'gradient-btn hover:brightness-110'
            : 'bg-bg-dark hover:bg-[#1d1d1d]'
        )}
      >
        Explore All
      </Link>

      <button
        type="button"
        aria-label="Previous"
        className={cn(
          'flex h-[clamp(34px,2.19vw,42px)] w-[clamp(46px,3.02vw,58px)] items-center justify-center rounded-full transition-colors',
          arrowStyles
        )}
      >
        <Arrow flip />
      </button>
      <button
        type="button"
        aria-label="Next"
        className={cn(
          'flex h-[clamp(34px,2.19vw,42px)] w-[clamp(46px,3.02vw,58px)] items-center justify-center rounded-full transition-colors',
          arrowStyles
        )}
      >
        <Arrow />
      </button>
    </div>
  );
}

import Link from 'next/link';
import { cn } from '@/lib/utils';

const ArrowRight = ({ size = 11 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h13" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface ExploreMoreProps {
  href?: string;
  label?: string;
  className?: string;
  /** `filled` draws the solid dark circle used on the case-study card. */
  variant?: 'outline' | 'filled';
  /**
   * `lg` matches the larger Figma circle on service + case-study cards.
   * Blog cards keep the default `md` outline size.
   */
  size?: 'md' | 'lg';
}

/**
 * "Explore More" caption followed by a circled arrow.
 *
 * Shared style hooks (same on every card):
 *   .explore-more        the link — plus .explore-more--outline / --filled
 *                        and .explore-more--md / --lg
 *   .explore-more-label  the caption
 *   .explore-more-arrow  the circle (+ .explore-more-arrow--filled)
 */
export function ExploreMore({
  href = '#',
  label = 'Explore More',
  className,
  variant = 'outline',
  size = 'md',
}: ExploreMoreProps) {
  const large = size === 'lg';
  const filled = variant === 'filled';
  const arrowSize = filled ? (large ? 16 : 13) : large ? 18 : 11;

  return (
    <Link
      href={href}
      className={cn(
        'explore-more inline-flex items-center',
        filled ? 'explore-more--filled' : 'explore-more--outline',
        large ? 'explore-more--lg' : 'explore-more--md',
        large ? 'gap-3' : 'gap-2',
        className
      )}
    >
      <span
        className={cn(
          'explore-more-label text-d16',
          filled ? 'font-semibold' : 'font-light'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'explore-more-arrow flex items-center justify-center rounded-full',
          filled
            ? cn(
                'explore-more-arrow--filled',
                large
                  ? 'size-[clamp(34px,2.6vw,50px)]'
                  : 'size-[clamp(26px,1.82vw,35px)]'
              )
            : large
              ? 'size-[clamp(28px,2.8125vw,36px)]'
              : 'size-[clamp(20px,1.35vw,26px)]'
        )}
      >
        <ArrowRight size={arrowSize} />
      </span>
    </Link>
  );
}

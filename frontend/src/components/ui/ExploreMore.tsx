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
}

/** "Explore More" caption followed by a circled arrow. */
export function ExploreMore({
  href = '#',
  label = 'Explore More',
  className,
  variant = 'outline',
}: ExploreMoreProps) {
  return (
    <Link
      href={href}
      className={cn('explore-more inline-flex items-center gap-2', className)}
    >
      <span
        className={cn(
          'explore-more-label text-d16',
          variant === 'filled' ? 'font-medium' : 'font-light'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'explore-more-arrow flex items-center justify-center rounded-full',
          variant === 'filled'
            ? 'explore-more-arrow--filled size-[clamp(26px,1.82vw,35px)]'
            : 'size-[clamp(20px,1.35vw,26px)]'
        )}
      >
        <ArrowRight size={variant === 'filled' ? 13 : 11} />
      </span>
    </Link>
  );
}

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
      className={cn('group inline-flex items-center gap-2', className)}
    >
      <span
        className={cn(
          'text-d16 text-text-primary',
          variant === 'filled' ? 'font-medium' : 'font-light'
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'flex items-center justify-center rounded-full transition-colors',
          variant === 'filled'
            ? 'size-[clamp(26px,1.82vw,35px)] bg-bg-dark text-white group-hover:bg-brand-cta-blue'
            : 'size-[clamp(20px,1.35vw,26px)] border border-stroke-main text-text-primary group-hover:border-text-primary'
        )}
      >
        <ArrowRight size={variant === 'filled' ? 13 : 11} />
      </span>
    </Link>
  );
}

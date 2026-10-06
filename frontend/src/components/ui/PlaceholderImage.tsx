import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  /** Caption rendered in the middle of the frame. */
  label?: string;
  /** `dark` sits on black sections, `light` on white cards. */
  tone?: 'light' | 'dark';
  className?: string;
  /** Hides the caption when the frame is too small to fit it. */
  showLabel?: boolean;
}

/**
 * Stand-in for artwork that still has to come from Strapi. Draws itself with
 * CSS only so it never fires a request for a missing asset.
 */
export function PlaceholderImage({
  label = 'Image',
  tone = 'light',
  className,
  showLabel = true,
}: PlaceholderImageProps) {
  const isDark = tone === 'dark';

  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={cn(
        'relative isolate flex items-center justify-center overflow-hidden',
        isDark ? 'bg-[#141414]' : 'bg-[#E4E4E4]',
        className
      )}
    >
      {/* Diagonal hatching so the frame reads as a placeholder, not a blank box */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${
            isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
          } 0 10px, transparent 10px 20px)`,
        }}
      />
      {showLabel && (
        <span
          className={cn(
            'relative z-10 flex items-center gap-2 text-d12 font-medium tracking-wide uppercase',
            isDark ? 'text-white/45' : 'text-black/35'
          )}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="1.6" />
            <path d="m21 15-4.5-4.5L5 21" />
          </svg>
          {label}
        </span>
      )}
    </div>
  );
}

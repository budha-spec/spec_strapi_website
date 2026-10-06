import { cn } from '@/lib/utils';

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  /**
   * `impact` uses the brighter blue→cyan→green ramp the Proven Impact
   * section needs against its near-black background.
   */
  gradient?: 'standard' | 'impact';
  /** Overrides `--grad-angle` on the label text. */
  angle?: string;
}

/**
 * The small gradient label that sits above every section heading,
 * e.g. "• Core Capabilities".
 */
export function SectionEyebrow({
  children,
  className,
  gradient = 'standard',
  angle,
}: SectionEyebrowProps) {
  return (
    <span className={cn('section-tag', className)}>
      <span
        className={
          gradient === 'impact' ? 'gradient-text-impact' : 'gradient-text'
        }
        style={
          gradient === 'impact'
            ? { ['--grad-angle' as string]: angle ?? '-56.69deg' }
            : angle
              ? { ['--grad-angle' as string]: angle }
              : undefined
        }
      >
        {children}
      </span>
    </span>
  );
}

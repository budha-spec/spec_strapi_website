import { cn } from '@/lib/utils';

/**
 * The small gradient label that sits above every section heading,
 * e.g. "• Core Capabilities".
 */
export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('section-tag', className)}>
      <span className="gradient-text">{children}</span>
    </span>
  );
}

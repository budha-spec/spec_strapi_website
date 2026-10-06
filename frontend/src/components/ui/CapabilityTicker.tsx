'use client';

import { useEffect, useState } from 'react';

interface CapabilityTickerProps {
  items: string[];
  /** How long each capability stays on screen. */
  intervalMs?: number;
  className?: string;
}

const SLIDE_MS = 500;

/**
 * Vertical ticker that cycles the hero's capability labels — the design clips a
 * single line and slides the next one up from below.
 *
 * The track is positioned purely from `index`, and the wrap back to the first
 * item is done by dropping the transition for that one step (both values are
 * updated together so they can never disagree). Nothing here depends on a
 * transition or animation actually running, so if the browser throttles it —
 * background tab, reduced motion — the labels still sit in the right place and
 * stay readable.
 */
export function CapabilityTicker({
  items,
  intervalMs = 2600,
  className,
}: CapabilityTickerProps) {
  const [{ index, animate }, setState] = useState({ index: 0, animate: true });

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setState(({ index: prev }) => {
        const next = (prev + 1) % items.length;
        // Wrapping to the first item snaps instead of rewinding through the list.
        return { index: next, animate: next !== 0 };
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs, items.length]);

  if (items.length === 0) return null;

  return (
    <div
      className={className}
      // --tick is the height of one line, matching the clipped window.
      style={{ ['--tick' as string]: 'clamp(18px, 1.25vw, 24px)' }}
    >
      <div className="h-[var(--tick)] overflow-hidden">
        <div
          style={{
            transform: `translateY(calc(${-index} * var(--tick)))`,
            transition: animate
              ? `transform ${SLIDE_MS}ms cubic-bezier(0.4,0,0.2,1)`
              : undefined,
          }}
        >
          {items.map((item) => (
            <p
              key={item}
              className="flex h-[var(--tick)] items-center text-d16 font-medium whitespace-nowrap text-white capitalize"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      {/* Announce the visible label without re-announcing mid-slide */}
      <span className="sr-only" aria-live="polite">
        {items[index]}
      </span>
    </div>
  );
}

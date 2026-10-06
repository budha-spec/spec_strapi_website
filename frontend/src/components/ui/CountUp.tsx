'use client';

import type { CSSProperties } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Splits "60%" into "", 60, "%" so only the number animates. */
function parseValue(value: string) {
  const match = value.trim().match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
  return { prefix, target: Number(digits), suffix, decimals };
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface CountUpProps {
  /** Display value such as "4X", "60%" or "1.5M". */
  value: string;
  durationMs?: number;
  /** Extra wait after the stat enters view, used to stagger a row. */
  delayMs?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Counts the numeric part of a stat up from zero the first time it scrolls
 * into view.
 *
 * The full value is also rendered transparently to hold the box at its final
 * width. Without that the element would grow as digits are added, which both
 * shifts the layout and rescales the gradient painted across the text. That
 * copy stays in the accessibility tree so screen readers get the real figure
 * rather than whatever frame the animation is on.
 */
export function CountUp({
  value,
  durationMs = 1800,
  delayMs = 0,
  className,
  style,
}: CountUpProps) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  // Honour reduced-motion before the first paint so the final figure is
  // already showing — everyone else starts at zero and counts up.
  useIsomorphicLayoutEffect(() => {
    if (!parsed) return;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setDisplay(parsed.target);
  }, [parsed?.target]);

  useEffect(() => {
    const node = ref.current;
    if (!parsed || !node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let delayTimer = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / durationMs);
        setDisplay(parsed.target * easeOutCubic(progress));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else setDisplay(parsed.target);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        delayTimer = window.setTimeout(run, delayMs);
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(frame);
    };
  }, [parsed?.target, parsed?.suffix, durationMs, delayMs]);

  // Values without a number (or malformed) render as-is.
  if (!parsed) {
    return (
      <span className={className} style={style}>
        {value}
      </span>
    );
  }

  const shown = `${parsed.prefix}${display.toFixed(parsed.decimals)}${parsed.suffix}`;
  const full = `${parsed.prefix}${parsed.target.toFixed(parsed.decimals)}${parsed.suffix}`;

  /*
   * `className`/`style` are applied to the animating span as well as the
   * wrapper: a gradient drawn with `background-clip: text` only clips to the
   * text of the element carrying it, and it does not reach into an
   * absolutely-positioned child. Styling that child directly keeps the
   * gradient painted on the digits that are actually visible.
   */
  return (
    <span
      ref={ref}
      style={style}
      className={`relative inline-block tabular-nums ${className ?? ''}`}
    >
      {/* Reserves the final width so nothing reflows as digits are added */}
      <span aria-hidden className="invisible">
        {full}
      </span>
      <span
        aria-hidden
        style={style}
        className={`absolute inset-0 ${className ?? ''}`}
      >
        {shown}
      </span>
      <span className="sr-only">{full}</span>
    </span>
  );
}

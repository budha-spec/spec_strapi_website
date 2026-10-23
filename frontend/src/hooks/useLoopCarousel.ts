'use client';

import { useState, type TransitionEvent } from 'react';

/**
 * Endless prev / next for a translated track. Render `loopSlides(items)` (the
 * list twice) and move the track by `index` slides: Next on the last slide
 * carries on to the first one's clone, then `onTransitionEnd` snaps back to
 * the original without animating; Previous on the first jumps to that clone
 * first and slides back onto the last. So the track never rewinds across
 * every slide. Under reduced motion it simply steps with no clones in view.
 *
 * Apply the track's transition only while `animate` is true, and attach
 * `onTransitionEnd` to the element that carries the transform.
 */
export function useLoopCarousel(count: number) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const go = (dir: -1 | 1) => {
    if (count < 2) return;
    // No transition fires under reduced motion, so step within the originals.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimate(false);
      setIndex((i) => (i + dir + count) % count);
      return;
    }
    if (dir === -1 && index === 0) {
      // Jump to the first slide's clone, then slide back onto the last.
      setAnimate(false);
      setIndex(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(count - 1);
        })
      );
      return;
    }
    setAnimate(true);
    // Capped at the last clone, in case clicks outrun the snap back.
    setIndex((i) => Math.max(0, Math.min(i + dir, 2 * count - 1)));
  };

  const onTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    // Slide hover / blur transitions bubble up here too — only the track's own counts.
    if (event.target !== event.currentTarget || index < count) return;
    setAnimate(false);
    setIndex(index - count);
  };

  /** Back to the first slide without animating (e.g. after a filter change). */
  const reset = () => {
    setAnimate(false);
    setIndex(0);
  };

  return {
    /** Track position, in slides; may point at a clone (`>= count`). */
    index,
    animate,
    go,
    onTransitionEnd,
    reset,
  };
}

/** The slides to render: the list twice when there is something to loop. */
export function loopSlides<T>(items: T[]): T[] {
  return items.length > 1 ? [...items, ...items] : items;
}

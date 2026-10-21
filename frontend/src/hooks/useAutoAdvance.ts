'use client';

import { useEffect, useState } from 'react';

/**
 * Index of an auto-rotating carousel. Stops while `paused` (hover / focus)
 * and never starts for visitors who prefer reduced motion.
 */
export function useAutoAdvance(count: number, paused = false, delay = 4000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), delay);
    return () => window.clearInterval(timer);
  }, [count, paused, delay]);

  return [count > 0 ? index % count : 0, setIndex] as const;
}

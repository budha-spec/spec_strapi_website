'use client';

import {
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type TransitionEvent,
} from 'react';
import { flushSync } from 'react-dom';

/** Finger travel before a touch counts as a horizontal drag, not a tap. */
const DRAG_SLOP = 8;
/** Drag distance that moves on to the next / previous slide when let go. */
const SWIPE_DISTANCE = 40;

/**
 * Endless prev / next for a translated track. Render `loopSlides(items)` (the
 * list twice or more) and move the track by `index` slides: Next on the last
 * slide carries on to the first one's clone, then `onTransitionEnd` snaps back
 * to the original without animating; Previous on the first jumps to that clone
 * first and slides back onto the last. So the track never rewinds across
 * every slide. Under reduced motion it simply steps with no clones in view.
 *
 * Rapid clicks each move one slide straight away, from wherever the track is,
 * so the carousel keeps up with however fast the arrows are pressed.
 *
 * Touch: spread `swipe` on the element that directly wraps the track (it
 * stays put, so a finger anywhere in view — even on a gap or an inert peek —
 * starts a drag), give that wrapper `touch-pan-y` (vertical page scroll stays
 * native) and add `var(--drag, 0px)` to the track's translate. The slide
 * follows the finger and a swipe past `SWIPE_DISTANCE` steps one slide. A
 * track laid out without a transform (e.g. a grid at `lg`) ignores swipes.
 *
 * Apply the track's transition only while `animate` is true, and attach
 * `onTransitionEnd` to the element that carries the transform.
 */
export function useLoopCarousel(count: number) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  // The latest index, so two clicks inside one frame both count.
  const indexRef = useRef(0);
  const drag = useRef<{ id: number; x: number; y: number; dx: number; active: boolean } | null>(
    null
  );
  // A drag can end in a click on the slide under the finger — swallow it.
  const dragged = useRef(false);

  const move = (next: number, withAnimation: boolean) => {
    indexRef.current = next;
    setAnimate(withAnimation);
    setIndex(next);
  };

  /** Moves to `from` with the transition off, committed before the next step animates. */
  const jump = (from: number) => {
    flushSync(() => move(from, false));
    // Force a layout so the browser takes the jump as the start point.
    void document.body.offsetWidth;
  };

  /** One slide on; `release` lets go of a drag once the start point is set. */
  const step = (dir: -1 | 1, release?: () => void) => {
    if (count < 2) {
      release?.();
      return;
    }
    const current = indexRef.current;
    // No transition fires under reduced motion, so step within the originals.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      release?.();
      move((current % count + dir + count) % count, false);
      return;
    }
    // Where to start from: a clone the last slide ended on (clicks can outrun
    // `onTransitionEnd`) snaps back to its original, and Previous on the
    // first slide starts from that slide's clone.
    let from = current >= count ? current - count : current;
    if (dir === -1 && from === 0) from = count;
    if (from !== current) jump(from);
    release?.();
    move(from + dir, true);
  };

  const go = (dir: -1 | 1) => step(dir);

  const onTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    // Slide hover / blur transitions bubble up here too — only the track's own counts.
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    const current = indexRef.current;
    if (current < count) return;
    move(current - count, false);
  };

  /** Back to the first slide without animating (e.g. after a filter change). */
  const reset = () => move(0, false);

  const endDrag = (event: PointerEvent<HTMLElement>, cancelled: boolean) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    drag.current = null;
    if (!state.active) return;
    dragged.current = true;

    const track = trackOf(event);
    const release = () => {
      if (!track) return;
      track.style.removeProperty('transition');
      track.style.removeProperty('--drag');
    };
    if (!cancelled && Math.abs(state.dx) > SWIPE_DISTANCE) {
      step(state.dx < 0 ? 1 : -1, release);
    } else {
      // Not far enough: glide back to the slide it started on.
      release();
      setAnimate(true);
    }
  };

  const swipe = {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      dragged.current = false;
      if (event.pointerType === 'mouse' || !event.isPrimary || count < 2) return;
      // Laid out without a transform (a grid at this breakpoint): nothing to swipe.
      const track = trackOf(event);
      if (!track || getComputedStyle(track).transform === 'none') return;
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, active: false };
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const state = drag.current;
      if (!state || state.id !== event.pointerId) return;
      const dx = event.clientX - state.x;
      const dy = event.clientY - state.y;
      const track = trackOf(event);
      if (!track) return;

      if (!state.active) {
        // A vertical move is the page scrolling; leave it alone.
        if (Math.abs(dy) > DRAG_SLOP && Math.abs(dy) >= Math.abs(dx)) {
          drag.current = null;
          return;
        }
        if (Math.abs(dx) <= DRAG_SLOP) return;
        state.active = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        track.style.transition = 'none';
        // Start from a slide with neighbours rendered on both sides, so the
        // drag never pulls an empty edge into view.
        const current = indexRef.current;
        let from = current >= count ? current - count : current;
        if (from === 0) from = count;
        if (from !== current) jump(from);
      }
      state.dx = dx;
      track.style.setProperty('--drag', `${dx}px`);
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => endDrag(event, false),
    onPointerCancel: (event: PointerEvent<HTMLElement>) => endDrag(event, true),
    onClickCapture: (event: MouseEvent<HTMLElement>) => {
      if (!dragged.current) return;
      dragged.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
  };

  return {
    /** Track position, in slides; may point at a clone (`>= count`). */
    index,
    animate,
    go,
    onTransitionEnd,
    reset,
    /** Pointer handlers for touch swipes — spread on the track's wrapper. */
    swipe,
  };
}

/** The transformed track inside the wrapper the swipe handlers sit on. */
function trackOf(event: { currentTarget: HTMLElement }) {
  return event.currentTarget.firstElementChild as HTMLElement | null;
}

/**
 * The slides to render: the list repeated when there is something to loop.
 * `inView` is how many slides can show at once (count a peeking one), so the
 * track always has slides past both edges — including while it is dragged.
 */
export function loopSlides<T>(items: T[], inView = 1): T[] {
  const n = items.length;
  if (n < 2) return items;
  const copies = 1 + Math.max(1, Math.ceil((inView + 1) / n));
  return Array.from({ length: copies }, () => items).flat();
}

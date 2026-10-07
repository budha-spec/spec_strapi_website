'use client';

import { useEffect, useRef } from 'react';

interface DotSphereProps {
  className?: string;
  /** Number of points distributed over the sphere. */
  count?: number;
}

/** Screen-space radius, as a fraction of the canvas, that the cursor pushes. */
const PUSH_RADIUS = 0.3;
/** How far a dot at the very centre of the cursor travels, as a fraction. */
const PUSH_STRENGTH = 0.085;

/**
 * The hero's rotating sphere of white dots. Points are spread evenly with a
 * Fibonacci lattice and projected orthographically, so the silhouette brightens
 * naturally at the limb the way the design does. Moving the pointer over the
 * hero scatters the dots out of the way and they ease back once it leaves.
 */
export default function DotSphere({ className, count = 2800 }: DotSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Deterministic PRNG so the cloud is identical on every mount.
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    /*
     * Points start from a Fibonacci lattice for even coverage, then get
     * jittered in angle and radius. Without the jitter the lattice reads as
     * visible spiral rows rather than the organic cloud in the design.
     */
    const golden = Math.PI * (3 - Math.sqrt(5));
    const px = new Float32Array(count);
    const py = new Float32Array(count);
    const pz = new Float32Array(count);
    const gain = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2 + (rand() - 0.5) * 0.035;
      const clampedY = Math.max(-1, Math.min(1, y));
      const radius = Math.sqrt(Math.max(0, 1 - clampedY * clampedY));
      const theta = golden * i + (rand() - 0.5) * 0.55;
      // Scatter a few dots just off the shell so the limb looks soft.
      const shell = 1 + (rand() - 0.5) * 0.07;
      px[i] = Math.cos(theta) * radius * shell;
      py[i] = clampedY * shell;
      pz[i] = Math.sin(theta) * radius * shell;
      // Per-dot brightness variation adds sparkle like the reference.
      gain[i] = 0.62 + rand() * 0.72;
    }

    // Live screen-space offset each dot carries while the cursor pushes it.
    const offX = new Float32Array(count);
    const offY = new Float32Array(count);

    const TILT = -0.42; // lifts the top of the sphere toward the viewer
    const sinTilt = Math.sin(TILT);
    const cosTilt = Math.cos(TILT);

    let dpr = 1;
    let size = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };
    resize();

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    /*
     * The canvas sits under `pointer-events: none` so it never steals clicks
     * from the hero's prompt card — the cursor is tracked on the window and
     * converted into canvas-local coordinates instead.
     */
    let pointerX = 0;
    let pointerY = 0;
    let pointerActive = false;

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      // Keep a margin so dots start reacting just before the cursor arrives.
      const margin = rect.width * PUSH_RADIUS;
      pointerActive =
        pointerX > -margin &&
        pointerY > -margin &&
        pointerX < rect.width + margin &&
        pointerY < rect.height + margin;
    };
    const onPointerLeave = () => {
      pointerActive = false;
    };

    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerdown', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave);
      window.addEventListener('blur', onPointerLeave);
    }

    let phi = 0;
    let frame = 0;

    const draw = () => {
      const half = size / 2;
      const r = half * 0.94;
      const pushRadius = size * PUSH_RADIUS;
      const pushDistance = size * PUSH_STRENGTH;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = '#FFFFFF';

      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      for (let i = 0; i < count; i += 1) {
        // Spin around the Y axis…
        const x = px[i] * cosPhi - pz[i] * sinPhi;
        const zSpun = px[i] * sinPhi + pz[i] * cosPhi;
        // …then tilt around the X axis.
        const y = py[i] * cosTilt - zSpun * sinTilt;
        const z = py[i] * sinTilt + zSpun * cosTilt;

        const screenX = half + x * r;
        const screenY = half + y * r;

        // Ease toward the displacement the cursor currently calls for, so the
        // dots both scatter and settle back smoothly.
        let wantX = 0;
        let wantY = 0;
        if (pointerActive) {
          const dx = screenX - pointerX;
          const dy = screenY - pointerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < pushRadius && dist > 0.001) {
            // Squared falloff keeps the centre of the push tight and the edge soft.
            const falloff = 1 - dist / pushRadius;
            const amount = (falloff * falloff * pushDistance) / dist;
            wantX = dx * amount;
            wantY = dy * amount;
          }
        }
        offX[i] += (wantX - offX[i]) * 0.14;
        offY[i] += (wantY - offY[i]) * 0.14;

        // Depth drives size and opacity to suggest volume, and the upper cap
        // stays brighter so the sphere reads as lit from above.
        const depth = (z + 1) / 2;
        const topness = (1 - y) / 2;
        const alpha = Math.min(
          1,
          (0.16 + depth * 0.84) * (0.42 + topness * 0.78) * gain[i]
        );
        const dotSize = 0.9 + depth * 1.25;

        ctx.globalAlpha = alpha;
        // fillRect beats arc() by a wide margin at this dot count, and at
        // ~1–2px the square is indistinguishable from a circle.
        ctx.fillRect(
          screenX + offX[i] - dotSize / 2,
          screenY + offY[i] - dotSize / 2,
          dotSize,
          dotSize
        );
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      phi += 0.0016;
      draw();
      frame = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      draw();
    } else {
      frame = requestAnimationFrame(tick);
    }

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

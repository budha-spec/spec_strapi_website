'use client';

import { useEffect, useRef } from 'react';

interface DotSphereProps {
  className?: string;
  /** Number of points distributed over the sphere. */
  count?: number;
}

/**
 * The hero's rotating sphere of white dots. Points are spread evenly with a
 * Fibonacci lattice and projected orthographically, so the silhouette brightens
 * naturally at the limb the way the design does.
 */
export default function DotSphere({ className, count = 2800 }: DotSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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
    const points = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2 + (rand() - 0.5) * 0.035;
      const clampedY = Math.max(-1, Math.min(1, y));
      const radius = Math.sqrt(Math.max(0, 1 - clampedY * clampedY));
      const theta = golden * i + (rand() - 0.5) * 0.55;
      // Scatter a few dots just off the shell so the limb looks soft.
      const shell = 1 + (rand() - 0.5) * 0.06;
      return {
        x: Math.cos(theta) * radius * shell,
        y: clampedY * shell,
        z: Math.sin(theta) * radius * shell,
        // Per-dot brightness variation adds sparkle like the reference.
        gain: 0.55 + rand() * 0.75,
      };
    });

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

    let phi = 0;
    let frame = 0;

    const draw = () => {
      const half = size / 2;
      const r = half * 0.92;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      for (const p of points) {
        // Spin around the Y axis…
        const x = p.x * cosPhi - p.z * sinPhi;
        const zSpun = p.x * sinPhi + p.z * cosPhi;
        // …then tilt around the X axis.
        const y = p.y * cosTilt - zSpun * sinTilt;
        const z = p.y * sinTilt + zSpun * cosTilt;

        // Depth drives both size and opacity to suggest volume.
        const depth = (z + 1) / 2;
        const alpha = Math.min(1, (0.1 + depth * 0.72) * p.gain);
        const dotRadius = (0.3 + depth * 0.9) * Math.max(dpr, 1) * 0.78;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(half + x * r, half + y * r, dotRadius, 0, Math.PI * 2);
        ctx.fill();
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

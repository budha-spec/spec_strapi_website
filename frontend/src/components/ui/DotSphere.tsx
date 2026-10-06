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

    // Even point distribution over the unit sphere (Fibonacci lattice).
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
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
        const alpha = 0.12 + depth * 0.78;
        const dotRadius = (0.35 + depth * 0.95) * Math.max(dpr, 1) * 0.75;

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

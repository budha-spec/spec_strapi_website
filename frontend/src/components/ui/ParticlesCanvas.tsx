'use client';

import { useEffect, useMemo, useState } from 'react';
import { Particles } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';

interface ParticlesCanvasProps {
  id?: string;
  className?: string;
  /** Dot count. The hero uses a denser field than the inner sections. */
  density?: number;
  opacity?: number;
}

/**
 * The faint drifting dot field layered over the dark sections. Relies on
 * `ParticlesProviderRoot` having loaded the engine.
 */
export default function ParticlesCanvas({
  id = 'tsparticles',
  className,
  density = 90,
  opacity = 0.35,
}: ParticlesCanvasProps) {
  // Canvas output differs between server and client, so only render once mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'bubble' },
        },
        modes: {
          bubble: { distance: 160, size: 2.5, duration: 2, opacity: 0.9 },
        },
      },
      particles: {
        color: { value: '#FFFFFF' },
        links: { enable: false },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'out' },
          random: true,
          speed: 0.18,
          straight: false,
        },
        number: { density: { enable: true }, value: density },
        opacity: {
          value: { min: opacity * 0.25, max: opacity },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        shape: { type: 'circle' },
        size: { value: { min: 0.4, max: 1.2 } },
      },
    }),
    [density, opacity]
  );

  if (!mounted) return <div className={className} aria-hidden />;

  return <Particles id={id} className={className} options={options} />;
}

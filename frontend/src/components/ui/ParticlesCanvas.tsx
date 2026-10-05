'use client';

import { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

interface ParticlesCanvasProps {
  id?: string;
  className?: string;
  variant?: 'globe' | 'dots';
}

export default function ParticlesCanvas({
  id = 'tsparticles',
  className,
  variant = 'globe',
}: ParticlesCanvasProps) {
  const init = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const options = useMemo(() => {
    if (variant === 'globe') {
      return {
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: '#ffffff' },
          links: { enable: false },
          move: {
            direction: 'none' as const,
            enable: true,
            outModes: { default: 'bounce' as const },
            random: true,
            speed: 0.5,
            straight: false,
          },
          number: { density: { enable: true }, value: 200 },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: { enable: true, speed: 1, sync: false },
          },
          shape: { type: 'circle' },
          size: { value: { min: 0.5, max: 1.5 } },
        },
        detectRetina: true,
      };
    }

    // Default 'dots' variant for other sections
    return {
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'bubble' },
        },
        modes: {
          bubble: { distance: 200, size: 2, duration: 2, opacity: 0.8 },
        },
      },
      particles: {
        color: { value: '#ffffff' },
        links: { enable: false },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: { default: 'out' as const },
          random: true,
          speed: 0.2,
          straight: false,
        },
        number: { density: { enable: true }, value: 60 },
        opacity: { value: 0.15 },
        shape: { type: 'circle' },
        size: { value: 1 },
      },
      detectRetina: true,
    };
  }, [variant]);

  return (
    <ParticlesProvider init={init}>
      <Particles id={id} className={className} options={options} />
    </ParticlesProvider>
  );
}

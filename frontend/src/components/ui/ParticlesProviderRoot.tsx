'use client';

import type { ReactNode } from 'react';
import { ParticlesProvider } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

/**
 * Must be defined at module scope: tsParticles rejects an `init` callback whose
 * identity changes between renders. Every provider shares it, so the engine
 * still loads only once.
 */
const initEngine = async (engine: Engine) => {
  await loadSlim(engine);
};

/**
 * Loads the tsParticles engine for the particles inside it.
 *
 * Wrap only the particle canvas, never the page: `ParticlesProvider` renders
 * `null` until the engine has loaded in the browser, so anything inside it is
 * missing from the server HTML (empty page for SEO, LCP waits for JS).
 */
export function ParticlesProviderRoot({ children }: { children: ReactNode }) {
  return <ParticlesProvider init={initEngine}>{children}</ParticlesProvider>;
}

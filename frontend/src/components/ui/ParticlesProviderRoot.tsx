'use client';

import type { ReactNode } from 'react';
import { ParticlesProvider } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

/**
 * Must be defined at module scope: tsParticles rejects an `init` callback whose
 * identity changes between renders.
 */
const initEngine = async (engine: Engine) => {
  await loadSlim(engine);
};

/** Loads the tsParticles engine once for the whole app. */
export function ParticlesProviderRoot({ children }: { children: ReactNode }) {
  return <ParticlesProvider init={initEngine}>{children}</ParticlesProvider>;
}

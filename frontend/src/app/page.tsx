import { Suspense } from 'react';

/**
 * Home page — Server Component.
 * Sections will be added here as they are built (Phase 3 & 4).
 * Each section is wrapped in <Suspense> for independent loading states.
 */
export default function HomePage() {
  return (
    <main>
      {/* Phase 3: HeroSection */}
      {/* Phase 4: ClientsStrip, ServicesSection, StatsSection, etc. */}
      <Suspense fallback={null}>
        <p className="text-center py-20 text-text-secondary">
          Foundation ready — sections coming in Phase 3 & 4.
        </p>
      </Suspense>
    </main>
  );
}

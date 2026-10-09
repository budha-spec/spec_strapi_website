/**
 * Barrel export — import service feature exports from here.
 *
 *   api/, types/, components/ServiceBlocks   shared by all three service pages
 *   landing/      /services                  (CapabilityTabs)
 *   detail/       /services/:slug  e.g. AI/ML            (CapabilityGrid, ServiceIntro)
 *   sub-service/  /services/:slug  e.g. AI Development  (OfferingGrid, UseCaseGrid)
 */
export type * from './types/service.types';
export * from './api/service.api';
export * from './components/ServiceBlocks';
export * from './landing/components/CapabilityTabs';
export * from './detail/components/CapabilityGrid';
export * from './detail/components/ServiceIntro';
export * from './sub-service/components/OfferingGrid';
export * from './sub-service/components/UseCaseGrid';

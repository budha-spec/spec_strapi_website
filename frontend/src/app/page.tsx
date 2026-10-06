import { Suspense } from 'react';
import {
  HeroSection,
  HeroSkeleton,
  ClientsStrip,
  ServicesSection,
  StatsSection,
  CaseStudies,
  Testimonials,
  BlogSection,
} from '@/features/home';

export default function HomePage() {
  return (
    <main className="flex w-full flex-col bg-bg-white">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>
      <ClientsStrip />
      <ServicesSection />
      <StatsSection />
      <CaseStudies />
      <Testimonials />
      <BlogSection />
    </main>
  );
}

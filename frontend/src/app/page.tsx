import { Suspense } from 'react';
import { HeroSection, HeroSkeleton, ClientsStrip, ServicesSection, StatsSection, CaseStudies, Testimonials, BlogSection } from '@/features/home';

export default function HomePage() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-bg-white">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection data={undefined} />
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

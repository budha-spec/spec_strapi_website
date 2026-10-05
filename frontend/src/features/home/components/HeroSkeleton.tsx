import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function HeroSkeleton() {
  return (
    <SectionWrapper
      className="min-h-screen flex items-center justify-center bg-bg-black pt-32 pb-20"
      containerClassName="flex flex-col items-center justify-center text-center w-full"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center animate-pulse">
        {/* Tag Pill Skeleton */}
        <div className="h-8 w-48 bg-stroke-dark rounded-full mb-8" />

        {/* Headline Skeleton */}
        <div className="h-16 md:h-24 lg:h-32 w-full max-w-3xl bg-stroke-dark rounded-2xl mb-6" />

        {/* Subheadline Skeleton */}
        <div className="h-6 w-3/4 max-w-2xl bg-stroke-dark rounded-full mb-12" />

        {/* Search Bar Skeleton */}
        <div className="w-full max-w-3xl h-32 bg-stroke-dark rounded-2xl" />
      </div>
    </SectionWrapper>
  );
}

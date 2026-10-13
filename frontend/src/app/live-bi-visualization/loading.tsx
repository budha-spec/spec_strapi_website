import { PageHeroSkeleton } from '@/components/sections';
import { VisualizationGridSkeleton } from '@/features/live-bi';

export default function Loading() {
  return (
    <main className="flex w-full flex-col bg-bg-white">
      <PageHeroSkeleton />
      <VisualizationGridSkeleton />
    </main>
  );
}

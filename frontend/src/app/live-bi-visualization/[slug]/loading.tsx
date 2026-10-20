import { PageHeroSkeleton } from '@/components/sections';
import { VisualizationDetailSkeleton } from '@/features/live-bi';

export default function Loading() {
  return (
    <main className="flex w-full flex-col bg-bg-light">
      <PageHeroSkeleton />
      <VisualizationDetailSkeleton />
    </main>
  );
}

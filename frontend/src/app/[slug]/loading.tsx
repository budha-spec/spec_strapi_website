import { ServiceHeroSkeleton } from '@/features/service';

export default function ServiceLoading() {
  return (
    <main className="flex w-full flex-col bg-bg-white">
      <ServiceHeroSkeleton />
    </main>
  );
}

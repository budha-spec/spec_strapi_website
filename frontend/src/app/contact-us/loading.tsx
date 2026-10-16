import { ContactHeroSkeleton } from '@/features/contact-us';

export default function Loading() {
  return (
    <main className="flex w-full flex-col bg-bg-light">
      <ContactHeroSkeleton />
    </main>
  );
}

import { fetchHomePage, HomeBlocks } from '@/features/home';

export default async function HomePage() {
  const { data } = await fetchHomePage();
  const page = data[0];

  return (
    <main className="flex w-full flex-col bg-bg-white">
      <HomeBlocks blocks={page?.content ?? []} />
    </main>
  );
}

import { fetchHomePage, fetchLatestBlogs, HomeBlocks } from '@/features/home';

export default async function HomePage() {
  const [{ data }, blogs] = await Promise.all([
    fetchHomePage(),
    fetchLatestBlogs(),
  ]);
  const page = data[0];

  return (
    <main className="flex w-full flex-col bg-bg-white">
      <HomeBlocks blocks={page?.content ?? []} blogs={blogs} />
    </main>
  );
}

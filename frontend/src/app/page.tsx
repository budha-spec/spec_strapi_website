import { BlogSection } from '@/components/sections';
import { fetchHomePage, HomeBlocks } from '@/features/home';
import { fetchLatestBlogs } from '@/lib/api/blogs.api';

export default async function HomePage() {
  const [{ data }, blogs] = await Promise.all([
    fetchHomePage(),
    fetchLatestBlogs(),
  ]);
  const page = data[0];

  return (
    <main className="flex w-full flex-col bg-bg-white">
      <HomeBlocks blocks={page?.content ?? []} />
      <BlogSection posts={blogs} />
    </main>
  );
}

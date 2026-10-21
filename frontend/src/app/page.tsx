import { BlogSection } from '@/components/sections';
import { fetchHomePage, HomeBlocks } from '@/features/home';
import { fetchLatestBlogs } from '@/lib/api/blogs.api';
import type { BlogsBlock } from '@/types/sections.types';

export default async function HomePage() {
  const [{ data }, blogs] = await Promise.all([
    fetchHomePage(),
    fetchLatestBlogs(),
  ]);
  const page = data[0];
  const blogHeading = page?.content?.find(
    (block): block is BlogsBlock => block.__component === 'shared.blogs'
  );

  return (
    <main className="sp-page sp-page-home flex w-full flex-col bg-bg-white">
      <HomeBlocks blocks={page?.content ?? []} />
      <BlogSection
        title={blogHeading?.title}
        subTitle={blogHeading?.subTitle}
        posts={blogs}
      />
    </main>
  );
}

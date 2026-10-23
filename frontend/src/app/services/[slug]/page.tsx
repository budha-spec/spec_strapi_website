import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogSection, PageHero } from '@/components/sections';
import {
  fetchServiceByUrl,
  findContactBlock,
  ServiceBlocks,
  serviceTemplate,
} from '@/features/service';
import { fetchLatestBlogs } from '@/lib/api/blogs.api';
import { cmsText } from '@/lib/media';
import type { BlogsBlock } from '@/types/sections.types';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Serves both service detail pages (AI/ML) and sub-service pages
 * (AI Development) — see `serviceTemplate`.
 *
 * Strapi stores each service's public path in `url`, so `/services/x` is
 * looked up as `services/x`. Cached so metadata and page share one request.
 */
const getService = cache((slug: string) =>
  fetchServiceByUrl(`services/${slug}`)
);

const CRUMBS = [
  { label: 'What we do', href: '/services' },
  { label: 'Service', href: '/services' },
];

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return {
    title: cmsText(service.seo?.metaTitle) || cmsText(service.title),
    description:
      cmsText(service.seo?.metaDescription) ||
      cmsText(service.description) ||
      undefined,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const blocks = service.content ?? [];
  const contact = findContactBlock(blocks);
  // AI/ML is a detail page; AI Development (its child) is a sub-service.
  const template = serviceTemplate(service);
  // The `shared.blogs` block gives the Insights heading; the posts come from
  // the service's WordPress category. Strapi's `blog_category.slug` is that
  // category; the URL slug is only a fallback (it rarely matches one, and
  // then the section simply hides). Sub-services always end with Insights.
  const blogBlock = blocks.find(
    (block): block is BlogsBlock => block.__component === 'shared.blogs'
  );
  const showBlogs = template === 'sub-service' || Boolean(blogBlock);
  const posts = showBlogs
    ? await fetchLatestBlogs(service.blog_category?.slug || slug)
    : [];

  return (
    <main className={`sp-page sp-page-service-${template} flex w-full flex-col bg-bg-white`}>
      <PageHero
        title={service.title}
        description={service.description}
        crumbs={CRUMBS}
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />
      <ServiceBlocks blocks={blocks} template={template} />
      {showBlogs && (
        <BlogSection
          title={blogBlock?.title}
          subTitle={blogBlock?.subTitle}
          posts={posts}
        />
      )}
    </main>
  );
}

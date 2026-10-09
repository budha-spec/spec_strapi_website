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
  // Sub-services end with Insights from their own WordPress category. Strapi's
  // `blog_category.slug` is that category; the URL slug is only a fallback
  // (it rarely matches one, and then the section simply hides).
  const posts =
    template === 'sub-service'
      ? await fetchLatestBlogs(service.blog_category?.slug || slug)
      : [];

  return (
    <main className="flex w-full flex-col bg-bg-white">
      <PageHero
        title={service.title}
        description={service.description}
        crumbs={CRUMBS}
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />
      <ServiceBlocks blocks={blocks} template={template} />
      {template === 'sub-service' && <BlogSection posts={posts} />}
    </main>
  );
}

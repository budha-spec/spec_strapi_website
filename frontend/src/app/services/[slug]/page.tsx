import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections';
import {
  fetchServiceByUrl,
  findContactBlock,
  ServiceBlocks,
} from '@/features/service';
import { cmsText } from '@/lib/media';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
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

  return (
    <main className="flex w-full flex-col bg-bg-white">
      <PageHero
        title={service.title}
        description={service.description}
        crumbs={CRUMBS}
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />
      <ServiceBlocks blocks={blocks} capabilities="grid" />
    </main>
  );
}

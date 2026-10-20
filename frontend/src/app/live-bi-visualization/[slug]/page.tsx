import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections';
import {
  VisualizationBlocks,
  fetchVisualizationBySlug,
  findLiveBiContact,
} from '@/features/live-bi';
import { cmsText } from '@/lib/media';

interface VisualizationDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * `/live-bi-visualization/:slug` — the path every Live BI card already links
 * to (Strapi `url`, e.g. `live-bi-visualization/ceo-dashboard`). Cached so
 * metadata and page share one request.
 */
const getVisualization = cache((slug: string) => fetchVisualizationBySlug(slug));

const CRUMBS = [
  { label: 'What we do', href: '/services' },
  { label: 'Live BI Visualization', href: '/live-bi-visualization' },
];

export async function generateMetadata({
  params,
}: VisualizationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getVisualization(slug);
  if (!item) notFound();

  return {
    title: cmsText(item.title),
    description: cmsText(item.description) || undefined,
  };
}

export default async function VisualizationDetailPage({
  params,
}: VisualizationDetailPageProps) {
  const { slug } = await params;
  const item = await getVisualization(slug);
  if (!item) notFound();

  const blocks = item.content ?? [];
  const contact = findLiveBiContact(blocks);

  return (
    <main className="sp-page sp-page-live-bi-detail flex w-full flex-col bg-bg-light">
      <PageHero
        title={item.title}
        description={item.description}
        crumbs={CRUMBS}
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />
      <VisualizationBlocks blocks={blocks} title={item.title} />
    </main>
  );
}

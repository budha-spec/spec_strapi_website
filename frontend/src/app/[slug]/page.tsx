import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  fetchServiceBySlug,
  ServiceBlocks,
  ServiceHero,
} from '@/features/service';
import { cmsText } from '@/lib/media';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Shared by metadata and the page so Strapi is hit once per request. */
const getService = cache(fetchServiceBySlug);

const CRUMBS = [{ label: 'What we do', href: '/#services' }];

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return {
    title: cmsText(service.title),
    description: cmsText(service.description) || undefined,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <main className="flex w-full flex-col bg-bg-white">
      <ServiceHero
        title={service.title}
        description={service.description}
        crumbs={CRUMBS}
      />
      <ServiceBlocks blocks={service.content ?? []} />
    </main>
  );
}

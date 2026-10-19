import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections';
import {
  fetchIndustryBySlug,
  IndustryBlocks,
  INDUSTRIES_LANDING_SLUG,
} from '@/features/industries';
import { cmsText } from '@/lib/media';

interface IndustryDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * `/industries/:slug` — the route `industryHref()` links to and the live site
 * already serves. Cached so metadata and page share one request. The entry
 * with slug `industries` holds the landing page's copy, so it is not a page.
 */
const getIndustry = cache((slug: string) =>
  slug === INDUSTRIES_LANDING_SLUG ? Promise.resolve(null) : fetchIndustryBySlug(slug)
);

const CRUMBS = [
  { label: 'What we do', href: '/services' },
  { label: 'Industries', href: '/industries' },
];

export async function generateMetadata({
  params,
}: IndustryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();

  return {
    title: cmsText(industry.title),
    description: cmsText(industry.description) || undefined,
  };
}

export default async function IndustryDetailPage({
  params,
}: IndustryDetailPageProps) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();

  return (
    <main className="sp-page sp-page-industry-detail flex w-full flex-col bg-bg-light">
      <PageHero
        title={industry.title}
        description={industry.description}
        crumbs={CRUMBS}
        // The Industry content zone has no `shared.contact-us` block yet.
        ctaLabel={`Contact Our ${cmsText(industry.title)} Expert`}
      />
      <IndustryBlocks blocks={industry.content ?? []} />
    </main>
  );
}

import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections';
import {
  CaseStudyBlocks,
  CaseStudyFacts,
  fetchCaseStudyBySlug,
} from '@/features/case-study';
import { cmsText } from '@/lib/media';

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * `/case-study/:slug` — the path every case-study card already links to
 * (Strapi `url`, e.g. `case-study/ai-based-chatbot-application-for-hospital`).
 * Cached so metadata and page share one request.
 */
const getCaseStudy = cache((slug: string) => fetchCaseStudyBySlug(slug));

const CRUMBS = [
  { label: 'What we do', href: '/services' },
  { label: 'Case Studies', href: '/case-study' },
];

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return {
    title: cmsText(study.title),
    description: cmsText(study.description) || undefined,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  // No `shared.contact-us` block on case studies: name the industry instead,
  // as the design does ("Contact Our HealthTech Expert").
  const industry = cmsText(study.industries?.[0]?.title);

  return (
    <main className="sp-page sp-page-case-study-detail flex w-full flex-col bg-bg-light">
      <PageHero
        title={study.title}
        description={study.description}
        crumbs={CRUMBS}
        ctaLabel={industry ? `Contact Our ${industry} Expert` : 'Contact Our Expert'}
      />
      <CaseStudyFacts study={study} />
      <CaseStudyBlocks blocks={study.content ?? []} />
    </main>
  );
}

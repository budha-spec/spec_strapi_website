import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections';
import {
  fetchServiceBySlug,
  findContactBlock,
  ServiceBlocks,
} from '@/features/service';
import { cmsText } from '@/lib/media';

/** The landing page is the Services entry whose slug is `services`. */
const LANDING_SLUG = 'services';

const CRUMBS = [{ label: 'What we do', href: '/services' }];

export async function generateMetadata(): Promise<Metadata> {
  const service = await fetchServiceBySlug(LANDING_SLUG);
  if (!service) notFound();

  return {
    title: cmsText(service.title),
    description: cmsText(service.description) || undefined,
  };
}

export default async function ServicesLandingPage() {
  const service = await fetchServiceBySlug(LANDING_SLUG);
  if (!service) notFound();

  const blocks = service.content ?? [];
  const contact = findContactBlock(blocks);

  return (
    <main className="flex w-full flex-col bg-bg-white">
      <PageHero
        title={service.title}
        description={service.description}
        crumbs={CRUMBS}
        currentCrumb="Service"
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />
      <ServiceBlocks blocks={blocks} capabilities="tabs" />
    </main>
  );
}

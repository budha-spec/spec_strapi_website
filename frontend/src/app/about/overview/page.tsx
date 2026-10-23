import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections';
import { AboutBlocks, fetchAboutPage } from '@/features/about';
import { cmsText } from '@/lib/media';
import type { ContactBlock } from '@/types/sections.types';

const CRUMBS = [{ label: 'Home', href: '/' }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchAboutPage();
  return {
    title: cmsText(page?.title) || 'About Us',
    description: cmsText(page?.description) || undefined,
  };
}

export default async function AboutPage() {
  const page = await fetchAboutPage();
  if (!page) notFound();

  const blocks = page.content ?? [];
  const contact = blocks.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );

  return (
    <main className="sp-page sp-page-about flex w-full flex-col bg-bg-light">
      <PageHero
        title={page.title}
        description={page.description}
        crumbs={CRUMBS}
        currentCrumb="About Us"
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />
      <AboutBlocks blocks={blocks} />
    </main>
  );
}

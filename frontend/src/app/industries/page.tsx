import type { Metadata } from 'next';
import { IndustryGallery, PageHero } from '@/components/sections';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import {
  IndustryExplorer,
  fetchIndustries,
  fetchIndustriesPage,
} from '@/features/industries';
import { cmsText } from '@/lib/media';
import type { ContactBlock, IndustryGalleryBlock } from '@/types/sections.types';

/*
 * Copy from Figma (331:7265). Hero text comes from the Strapi page entry
 * (slug `industries`) if published, else the Industry entry with that slug,
 * else this. The explorer heading has no Strapi field yet.
 */
const HERO = {
  title: 'Industry-Focused Technology Solutions Built for Growth & Innovation',
  description:
    'Build and integrate AI-powered applications that automate workflows, improve decision-making and bring intelligence into existing business systems.',
  cta: 'Discuss Your AI Requirements',
};
const EXPLORER_HEADING = {
  eyebrow: 'Capabilities',
  title: 'Engineering Scalable Solutions Growth',
};
const CRUMBS = [{ label: 'What we do', href: '/services' }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchIndustriesPage();
  return {
    title: cmsText(page?.title) || 'Industries',
    description: cmsText(page?.description) || HERO.description,
  };
}

export default async function IndustriesLandingPage() {
  const [page, { landing, industries }] = await Promise.all([
    fetchIndustriesPage(),
    fetchIndustries(),
  ]);

  const blocks = page?.content ?? [];
  const contact = blocks.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );
  const gallery = blocks.find(
    (block): block is IndustryGalleryBlock =>
      block.__component === 'shared.industry-gallery'
  );

  return (
    <main className="sp-page sp-page-industries flex w-full flex-col bg-bg-white">
      <PageHero
        title={page?.title || landing?.title || HERO.title}
        description={page?.description || landing?.description || HERO.description}
        crumbs={CRUMBS}
        currentCrumb="Industry"
        ctaLabel={contact?.txt || HERO.cta}
        ctaHref={contact?.url}
      />

      {industries.length > 0 && (
        <>
          <section className="sp-section sp-industries-intro w-full bg-bg-light pt-[clamp(40px,3.13vw,60px)] pb-[clamp(40px,4.17vw,80px)]">
            <div className="shell">
              <SectionEyebrow>{EXPLORER_HEADING.eyebrow}</SectionEyebrow>
              <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
                <AccentHeading
                  text={EXPLORER_HEADING.title}
                  accentClassName="gradient-text font-semibold"
                />
              </h2>
            </div>
          </section>

          <section className="sp-section sp-industries-explorer w-full bg-bg-darker py-[clamp(40px,5.21vw,100px)]">
            <div className="shell">
              <IndustryExplorer industries={industries} />
            </div>
          </section>
        </>
      )}

      {gallery && <IndustryGallery data={gallery} />}
    </main>
  );
}

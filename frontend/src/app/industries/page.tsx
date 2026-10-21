import type { Metadata } from 'next';
import { IndustryGallery, PageHero } from '@/components/sections';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import {
  IndustryExplorer,
  fetchIndustries,
  fetchIndustriesPage,
  type IndustrySectionBlock,
} from '@/features/industries';
import { cmsText } from '@/lib/media';
import type { ContactBlock, IndustryGalleryBlock } from '@/types/sections.types';

/*
 * Hero text comes from the Strapi page entry (slug `industries`) if
 * published, else the Industry entry with that slug. The explorer heading is
 * the page's `shared.industry-section` block.
 */
const CRUMBS = [{ label: 'What we do', href: '/services' }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchIndustriesPage();
  return {
    title: cmsText(page?.title) || 'Industries',
    description: cmsText(page?.description) || undefined,
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
  const explorer = blocks.find(
    (block): block is IndustrySectionBlock =>
      block.__component === 'shared.industry-section'
  );
  const gallery = blocks.find(
    (block): block is IndustryGalleryBlock =>
      block.__component === 'shared.industry-gallery'
  );

  return (
    <main className="sp-page sp-page-industries flex w-full flex-col bg-bg-white">
      {(page?.title || landing?.title) && (
        <PageHero
          title={page?.title || landing?.title || ''}
          description={page?.description || landing?.description}
          crumbs={CRUMBS}
          currentCrumb="Industry"
          ctaLabel={contact?.txt}
          ctaHref={contact?.url}
        />
      )}

      {industries.length > 0 && (
        <>
          <section className="sp-section sp-industries-intro w-full bg-bg-light pt-[clamp(40px,3.13vw,60px)] pb-[clamp(40px,4.17vw,80px)]">
            <div className="shell">
              {explorer?.title && <SectionEyebrow>{cmsText(explorer.title)}</SectionEyebrow>}
              {explorer?.subTitle && (
                <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
                  <AccentHeading
                    text={cmsText(explorer.subTitle)}
                    accentClassName="gradient-text font-semibold"
                  />
                </h2>
              )}
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

import type { Metadata } from 'next';
import { PageHero, Testimonials } from '@/components/sections';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import {
  CaseStudyExplorer,
  fetchCaseStudies,
  fetchCaseStudyListingPage,
  type CaseStudyFilterOption,
  type CaseStudySectionBlock,
  type CaseStudyTerm,
} from '@/features/case-study';
import { cmsText } from '@/lib/media';
import type { ContactBlock, TestimonialsBlock } from '@/types/sections.types';

/*
 * Everything but the cards comes from the Strapi page entry (slug
 * `case-study`): hero copy + CTA (`shared.contact-us`), the heading and filter
 * chips (`shared.case-study-section`) and the testimonials
 * (`shared.testimonial-section`). The cards come from `/case-studies`.
 */
const CRUMBS = [{ label: 'What we do', href: '/services' }];

/** The explorer adds its own "All" chip, so drop the CMS one. */
const ALL = 'all';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCaseStudyListingPage();
  return {
    title: cmsText(page?.title) || 'Case Studies',
    description: cmsText(page?.description) || undefined,
  };
}

/** CMS filter terms as chips, skipping incomplete ones and the CMS "All". */
function filterOptions(terms: CaseStudyTerm[] | null | undefined): CaseStudyFilterOption[] {
  return (terms ?? [])
    .filter((term) => term.slug && term.title && term.slug !== ALL)
    .map((term) => ({ slug: term.slug as string, title: cmsText(term.title) }));
}

export default async function CaseStudyListingPage() {
  const [page, studies] = await Promise.all([
    fetchCaseStudyListingPage(),
    fetchCaseStudies(),
  ]);
  const content = page?.content ?? [];
  const contact = content.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );
  const section = content.find(
    (block): block is CaseStudySectionBlock =>
      block.__component === 'shared.case-study-section'
  );
  const spotlight = content.find(
    (block): block is TestimonialsBlock =>
      block.__component === 'shared.testimonial-section'
  );

  return (
    <main className="sp-page sp-page-case-study flex w-full flex-col bg-bg-white">
      {page?.title && (
        <PageHero
          title={page.title}
          description={page.description}
          crumbs={CRUMBS}
          currentCrumb="Industry"
          ctaLabel={contact?.txt}
          ctaHref={contact?.url}
        />
      )}

      <section className="sp-section sp-case-study-listing w-full bg-bg-light pt-[clamp(40px,3.13vw,60px)] pb-[clamp(48px,6.25vw,120px)]">
        {(section?.title || section?.subTitle) && (
          <div className="shell">
            {section.title && (
              <SectionEyebrow>{cmsText(section.title)}</SectionEyebrow>
            )}
            {section.subTitle && (
              <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
                <AccentHeading
                  text={cmsText(section.subTitle)}
                  accentClassName="gradient-text font-semibold"
                />
              </h2>
            )}
          </div>
        )}

        <CaseStudyExplorer
          studies={studies}
          services={filterOptions(section?.services)}
          industries={filterOptions(section?.industries)}
        />
      </section>

      {spotlight && <Testimonials data={spotlight} />}
    </main>
  );
}

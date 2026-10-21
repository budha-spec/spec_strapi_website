import type { Metadata } from 'next';
import { PageHero, Testimonials } from '@/components/sections';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import {
  CaseStudyExplorer,
  fetchCaseStudies,
  fetchCaseStudyIndustries,
  fetchCaseStudyListingPage,
  spotlightFromStudies,
  type CaseStudyEntry,
  type CaseStudyFilterOption,
} from '@/features/case-study';
import { cmsText } from '@/lib/media';
import type { ContactBlock } from '@/types/sections.types';

/*
 * Hero copy comes from the Strapi page entry (slug `case-study`). The section
 * heading and testimonials come from the case studies' "Client Spotlight" block.
 */
const CRUMBS = [{ label: 'What we do', href: '/services' }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCaseStudyListingPage();
  return {
    title: cmsText(page?.title) || 'Case Studies',
    description: cmsText(page?.description) || undefined,
  };
}

/** Services that actually appear on a case study, in first-seen order. */
function serviceOptions(studies: CaseStudyEntry[]): CaseStudyFilterOption[] {
  const seen = new Map<string, string>();
  for (const study of studies) {
    for (const service of study.services ?? []) {
      if (service.slug && service.title && !seen.has(service.slug)) {
        seen.set(service.slug, cmsText(service.title));
      }
    }
  }
  return [...seen].map(([slug, title]) => ({ slug, title }));
}

export default async function CaseStudyListingPage() {
  const [page, studies, industryTerms] = await Promise.all([
    fetchCaseStudyListingPage(),
    fetchCaseStudies(),
    fetchCaseStudyIndustries(),
  ]);
  const contact = page?.content?.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );
  const spotlight = spotlightFromStudies(studies);

  const industries = industryTerms
    .filter((term) => term.slug && term.title)
    .map((term) => ({ slug: term.slug as string, title: cmsText(term.title) }));

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
        {(spotlight?.title || spotlight?.subTitle) && (
          <div className="shell">
            {spotlight.title && (
              <SectionEyebrow>{cmsText(spotlight.title)}</SectionEyebrow>
            )}
            {spotlight.subTitle && (
              <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
                <AccentHeading
                  text={cmsText(spotlight.subTitle)}
                  accentClassName="gradient-text font-semibold"
                />
              </h2>
            )}
          </div>
        )}

        <CaseStudyExplorer
          studies={studies}
          services={serviceOptions(studies)}
          industries={industries}
        />
      </section>

      {spotlight && <Testimonials data={spotlight} />}
    </main>
  );
}

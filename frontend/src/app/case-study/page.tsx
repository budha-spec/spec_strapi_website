import type { Metadata } from 'next';
import { PageHero, Testimonials } from '@/components/sections';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import {
  CaseStudyExplorer,
  fetchCaseStudies,
  fetchCaseStudyIndustries,
  spotlightFromStudies,
  type CaseStudyEntry,
  type CaseStudyFilterOption,
} from '@/features/case-study';
import { cmsText } from '@/lib/media';

/*
 * Hero copy from Figma (185:4410). Strapi has no entry for this listing's
 * hero yet — once one exists, read these from it instead. The section heading
 * and testimonials come from the case studies' "Client Spotlight" block.
 */
const HERO = {
  title: 'Discover Case Studies & Services',
  description:
    'Opening our Pandora’s box of varied Case Studies through this section, that brings before you our wide range of IT solutions and services.',
  cta: 'Talk To Our AI Experts',
};
const CRUMBS = [{ label: 'What we do', href: '/services' }];

export const metadata: Metadata = {
  title: 'Case Studies',
  description: HERO.description,
};

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
  const [studies, industryTerms] = await Promise.all([
    fetchCaseStudies(),
    fetchCaseStudyIndustries(),
  ]);
  const spotlight = spotlightFromStudies(studies);

  const industries = industryTerms
    .filter((term) => term.slug && term.title)
    .map((term) => ({ slug: term.slug as string, title: cmsText(term.title) }));

  return (
    <main className="sp-page sp-page-case-study flex w-full flex-col bg-bg-white">
      <PageHero
        title={HERO.title}
        description={HERO.description}
        crumbs={CRUMBS}
        currentCrumb="Industry"
        ctaLabel={HERO.cta}
      />

      <section className="sp-section sp-case-study-listing w-full bg-bg-light pt-[clamp(40px,3.13vw,60px)] pb-[clamp(48px,6.25vw,120px)]">
        {(spotlight?.title || spotlight?.subTitle) && (
          <div className="shell">
            {spotlight.title && (
              <SectionEyebrow>{cmsText(spotlight.title)}</SectionEyebrow>
            )}
            {spotlight.subTitle && (
              <h2 className="mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
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

import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { CarouselControls } from '@/components/ui/CarouselControls';

const CASE_STUDY = {
  industry: 'Healthcare',
  description:
    'Modernized a legacy claims processing system into an AI-powered SaaS platform, Reducing processing time by 40% while ensuring full HIPAA compliance and seamless EHR integration.',
  tags: ['SaaS Platform', 'AI Workflows', 'EHR Integration', 'Cloud Security'],
};

export function CaseStudies() {
  return (
    <section className="w-full bg-bg-light pt-[clamp(40px,3.44vw,66px)] pb-[clamp(40px,3.65vw,70px)]">
      <div className="shell">
        <SectionEyebrow>Client Success Stories</SectionEyebrow>

        <h2 className="mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-text-heading">
          Proven Software Platforms Delivering Tangible{' '}
          <span className="gradient-text font-bold">Business Value</span>
        </h2>

        {/* Left copy panel ≈42% of the card, artwork fills the rest */}
        <div className="mt-[clamp(24px,3.65vw,70px)] overflow-hidden rounded-[16px] bg-bg-white lg:grid lg:grid-cols-[720fr_980fr]">
          <div className="flex flex-col p-[clamp(20px,2.08vw,40px)]">
            <h3 className="text-d30 font-medium text-text-primary">
              {CASE_STUDY.industry}
            </h3>

            <p className="mt-[clamp(12px,1.3vw,25px)] max-w-[625px] text-d18 leading-[1.45] text-text-secondary">
              {CASE_STUDY.description}
            </p>

            <div className="mt-auto pt-[clamp(28px,4.17vw,80px)]">
              <ul className="flex flex-wrap gap-[clamp(6px,0.47vw,9px)]">
                {CASE_STUDY.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex h-[clamp(32px,2.19vw,42px)] items-center rounded-full border border-stroke-main px-[clamp(12px,0.89vw,17px)] text-d14 text-text-secondary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <ExploreMore variant="filled" className="mt-[clamp(20px,2.5vw,48px)]" />
            </div>
          </div>

          <PlaceholderImage
            label="Case study visual"
            className="min-h-[260px] w-full lg:min-h-[clamp(400px,34.3vw,659px)]"
          />
        </div>

        <CarouselControls pill="dark" arrows="outline" className="mt-[clamp(16px,1.67vw,32px)]" />
      </div>
    </section>
  );
}

import { cmsText } from '@/lib/media';
import type { CaseStudyDetail } from '../../types/case-study.types';

/** Small gradient label above each fact ("Client", "Country", …). */
function FactLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="gradient-text w-fit text-d16 font-medium leading-[1.21]">
      {children}
    </span>
  );
}

/**
 * The white card under the hero: client, country, services and scale, then
 * the study's tags as "Technology & Integration" chips. Facts without a value
 * are left out; the section hides when there is nothing to show.
 */
export function CaseStudyFacts({ study }: { study: CaseStudyDetail }) {
  const services = (study.services ?? [])
    .map((service) => cmsText(service.title))
    .filter(Boolean)
    .join(', ');
  const facts = [
    { label: 'Client', value: cmsText(study.client) },
    { label: 'Country', value: cmsText(study.country) },
    { label: 'Services', value: services },
    { label: 'Scale', value: cmsText(study.scale) },
  ].filter((fact) => fact.value);
  const tags = (study.tags ?? []).filter((tag) => tag.title);

  if (facts.length === 0 && tags.length === 0) return null;

  return (
    <section className="sp-section sp-case-study-facts w-full bg-bg-light pt-[clamp(32px,3.13vw,60px)] pb-[clamp(0px,2.6vw,50px)]">
      <div className="shell">
        <div className="rounded-[14px] bg-bg-white px-[clamp(18px,2.08vw,40px)] py-[clamp(18px,1.56vw,30px)]">
          {facts.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-[clamp(16px,2.6vw,50px)] gap-y-[clamp(16px,1.25vw,24px)] md:flex md:flex-wrap md:gap-x-[clamp(40px,6.25vw,120px)]">
              {facts.map((fact) => (
                <div key={fact.label} className="flex min-w-0 flex-col gap-[clamp(4px,0.31vw,6px)]">
                  <dt>
                    <FactLabel>{fact.label}</FactLabel>
                  </dt>
                  <dd className="text-d18 leading-[1.21] text-text-primary">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {tags.length > 0 && (
            <div className="mt-[clamp(20px,2.08vw,40px)] flex flex-col gap-[clamp(10px,0.83vw,16px)]">
              <FactLabel>Technology &amp; Integration</FactLabel>
              <ul className="flex flex-wrap gap-[clamp(8px,0.83vw,16px)]">
                {tags.map((tag) => (
                  <li
                    key={tag.id}
                    className="flex items-center rounded-full border border-stroke-main bg-bg-white px-[clamp(14px,1.04vw,20px)] py-[clamp(7px,0.52vw,10px)] text-[clamp(0.8125rem,0.78vw,0.9375rem)] leading-[1.21] text-text-primary"
                  >
                    {cmsText(tag.title)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

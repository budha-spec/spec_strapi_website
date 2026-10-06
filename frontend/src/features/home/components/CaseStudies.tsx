'use client';

import { useCallback, useState } from 'react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { CarouselControls } from '@/components/ui/CarouselControls';

const CASE_STUDIES = [
  {
    id: 1,
    industry: 'Healthcare',
    description:
      'Modernized a legacy claims processing system into an AI-powered SaaS platform, Reducing processing time by 40% while ensuring full HIPAA compliance and seamless EHR integration.',
    tags: ['SaaS Platform', 'AI Workflows', 'EHR Integration', 'Cloud Security'],
    image: '/case-studies/client01.png',
  },
  {
    id: 2,
    industry: 'Healthcare',
    description:
      'Modernized a legacy claims processing system into an AI-powered SaaS platform, Reducing processing time by 40% while ensuring full HIPAA compliance and seamless EHR integration.',
    tags: ['SaaS Platform', 'AI Workflows', 'EHR Integration', 'Cloud Security'],
    image: '/case-studies/client01.png',
  },
];

export function CaseStudies() {
  const [index, setIndex] = useState(0);
  const count = CASE_STUDIES.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((current) => (current + dir + count) % count);
    },
    [count]
  );

  return (
    <section className="w-full bg-bg-light pt-[clamp(40px,3.44vw,66px)] pb-[clamp(40px,3.65vw,70px)]">
      <div className="shell">
        <SectionEyebrow>Client Success Stories</SectionEyebrow>

        <h2 className="mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-text-heading">
          Proven Software Platforms Delivering Tangible{' '}
          <span className="gradient-text font-bold">Business Value</span>
        </h2>

        <div className="mt-[clamp(24px,3.65vw,70px)] overflow-hidden rounded-[16px]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          >
            {CASE_STUDIES.map((study) => (
              <article
                key={study.id}
                className="group grid w-full shrink-0 bg-bg-white lg:grid-cols-[720fr_980fr]"
              >
                <div className="flex flex-col p-[clamp(20px,2.08vw,40px)]">
                  <h3 className="text-d30 font-medium text-text-primary">
                    {study.industry}
                  </h3>

                  <p className="mt-[clamp(12px,1.3vw,25px)] max-w-[625px] text-d18 leading-[1.45] text-text-secondary">
                    {study.description}
                  </p>

                  <div className="mt-auto pt-[clamp(28px,4.17vw,80px)]">
                    <ul className="flex flex-wrap gap-[clamp(6px,0.47vw,9px)]">
                      {study.tags.map((tag) => (
                        <li
                          key={tag}
                          className="flex h-[clamp(32px,2.19vw,42px)] items-center rounded-full border border-stroke-main px-[clamp(12px,0.89vw,17px)] text-d14 text-text-secondary"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <ExploreMore
                      variant="filled"
                      className="mt-[clamp(20px,2.5vw,48px)]"
                    />
                  </div>
                </div>

                <div className="relative min-h-[260px] w-full overflow-hidden lg:min-h-[clamp(400px,34.3vw,659px)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.image}
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        <CarouselControls
          pill="dark"
          className="mt-[clamp(16px,1.67vw,32px)]"
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      </div>
    </section>
  );
}

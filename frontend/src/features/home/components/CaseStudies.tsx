'use client';

import { useCallback, useState } from 'react';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText, joinPath } from '@/lib/media';
import type { HomeCaseStudiesBlock } from '../types/home.types';

interface CaseStudiesProps {
  data: HomeCaseStudiesBlock;
}

export function CaseStudies({ data }: CaseStudiesProps) {
  const studies = data.case_studies ?? [];
  const [index, setIndex] = useState(0);
  const count = studies.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count === 0) return;
      setIndex((current) => (current + dir + count) % count);
    },
    [count]
  );

  return (
    <section className="w-full bg-bg-light pt-[clamp(40px,3.44vw,66px)] pb-[clamp(40px,3.65vw,70px)]">
      <div className="shell">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}

        {data.subTitle && (
          <h2 className="mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading text={cmsText(data.subTitle)} accentClassName="gradient-text font-bold" />
          </h2>
        )}

        {count > 0 && (
          <div className="mt-[clamp(24px,3.65vw,70px)] overflow-hidden rounded-[16px]">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
            >
              {studies.map((study) => {
                const tags = [
                  ...(study.industries ?? []),
                  ...(study.tags ?? []),
                ].filter((tag) => tag.title);

                return (
                  <article
                    key={study.id}
                    className="grid w-full shrink-0 bg-bg-white lg:grid-cols-[720fr_980fr]"
                  >
                    <div className="flex flex-col p-[clamp(20px,2.08vw,40px)]">
                      <h3 className="text-d24 font-medium leading-[1.3] text-text-primary">
                        {cmsText(study.title)}
                      </h3>

                      {study.description && (
                        <p className="mt-[clamp(12px,1.3vw,25px)] max-w-[625px] text-d18 leading-[1.45] text-text-secondary">
                          {cmsText(study.description)}
                        </p>
                      )}

                      <div className="mt-auto pt-[clamp(28px,4.17vw,80px)]">
                        {tags.length > 0 && (
                          <div className="border-t border-stroke-main pt-[clamp(16px,1.67vw,32px)]">
                            <ul className="flex flex-wrap gap-[clamp(6px,0.47vw,9px)]">
                              {tags.map((tag) => (
                                <li
                                  key={tag.id}
                                  className="flex h-[clamp(32px,2.19vw,42px)] items-center rounded-full border border-stroke-main px-[clamp(12px,0.89vw,17px)] text-d14 text-text-secondary"
                                >
                                  {cmsText(tag.title)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <ExploreMore
                          href={joinPath(data.url ?? '/case-study', study.slug)}
                          variant="filled"
                          size="lg"
                          className="mt-[clamp(20px,2.5vw,48px)]"
                        />
                      </div>
                    </div>

                    <div className="relative min-h-[260px] w-full overflow-hidden lg:min-h-[clamp(400px,34.3vw,659px)]">
                      <CmsImage
                        media={study.featuredImage}
                        fallback="cover"
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {count > 1 && (
          <CarouselControls
            pill="dark"
            className="mt-[clamp(16px,1.67vw,32px)]"
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </div>
    </section>
  );
}

'use client';

import { AccentHeading } from '@/components/ui/AccentHeading';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { loopSlides, useLoopCarousel } from '@/hooks/useLoopCarousel';
import { cmsText, hrefPath } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { CaseStudiesBlock } from '@/types/sections.types';

interface CaseStudiesProps {
  data: CaseStudiesBlock;
}

/**
 * "Client Success Stories" — one study per slide: copy left, image right.
 * Stories are entered by hand in the block; tags and the link are optional.
 * Hidden until the block has at least one story (e.g. a new industry page).
 */
export function CaseStudies({ data }: CaseStudiesProps) {
  const studies = (data.caseStudy ?? []).filter((study) => study.title);
  const count = studies.length;
  const { index, animate, go, onTransitionEnd, swipe } = useLoopCarousel(count);

  if (count === 0) return null;

  return (
    <section className="sp-section sp-case-studies w-full bg-bg-light pt-[clamp(40px,3.44vw,66px)] pb-[clamp(40px,3.65vw,70px)]">
      <div className="shell">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}

        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text font-bold"
            />
          </h2>
        )}

        {count > 0 && (
          <div
            {...swipe}
            className="mt-[clamp(24px,3.65vw,70px)] overflow-hidden rounded-[16px] touch-pan-y touch-pinch-zoom"
          >
            <div
              onTransitionEnd={onTransitionEnd}
              className={cn(
                'flex',
                animate && 'transition-transform duration-500 ease-out motion-reduce:transition-none'
              )}
              style={{ transform: `translate3d(calc(${-index * 100}% + var(--drag, 0px)), 0, 0)` }}
            >
              {loopSlides(studies).map((study, slide) => {
                const tags = (study.tags ?? []).filter((tag) => tag.title);
                const href = study.url?.trim()
                  ? hrefPath(study.url.trim())
                  : null;

                return (
                  <article
                    key={`${study.id}-${slide}`}
                    // Off-screen slides (and loop clones) keep their links out of the tab order.
                    inert={slide !== index}
                    aria-hidden={slide >= count || undefined}
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

                      {(tags.length > 0 || href) && (
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

                          {href && (
                            <ExploreMore
                              href={href}
                              label={cmsText(study.btnText) || undefined}
                              variant="filled"
                              size="lg"
                              className={
                                tags.length > 0
                                  ? 'mt-[clamp(20px,2.5vw,48px)]'
                                  : undefined
                              }
                            />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="relative min-h-[260px] w-full overflow-hidden lg:min-h-[clamp(400px,34.3vw,659px)]">
                      <CmsImage
                        media={study.image}
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

        {/* One story needs no Explore All or arrows. */}
        {count > 1 && (
          <CarouselControls
            href={
              hrefPath(data.url) === '#' ? '/case-study' : hrefPath(data.url)
            }
            pill="dark"
            onPrev={() => go(-1)}
            onNext={() => go(1)}
          />
        )}
      </div>
    </section>
  );
}

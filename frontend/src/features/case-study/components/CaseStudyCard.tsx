import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { cmsText, hrefPath } from '@/lib/media';
import type { CaseStudyEntry } from '../types/case-study.types';

interface CaseStudyCardProps {
  study: CaseStudyEntry;
  /** Hidden duplicate/off-screen slides drop out of the tab order. */
  inert?: boolean;
}

/**
 * One case study in the listing carousel (Figma 185:4461): 1268×496 card,
 * copy 537px on the left, image 731px on the right; stacked on phones.
 */
export function CaseStudyCard({ study, inert }: CaseStudyCardProps) {
  const tags = (study.tags ?? []).filter((tag) => tag.title);

  return (
    <article
      className="case-study-card grid h-full overflow-hidden rounded-[14px] bg-bg-white md:grid-cols-[537fr_731fr] lg:min-h-[clamp(400px,25.83vw,496px)]"
      inert={inert}
    >
      <div className="flex flex-col px-[clamp(18px,1.56vw,30px)] pt-[clamp(20px,2.08vw,40px)] pb-[clamp(20px,2.08vw,40px)]">
        <h3 className="text-d26 font-medium leading-[1.3] text-text-primary">
          {cmsText(study.title)}
        </h3>

        {study.description && (
          <p className="mt-[clamp(10px,1.09vw,21px)] line-clamp-4 text-d18 leading-[1.4] text-text-secondary">
            {cmsText(study.description)}
          </p>
        )}

        <div className="mt-auto pt-[clamp(20px,2.08vw,40px)]">
          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-[clamp(6px,0.42vw,8px)] border-t border-stroke-main pt-[clamp(16px,1.56vw,30px)]">
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  className="flex items-center rounded-full border border-stroke-main bg-bg-white px-[clamp(12px,0.83vw,16px)] py-[clamp(8px,0.6vw,11.5px)] text-d12 leading-none text-text-secondary"
                >
                  {cmsText(tag.title)}
                </li>
              ))}
            </ul>
          )}

          <ExploreMore
            href={hrefPath(study.url || `case-study/${study.slug}`)}
            variant="filled"
            size="lg"
            className="mt-[clamp(24px,2.6vw,50px)]"
          />
        </div>
      </div>

      <div className="relative min-h-[220px] overflow-hidden md:min-h-0">
        <CmsImage
          media={study.featuredImage}
          fallback="cover"
          alt={cmsText(study.featuredImage?.alternativeText) || ''}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </article>
  );
}

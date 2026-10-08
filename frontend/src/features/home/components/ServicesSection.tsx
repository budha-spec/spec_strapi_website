import Link from 'next/link';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText, hrefPath } from '@/lib/media';
import type { SolutionsBlock } from '@/types/sections.types';

interface ServicesSectionProps {
  data: SolutionsBlock;
}

export function ServicesSection({ data }: ServicesSectionProps) {
  const items = data.enterpriseSolution ?? [];

  return (
    <section
      className="w-full bg-bg-light pt-[clamp(30px,3.0vw,58px)] pb-[clamp(40px,3.65vw,70px)]"
    >
      <div className="shell">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}

        {data.subTitle && (
          <h2 className="mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text font-semibold"
            />
          </h2>
        )}

        <div className="mt-[clamp(24px,3.65vw,70px)] grid grid-cols-1 gap-[clamp(16px,1.67vw,32px)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((service) => {
            const pages = (service.pages ?? []).filter((page) => page.title);

            return (
              <article
                key={service.id}
                className="capability-card group flex h-full flex-col overflow-hidden rounded-[16px] bg-bg-white"
              >
                <div className="flex flex-1 flex-col p-[clamp(16px,1.3vw,25px)]">
                  <h3 className="gradient-text w-fit text-d22 font-bold">
                    {cmsText(service.title)}
                  </h3>

                  <div className="capability-swap mt-[clamp(12px,1vw,18px)]">
                    {service.description && (
                      <p className="capability-desc text-d16 leading-[1.45] text-text-secondary">
                        {cmsText(service.description)}
                      </p>
                    )}

                    {pages.length > 0 && (
                      <ul className="capability-tags flex flex-wrap content-start gap-[clamp(8px,0.63vw,12px)]">
                        {pages.map((page) => (
                          <li key={page.id}>
                            <Link
                              href={hrefPath(page.slug)}
                              tabIndex={-1}
                              className="capability-tag flex h-[clamp(30px,1.98vw,38px)] items-center rounded-full border border-stroke-main px-[clamp(10px,0.73vw,14px)] text-d14 text-text-primary"
                            >
                              {cmsText(page.title)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <ExploreMore
                    href={hrefPath(service.url)}
                    label={cmsText(service.txt) || undefined}
                    size="lg"
                    className="mt-auto pt-6"
                  />
                </div>

                <div className="h-[clamp(130px,9.43vw,181px)] w-full shrink-0 overflow-hidden">
                  <CmsImage
                    media={service.image}
                    fallback="card"
                    alt=""
                    className="capability-image size-full object-cover"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

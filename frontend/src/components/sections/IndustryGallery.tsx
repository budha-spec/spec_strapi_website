import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { IndustryGalleryBlock } from '@/types/sections.types';

/** "Client & Industry" — white logo tiles, 2 → 3 → 4 → 6 per row. */
export function IndustryGallery({ data }: { data: IndustryGalleryBlock }) {
  const logos = (data.gallery ?? []).filter((item) => item.image?.url);
  if (logos.length === 0) return null;

  return (
    <section className="sp-section sp-industry-gallery w-full bg-bg-light py-[clamp(48px,6.25vw,50px)]">
      <div className="shell">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}
        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text font-semibold"
            />
          </h2>
        )}

        <ul className="mt-[clamp(24px,2.6vw,50px)] grid grid-cols-2 gap-[clamp(12px,1.04vw,20px)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((item) => {
            const description = cmsText(item.description);
            return (
              <li
                key={item.id}
                className={cn(
                  'industry-logo group relative aspect-[6/5] overflow-hidden rounded-[12px]  bg-bg-white transition-[border-color,box-shadow] duration-300 hover:border-stroke-outline hover:shadow-[0_10px_28px_rgb(0_0_0/0.06)]',
                  description && 'has-description'
                )}
              >
                {/*
                  Prototype: on hover the logo shrinks into the top-left
                  corner and the description fades in underneath it.
                */}
                <CmsImage
                  media={item.image}
                  fallback="logo"
                  alt={cmsText(item.image?.alternativeText) || logoName(item.image?.name)}
                  width={item.image?.width ?? 180}
                  height={item.image?.height ?? 40}
                  className={cn(
                    'industry-logo-img absolute top-1/2 left-1/2 max-h-[26%] w-auto max-w-[72%] origin-top-left -translate-x-1/2 -translate-y-1/2 object-contain transition-[top,left,translate,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    description &&
                      'group-hover:top-[clamp(12px,1.04vw,20px)] group-hover:left-[clamp(12px,1.04vw,20px)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-[0.72]'
                  )}
                />
                {description && (
                  <p className="industry-logo-description absolute inset-x-[clamp(12px,1.04vw,20px)] bottom-[clamp(12px,1.04vw,20px)] translate-y-2 text-d14 leading-[1.4] text-text-secondary opacity-0 transition-[opacity,translate] duration-500 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
                    {description}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** `industry-pepsico.svg` → `pepsico`, for logos uploaded without alt text. */
function logoName(file?: string | null): string {
  return (file ?? '').replace(/\.[a-z]+$/i, '').replace(/^industry[-_]/, '').replace(/[-_]+/g, ' ');
}

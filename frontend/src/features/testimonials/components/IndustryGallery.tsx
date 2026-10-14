import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { IndustryGalleryBlock } from '../types/testimonials.types';

/** "Client & Industry" — white logo tiles, 2 → 3 → 4 → 6 per row. */
export function IndustryGallery({ data }: { data: IndustryGalleryBlock }) {
  const logos = (data.gallery ?? []).filter((item) => item.image?.url);
  if (logos.length === 0) return null;

  return (
    <section className="sp-section sp-industry-gallery w-full bg-bg-light py-[clamp(48px,6.25vw,120px)]">
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
          {logos.map((item) => (
            <li
              key={item.id}
              className="industry-logo flex h-[clamp(88px,7.29vw,140px)] items-center justify-center rounded-[12px] border border-transparent bg-bg-white px-[clamp(12px,1.25vw,24px)] transition-[border-color,box-shadow] duration-300 hover:border-stroke-outline hover:shadow-[0_10px_28px_rgb(0_0_0/0.06)]"
            >
              <CmsImage
                media={item.image}
                fallback="logo"
                alt={cmsText(item.image?.alternativeText) || logoName(item.image?.name)}
                width={item.image?.width ?? 180}
                height={item.image?.height ?? 40}
                className="max-h-[45%] w-auto max-w-[80%] object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** `industry-pepsico.svg` → `pepsico`, for logos uploaded without alt text. */
function logoName(file?: string | null): string {
  return (file ?? '').replace(/\.[a-z]+$/i, '').replace(/^industry[-_]/, '').replace(/[-_]+/g, ' ');
}

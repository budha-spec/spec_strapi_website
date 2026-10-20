import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { KpiImpactBlock } from '../../types/live-bi.types';

/**
 * "From KPIs to better decisions / Outcomes & Business Impact" (Figma
 * 432:6896) — image on the left, one white row per KPI category on the
 * right. Hovering a row (or focusing / tapping it) fades every chip in that
 * row into the brand gradient with white text, as in the reference video.
 * The rows stretch to the image's height from `lg`; below it they stack
 * under the image.
 */
export function KpiImpact({ data }: { data: KpiImpactBlock }) {
  const rows = (data.category ?? []).filter((row) => row.title);
  if (rows.length === 0) return null;

  return (
    <section className="sp-section sp-kpi-impact w-full bg-bg-light pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && <SectionEyebrow angle="-35deg">{cmsText(data.title)}</SectionEyebrow>}

        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
            <AccentHeading text={cmsText(data.subTitle)} accentClassName="gradient-text font-semibold" />
          </h2>
        )}

        <div className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] lg:grid-cols-[minmax(0,692fr)_minmax(0,980fr)]">
          {data.image?.url && (
            <div className="kpi-impact-media relative aspect-[692/584] overflow-hidden rounded-[14px] bg-bg-dark lg:aspect-auto lg:min-h-[clamp(360px,30.4vw,584px)]">
              <CmsImage
                media={data.image}
                fallback="cover"
                alt={cmsText(data.image.alternativeText) || ''}
                width={data.image.width ?? 692}
                height={data.image.height ?? 584}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          )}

          <ul className="flex flex-col gap-[clamp(10px,0.83vw,16px)]">
            {rows.map((row) => {
              const chips = (row.subCategory ?? []).filter((chip) => chip.title);
              return (
                <li
                  key={row.id}
                  tabIndex={0}
                  className="kpi-row group flex flex-col justify-center gap-[clamp(10px,0.83vw,16px)] rounded-[14px] bg-bg-white px-[clamp(16px,1.56vw,30px)] py-[clamp(16px,1.56vw,30px)] outline-none focus-visible:shadow-[0_0_0_2px_var(--color-brand-cta-blue)] lg:flex-1"
                >
                  <h3 className="gradient-text w-fit text-d16 font-medium leading-[1.21]">
                    {cmsText(row.title)}
                  </h3>

                  {chips.length > 0 && (
                    <ul className="flex flex-wrap gap-[clamp(8px,0.83vw,16px)]">
                      {chips.map((chip) => (
                        <li
                          key={chip.id}
                          className="kpi-chip relative isolate flex items-center overflow-hidden rounded-full border border-stroke-main bg-bg-white px-[clamp(14px,1.04vw,20px)] py-[clamp(7px,0.52vw,10px)] text-d16 leading-[1.21] text-text-primary transition-[color,border-color] duration-300 group-hover:border-transparent group-hover:text-white group-focus-visible:border-transparent group-focus-visible:text-white motion-reduce:transition-none"
                        >
                          <span
                            aria-hidden
                            className="gradient-btn absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                            style={{ ['--grad-angle' as string]: '-68deg' }}
                          />
                          {cmsText(chip.title)}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { CaseStudyResultBlock } from '../../types/case-study.types';

/** Figma angles so each figure lands on a different part of the ramp (as in Proven Impact). */
const ANGLES = ['-82.71deg', '-75.99deg'];

/**
 * "Proven Impact / Delivering Measurable Business Outcomes…" — dark band with
 * the headline metrics (two to a row from `md`), then the result tiles.
 *
 * A tile shows its title at the bottom. On hover or focus (a tap on touch)
 * that title fades out while a gradient copy rises with a divider and the
 * description underneath — the same reveal as the industry Key Use Cases
 * cards, on dark.
 */
export function CaseStudyResults({ data }: { data: CaseStudyResultBlock }) {
  const metrics = (data.result?.keyMetrics ?? []).filter((metric) => metric.number);
  const tiles = (data.result?.csResult ?? []).filter((tile) => tile.title);
  if (metrics.length === 0 && tiles.length === 0) return null;

  return (
    <section className="sp-section sp-case-study-results w-full bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact">{cmsText(data.title)}</SectionEyebrow>
        )}

        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[788px] text-d40 font-medium leading-[1.2] text-white">
            {cmsText(data.subTitle).trim()}
          </h2>
        )}

        {metrics.length > 0 && (
          <div className="mt-[clamp(32px,4.17vw,80px)] grid gap-x-[clamp(16px,1.46vw,28px)] gap-y-[clamp(32px,2.6vw,50px)] md:grid-cols-2">
            {metrics.map((metric, i) => (
              <div key={metric.id} className="flex flex-col">
                <span
                  className="gradient-text-impact w-fit text-d60 font-semibold leading-[1.2]"
                  style={{ ['--grad-angle' as string]: ANGLES[i % ANGLES.length] }}
                >
                  {cmsText(metric.number)}
                </span>
                {/* Double spaces typed in the CMS mark the 1920 line break. */}
                <h3 className="mt-[clamp(14px,1.56vw,30px)] text-d26 font-light leading-[1.21] text-white xl:whitespace-pre-line">
                  {cmsText(metric.name).replace(/ {2,}/g, '\n').trim()}
                </h3>
                {metric.description && (
                  <p className="mt-[clamp(12px,0.94vw,18px)] border-t border-white/15 pt-[clamp(12px,0.94vw,18px)] text-d18 leading-[1.4] text-text-light">
                    {cmsText(metric.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {tiles.length > 0 && (
          <ul className="mt-[clamp(32px,4.17vw,80px)] grid gap-[clamp(12px,1.46vw,28px)] sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile) => {
              const title = cmsText(tile.title).replace(/ {2,}/g, ' ');
              return (
                <li
                  key={tile.id}
                  tabIndex={0}
                  // Figma 421:5658: 404x263, #222, radius 14, title 25px in and 30px up.
                  className="cs-result-tile group grid min-h-[clamp(180px,13.7vw,263px)] items-end rounded-[14px] bg-white/[0.08] px-[clamp(18px,1.3vw,25px)] pt-[clamp(18px,1.3vw,25px)] pb-[clamp(20px,1.56vw,30px)] outline-none focus-visible:shadow-[0_0_0_2px_rgb(255_255_255/0.3)]"
                >
                  {/* Both states share one grid cell, so the tile is always tall enough for the open one. */}
                  <h3
                    aria-hidden
                    className="col-start-1 row-start-1 max-w-[clamp(170px,11.35vw,218px)] text-d22 font-medium leading-[1.3] text-white transition-[opacity,translate] duration-500 ease-out group-hover:-translate-y-2 group-hover:opacity-0 group-focus-visible:-translate-y-2 group-focus-visible:opacity-0 motion-reduce:transition-none"
                  >
                    {title}
                  </h3>

                  <div className="cs-result-tile-detail col-start-1 row-start-1 translate-y-3 opacity-0 transition-[opacity,translate] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
                    <h3 className="w-fit max-w-[clamp(170px,11.35vw,218px)] text-d22 font-medium leading-[1.3]">
                      <span className="gradient-text-impact" style={{ ['--grad-angle' as string]: '-70deg' }}>
                        {title}
                      </span>
                    </h3>
                    {tile.description && (
                      <p className="mt-[clamp(10px,0.83vw,16px)] border-t border-white/15 pt-[clamp(10px,0.83vw,16px)] text-d16 leading-[1.4] text-text-light">
                        {cmsText(tile.description)}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

import { AccentHeading } from '@/components/ui/AccentHeading';
import { CmsImage } from '@/components/ui/CmsImage';
import { RichText } from '@/components/ui/RichText';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { DashboardImprovementBlock } from '../../types/live-bi.types';

/** Figma angles so neighbouring figures land on different parts of the ramp. */
const ANGLES = ['-76deg', '-71deg', '-70deg', '-76deg'];

/**
 * "What CEO Dashboard Can Improve?" (Figma 432:6911) — dark band of tall
 * white cards: icon top-left, the figure on the brand gradient and its
 * caption pinned to the bottom. Four to a row from `lg`, two on tablets,
 * one on phones.
 */
export function DashboardImprovements({ data }: { data: DashboardImprovementBlock }) {
  const cards = (data.improvement ?? []).filter((card) => card.title);
  if (cards.length === 0) return null;

  return (
    <section className="sp-section sp-dashboard-improvements w-full bg-bg-darker pt-[clamp(48px,7.03vw,135px)] pb-[clamp(48px,7.03vw,135px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow gradient="impact" angle="-31.64deg">
            {cmsText(data.title).trim()}
          </SectionEyebrow>
        )}

        {data.subTitle && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(data.subTitle)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        <ul className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <li
              key={card.id}
              className="improvement-card flex min-h-[clamp(220px,23.96vw,460px)] flex-col rounded-[14px] bg-bg-white p-[clamp(20px,2.08vw,40px)]"
            >
              {card.image?.url && (
                <CmsImage
                  media={card.image}
                  fallback="logo"
                  alt=""
                  width={card.image.width ?? 60}
                  height={card.image.height ?? 60}
                  className="h-[clamp(40px,3.13vw,60px)] w-auto self-start"
                />
              )}

              <div className="mt-auto pt-[clamp(32px,4.17vw,80px)]">
                <p
                  className="gradient-text w-fit text-d40 font-semibold leading-[1.2]"
                  style={{ ['--grad-angle' as string]: ANGLES[i % ANGLES.length] }}
                >
                  {cmsText(card.title).trim()}
                </p>
                {/* Two lines reserved so every figure sits at the same height. */}
                <RichText
                  content={card.description}
                  className="mt-[clamp(8px,0.73vw,14px)] min-h-[2.6em] max-w-[300px] text-d18 leading-[1.3] text-text-secondary"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

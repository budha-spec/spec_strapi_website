import { CountUp } from '@/components/ui/CountUp';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import type { HomeMetricsBlock } from '../types/home.types';

/** Presentation-only angles so each figure lands on a different part of the ramp. */
const ANGLES = ['-82.71deg', '-75.99deg', '-77.60deg', '-76.08deg'];

interface StatsSectionProps {
  data: HomeMetricsBlock;
}

export function StatsSection({ data }: StatsSectionProps) {
  const metrics = data.keyMetrics ?? [];

  return (
    <section className="relative w-full overflow-hidden bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.15vw,118px)]">
      <div className="shell">
        {data.title && (
          <SectionEyebrow
            gradient="impact"
            className="text-[clamp(1.125rem,2.031vw,1.625rem)]"
          >
            {cmsText(data.title)}
          </SectionEyebrow>
        )}

        {data.description && (
          <h2 className="mt-[clamp(8px,0.73vw,14px)] max-w-[788px] text-[clamp(1.75rem,3.125vw,2.5rem)] font-medium leading-[1.2] text-white">
            {cmsText(data.description)}
          </h2>
        )}

        <div className="mt-[clamp(40px,6.77vw,130px)] grid grid-cols-1 gap-x-[clamp(16px,1.46vw,28px)] gap-y-[clamp(32px,2.6vw,50px)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-[clamp(10px,0.94vw,18px)]">
          {metrics.map((stat, i) => (
            <div
              key={stat.id}
              className="grid content-start gap-y-[clamp(10px,0.94vw,18px)] lg:row-span-4 lg:grid-rows-subgrid lg:gap-y-0"
            >
              <CountUp
                value={cmsText(stat.number)}
                delayMs={i * 160}
                className="gradient-text-impact mb-[clamp(4px,0.67vw,13px)] w-fit self-end whitespace-nowrap text-[clamp(2rem,4.688vw,3.75rem)] font-semibold leading-[1.2]"
                style={{ ['--grad-angle' as string]: ANGLES[i % ANGLES.length] }}
              />

              <h4 className="self-start whitespace-pre-line text-[clamp(1.125rem,2.031vw,1.625rem)] font-light leading-[1.2] text-white">
                {cmsText(stat.name).replace(/ {2,}/g, '\n').trim()}
              </h4>

              <div aria-hidden className="h-px w-full self-center bg-[#3D3D3C]" />

              <p className="self-start whitespace-pre-line text-[clamp(0.875rem,1.406vw,1.125rem)] font-normal leading-[1.4] text-text-light">
                {cmsText(stat.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

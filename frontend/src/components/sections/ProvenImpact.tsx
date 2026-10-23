import { AccentHeading } from '@/components/ui/AccentHeading';
import { CountUp } from '@/components/ui/CountUp';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { MetricsBlock } from '@/types/sections.types';

/** Presentation-only angles so each figure lands on a different part of the ramp. */
// Line breaks typed in the CMS (and double spaces) are tuned for the 1920
// layout, so they only apply from `xl` up; narrower columns wrap naturally.
const ANGLES = ['-82.71deg', '-75.99deg', '-77.60deg', '-76.08deg'];
/** Light band (About, Figma 525:9362): green→blue figures at Figma's angles. */
const LIGHT_ANGLES = ['-81.51deg', '-73.76deg', '-75.6deg', '-73.85deg'];

interface ProvenImpactProps {
  data: MetricsBlock;
  /** `dark` near-black band (home, service); `light` grey band (About). */
  tone?: 'dark' | 'light';
}

/** "Proven Impact" — band of animated key metrics. */
export function ProvenImpact({ data, tone = 'dark' }: ProvenImpactProps) {
  const metrics = data.keyMetrics ?? [];
  const light = tone === 'light';
  const angles = light ? LIGHT_ANGLES : ANGLES;

  return (
    <section
      className={cn(
        'sp-section sp-proven-impact relative w-full overflow-hidden pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.15vw,118px)]',
        light ? 'sp-proven-impact--light bg-bg-light' : 'bg-bg-darker'
      )}
    >
      <div className="shell">
        {data.title && (
          <SectionEyebrow
            gradient={light ? 'standard' : 'impact'}
            angle={light ? '-86.22deg' : undefined}
            className="text-[clamp(1.125rem,2.031vw,1.625rem)]"
          >
            {cmsText(data.title)}
          </SectionEyebrow>
        )}

        {data.description && (
          <h2
            className={cn(
              'sp-title mt-[clamp(8px,0.73vw,14px)] max-w-[788px] text-[clamp(1.75rem,3.125vw,2.5rem)] font-medium leading-[1.2]',
              light ? 'text-text-heading' : 'text-white'
            )}
          >
            <AccentHeading
              text={cmsText(data.description)}
              accentClassName={
                light ? 'gradient-text font-semibold' : 'gradient-text-impact font-semibold'
              }
            />
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
                className={cn(
                  'mb-[clamp(4px,0.67vw,13px)] w-fit self-end whitespace-nowrap text-[clamp(2rem,4.688vw,3.75rem)] font-semibold leading-[1.2]',
                  // `gradient-btn` carries the green→blue ramp; clipping it to
                  // the text gives Figma's brighter figures on the light band.
                  light ? 'gradient-btn bg-clip-text text-transparent' : 'gradient-text-impact'
                )}
                style={{ ['--grad-angle' as string]: angles[i % angles.length] }}
              />

              <h4
                className={cn(
                  'self-start xl:whitespace-pre-line text-[clamp(1.125rem,2.031vw,1.625rem)] font-light leading-[1.2]',
                  light ? 'text-text-primary' : 'text-white'
                )}
              >
                {cmsText(stat.name).replace(/ {2,}/g, '\n').trim()}
              </h4>

              <div
                aria-hidden
                className={cn('h-px w-full self-center', light ? 'bg-stroke-divider' : 'bg-[#3D3D3C]')}
              />

              <p
                className={cn(
                  'self-start xl:whitespace-pre-line text-[clamp(0.875rem,1.406vw,1.125rem)] font-normal leading-[1.4]',
                  light ? 'text-text-primary/80' : 'text-text-light'
                )}
              >
                {cmsText(stat.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

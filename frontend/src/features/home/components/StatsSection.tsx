import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { CountUp } from '@/components/ui/CountUp';

/**
 * Each value carries its own gradient angle — Figma rotates the ramp slightly
 * per number so the colour lands differently across each one.
 */
const STATS = [
  {
    id: 1,
    value: '4X',
    angle: '-82.71deg',
    title: 'Faster insights with\ncustom AI',
    description: 'Turn complex clinical data into actionable\nintelligence faster.',
  },
  {
    id: 2,
    value: '60%',
    angle: '-75.99deg',
    title: 'Higher adoption of business\nintelligence',
    description:
      'Automate repetitive workflows and connect\nshipment data, documentation and operations.',
  },
  {
    id: 3,
    value: '25%',
    angle: '-77.60deg',
    title: 'Lower application costs\nthrough modernization',
    description: 'Lower application costs through\nmodernization',
  },
  {
    id: 4,
    value: '50%',
    angle: '-76.08deg',
    title: 'Less manual work across\nfreight operations',
    description:
      'Automate repetitive workflows and connect\nshipment data, documentation and operations.',
  },
];

export function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.15vw,118px)]">
      <div className="shell">
        <SectionEyebrow gradient="impact">Proven Impact</SectionEyebrow>

        <h2 className="mt-[clamp(8px,0.73vw,14px)] max-w-[788px] text-d40 font-medium leading-[1.2] text-white">
          Delivering Measurable Business Outcomes and Technical Excellence for
          Industry Leaders
        </h2>

        <div className="mt-[clamp(40px,6.77vw,130px)] grid grid-cols-1 gap-x-[clamp(16px,1.46vw,28px)] gap-y-[clamp(32px,2.6vw,50px)] sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.id} className="flex flex-col">
              <CountUp
                value={stat.value}
                delayMs={i * 160}
                className="gradient-text-impact w-fit whitespace-nowrap text-d60 font-semibold leading-[1.2]"
                style={{ ['--grad-angle' as string]: stat.angle }}
              />

              {/* Title, rule and description sit on a uniform 18px rhythm */}
              <div className="mt-[clamp(14px,1.61vw,31px)] flex flex-col gap-[clamp(10px,0.94vw,18px)]">
                <h4 className="whitespace-pre-line text-d26 font-light leading-[1.2] text-white">
                  {stat.title}
                </h4>

                <div aria-hidden className="h-px w-full bg-[#3D3D3C]" />

                <p className="whitespace-pre-line text-d18 font-normal leading-[1.4] text-text-light">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

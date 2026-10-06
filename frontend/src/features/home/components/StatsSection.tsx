import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import ParticlesCanvas from '@/components/ui/ParticlesCanvas';

const STATS = [
  {
    id: 1,
    value: '4X',
    title: 'Faster insights with\ncustom AI',
    description: 'Turn complex clinical data into actionable\nintelligence faster.',
  },
  {
    id: 2,
    value: '60%',
    title: 'Higher adoption of business\nintelligence',
    description:
      'Automate repetitive workflows and connect\nshipment data, documentation and operations.',
  },
  {
    id: 3,
    value: '25%',
    title: 'Lower application costs\nthrough modernization',
    description: 'Lower application costs through\nmodernization',
  },
  {
    id: 4,
    value: '50%',
    title: 'Less manual work across\nfreight operations',
    description:
      'Automate repetitive workflows and connect\nshipment data, documentation and operations.',
  },
];

export function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-bg-darker pt-[clamp(48px,6.77vw,130px)] pb-[clamp(48px,5.99vw,115px)]">
      <ParticlesCanvas
        id="stats-particles"
        className="absolute inset-0 z-0"
        density={45}
        opacity={0.16}
      />

      <div className="shell relative z-10">
        <SectionEyebrow>Proven Impact</SectionEyebrow>

        <h2 className="mt-[clamp(6px,0.52vw,10px)] max-w-[790px] text-d40 font-medium leading-[1.2] text-white">
          Delivering Measurable Business Outcomes and Technical Excellence for
          Industry Leaders
        </h2>

        <div className="mt-[clamp(36px,4.48vw,86px)] grid grid-cols-1 gap-x-[clamp(16px,1.67vw,32px)] gap-y-[clamp(32px,2.6vw,50px)] sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <span className="gradient-text w-fit text-d60 font-bold leading-[1.1]">
                {stat.value}
              </span>

              <h4 className="mt-[clamp(16px,2.86vw,55px)] whitespace-pre-line text-d26 font-light leading-[1.2] text-white">
                {stat.title}
              </h4>

              <div aria-hidden className="mt-[clamp(12px,0.83vw,16px)] h-px w-full bg-white/15" />

              <p className="mt-[clamp(12px,1.2vw,23px)] whitespace-pre-line text-d18 leading-[1.4] text-text-light">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

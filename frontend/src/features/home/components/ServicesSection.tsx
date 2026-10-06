import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ExploreMore } from '@/components/ui/ExploreMore';

const SERVICES = [
  {
    id: 1,
    title: 'Services',
    description:
      'Drive sustainable growth with future-ready software engineering tailored precisely to your operational and enterprise goals.',
  },
  {
    id: 2,
    title: 'Industries',
    description:
      "Solve domain-specific operational challenges with deeply tailored technology solutions built for your industry's unique regulatory and market needs.",
  },
  {
    id: 3,
    title: 'Live BI Visualization',
    description:
      'Turn complex operational data into actionable intelligence with real-time analytics, custom dashboards, and automated enterprise reporting.',
  },
  {
    id: 4,
    title: 'Whitepaper',
    description:
      'Gain a competitive edge with architectural blueprints, technical research, and executive frameworks designed for modern enterprise transformation.',
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full bg-bg-light pt-[clamp(30px,3.0vw,58px)] pb-[clamp(40px,3.65vw,70px)]"
    >
      <div className="shell">
        <SectionEyebrow>Core Capabilities</SectionEyebrow>

        <h2 className="mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
          Engineering Scalable Solutions for Enterprise{' '}
          <span className="gradient-text font-bold">Growth</span>
        </h2>

        <div className="mt-[clamp(24px,3.65vw,70px)] grid grid-cols-1 gap-[clamp(16px,1.67vw,32px)] sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group flex h-[clamp(380px,25.52vw,490px)] flex-col overflow-hidden rounded-[16px] bg-bg-white transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-1 flex-col p-[clamp(16px,1.3vw,25px)]">
                <h3 className="gradient-text w-fit text-d22 font-bold">
                  {service.title}
                </h3>

                <p className="mt-[clamp(10px,1.15vw,22px)] text-d18 leading-[1.4] text-text-secondary">
                  {service.description}
                </p>

                <ExploreMore className="mt-auto pt-6" />
              </div>

              {/* Artwork strip across the bottom of the card */}
              <PlaceholderImage
                tone="dark"
                label="Card visual"
                className="h-[clamp(130px,9.43vw,181px)] w-full shrink-0"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

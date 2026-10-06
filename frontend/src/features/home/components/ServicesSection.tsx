import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ExploreMore } from '@/components/ui/ExploreMore';

const SERVICES = [
  {
    id: 1,
    title: 'Services',
    image: '/services/service01.png',
    tags: [
      'Software Engineering',
      'App Development',
      'Digital Transformation',
      'Data Engineering',
      'AI Capabilities',
    ],
  },
  {
    id: 2,
    title: 'Industries',
    image: '/services/service02.png',
    tags: [
      'Logistics & Freight',
      'Healthcare',
      'Manufacturing',
      'Energy & Utilities',
      'Retail',
    ],
  },
  {
    id: 3,
    title: 'Live BI Visualization',
    image: '/services/service03.png',
    tags: [
      'CEO Dashboard',
      'CMO Dashboard',
      'CFO Dashboard',
      'CRM & Lead Analysis',
      'Sales Analytics Reports',
    ],
  },
  {
    id: 4,
    title: 'Whitepaper',
    image: '/services/service04.png',
    tags: [
      'Agentic AI in Enterprise Workflows',
      'Monolith to Cloud-Native Playbook',
      'Building Resilient Microservices',
    ],
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
          <span
            className="gradient-text font-semibold"
            style={{ ['--grad-angle' as string]: '-78.66deg' }}
          >
            Growth
          </span>
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

                <ul className="mt-[clamp(14px,1.25vw,24px)] flex flex-wrap gap-[clamp(8px,0.63vw,12px)]">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex h-[clamp(30px,1.98vw,38px)] items-center rounded-full border border-stroke-main px-[clamp(10px,0.73vw,14px)] text-d14 text-text-primary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <ExploreMore className="mt-auto pt-6" />
              </div>

              <div className="h-[clamp(130px,9.43vw,181px)] w-full shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

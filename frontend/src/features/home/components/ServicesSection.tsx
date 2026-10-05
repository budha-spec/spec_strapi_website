import Image from 'next/image';

const SERVICES = [
  {
    id: 1,
    title: 'Services',
    titleColor: 'text-[#0050FE]', // Blue
    description: 'Drive sustainable growth with future-ready software engineering tailored precisely to your operational and enterprise goals.',
  },
  {
    id: 2,
    title: 'Industries',
    titleColor: 'text-[#0050FE]', // Blue
    description: "Solve domain-specific operational challenges with deeply tailored technology solutions built for your industry's unique regulatory and market needs.",
  },
  {
    id: 3,
    title: 'Live BI Visualization',
    titleColor: 'text-brand-blue', // Assuming gradient or blue
    description: 'Turn complex operational data into actionable intelligence with real-time analytics, custom dashboards, and automated enterprise reporting.',
  },
  {
    id: 4,
    title: 'Whitepaper',
    titleColor: 'text-brand-green', // Green
    description: 'Gain a competitive edge with architectural blueprints, technical research, and executive frameworks designed for modern enterprise transformation.',
  },
];

export function ServicesSection() {
  return (
    <section className="w-full bg-[#f9f9f9] pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-brand-blue text-sm font-semibold mb-4 block">• <span className="text-brand-green">Core Capabilities</span></span>
          <h2 className="text-3xl md:text-4xl font-medium text-text-primary">
            Engineering Scalable Solutions for Enterprise <span className="gradient-text font-bold">Growth</span>
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl overflow-hidden flex flex-col h-[400px] cursor-pointer shadow-sm hover:shadow-lg transition-shadow border border-stroke-outline/50"
            >
              {/* Card content top */}
              <div className="flex flex-col flex-1 p-6 z-10">
                <h3 className={`text-base font-bold mb-4 ${service.titleColor}`}>{service.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-auto">
                  {service.description}
                </p>

                {/* Explore More link */}
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-[10px] font-medium text-text-primary">Explore More</span>
                  <div className="h-6 w-6 rounded-full border border-stroke-main flex items-center justify-center group-hover:border-black transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card image placeholder bottom */}
              <div className="w-full h-[140px] bg-black mt-auto overflow-hidden">
                <div className="w-full h-full bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%)] flex items-center justify-center text-white/50 text-xs">
                  Image
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

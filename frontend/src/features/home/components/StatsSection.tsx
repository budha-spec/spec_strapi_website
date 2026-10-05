const STATS = [
  {
    id: 1,
    value: '4X',
    title: 'Faster insights with\ncustom AI',
    description: 'Turn complex clinical data into actionable\nintelligence faster.',
    color: 'text-[#0050FE]' // Blue
  },
  {
    id: 2,
    value: '60%',
    title: 'Higher adoption of business\nintelligence',
    description: 'Automate repetitive workflows and connect\nshipment data, documentation and operations.',
    color: 'text-brand-green' // Green
  },
  {
    id: 3,
    value: '25%',
    title: 'Lower application costs\nthrough modernization',
    description: 'Lower application costs through\nmodernization',
    color: 'text-brand-green'
  },
  {
    id: 4,
    value: '50%',
    title: 'Less manual work across\nfreight operations',
    description: 'Automate repetitive workflows and connect\nshipment data, documentation and operations.',
    color: 'text-brand-green'
  }
];

export function StatsSection() {
  return (
    <section className="w-full bg-[#151515] pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-brand-green text-sm font-semibold mb-4 block">• Proven <span className="text-brand-blue">Impact</span></span>
          <h2 className="text-3xl md:text-4xl font-medium text-white max-w-2xl leading-tight">
            Delivering Measurable Business Outcomes and Technical Excellence for Industry Leaders
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <span className={`text-[56px] font-bold leading-none mb-4 ${stat.color}`}>
                {stat.value}
              </span>
              <h4 className="text-sm font-medium text-white mb-6 whitespace-pre-line">
                {stat.title}
              </h4>
              <div className="w-full h-px bg-white/10 mb-6" />
              <p className="text-[10px] text-text-light whitespace-pre-line leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

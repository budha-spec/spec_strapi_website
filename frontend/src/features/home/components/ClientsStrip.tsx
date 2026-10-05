import Image from 'next/image';

const CLIENT_LOGOS = [
  { id: 1, name: 'PEPSICO', src: '/pepsico.png' },
  { id: 2, name: 'Kellogg\'s', src: '/kelloggs.png' },
  { id: 3, name: 'Schneider Electric', src: '/schneider.png' },
  { id: 4, name: 'HITACHI', src: '/hitachi.png' },
  { id: 5, name: 'ADNOC', src: '/adnoc.png' },
  { id: 6, name: 'UHN', src: '/uhn.png' },
];

export function ClientsStrip() {
  return (
    <section className="w-full bg-[#f9f9f9] py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Heading */}
        <div className="w-full lg:w-1/4">
          <h2 className="text-sm font-semibold text-text-primary">
            Trusted by global leaders to build
            <br />
            next-generation enterprises.
          </h2>
        </div>

        {/* Logos */}
        <div className="w-full lg:w-3/4 flex flex-wrap items-center justify-between gap-8">
          {CLIENT_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="text-xl font-bold text-gray-500">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

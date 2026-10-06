import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { CarouselControls } from '@/components/ui/CarouselControls';
import ParticlesCanvas from '@/components/ui/ParticlesCanvas';

const TESTIMONIALS = [
  { id: 1, name: 'Marwa Abdelfattah', role: 'Founder, CoAuthor INC' },
  { id: 2, name: 'Fredrik Wittboldt', role: 'CEO, Dynamic Documents' },
  { id: 3, name: 'Kriti Anand', role: 'CoFounder, CAREERKUL' },
  { id: 4, name: 'Johan Scott', role: 'CTO, Redeal STHLM' },
];

export function Testimonials() {
  return (
    <section className="relative w-full overflow-hidden bg-bg-darker pt-[clamp(48px,5.57vw,107px)] pb-[clamp(48px,4.27vw,82px)]">
      <ParticlesCanvas
        id="testimonials-particles"
        className="absolute inset-0 z-0"
        density={45}
        opacity={0.16}
      />

      <div className="shell relative z-10">
        <SectionEyebrow>Client Spotlight</SectionEyebrow>

        <h2 className="mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-white">
          What Enterprise Leaders Say About{' '}
          <span className="gradient-text-alt font-bold">Partnering Us</span>
        </h2>

        <div className="mt-[clamp(24px,3.33vw,64px)] grid grid-cols-1 gap-[clamp(16px,1.67vw,32px)] sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((person) => (
            <figure
              key={person.id}
              className="relative flex h-[clamp(400px,27.08vw,520px)] flex-col justify-end overflow-hidden rounded-[16px]"
              style={{
                backgroundImage:
                  'linear-gradient(-74deg, #56F72F 0%, #0C3CED 100%)',
              }}
            >
              {/* Portrait placeholder — the gradient stays visible behind it */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-end justify-center"
              >
                <svg
                  viewBox="0 0 100 120"
                  className="h-[82%] w-auto text-black/25"
                  fill="currentColor"
                  preserveAspectRatio="xMidYMax meet"
                >
                  <circle cx="50" cy="34" r="24" />
                  <path d="M50 64c-22 0-38 14-38 32v24h76V96c0-18-16-32-38-32Z" />
                </svg>
              </div>

              {/* Keeps the caption legible over the artwork */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/70 to-transparent"
              />

              <figcaption className="relative z-10 flex flex-col items-center px-4 pb-[clamp(18px,1.56vw,30px)] text-center">
                <button
                  type="button"
                  className="flex h-[clamp(36px,2.29vw,44px)] items-center gap-2 rounded-full bg-white p-[3px] pr-[clamp(10px,0.78vw,15px)] transition-transform hover:scale-105"
                >
                  <span className="flex aspect-square h-full items-center justify-center rounded-full bg-black text-white">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <polygon points="6 3 21 12 6 21" />
                    </svg>
                  </span>
                  <span className="text-d18 font-light text-[#020101]">Play</span>
                </button>

                <h4 className="mt-[clamp(10px,1.3vw,25px)] text-d24 font-medium text-white">
                  {person.name}
                </h4>
                <p className="mt-[clamp(2px,0.42vw,8px)] text-d16 text-white/90">
                  {person.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <CarouselControls
          pill="gradient"
          arrows="light"
          className="mt-[clamp(16px,1.56vw,30px)]"
        />
      </div>
    </section>
  );
}

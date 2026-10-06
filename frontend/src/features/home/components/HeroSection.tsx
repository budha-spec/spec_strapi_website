import ParticlesCanvas from '@/components/ui/ParticlesCanvas';
import DotSphere from '@/components/ui/DotSphere';

const QUICK_PROMPTS = [
  'Modernize Legacy Software',
  'Build a Business Application',
  'AI to Our Product',
];

interface HeroSectionProps {
  data?: {
    title?: string;
    description?: string;
    capabilities?: string;
  };
}

export function HeroSection({ data }: HeroSectionProps) {
  const title = data?.title ?? 'Building Next-gen AI-ready Software';
  const description =
    data?.description ??
    'Building custom software and intelligent platforms since 1987 to help global \nenterprises modernize and scale faster.';

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-bg-black h-[clamp(660px,52.08vw,1000px)]"
    >
      {/* Drifting dot field across the whole hero */}
      <ParticlesCanvas
        id="hero-particles"
        className="absolute inset-0 z-0"
        density={120}
        opacity={0.45}
      />

      {/* Rotating sphere of dots, upper centre */}
      <div className="pointer-events-none absolute left-1/2 top-[5%] z-0 aspect-square w-[min(740px,72vw)] -translate-x-1/2 mask-sphere">
        <DotSphere />
      </div>

      {/* Soft glow sitting behind the translucent search card */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] z-0 aspect-[1380/958] w-[min(1380px,92vw)] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.20) 0%, rgba(150,195,255,0.09) 28%, transparent 60%)',
        }}
      />

      {/* Corner glows */}
      <div aria-hidden className="hero-glow-blue z-0" />
      <div aria-hidden className="hero-glow-green z-0" />

      {/* Content */}
      <div className="shell relative z-10 flex h-full flex-col items-center text-center pt-[clamp(110px,14.48vw,278px)]">
        {/* Capabilities badge */}
        <div className="inline-flex items-center gap-[clamp(8px,0.68vw,13px)] rounded-full bg-black/70 p-[clamp(5px,0.47vw,9px)] pr-[clamp(12px,1.2vw,23px)] backdrop-blur-sm">
          <span className="gradient-btn inline-flex h-[clamp(24px,1.67vw,32px)] items-center justify-center rounded-full px-[clamp(10px,0.78vw,15px)] text-d14 font-medium text-white">
            Capabilities
          </span>
          <span className="text-d16 font-medium text-white">
            Digital Transformation
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-[clamp(16px,2.45vw,47px)] max-w-[1400px] text-d80 font-normal leading-[1.21] text-white">
          {title}
        </h1>

        {/* Sub-headline */}
        <p className="mt-[clamp(10px,0.9vw,14px)] whitespace-pre-line text-d18 font-normal leading-[1.36] text-text-footer">
          {description}
        </p>

        {/* Prompt / search card */}
        <div className="glass mt-[clamp(26px,4.27vw,82px)] flex w-[min(835px,100%)] flex-col rounded-[16px] p-[clamp(13px,1.09vw,21px)] text-left shadow-2xl">
          <label htmlFor="hero-prompt" className="sr-only">
            Ask SPEC anything
          </label>
          <input
            id="hero-prompt"
            type="text"
            placeholder="Ask SPEC to anything..."
            className="w-full bg-transparent font-nunito text-d18 leading-[clamp(20px,1.25vw,24px)] text-white outline-none placeholder:text-white/85"
          />

          <div className="mt-0.5 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-[clamp(6px,0.63vw,12px)]">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="inline-flex h-[clamp(26px,1.67vw,32px)] items-center rounded-full bg-glass-pill px-[clamp(10px,0.78vw,15px)] font-nunito text-d12 font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/20"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <button
              type="submit"
              aria-label="Submit prompt"
              className="gradient-btn flex size-[clamp(30px,1.88vw,36px)] shrink-0 items-center justify-center rounded-full text-white transition-[filter] hover:brightness-110"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h13" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

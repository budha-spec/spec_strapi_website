import ParticlesCanvas from '@/components/ui/ParticlesCanvas';
import DotSphere from '@/components/ui/DotSphere';
import { CapabilityTicker } from '@/components/ui/CapabilityTicker';
import { cmsText } from '@/lib/media';
import type { HomeHeroBlock } from '../types/home.types';

interface HeroSectionProps {
  data: HomeHeroBlock;
}

export function HeroSection({ data }: HeroSectionProps) {
  const title = cmsText(data.title);
  const description = cmsText(data.description);
  const capabilities = (data.capabilities ?? [])
    .map((item) => cmsText(item.title))
    .filter(Boolean);

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

      {/*
        One continuous blurred ellipse spanning the full width — this is a
        single Figma layer, so the blue and green sides blend without any seam.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[29.7%] bottom-0 z-0 overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/hero-glow.svg"
          alt=""
          width={1922}
          height={900}
          className="absolute left-0 top-0 w-full opacity-[0.67]"
        />
      </div>

      {/* Rotating sphere of dots, centred just above the midpoint */}
      <div className="pointer-events-none absolute left-1/2 top-[11.6%] z-0 aspect-square w-[min(700px,68vw)] -translate-x-1/2 mask-sphere">
        <DotSphere count={4200} />
      </div>

      {/*
        Bright crescent that reads through the translucent prompt card. In Figma
        this is the sphere's dense lower cap blended with plus-lighter; a soft
        highlight reproduces it without depending on blend-mode support.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[56%] z-0 h-[30%] w-[min(760px,58vw)] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse at 50% 76%, rgba(255,255,255,0.62) 0%, rgba(214,236,255,0.30) 34%, rgba(170,210,255,0.10) 58%, transparent 78%)',
        }}
      />

      {/* Content */}
      <div className="shell relative z-10 flex h-full flex-col items-center text-center pt-[clamp(110px,14.48vw,278px)]">
        {capabilities.length > 0 && (
          <div className="inline-flex items-center gap-[clamp(8px,0.68vw,13px)] rounded-full border border-[#6a6a6a] bg-black/70 p-[clamp(5px,0.47vw,9px)] pr-[clamp(12px,1.2vw,23px)] backdrop-blur-[4px]">
            <span
              className="gradient-btn inline-flex h-[clamp(24px,1.67vw,32px)] items-center justify-center rounded-full px-[clamp(10px,0.78vw,15px)] text-d14 font-medium whitespace-nowrap text-white capitalize"
              style={{ ['--grad-angle' as string]: '-67.44deg' }}
            >
              Capabilities
            </span>
            <CapabilityTicker
              items={capabilities}
              className="w-[clamp(120px,9.74vw,187px)] text-left"
            />
          </div>
        )}

        {/* Headline */}
        <h1 className="mt-[clamp(16px,2.45vw,47px)] text-d80 font-medium leading-[1.21] text-white">
          {title}
        </h1>

        {/* Sub-headline */}
        <p className="mt-[clamp(10px,0.9vw,14px)] whitespace-pre-line text-d18 font-normal leading-[1.36] text-white">
          {description}
        </p>

        {/* Prompt card */}
        <div className="mt-[clamp(26px,4.27vw,82px)] flex h-[clamp(150px,10.42vw,200px)] w-[min(835px,100%)] flex-col justify-between rounded-[16px] border border-glass-border bg-[rgba(0,0,0,0.4)] p-[clamp(13px,1.04vw,20px)] text-left backdrop-blur-[20px]">
          <label htmlFor="hero-prompt" className="sr-only">
            Ask SPEC anything
          </label>
          <input
            id="hero-prompt"
            type="text"
            placeholder="Ask SPEC to anything..."
            className="w-full bg-transparent font-nunito text-d18 text-white outline-none placeholder:text-white/85"
          />

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              aria-label="Submit prompt"
              className="gradient-btn flex size-[clamp(30px,1.88vw,36px)] shrink-0 items-center justify-center rounded-full text-white transition-[filter] hover:brightness-110"
              style={{ ['--grad-angle' as string]: '-82.43deg' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="size-[55%]"
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

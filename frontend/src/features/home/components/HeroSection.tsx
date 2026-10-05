import Image from 'next/image';

interface HeroSectionProps {
  data?: any;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-bg-black overflow-hidden pt-24">
      {/* Background glow effects */}
      <div className="hero-glow-blue opacity-50" />
      <div className="hero-glow-green opacity-50" />

      {/* Globe/particles placeholder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-4 pt-10 pb-20">
        
        {/* Capabilities Pill */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-full p-1 pr-4 mb-8 backdrop-blur-sm">
          <span className="bg-brand-blue text-white text-xs font-bold px-3 py-1.5 rounded-full">
            Capabilities
          </span>
          <span className="text-white text-xs font-medium">Digital Transformation</span>
        </div>

        {/* Headline */}
        <h1 className="text-[40px] md:text-[60px] lg:text-[72px] font-medium text-white leading-[1.1] tracking-normal text-center mb-6 font-sans max-w-4xl">
          Building Next-gen AI-ready Software
        </h1>

        {/* Subheadline */}
        <p className="text-sm md:text-base text-text-light max-w-2xl text-center mb-16 whitespace-pre-line">
          Building custom software and intelligent platforms since 1987 to help global
          enterprises modernize and scale faster.
        </p>

        {/* Search Bar / Chat Input Panel */}
        <div className="w-full max-w-[700px] glass rounded-2xl p-4 flex flex-col gap-6 mx-auto border border-white/20 bg-black/40 shadow-2xl">
          {/* Input field */}
          <div className="flex items-center justify-between w-full">
             <input 
               type="text" 
               placeholder="Ask SPEC to anything.." 
               className="w-full bg-transparent outline-none text-white text-sm placeholder-white/50"
             />
          </div>

          {/* Footer with quick links + send button */}
          <div className="flex items-center justify-between gap-4 mt-4 border-t border-white/10 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              {['Modernize Legacy Software', 'Build a Business Application', 'AI to Our Product'].map((label) => (
                <span
                  key={label}
                  className="text-[10px] md:text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-white/80 cursor-pointer hover:bg-white/20 transition-colors whitespace-nowrap"
                >
                  {label}
                </span>
              ))}
            </div>
            {/* Send button — gradient */}
            <button className="h-8 w-8 rounded-full gradient-btn flex items-center justify-center text-white shrink-0 hover:brightness-110 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-bg-black overflow-hidden pt-24">
      <div className="h-20 w-3/4 bg-white/10 rounded-lg animate-pulse" />
    </section>
  );
}

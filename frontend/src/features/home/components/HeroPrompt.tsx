'use client';

import { useState } from 'react';

interface HeroPromptProps {
  /** Prefill chips shown under the field. */
  suggestions: string[];
}

/**
 * The hero's "Ask SPEC" card. Split out of `HeroSection` so the headline and
 * copy stay server-rendered and only this card ships to the client.
 */
export function HeroPrompt({ suggestions }: HeroPromptProps) {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="mt-[clamp(26px,4.27vw,82px)] flex h-[clamp(150px,10.42vw,200px)] w-[min(835px,100%)] flex-col justify-between rounded-[16px] border border-glass-border bg-[rgba(0,0,0,0.55)] p-[clamp(13px,1.04vw,20px)] text-left backdrop-blur-[28px]">
      <label htmlFor="hero-prompt" className="sr-only">
        Ask SPEC anything
      </label>
      <input
        id="hero-prompt"
        type="text"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Ask SPEC to anything..."
        className="w-full bg-transparent font-nunito text-d18 text-white outline-none placeholder:text-white/85"
      />

      <div className="flex items-end justify-between gap-3">
        {/* Prefill chips — tapping one drops the phrase into the field. */}
        <div className="flex flex-wrap items-center gap-[clamp(6px,0.52vw,10px)]">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setPrompt(suggestion)}
              className="rounded-full border border-white/15 bg-white/[0.08] px-[clamp(8px,0.73vw,14px)] py-[clamp(4px,0.36vw,7px)] text-d12 font-normal whitespace-nowrap text-white/90 transition-colors hover:border-white/30 hover:bg-white/[0.16]"
            >
              {suggestion}
            </button>
          ))}
        </div>

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
  );
}

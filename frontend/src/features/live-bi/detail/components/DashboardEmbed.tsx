'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { DashboardActionBlock } from '../../types/live-bi.types';

/** Only real https embeds — a typo'd or `javascript:` URL in the CMS renders nothing. */
function embedUrl(url?: string | null): string | null {
  try {
    const parsed = new URL(cmsText(url).trim());
    return parsed.protocol === 'https:' ? parsed.href : null;
  } catch {
    return null;
  }
}

/** "Disclaimer: The data…" → the label (gradient) and the rest. */
function splitDisclaimer(text: string): { label: string; body: string } {
  const match = /^\s*(disclaimer\s*:)\s*/i.exec(text);
  return match
    ? { label: match[1], body: text.slice(match[0].length) }
    : { label: '', body: text };
}

function ExpandIcon({ exit }: { exit: boolean }) {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {exit ? (
        <path d="M6 1.5V6H1.5M10 1.5V6h4.5M6 14.5V10H1.5M10 14.5V10h4.5" />
      ) : (
        <path d="M1.5 6V1.5H6M14.5 6V1.5H10M1.5 10v4.5H6M14.5 10v4.5H10" />
      )}
    </svg>
  );
}

/**
 * "See the dashboard in action" — the live report in a white card with a
 * thin black frame (Figma 432:6873), then the disclaimer.
 *
 * The frame is sized to the report rather than the other way round: a
 * 16:9 page plus the embed's page bar (taller on phones), so the whole dashboard fits
 * inside the border at every width and nothing is cut off at the edges.
 * It never grows taller than the screen; the embed letterboxes then, still
 * whole. Small screens get "Full screen" to read it at full size (browsers
 * without element full screen, e.g. iPhone Safari, open the report in a tab).
 */
export function DashboardEmbed({
  data,
  dashboardTitle,
}: {
  data: DashboardActionBlock;
  /** For the iframe's accessible name, e.g. "CEO Dashboard". */
  dashboardTitle: string;
}) {
  const src = embedUrl(data.url);
  const frameRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  if (!src) return null;

  const toggleFullscreen = () => {
    const frame = frameRef.current;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (frame?.requestFullscreen && document.fullscreenEnabled) {
      void frame.requestFullscreen();
    } else {
      window.open(src, '_blank', 'noopener,noreferrer');
    }
  };

  const disclaimer = splitDisclaimer(cmsText(data.disclaimerTxt).trim());

  return (
    <section className="sp-section sp-dashboard-embed w-full bg-bg-light pt-[clamp(32px,3.13vw,60px)] pb-[clamp(48px,6.82vw,131px)]">
      <div className="shell">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}

          <button
            type="button"
            onClick={toggleFullscreen}
            className="dashboard-fullscreen inline-flex h-[clamp(32px,1.98vw,38px)] cursor-pointer items-center gap-2 rounded-full border border-stroke-main bg-bg-white px-[clamp(14px,1.04vw,20px)] text-d14 leading-none text-text-primary transition-colors hover:border-transparent hover:bg-bg-dark hover:text-white focus-visible:border-transparent focus-visible:bg-bg-dark focus-visible:text-white"
          >
            <ExpandIcon exit={fullscreen} />
            {fullscreen ? 'Exit full screen' : 'Full screen'}
          </button>
        </div>

        <div className="mt-[clamp(20px,3.13vw,60px)] rounded-[14px] bg-bg-white p-[clamp(8px,1.56vw,30px)]">
          {/* The query container: the frame's height follows its own width. */}
          <div className="@container">
            <div
              ref={frameRef}
              className="dashboard-frame relative h-[calc(56.25cqw+60px)] sm:h-[calc(56.25cqw+38px)] max-h-[calc(100svh-120px)] w-full overflow-hidden rounded-[clamp(8px,0.73vw,14px)] border border-text-primary bg-bg-chip [&:fullscreen]:max-h-none [&:fullscreen]:rounded-none [&:fullscreen]:border-0 [&:fullscreen]:bg-bg-black"
            >
              {!loaded && (
                <div
                  aria-hidden
                  className="absolute inset-0 animate-pulse bg-stroke-outline/40 motion-reduce:animate-none"
                />
              )}
              <iframe
                src={src}
                title={`${dashboardTitle} — live dashboard`}
                loading="lazy"
                allowFullScreen
                onLoad={() => setLoaded(true)}
                className="relative block size-full border-0"
              />
            </div>
          </div>
        </div>

        {disclaimer.body && (
          <p className="sp-dashboard-disclaimer mt-[clamp(12px,1.04vw,20px)] text-d18 leading-[1.3] text-text-primary">
            {disclaimer.label && (
              <span className="gradient-text font-medium">{disclaimer.label}</span>
            )}{' '}
            {disclaimer.body}
          </p>
        )}
      </div>
    </section>
  );
}

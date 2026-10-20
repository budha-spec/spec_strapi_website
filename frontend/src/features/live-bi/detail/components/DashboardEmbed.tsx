'use client';

import { useState } from 'react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
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

/**
 * "See the dashboard in action" — the live report in a white card with a
 * thin black frame (Figma 432:6873), then the disclaimer.
 *
 * The frame is sized to the report rather than the other way round. A
 * Power BI embed scales its 16:9 page to fit the iframe and pads any spare
 * room with blank bands, so the frame's height follows its own width: 16:9
 * of it plus the embed's footer (`--pbi-bar`, measured at 59px at every width). The report then
 * fills the border edge to edge at every width and screen height — no
 * bands, nothing cut off. Deliberately no viewport-height cap: capping it is
 * what letterboxes the report on short browser windows.
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
  const [loaded, setLoaded] = useState(false);

  if (!src) return null;

  const disclaimer = splitDisclaimer(cmsText(data.disclaimerTxt).trim());

  return (
    <section className="sp-section sp-dashboard-embed w-full bg-bg-light pt-[clamp(32px,3.13vw,60px)] pb-[clamp(48px,6.82vw,131px)]">
      <div className="shell">
        {data.title && <SectionEyebrow>{cmsText(data.title)}</SectionEyebrow>}

        <div className="mt-[clamp(20px,3.13vw,60px)] rounded-[14px] bg-bg-white p-[clamp(8px,1.56vw,30px)]">
          {/* The query container: the frame's height follows its own width. */}
          <div className="@container">
            <div className="dashboard-frame relative h-[calc(56.25cqw+var(--pbi-bar)+1px)] w-full overflow-hidden rounded-[clamp(8px,0.73vw,14px)] border border-text-primary bg-bg-chip [--pbi-bar:59px]">
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

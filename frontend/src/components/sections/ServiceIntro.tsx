'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { RichText } from '@/components/ui/RichText';
import { cmsText, hrefPath } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { RichTextBlock } from '@/types/sections.types';

interface ServiceIntroProps {
  data: RichTextBlock;
}

/**
 * Overview band — gradient heading on the left, rich copy on the right
 * (service "AI Built for Business Enterprise", case study "Our Business
 * Model Overview").
 * "More +" links out when the block has a `url`; otherwise it expands the
 * clamped copy, and only appears when there is more to read.
 */
export function ServiceIntro({ data }: ServiceIntroProps) {
  const [expanded, setExpanded] = useState(false);
  const [clipped, setClipped] = useState(false);
  /** Natural height of the copy, so the expand can animate to it. */
  const [fullHeight, setFullHeight] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyId = useId();

  useEffect(() => {
    const body = bodyRef.current;
    if (!body || data.url) return;
    const measure = () => {
      setFullHeight(body.scrollHeight);
      if (!expanded) setClipped(body.scrollHeight > body.clientHeight + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    if (body.firstElementChild) observer.observe(body.firstElementChild);
    return () => observer.disconnect();
  }, [data.url, expanded]);

  const moreClass =
    'gradient-text mt-[clamp(12px,1.04vw,20px)] inline-flex w-fit cursor-pointer items-center gap-1 text-d18 font-semibold';

  return (
    <section className="sp-section sp-service-intro w-full bg-bg-light pt-[clamp(40px,3.65vw,70px)] pb-[clamp(40px,4.17vw,80px)]">
      <div className="shell grid gap-[clamp(16px,2vw,32px)] lg:grid-cols-[minmax(0,404fr)_minmax(0,836fr)] lg:gap-x-[clamp(40px,8.96vw,172px)]">
        {data.title && (
          <h2
            className="sp-title gradient-text w-fit text-d40 font-semibold leading-[1.2]"
            style={{ ['--grad-angle' as string]: '-60deg' }}
          >
            {cmsText(data.title)}
          </h2>
        )}

        <div className="max-w-[836px]">
          <div
            ref={bodyRef}
            id={bodyId}
            className={cn(
              'text-d18 leading-[1.3] text-text-secondary',
              !data.url &&
                'overflow-hidden transition-[max-height] duration-500 ease-in-out'
            )}
            // Four lines at leading-1.3 when collapsed. A height clamp rather
            // than line-clamp, which stops at the rich-text block boundaries,
            // and it lets the open/close animate.
            style={
              data.url
                ? undefined
                : { maxHeight: expanded && fullHeight ? `${fullHeight}px` : '5.2em' }
            }
          >
            <RichText content={data.content} />
          </div>

          {data.url ? (
            <Link href={hrefPath(data.url)} className={moreClass}>
              More <span aria-hidden>+</span>
            </Link>
          ) : (
            (clipped || expanded) && (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={bodyId}
                onClick={() => setExpanded((value) => !value)}
                className={moreClass}
              >
                {expanded ? 'Less' : 'More'}{' '}
                <span aria-hidden>{expanded ? '−' : '+'}</span>
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}

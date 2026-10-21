'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CmsImage } from '@/components/ui/CmsImage';
import { useAutoAdvance } from '@/hooks/useAutoAdvance';
import type { InsightItem, InsightsPanelData } from '@/types/header-menu.types';
import type { Testimonial } from '@/types/sections.types';
import { MegaLink, MenuHeading, MenuIntroBlock, MenuProgress, MenuSlides } from './MenuParts';

function InsightThumb({ item }: { item: InsightItem }) {
  const external = /^https?:\/\//i.test(item.href);
  return (
    <Link
      href={item.href}
      className="mega-insight group/insight flex items-start gap-[20px]"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="block w-[clamp(120px,10.57vw,203px)] shrink-0 overflow-hidden rounded-[7px] bg-bg-darker">
        <CmsImage
          media={item.image}
          fallback="card"
          alt=""
          width={203}
          height={100}
          className="aspect-[203/100] w-full object-cover transition-transform duration-300 group-hover/insight:scale-105 group-focus-visible/insight:scale-105 motion-reduce:transition-none"
        />
      </span>
      <span className="line-clamp-3 pt-[clamp(4px,0.52vw,10px)] text-[14px] leading-[1.4] text-text-light transition-colors group-hover/insight:text-white group-focus-visible/insight:text-white">
        {item.title}
      </span>
    </Link>
  );
}

/**
 * Client quotes sliding past on their own while the menu is open. Slides sit
 * in one row, so the card takes the tallest quote's height.
 */
function TestimonialCard({ testimonials }: { testimonials: Testimonial[] }) {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useAutoAdvance(testimonials.length, paused, 4000);

  return (
    <div
      className="mega-testimonial hidden w-full max-w-[518px] self-start justify-self-end xl:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-[14px] bg-bg-card-dark">
        <MenuSlides index={index}>
          {testimonials.map((item, i) => (
            <figure
              key={item.id}
              aria-hidden={i !== index}
              className="flex min-h-[clamp(220px,15.63vw,300px)] w-full shrink-0 flex-col justify-between gap-6 p-[clamp(20px,1.56vw,30px)]"
            >
              <blockquote className="text-[14px] capitalize leading-[1.64] tracking-[0.02em] text-text-light">
                {item.description}
              </blockquote>
              <figcaption className="flex items-center gap-[clamp(10px,0.83vw,16px)]">
                <CmsImage
                  media={item.image}
                  fallback="portrait"
                  alt=""
                  width={48}
                  height={48}
                  className="size-[clamp(36px,2.5vw,48px)] rounded-full object-cover"
                />
                <span className="flex flex-col capitalize text-white">
                  <span className="text-[22px] font-semibold leading-[1.4]">{item.name}</span>
                  {item.designation && (
                    <span className="text-[14px] font-light leading-[1.4]">{item.designation}</span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </MenuSlides>
      </div>
      <MenuProgress
        index={index}
        count={testimonials.length}
        onSelect={setIndex}
        label="Show testimonial"
        className="mx-auto mt-[clamp(12px,0.99vw,19px)]"
      />
    </div>
  );
}

/**
 * "Insights": intro, the categories (hovering one previews its latest
 * entries in the middle column) and a client testimonial.
 */
export function InsightsPanel({ panel }: { panel: InsightsPanelData }) {
  const [activeId, setActiveId] = useState(panel.categories[0]?.id ?? null);
  const active = panel.categories.find((category) => category.id === activeId);

  return (
    // Figma at 1920: intro x=60 (306 wide), categories x=457 (207 wide),
    // thumbnails x=689 (203 image + 20 + 259 text), testimonial flush right.
    // The empty second track widens the intro→categories gap to 91px (25 + 41 + 25).
    <div className="grid gap-x-[clamp(16px,1.3vw,25px)] lg:grid-cols-[clamp(220px,15.94vw,306px)_clamp(0px,2.14vw,41px)_clamp(160px,10.78vw,207px)_minmax(0,482px)_minmax(0,1fr)]">
      <MenuIntroBlock intro={panel.intro} />

      <div className="min-w-0 lg:col-start-3">
        {panel.heading && <MenuHeading link={panel.heading} />}
        <ul className="mt-[20px] border-t border-stroke-dark">
          {panel.categories.map((category) => (
            <li key={category.id}>
              <MegaLink
                link={category}
                variant="row"
                active={category.id === activeId}
                onActivate={() => setActiveId(category.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ul
        key={activeId ?? 'none'}
        aria-label={active ? `Latest ${active.title}` : undefined}
        className="flex min-w-0 animate-[mega-fade_300ms_ease-out] flex-col gap-[12px] motion-reduce:animate-none"
      >
        {active?.items.map((item) => (
          <li key={item.id}>
            <InsightThumb item={item} />
          </li>
        ))}
      </ul>

      {panel.testimonials.length > 0 && <TestimonialCard testimonials={panel.testimonials} />}
    </div>
  );
}

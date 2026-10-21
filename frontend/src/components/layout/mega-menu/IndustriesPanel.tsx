'use client';

import { useState } from 'react';
import { CmsImage } from '@/components/ui/CmsImage';
import { useAutoAdvance } from '@/hooks/useAutoAdvance';
import { cn } from '@/lib/utils';
import type { IndustriesPanelData } from '@/types/header-menu.types';
import { MegaLink, MenuHeading, MenuIntroBlock, MenuProgress, MenuSlides } from './MenuParts';

type Showcase = NonNullable<IndustriesPanelData['showcase']>;

/**
 * Work samples sliding past on their own once the menu opens, with the
 * Behance / Dribbble pills under them.
 */
function IndustryShowcase({ showcase }: { showcase: Showcase }) {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useAutoAdvance(showcase.images.length, paused, 3000);

  return (
    <div
      className="mega-showcase hidden w-full max-w-[532px] self-start justify-self-end overflow-hidden rounded-[14px] bg-bg-white xl:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {showcase.images.length > 0 && (
        <div className="relative aspect-[532/299] overflow-hidden rounded-t-[14px] rounded-bl-[clamp(80px,7.29vw,140px)] bg-bg-dark">
          <MenuSlides index={index} className="h-full">
            {showcase.images.map((image, i) => (
              <CmsImage
                key={image.url ?? i}
                media={image}
                fallback="cover"
                alt=""
                width={image.width ?? 532}
                height={image.height ?? 299}
                className="h-full w-full shrink-0 object-cover"
              />
            ))}
          </MenuSlides>
          {/* Positioned by a wrapper: the track's own `relative` would win over `absolute`. */}
          <div className="absolute right-[clamp(20px,2.08vw,40px)] bottom-[clamp(12px,1.09vw,21px)]">
            <MenuProgress
              index={index}
              count={showcase.images.length}
              onSelect={setIndex}
              label="Show work sample"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 px-[clamp(16px,1.56vw,30px)] py-[clamp(10px,0.73vw,14px)]">
        {showcase.text && (
          <p className="max-w-[150px] text-[16px] font-medium leading-[1.4] text-text-primary">
            {showcase.text}
          </p>
        )}
        <ul className="flex flex-wrap gap-[clamp(6px,0.47vw,9px)]">
          {showcase.portfolio.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mega-portfolio group/pill relative flex items-center gap-[clamp(6px,0.52vw,10px)] overflow-hidden rounded-full border border-stroke-grey p-[4px] pr-[clamp(10px,0.83vw,16px)] text-[14px] text-text-primary transition-colors duration-300 hover:border-transparent hover:text-white focus-visible:border-transparent focus-visible:text-white"
              >
                <span
                  aria-hidden
                  className="gradient-btn absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/pill:opacity-100 group-focus-visible/pill:opacity-100 motion-reduce:transition-none"
                />
                <CmsImage
                  media={item.logo}
                  fallback="logo"
                  alt=""
                  width={36}
                  height={36}
                  className="relative size-[clamp(28px,1.88vw,36px)] rounded-full"
                />
                <span className="relative">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** "Industries": intro, Featured Industries in two columns, work showcase. */
export function IndustriesPanel({ panel }: { panel: IndustriesPanelData }) {
  return (
    // Figma at 1920: intro x=60 (306 wide), link columns x=457 and x=830
    // (242 wide each), showcase flush right.
    <div className="grid gap-x-[clamp(32px,4.74vw,91px)] lg:grid-cols-[clamp(220px,15.94vw,306px)_auto_minmax(0,1fr)]">
      <MenuIntroBlock intro={panel.intro} />

      <div className="min-w-0">
        {panel.heading && <MenuHeading link={panel.heading} />}
        {/* Row-major: Strapi lists them left, right, left, … like the Figma columns. */}
        <ul className="mt-[20px] grid grid-cols-[repeat(2,clamp(160px,12.6vw,242px))] gap-x-[clamp(32px,6.82vw,131px)]">
          {panel.links.map((link, i) => (
            <li key={link.id} className={cn(i < 2 && 'border-t border-stroke-dark')}>
              <MegaLink link={link} variant="row" />
            </li>
          ))}
        </ul>
      </div>

      {panel.showcase && <IndustryShowcase showcase={panel.showcase} />}
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type {
  CaseStudyEntry,
  CaseStudyFilterOption,
} from '../../types/case-study.types';
import { CaseStudyCard } from './CaseStudyCard';

interface CaseStudyExplorerProps {
  studies: CaseStudyEntry[];
  services: CaseStudyFilterOption[];
  industries: CaseStudyFilterOption[];
}

const ALL = 'all';

interface FilterRowProps {
  label: string;
  options: CaseStudyFilterOption[];
  value: string;
  onChange: (slug: string) => void;
}

/** One white filter box (Figma 185:4431): gradient label + grey pill chips. */
function FilterRow({ label, options, value, onChange }: FilterRowProps) {
  const chips = [{ slug: ALL, title: 'All' }, ...options];

  return (
    <div
      role="group"
      aria-label={`Filter by ${label.toLowerCase()}`}
      className="flex flex-col gap-3 rounded-[14px] bg-bg-white px-[clamp(16px,1.56vw,30px)] py-[clamp(14px,1.3vw,16px)] md:flex-row md:items-start md:gap-0"
    >
      <span
        className="gradient-text-alt w-fit shrink-0 text-d16 font-semibold leading-[1.4] md:w-[clamp(96px,6.15vw,118px)] md:pt-[clamp(6px,0.47vw,9px)]"
        style={{ ['--grad-angle' as string]: '115.24deg' }}
      >
        {label}
      </span>
      <ul className="flex flex-wrap gap-x-[clamp(8px,0.63vw,12px)] gap-y-[clamp(8px,0.52vw,10px)]">
        {chips.map((chip) => {
          const active = chip.slug === value;
          return (
            <li key={chip.slug}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onChange(chip.slug)}
                className={cn(
                  'case-study-filter inline-flex h-[clamp(32px,1.98vw,38px)] min-w-[clamp(52px,3.02vw,58px)] cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-[clamp(14px,1.04vw,20px)] text-[clamp(0.8125rem,0.78vw,0.9375rem)] leading-none transition-colors',
                  active
                    ? 'text-white'
                    : 'bg-bg-chip text-text-secondary  focus-visible:text-white'
                )}
                style={active ? { ['--grad-angle' as string]: '-68.41deg' } : undefined}
              >
                {cmsText(chip.title)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const matches = (terms: CaseStudyEntry['services'], slug: string) =>
  slug === ALL || (terms ?? []).some((term) => term.slug === slug);

/**
 * Filters + carousel for the case-study listing. Filtering is client-side
 * over every published study (AND across the two rows). The carousel shows
 * one card with the next peeking past the right edge, like Figma 185:4458.
 */
export function CaseStudyExplorer({
  studies,
  services,
  industries,
}: CaseStudyExplorerProps) {
  const [service, setService] = useState(ALL);
  const [industry, setIndustry] = useState(ALL);
  const [index, setIndex] = useState(0);

  const visible = useMemo(
    () =>
      studies.filter(
        (study) =>
          matches(study.services, service) && matches(study.industries, industry)
      ),
    [studies, service, industry]
  );
  const count = visible.length;
  const current = Math.min(index, Math.max(count - 1, 0));

  const pick = (setter: (slug: string) => void) => (slug: string) => {
    setter(slug);
    setIndex(0);
  };
  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + count) % count);

  return (
    <>
      {(services.length > 0 || industries.length > 0) && (
        <div className="sp-case-study-filters shell mt-[clamp(32px,3.13vw,60px)] flex flex-col gap-[clamp(12px,1.04vw,20px)]">
          {services.length > 0 && (
            <FilterRow label="Services" options={services} value={service} onChange={pick(setService)} />
          )}
          {industries.length > 0 && (
            <FilterRow label="Industries" options={industries} value={industry} onChange={pick(setIndustry)} />
          )}
        </div>
      )}

      {count === 0 ? (
        <div className="sp-case-study-empty shell mt-[clamp(32px,3.13vw,60px)] rounded-[14px] bg-bg-white px-6 py-[clamp(40px,4.17vw,80px)] text-center">
          <p className="text-d18 text-text-secondary">No case studies match these filters yet.</p>
          <button
            type="button"
            onClick={() => {
              setService(ALL);
              setIndustry(ALL);
              setIndex(0);
            }}
            className="gradient-btn mt-5 inline-flex h-[clamp(36px,2.19vw,42px)] cursor-pointer items-center rounded-full px-6 text-d16 text-white"
          >
            Show all case studies
          </button>
        </div>
      ) : (
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Case studies"
          className="sp-case-study-carousel mt-[clamp(32px,3.13vw,60px)] overflow-hidden"
        >
          {/*
            The track starts at the shell's left edge but may overflow to the
            right edge of the screen, so the next card peeks; the clip-path
            hides slides that have moved off to the left.
          */}
          <div className="shell [clip-path:inset(0_-100vw_0_0)]">
            <ul
              className="case-study-track flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{
                transform: `translate3d(calc(${-current} * (var(--cs-card) + var(--cs-gap))), 0, 0)`,
              }}
            >
              {visible.map((study, i) => (
                <li
                  key={study.id}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  className="shrink-0"
                >
                  <CaseStudyCard study={study} inert={i !== current} />
                </li>
              ))}
            </ul>
          </div>

          <div className="shell">
            <CarouselControls
              pill="dark"
              showArrows={count > 1}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              progress={{ index: current, count }}
            />
          </div>
        </div>
      )}
    </>
  );
}

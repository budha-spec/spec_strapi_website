'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { MegaMenuPanel, MenuGroup } from '@/types/header-menu.types';
import { MegaLink, MenuHeading } from './MenuParts';

/** The links of a panel as heading + list groups — no cards or previews on phones. */
function linkGroups(panel: MegaMenuPanel): MenuGroup[] {
  if (panel.kind === 'services') return panel.groups;
  const links = panel.kind === 'insights' ? panel.categories : panel.links;
  return panel.heading ? [{ ...panel.heading, links }] : [];
}

/** Below `lg`: each top menu opens as an accordion of its links. */
export function MobileMenu({
  panels,
  onNavigate,
}: {
  panels: MegaMenuPanel[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <nav
      aria-label="Mobile"
      className="sp-mobile-menu max-h-[calc(100dvh-86px)] overflow-y-auto overscroll-contain border-b border-white/10 bg-black/95 backdrop-blur-md lg:hidden"
      onClickCapture={(event) => {
        if ((event.target as HTMLElement).closest('a')) onNavigate();
      }}
    >
      <ul className="shell flex flex-col py-4">
        {panels.map((panel) => {
          const isOpen = expanded === panel.slug;
          return (
            <li key={panel.id} className="border-b border-white/10">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`mobile-menu-${panel.slug}`}
                onClick={() => setExpanded(isOpen ? null : panel.slug)}
                className="flex w-full items-center justify-between py-3 text-left text-base text-white"
              >
                {panel.label}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isOpen && (
                <div id={`mobile-menu-${panel.slug}`} className="flex flex-col gap-5 pb-5 pl-3">
                  {panel.kind === 'services' && panel.heading && (
                    <MenuHeading link={panel.heading} tone="white" />
                  )}
                  {linkGroups(panel).map((group) => (
                    <div key={group.id}>
                      <MenuHeading link={group} />
                      {group.links.length > 0 && (
                        <ul className="mt-3 flex flex-col gap-3 pl-1">
                          {group.links.map((link) => (
                            <li key={link.id}>
                              <MegaLink link={link} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>
          );
        })}
        <li className="pt-4">
          <Link
            href="/contact-us"
            className="gradient-btn inline-flex h-10 items-center rounded-full px-6 text-sm text-white"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

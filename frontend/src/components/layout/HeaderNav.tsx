'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import type { MegaMenuPanel } from '@/types/header-menu.types';
import { AboutPanel } from './mega-menu/AboutPanel';
import { IndustriesPanel } from './mega-menu/IndustriesPanel';
import { InsightsPanel } from './mega-menu/InsightsPanel';
import { MobileMenu } from './mega-menu/MobileMenu';
import { ServicesPanel } from './mega-menu/ServicesPanel';

function MegaPanel({ panel }: { panel: MegaMenuPanel }) {
  switch (panel.kind) {
    case 'services':
      return <ServicesPanel panel={panel} />;
    case 'about':
      return <AboutPanel panel={panel} />;
    case 'industries':
      return <IndustriesPanel panel={panel} />;
    case 'insights':
      return <InsightsPanel panel={panel} />;
  }
}

/**
 * The fixed header: logo, the four mega-menu triggers and Contact Us.
 * `panels` is null while the menu is loading (Suspense fallback).
 *
 * A trigger opens its panel on click; the gradient bar slides under the open
 * menu to mark it active.
 */
export function HeaderNav({ panels }: { panels: MegaMenuPanel[] | null }) {
  const pathname = usePathname();
  const router = useRouter();
  // Remember the path a menu was opened on: navigating closes it without an effect.
  const [opened, setOpened] = useState<{ slug: string; path: string } | null>(null);
  const [mobile, setMobile] = useState<string | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  const openSlug = opened?.path === pathname ? opened.slug : null;
  const mobileOpen = mobile === pathname;
  const openPanel = panels?.find((panel) => panel.slug === openSlug) ?? null;

  const close = () => setOpened(null);

  /**
   * On the home page the logo link would do nothing, so glide back to the top
   * and refresh the server data in place — a reload without the white flash.
   */
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/' || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setOpened(null);
    setMobile(null);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    router.refresh();
  };

  useEffect(() => {
    if (!openSlug) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpened(null);
      triggers.current[openSlug]?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openSlug]);

  return (
    <MotionConfig reducedMotion="user">
      {/*
        Fixed, not sticky: pages already start under the header (heroes pad
        for it), so it stays out of the flow and floats over every section as
        you scroll. Glass bar per Figma — translucent black + strong blur, so
        the section behind shows through softly.
      */}
      <header className="sp-header fixed inset-x-0 top-0 z-50">
        {/* Click outside an open panel closes it. */}
        {openPanel && (
          <div aria-hidden className="fixed inset-0 hidden lg:block" onClick={close} />
        )}

        <div className="sp-header-bar relative h-[86px] bg-bg-black/60 backdrop-blur-[20px] backdrop-saturate-150">
          <div className="shell flex h-full items-center justify-between gap-6">
            {/*
              The nav sits close to the logo rather than centred — in the design
              it starts at x=489 on a 1920 canvas, 180px after the logo.
            */}
            <div className="flex h-full items-center gap-[clamp(20px,9.38vw,180px)]">
              <Link href="/" onClick={handleLogoClick} className="shrink-0" aria-label="SPEC India — home">
                <Image
                  src="/logo.png"
                  alt="SPEC India"
                  width={260}
                  height={42}
                  priority
                  className="h-[clamp(26px,1.78vw,34px)] w-auto"
                />
              </Link>

              <nav className="hidden h-full items-center gap-9 lg:flex" aria-label="Main">
                {panels === null &&
                  Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="h-4 w-20 animate-pulse rounded bg-white/15" />
                  ))}
                {panels?.map((panel) => {
                  const isOpen = panel.slug === openSlug;
                  return (
                    <button
                      key={panel.id}
                      ref={(node) => {
                        triggers.current[panel.slug] = node;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`mega-menu-${panel.slug}`}
                      onClick={() =>
                        setOpened(isOpen ? null : { slug: panel.slug, path: pathname })
                      }
                      className="sp-nav-item relative flex h-full cursor-pointer items-center text-d18 font-normal whitespace-nowrap text-white"
                    >
                      {panel.label}
                      {isOpen && (
                        <motion.span
                          layoutId="sp-nav-bar"
                          aria-hidden
                          className="sp-nav-bar gradient-btn absolute inset-x-0 bottom-[4px] mx-auto h-[3px] w-[44px] rounded-full"
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contact-us"
                className="gradient-btn hidden h-[clamp(36px,2.19vw,42px)] items-center justify-center rounded-full px-[clamp(14px,1.04vw,20px)] text-d16 leading-[1.4] font-normal whitespace-nowrap text-white transition-[filter] hover:brightness-110 sm:inline-flex"
                style={{ ['--grad-angle' as string]: '-68.41deg' }}
              >
                Contact Us
              </Link>

              <button
                type="button"
                onClick={() => setMobile(mobileOpen ? null : pathname)}
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation menu"
                className="p-2 text-white lg:hidden"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="18" x2="20" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openPanel && (
            <motion.div
              key={openPanel.slug}
              id={`mega-menu-${openPanel.slug}`}
              role="region"
              aria-label={openPanel.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="sp-mega-menu absolute inset-x-0 top-full hidden max-h-[calc(100dvh-86px)] overflow-y-auto bg-bg-dark lg:block"
              // Following a link closes the panel, even to the page already open.
              onClickCapture={(event) => {
                if ((event.target as HTMLElement).closest('a')) close();
              }}
            >
              <div className="shell pt-[clamp(20px,1.56vw,30px)] pb-[clamp(30px,3.13vw,60px)]">
                {/* Figma starts the panel 50px left of the logo (x=60 on 1920) and ends it with Contact Us. */}
                <div className={`sp-mega-${openPanel.kind} -ml-[clamp(0px,2.6vw,50px)]`}>
                  <MegaPanel panel={openPanel} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {mobileOpen && panels && (
          <MobileMenu panels={panels} onNavigate={() => setMobile(null)} />
        )}
      </header>
    </MotionConfig>
  );
}

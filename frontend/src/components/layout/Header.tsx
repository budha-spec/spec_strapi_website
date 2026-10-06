'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'What we do', href: '#services' },
  { label: 'Who we are', href: '#about' },
  { label: 'Industries', href: '#industries' },
  { label: 'Insights', href: '#insights' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="h-[86px] border-b border-[#242424] bg-[#0d0d0d]/70 backdrop-blur-[2px]">
        <div className="shell flex h-full items-center justify-between gap-6">
          {/*
            The nav sits close to the logo rather than centred — in the design
            it starts at x=489 on a 1920 canvas, 180px after the logo.
          */}
          <div className="flex items-center gap-[clamp(20px,9.38vw,180px)]">
            <Link href="/" className="shrink-0" aria-label="SPEC India — home">
              <Image
                src="/logo.png"
                alt="SPEC India"
                width={260}
                height={42}
                priority
                className="h-[clamp(26px,1.78vw,34px)] w-auto"
              />
            </Link>

            <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-d18 whitespace-nowrap text-white transition-colors hover:text-brand-green',
                    i === 0 ? 'font-semibold' : 'font-normal'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="gradient-btn hidden h-[clamp(36px,2.19vw,42px)] items-center justify-center rounded-full px-[clamp(14px,1.04vw,20px)] text-d16 leading-[1.4] font-normal whitespace-nowrap text-white transition-[filter] hover:brightness-110 sm:inline-flex"
              style={{ ['--grad-angle' as string]: '-68.41deg' }}
            >
              Contact Us
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
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
                {open ? (
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

      {open && (
        <nav
          className="border-b border-white/10 bg-black/95 backdrop-blur-md lg:hidden"
          aria-label="Mobile"
        >
          <ul className="shell flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-white hover:text-brand-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="gradient-btn inline-flex h-10 items-center rounded-full px-6 text-sm text-white"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

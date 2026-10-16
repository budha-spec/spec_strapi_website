'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface HideOnRoutesProps {
  /** Exact paths where `children` is not rendered, e.g. `/contact-us`. */
  paths: readonly string[];
  children: ReactNode;
}

/**
 * Drops server-rendered layout content on the listed routes — the layout
 * itself cannot read the path. Used to keep the Footer's enquiry form off
 * pages that already show it.
 */
export function HideOnRoutes({ paths, children }: HideOnRoutesProps) {
  const pathname = usePathname().replace(/\/+$/, '') || '/';
  return paths.includes(pathname) ? null : children;
}

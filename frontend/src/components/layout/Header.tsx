import { fetchHeaderMenu } from '@/lib/api/header-menu.api';
import { HeaderNav } from './HeaderNav';

/**
 * Site header on every page. The mega menu (Strapi `header-menus`) is fetched
 * here on the server, so every panel is ready the moment a menu is clicked.
 */
export async function Header() {
  const panels = await fetchHeaderMenu();
  return <HeaderNav panels={panels} />;
}

/** Suspense fallback: the same bar with placeholder menu items. */
export function HeaderSkeleton() {
  return <HeaderNav panels={null} />;
}

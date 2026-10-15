import { hrefPath } from '@/lib/media';
import type { Industry } from '../types/industries.types';

/**
 * An industry's detail page. Uses its own `url` once the collection has
 * one; until then `/industries/<slug>`, the route the live site already
 * serves (and search engines index) for these slugs.
 */
export function industryHref(industry: Industry): string {
  return hrefPath(industry.url || `industries/${industry.slug}`);
}

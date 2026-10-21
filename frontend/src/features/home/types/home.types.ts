import type {
  BlogsBlock,
  CaseStudiesBlock,
  GalleryBlock,
  MetricsBlock,
  SolutionsBlock,
  TestimonialsBlock,
} from '@/types/sections.types';

export interface HomeCapability {
  id: number;
  title: string;
}

export interface HomeHeroBlock {
  __component: 'shared.home-page-section1';
  id: number;
  title: string;
  description?: string | null;
  capabilities?: HomeCapability[] | null;
  /** Prefill chips under the hero prompt field. Falls back to defaults. */
  suggestions?: HomeCapability[] | null;
}

export type HomeBlock =
  | HomeHeroBlock
  | GalleryBlock
  | SolutionsBlock
  | MetricsBlock
  | CaseStudiesBlock
  | TestimonialsBlock
  | BlogsBlock;

export interface HomePageEntry {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  content?: Array<HomeBlock | { __component: string; id: number }> | null;
}

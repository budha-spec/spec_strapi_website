import type { CmsMedia } from '@/lib/media';
import type {
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

export interface HomeBlogCategory {
  id: number;
  name?: string | null;
  slug?: string | null;
}

export interface HomeBlog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: CmsMedia | null;
  category?: HomeBlogCategory[] | HomeBlogCategory | null;
}

export interface HomeBlogsBlock {
  __component: 'shared.home-blogs';
  id: number;
  title: string;
  subTitle?: string | null;
  url?: string | null;
  blogs?: HomeBlog[] | null;
}

export type HomeBlock =
  | HomeHeroBlock
  | GalleryBlock
  | SolutionsBlock
  | MetricsBlock
  | CaseStudiesBlock
  | TestimonialsBlock
  | HomeBlogsBlock;

export interface HomePageEntry {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  content?: Array<HomeBlock | { __component: string; id: number }> | null;
}

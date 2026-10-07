import type { CmsMedia } from '@/lib/media';

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

export interface HomeGalleryBlock {
  __component: 'shared.gallery';
  id: number;
  title?: string | null;
  images?: CmsMedia[] | null;
}

export interface HomeRelatedPage {
  id: number;
  title?: string | null;
  slug?: string | null;
}

export interface HomeSolutionItem {
  id: number;
  title: string;
  description?: string | null;
  txt?: string | null;
  url?: string | null;
  image?: CmsMedia | null;
  pages?: HomeRelatedPage[] | null;
}

export interface HomeSolutionsBlock {
  __component: 'shared.enterprise-solution';
  id: number;
  title?: string | null;
  subTitle?: string | null;
  enterpriseSolution?: HomeSolutionItem[] | null;
}

export interface HomeMetric {
  id: number;
  number: string;
  name: string;
  description?: string | null;
}

export interface HomeMetricsBlock {
  __component: 'shared.key-metrics-section';
  id: number;
  title: string;
  description?: string | null;
  keyMetrics?: HomeMetric[] | null;
}

export interface HomeLabeledItem {
  id: number;
  title?: string | null;
}

export interface HomeCaseStudy {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  featuredImage?: CmsMedia | null;
  industries?: HomeLabeledItem[] | null;
  tags?: HomeLabeledItem[] | null;
}

export interface HomeCaseStudiesBlock {
  __component: 'shared.case-studies';
  id: number;
  title: string;
  subTitle?: string | null;
  url?: string | null;
  case_studies?: HomeCaseStudy[] | null;
}

export interface HomeTestimonial {
  id: number;
  name: string;
  designation?: string | null;
  description?: string | null;
  videoUrl?: string | null;
  image?: CmsMedia | null;
}

export interface HomeTestimonialsBlock {
  __component: 'shared.testimonial-section';
  id: number;
  title: string;
  subTitle?: string | null;
  url?: string | null;
  testimonials?: HomeTestimonial[] | null;
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
  | HomeGalleryBlock
  | HomeSolutionsBlock
  | HomeMetricsBlock
  | HomeCaseStudiesBlock
  | HomeTestimonialsBlock
  | HomeBlogsBlock;

export interface HomePageEntry {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  content?: Array<HomeBlock | { __component: string; id: number }> | null;
}

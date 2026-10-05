/**
 * Home page API functions.
 * All fetches use strapiGet() — never call fetch() directly.
 * Each function has its own revalidation interval.
 */

import { strapiGet } from '@/lib/api/strapi';
import { ENDPOINTS, REVALIDATE } from '@/lib/api/endpoints';
import type { StrapiResponse, StrapiListResponse } from '@/types/strapi';
import type {
  HeroData,
  Client,
  Service,
  CaseStudy,
  Testimonial,
  BlogPost,
  GlobalData,
} from '../types/home.types';

/** Hero section + Stats data (comes from home-page content type) */
export async function fetchHomePage() {
  return strapiGet<StrapiResponse<{ hero: HeroData; stats: { data: { value: string; label: string; description: string }[] } }>>(
    ENDPOINTS.HOME_PAGE,
    { next: { revalidate: REVALIDATE.CONTENT } }
  );
}

/** Global: nav, footer, logo, social, CTA */
export async function fetchGlobal() {
  return strapiGet<StrapiResponse<GlobalData>>(
    ENDPOINTS.GLOBAL,
    { next: { revalidate: REVALIDATE.LAYOUT } }
  );
}

/** Clients logo strip */
export async function fetchClients() {
  return strapiGet<StrapiListResponse<Client>>(
    ENDPOINTS.CLIENTS,
    { next: { revalidate: REVALIDATE.LAYOUT } }
  );
}

/** Services section — 4 cards */
export async function fetchServices() {
  return strapiGet<StrapiListResponse<Service>>(
    ENDPOINTS.SERVICES,
    { next: { revalidate: REVALIDATE.CONTENT } }
  );
}

/** Case studies carousel */
export async function fetchCaseStudies() {
  return strapiGet<StrapiListResponse<CaseStudy>>(
    ENDPOINTS.CASE_STUDIES,
    { next: { revalidate: REVALIDATE.CONTENT } }
  );
}

/** Testimonials */
export async function fetchTestimonials() {
  return strapiGet<StrapiListResponse<Testimonial>>(
    ENDPOINTS.TESTIMONIALS,
    { next: { revalidate: REVALIDATE.CONTENT } }
  );
}

/** Blog — 4 latest posts */
export async function fetchBlogs() {
  return strapiGet<StrapiListResponse<BlogPost>>(
    ENDPOINTS.BLOGS,
    { next: { revalidate: REVALIDATE.CONTENT } }
  );
}

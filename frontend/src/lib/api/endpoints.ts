/** All Strapi API endpoint paths. Import from here — never hardcode in components. */

export const ENDPOINTS = {
  /** Global: nav links, footer links, logo, social */
  GLOBAL: '/global?populate=deep',

  /** Home page: hero, stats, CTA text */
  HOME_PAGE: '/home-page?populate=deep',

  /** Services section */
  SERVICES: '/services?populate=*&sort=order:asc',

  /** Case studies carousel */
  CASE_STUDIES: '/case-studies?populate=*&sort=order:asc',

  /** Testimonials */
  TESTIMONIALS: '/testimonials?populate=*',

  /** Blog / Insights — 4 latest posts */
  BLOGS: '/blogs?populate=*&pagination[limit]=4&sort=publishedAt:desc',

  /** Clients logo strip */
  CLIENTS: '/clients?populate=*&sort=order:asc',
} as const;

/** ISR revalidation intervals in seconds */
export const REVALIDATE = {
  CONTENT: 60,       // services, testimonials, blogs, case studies
  LAYOUT: 3600,      // nav, footer, clients — rarely changes
  STATIC: false,     // never revalidate (truly static)
} as const;

/**
 * Home page dynamic zone. Each `on` clause matches one block and populates
 * its nested components, media, and relations in one wildcard.
 */
const HOME_POPULATE = [
  'populate[content][on][shared.home-page-section1][populate][capabilities][populate]=*',
  'populate[content][on][shared.enterprise-solution][populate][enterpriseSolution][populate]=*',
  'populate[content][on][shared.gallery][populate][images][populate]=*',
  'populate[content][on][shared.key-metrics-section][populate][keyMetrics][populate]=*',
  'populate[content][on][shared.case-studies][populate][case_studies][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
].join('&');

/**
 * Service landing page dynamic zone: client logos, the capability tabs
 * (each tab is a linked Service with its child services), and testimonials.
 */
const SERVICE_POPULATE = [
  'populate[content][on][shared.gallery][populate][images][populate]=*',
  'populate[content][on][shared.services][populate][services][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
].join('&');

/**
 * Service detail page. Every block the page can render is listed, so an
 * editor can add or reorder them without a frontend change. `seo` asks for
 * its text fields only — populating `seo.ogImage` is rejected by the API.
 */
const SERVICE_DETAIL_POPULATE = [
  'populate[seo][fields][0]=metaTitle',
  'populate[seo][fields][1]=metaDescription',
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.rich-text][populate]=*',
  'populate[content][on][shared.services][populate][services][populate]=*',
  'populate[content][on][shared.cta][populate]=*',
  'populate[content][on][shared.key-metrics-section][populate]=*',
  'populate[content][on][shared.case-studies][populate][case_studies][populate]=*',
  'populate[content][on][shared.faqs][populate]=*',
  'populate[content][on][shared.gallery][populate][images][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
].join('&');

/** All Strapi API endpoint paths. Import from here — never hardcode in components. */
export const ENDPOINTS = {
  /** Landing page: slug `home`, with nested media and relations. */
  HOME_PAGE: `/pages?filters[slug][$eq]=home&${HOME_POPULATE}`,
  /** One service landing page, matched by slug. */
  SERVICE_BY_SLUG: (slug: string) =>
    `/services?filters[slug]=${encodeURIComponent(slug)}&${SERVICE_POPULATE}`,
  /** One service detail page, matched by its public path, e.g. `services/ai-ml-development`. */
  SERVICE_BY_URL: (url: string) =>
    `/services?filters[url][$eq]=${encodeURIComponent(url)}&${SERVICE_DETAIL_POPULATE}`,
} as const;

/** Most posts the Insights carousel will show, however many the API returns. */
export const BLOG_LIMIT = 8;

/**
 * Live WordPress endpoints. The Insights carousel reads the real blog feed
 * from spec-india.com rather than Strapi.
 */
export const WP_ENDPOINTS = {
  /** Latest posts, newest first. `limit` is passed explicitly — the API's
   *  own default is not guaranteed to stay at 8. */
  LATEST_BLOGS: `/wp-json/custom/v1/blogs?limit=${BLOG_LIMIT}`,
} as const;

/** ISR revalidation intervals in seconds */
export const REVALIDATE = {
  CONTENT: 60,
  LAYOUT: 3600,
} as const;

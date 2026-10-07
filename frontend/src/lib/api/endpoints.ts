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
  'populate[content][on][shared.home-blogs][populate][blogs][populate]=*',
].join('&');

/** All Strapi API endpoint paths. Import from here — never hardcode in components. */
export const ENDPOINTS = {
  /** Landing page: slug `home`, with nested media and relations. */
  HOME_PAGE: `/pages?filters[slug][$eq]=home&${HOME_POPULATE}`,
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

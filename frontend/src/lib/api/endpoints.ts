/**
 * Home page dynamic zone. Each `on` clause matches one block and populates
 * its nested components, media, and relations in one wildcard.
 */
const HOME_POPULATE = [
  'populate[content][on][shared.home-page-section1][populate][capabilities][populate]=*',
  'populate[content][on][shared.gallery][populate][images][populate]=*',
  'populate[content][on][shared.key-metrics-section][populate][keyMetrics][populate]=*',
  'populate[content][on][shared.case-studies][populate][case_studies][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
  'populate[content][on][shared.home-blogs][populate][blogs][populate]=*',
  // Core Capabilities cards: image, plus their category Content Items with
  // the service / industry / visualization / whitepaper each one links to.
  // Needs the Public role's `find` on Content Item — otherwise Strapi drops
  // `pages` silently and the hover shows no categories.
  'populate[content][on][shared.enterprise-solution][populate][enterpriseSolution][populate][image][populate]=*',
  'populate[content][on][shared.enterprise-solution][populate][enterpriseSolution][populate][pages][populate]=*',
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
 * Service detail and sub-service pages (both live at `/services/:slug`).
 * Every block either page can render is listed, so an editor can add or
 * reorder them without a frontend change. `seo` asks for
 * its text fields only — populating `seo.ogImage` is rejected by the API.
 */
const SERVICE_DETAIL_POPULATE = [
  'populate[seo][fields][0]=metaTitle',
  'populate[seo][fields][1]=metaDescription',
  // Decides detail vs sub-service, and which WordPress category feeds Insights.
  // `blog_category` asks for fields only: populating its `blog_posts` is rejected.
  'populate[parent][fields][0]=slug',
  'populate[blog_category][fields][0]=name',
  'populate[blog_category][fields][1]=slug',
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.rich-text][populate]=*',
  'populate[content][on][shared.services][populate][services][populate]=*',
  'populate[content][on][shared.cta][populate]=*',
  'populate[content][on][shared.key-metrics-section][populate]=*',
  'populate[content][on][shared.case-studies][populate][case_studies][populate]=*',
  'populate[content][on][shared.faqs][populate]=*',
  'populate[content][on][shared.industries][populate][industries][populate]=*',
  'populate[content][on][shared.gallery][populate][images][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
].join('&');

/**
 * Case-study listing: every study with what a card and the filters need —
 * image, tags, industries, services — plus the "Client Spotlight" block from
 * its `content`, which supplies the listing's heading and testimonials.
 */
const CASE_STUDY_LIST_QUERY = [
  'populate[featuredImage]=true',
  'populate[tags][fields][0]=title',
  'populate[tags][fields][1]=slug',
  'populate[industries][fields][0]=title',
  'populate[industries][fields][1]=slug',
  'populate[services][fields][0]=title',
  'populate[services][fields][1]=slug',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
  'sort[0]=publishedAt:desc',
  'pagination[pageSize]=100',
].join('&');

/**
 * Live BI listing page: the hero CTA and the "Client Spotlight" block, whose
 * `visualizations` (with image + categories) are the cards, in editor order.
 */
const LIVE_BI_POPULATE = [
  'populate[content][on][shared.live-bi-visualization][populate][visualizations][populate]=*',
  'populate[content][on][shared.contact-us][populate]=*',
].join('&');

/**
 * Testimonials listing page: hero CTA, the "Client Spotlight" blocks (the
 * first is the featured carousel, later ones the video grid) and the
 * "Client & Industry" logo gallery.
 */
const TESTIMONIALS_POPULATE = [
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
  'populate[content][on][shared.industry-gallery][populate][gallery][populate]=*',
].join('&');

/**
 * Whitepaper listing page: hero CTA and the whitepaper cards. The
 * `whitepapers` relation needs the Public role's `find` on Whitepaper —
 * without it Strapi silently drops the relation.
 */
const WHITEPAPER_POPULATE = [
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.whitepapers][populate][whitepapers][populate]=*',
].join('&');

/**
 * Industries landing page entry: hero CTA and the "Client & Industry" logos.
 * The industry list itself comes from the Industry collection (below).
 */
const INDUSTRIES_PAGE_POPULATE = [
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.industry-gallery][populate][gallery][populate]=*',
].join('&');

/**
 * Contact page entry: the client logo strip. Offices, socials and portfolio
 * come from the `footer` single type; `populate=*` on this entry is a 500.
 */
const CONTACT_PAGE_POPULATE = [
  'populate[content][on][shared.gallery][populate][images][populate]=*',
].join('&');

/** Industry list for the landing explorer — what each panel shows, oldest first. */
const INDUSTRY_LIST_QUERY = [
  'fields[0]=title',
  'fields[1]=slug',
  'fields[2]=description',
  'populate[image]=true',
  'sort[0]=id:asc',
  'pagination[pageSize]=100',
].join('&');

/** All Strapi API endpoint paths. Import from here — never hardcode in components. */
export const ENDPOINTS = {
  /** Landing page: slug `home`, with nested media and relations. */
  HOME_PAGE: `/pages?filters[slug][$eq]=home&${HOME_POPULATE}`,
  /** One service landing page, matched by slug. */
  SERVICE_BY_SLUG: (slug: string) =>
    `/services?filters[slug]=${encodeURIComponent(slug)}&${SERVICE_POPULATE}`,
  /** All published case studies for the `/case-study` listing. */
  CASE_STUDIES: `/case-studies?${CASE_STUDY_LIST_QUERY}`,
  /** Case-study industries — the listing's "Industries" filter chips. */
  CASE_STUDY_INDUSTRIES:
    '/cs-industries?fields[0]=title&fields[1]=slug&pagination[pageSize]=100',
  /** `/live-bi-visualization` listing page (Strapi page slug `live-bi-visualization`). */
  LIVE_BI_PAGE: `/pages?filters[slug][$eq]=live-bi-visualization&${LIVE_BI_POPULATE}`,
  /** `/about/testimonials` listing page (Strapi page slug `testimonials`). */
  TESTIMONIALS_PAGE: `/pages?filters[slug][$eq]=testimonials&${TESTIMONIALS_POPULATE}`,
  /** `/whitepaper` listing page (Strapi page slug `whitepaper`). */
  WHITEPAPER_PAGE: `/pages?filters[slug][$eq]=whitepaper&${WHITEPAPER_POPULATE}`,
  /** `/industries` landing page (Strapi page slug `industries`). */
  INDUSTRIES_PAGE: `/pages?filters[slug][$eq]=industries&${INDUSTRIES_PAGE_POPULATE}`,
  /** `/contact-us` page (Strapi page slug `contact-us`). */
  CONTACT_PAGE: `/pages?filters[slug][$eq]=contact-us&${CONTACT_PAGE_POPULATE}`,
  /** Every published industry — needs the Public role's `find` on Industry. */
  INDUSTRIES: `/industries?${INDUSTRY_LIST_QUERY}`,
  /** Visualization categories — the listing's tabs ("All Visualization", "Power BI", …). */
  VISUALIZATION_CATEGORIES:
    '/visualization-categories?fields[0]=title&fields[1]=slug&pagination[pageSize]=100',
  /** Footer single type: Let's Talk card, socials, portfolio, awards, ratings. */
  FOOTER: '/footer?populate=*',
  /** One service detail page, matched by its public path, e.g. `services/ai-ml-development`. */
  SERVICE_BY_URL: (url: string) =>
    `/services?filters[url][$eq]=${encodeURIComponent(url)}&${SERVICE_DETAIL_POPULATE}`,
  /** Enquiry form (POST, multipart). Public custom route — verifies hCaptcha server-side. */
  CONTACT_SUBMIT: '/contact-us/submit',
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
  LATEST_BLOGS: (category?: string | null) =>
    `/wp-json/custom/v1/blogs?limit=${BLOG_LIMIT}${
      category ? `&category=${encodeURIComponent(category)}` : ''
    }`,
} as const;

/** ISR revalidation intervals in seconds */
export const REVALIDATE = {
  CONTENT: 60,
  LAYOUT: 3600,
  /** Reference data that almost never changes (country list). */
  STATIC: 86400,
} as const;

/**
 * Country names, ISO codes and dial codes for the enquiry form. Free, no API
 * key (restcountries.com now requires one).
 */
export const COUNTRIES_API_URL = 'https://countriesnow.space/api/v0.1/countries/codes';

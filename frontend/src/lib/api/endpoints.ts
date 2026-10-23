/**
 * Home page dynamic zone. Each `on` clause matches one block and populates
 * its nested components, media, and relations in one wildcard.
 */
const HOME_POPULATE = [
  'populate[content][on][shared.home-page-section1][populate][capabilities][populate]=*',
  'populate[content][on][shared.gallery][populate][images][populate]=*',
  'populate[content][on][shared.key-metrics-section][populate][keyMetrics][populate]=*',
  // Hand-entered stories (`caseStudy` items) with their tags and media.
  'populate[content][on][shared.case-studies][populate][caseStudy][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
  // "Latest Insights" heading; the posts come from WordPress.
  'populate[content][on][shared.blogs][populate]=*',
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
  // Hand-entered stories (`caseStudy` items) with their tags and media.
  'populate[content][on][shared.case-studies][populate][caseStudy][populate]=*',
  'populate[content][on][shared.faqs][populate]=*',
  // "Industry Use Cases" on sub-service pages: hand-entered `caseStudy` text
  // blocks (title, description, image, optional link).
  'populate[content][on][shared.industry-case-study][populate][caseStudy][populate]=*',
  'populate[content][on][shared.gallery][populate][images][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
  // "Latest Insights" heading only; the posts come from WordPress by `blog_category`.
  'populate[content][on][shared.blogs][fields][0]=title',
  'populate[content][on][shared.blogs][fields][1]=subTitle',
].join('&');

/**
 * Case-study listing cards: only what a card and the filters need — image,
 * tags, and the industry / service slugs matched against the filter chips.
 * The heading, chips and testimonials come from the `case-study` page entry.
 */
const CASE_STUDY_LIST_QUERY = [
  'fields[0]=title',
  'fields[1]=slug',
  'fields[2]=description',
  'fields[3]=url',
  'populate[featuredImage]=true',
  'populate[tags][fields][0]=title',
  'populate[tags][fields][1]=slug',
  'populate[industries][fields][0]=slug',
  'populate[services][fields][0]=slug',
  'sort[0]=publishedAt:desc',
  'pagination[pageSize]=100',
].join('&');

/**
 * Case-study detail page (`/case-study/:slug`): the facts card (client,
 * country, scale, services, tags) and every block its `content` zone can
 * hold. `populate=*` alone is rejected on the dynamic zone, so each block is
 * listed; `shared.cs-result` nests its metrics and result cards one level down.
 */
const CASE_STUDY_DETAIL_POPULATE = [
  'populate[featuredImage]=true',
  'populate[industries][fields][0]=title',
  'populate[tags][fields][0]=title',
  'populate[services][fields][0]=title',
  'populate[services][fields][1]=url',
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.rich-text][populate]=*',
  'populate[content][on][shared.challenges][populate][challange][populate]=*',
  'populate[content][on][shared.gallery][populate]=*',
  'populate[content][on][shared.solutions][populate][solution][populate]=*',
  'populate[content][on][shared.cs-result][populate][result][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
].join('&');

/**
 * Live BI dashboard detail page: hero CTA, overview, facts card, the live
 * embed, the titled cards, KPI rows (image + chips), metric cards (icons),
 * CTA banner and FAQs — in editor order.
 */
const VISUALIZATION_DETAIL_POPULATE = [
  'fields[0]=title',
  'fields[1]=slug',
  'fields[2]=description',
  'fields[3]=url',
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.rich-text][populate]=*',
  'populate[content][on][shared.audience-section][populate][platform][fields][0]=title',
  'populate[content][on][shared.audience-section][populate][audience]=true',
  'populate[content][on][shared.dashboard-action][populate]=*',
  'populate[content][on][shared.challenges][populate][challange]=true',
  'populate[content][on][shared.kpi-business-impact][populate][image]=true',
  'populate[content][on][shared.kpi-business-impact][populate][category][populate][subCategory]=true',
  'populate[content][on][shared.dashboard-improvement][populate][improvement][populate][image]=true',
  'populate[content][on][shared.cta][populate]=*',
  'populate[content][on][shared.faqs][populate]=*',
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
 * Whitepaper listing page: hero CTA and the whitepaper cards. The cards now
 * come from `shared.industry-case-study` (each with its image and button
 * text); `shared.whitepapers` is the older relation block, still read as a
 * fallback — it needs the Public role's `find` on Whitepaper, or Strapi
 * silently drops the relation.
 */
const WHITEPAPER_POPULATE = [
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.industry-case-study][populate][caseStudy][populate]=*',
  'populate[content][on][shared.whitepapers][populate][whitepapers][populate]=*',
].join('&');

/**
 * Industries landing page entry: hero CTA and the "Client & Industry" logos.
 * The industry list itself comes from the Industry collection (below).
 */
const INDUSTRIES_PAGE_POPULATE = [
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.industry-gallery][populate][gallery][populate]=*',
  // "Capabilities" heading above the explorer; its `industries` relation is unused.
  'populate[content][on][shared.industry-section][fields][0]=title',
  'populate[content][on][shared.industry-section][fields][1]=subTitle',
].join('&');

/**
 * Industry detail page (`/industries/:slug`): every block the Industry
 * `content` zone can hold, so editors can add or reorder them freely.
 * `shared.case-studies` holds its slides as `caseStudy` components (with
 * their tags and image); `shared.technologies` relates Technology entries.
 */
const INDUSTRY_DETAIL_POPULATE = [
  'populate[content][on][shared.key-metrics-section][populate][keyMetrics][populate]=*',
  'populate[content][on][shared.industry-service][populate][industryServices][populate]=*',
  'populate[content][on][shared.case-studies][populate][caseStudy][populate]=*',
  'populate[content][on][shared.cta][populate]=*',
  'populate[content][on][shared.industry-gallery][populate][gallery][populate]=*',
  'populate[content][on][shared.technologies][populate][technology][populate]=*',
  'populate[content][on][shared.faqs][populate][faq][populate]=*',
].join('&');

/**
 * Contact page entry: the client logo strip. Offices, socials and portfolio
 * come from the `footer` single type; `populate=*` on this entry is a 500.
 */
const CONTACT_PAGE_POPULATE = [
  'populate[content][on][shared.gallery][populate][images][populate]=*',
  // Intro heading + text beside the offices.
  'populate[content][on][shared.challenges-item][populate]=*',
  'populate[content][on][shared.career-inquiry-cta][populate][inquiryItems][populate]=*',
].join('&');

/**
 * About page (`/about/overview`, Strapi page slug `about`): hero CTA, the
 * overview copy and image card, "Our Guiding Principles" slides, Proven
 * Impact, the leaders, client logos and the team testimonials.
 */
const ABOUT_POPULATE = [
  'populate[content][on][shared.contact-us][populate]=*',
  'populate[content][on][shared.rich-text][populate]=*',
  'populate[content][on][shared.text-block][populate]=*',
  'populate[content][on][shared.industry-case-study][populate][caseStudy][populate]=*',
  'populate[content][on][shared.key-metrics-section][populate][keyMetrics][populate]=*',
  'populate[content][on][shared.leaders][populate][leader][populate]=*',
  'populate[content][on][shared.industry-gallery][populate][gallery][populate]=*',
  'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
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

/** Fields every header-menu level needs. */
const MENU_FIELDS = ['title', 'slug', 'url', 'menuOrder'];

/** Panel blocks: intro text, image cards, socials, industry showcase, testimonials. */
const MENU_CONTENT = [
  '[on][shared.rich-text][populate]=*',
  '[on][shared.text-block][populate]=*',
  '[on][shared.about-menu-social][populate][social][populate]=*',
  '[on][shared.industry-menu-section][populate][image]=true',
  // `populate=*` stops at the pills and leaves their `logo` out.
  '[on][shared.industry-menu-section][populate][industryPortfolio][populate]=*',
  '[on][shared.insights-menu-section][populate][testimonial][populate]=*',
];

/**
 * One level of the menu tree, then its children. Levels: top menu (1) →
 * heading (2) → link (3) → services sub-link (4); panel blocks sit on 1–2.
 */
function menuLevel(prefix: string, depth: number): string[] {
  const parts = MENU_FIELDS.map((field, i) => `${prefix}[fields][${i}]=${field}`);
  if (depth <= 2) {
    parts.push(...MENU_CONTENT.map((block) => `${prefix}[populate][content]${block}`));
  }
  if (depth < 4) parts.push(...menuLevel(`${prefix}[populate][child_menu]`, depth + 1));
  return parts;
}

/**
 * The whole header menu in one request. Listing fields explicitly keeps the
 * deep-populate plugin from also expanding every `parent_menu`, which makes
 * `populate=*` more than twice the size — and a single menu by slug bigger
 * still, since it drags its parent tree along.
 */
const HEADER_MENU_QUERY = [
  'filters[slug][$eq]=header-menu-items',
  'fields[0]=slug',
  ...menuLevel('populate[child_menu]', 1),
].join('&');

/** Latest entries for the Insights menu thumbnails: title, link and image only. */
const LATEST_ENTRIES_QUERY = [
  'fields[0]=title',
  'fields[1]=url',
  'populate[featuredImage][fields][0]=url',
  'populate[featuredImage][fields][1]=alternativeText',
  'populate[featuredImage][fields][2]=width',
  'populate[featuredImage][fields][3]=height',
  'sort[0]=publishedAt:desc',
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
  /**
   * `/case-study` listing page (Strapi page slug `case-study`): hero CTA, the
   * section heading + filter chips, and the "Client Spotlight" testimonials.
   */
  CASE_STUDY_PAGE: [
    '/pages?filters[slug][$eq]=case-study',
    'populate[content][on][shared.contact-us][populate]=*',
    'populate[content][on][shared.case-study-section][populate][services][fields][0]=title',
    'populate[content][on][shared.case-study-section][populate][services][fields][1]=slug',
    'populate[content][on][shared.case-study-section][populate][industries][fields][0]=title',
    'populate[content][on][shared.case-study-section][populate][industries][fields][1]=slug',
    'populate[content][on][shared.testimonial-section][populate][testimonials][populate]=*',
  ].join('&'),
  /** One case study, matched by slug, e.g. `ai-based-chatbot-application-for-hospital`. */
  CASE_STUDY_BY_SLUG: (slug: string) =>
    `/case-studies?filters[slug][$eq]=${encodeURIComponent(slug)}&${CASE_STUDY_DETAIL_POPULATE}`,
  /** `/live-bi-visualization` listing page (Strapi page slug `live-bi-visualization`). */
  LIVE_BI_PAGE: `/pages?filters[slug][$eq]=live-bi-visualization&${LIVE_BI_POPULATE}`,
  /** `/about/testimonials` listing page (Strapi page slug `testimonials`). */
  TESTIMONIALS_PAGE: `/pages?filters[slug][$eq]=testimonials&${TESTIMONIALS_POPULATE}`,
  /** `/whitepaper` listing page (Strapi page slug `whitepaper`). */
  WHITEPAPER_PAGE: `/pages?filters[slug][$eq]=whitepaper&${WHITEPAPER_POPULATE}`,
  /** `/industries` landing page (Strapi page slug `industries`). */
  INDUSTRIES_PAGE: `/pages?filters[slug][$eq]=industries&${INDUSTRIES_PAGE_POPULATE}`,
  /** `/about/overview` page (Strapi page slug `about`). */
  ABOUT_PAGE: `/pages?filters[slug][$eq]=about&${ABOUT_POPULATE}`,
  /** `/contact-us` page (Strapi page slug `contact-us`). */
  CONTACT_PAGE: `/pages?filters[slug][$eq]=contact-us&${CONTACT_PAGE_POPULATE}`,
  /** Every published industry — needs the Public role's `find` on Industry. */
  INDUSTRIES: `/industries?${INDUSTRY_LIST_QUERY}`,
  /** One industry detail page, matched by slug, e.g. `manufacturing-software-development`. */
  INDUSTRY_BY_SLUG: (slug: string) =>
    `/industries?filters[slug][$eq]=${encodeURIComponent(slug)}&${INDUSTRY_DETAIL_POPULATE}`,
  /** One Live BI dashboard, matched by slug, e.g. `ceo-dashboard`. */
  VISUALIZATION_BY_SLUG: (slug: string) =>
    `/visualizations?filters[slug][$eq]=${encodeURIComponent(slug)}&${VISUALIZATION_DETAIL_POPULATE}`,
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
  /** Header mega menu: the `header-menu-items` root with every panel under it. */
  HEADER_MENU: `/header-menus?${HEADER_MENU_QUERY}`,
  /** Newest entries of a listing, for the Insights menu thumbnails. */
  LATEST_ENTRIES: (
    collection: 'case-studies' | 'visualizations' | 'whitepapers',
    limit: number
  ) => `/${collection}?${LATEST_ENTRIES_QUERY}&pagination[pageSize]=${limit}`,
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

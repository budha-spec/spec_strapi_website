# CSS Section Hooks — SPEC India website

Stable class names for styling and fixing sections without touching component
code. Every class starts with **`sp-`** (SPEC), so a search for `sp-` in the
browser inspector or the codebase finds them all.

## How the classes work

| Class | Where | Use it to… |
|---|---|---|
| `sp-page` + `sp-page-<name>` | The `<main>` of each page | Scope a fix to **one page** |
| `sp-section` | The outer element of **every** section | Change **all sections** at once (e.g. spacing) |
| `sp-<section-name>` | The outer element of **one** section | Change **that section everywhere** it appears |

Combine them to be precise:

```css
/* FAQ on every page */
.sp-faq h2 { … }

/* FAQ only on service detail pages */
.sp-page-service-detail .sp-faq h2 { … }
```

> **Important:** write these overrides in the **unlayered "custom css" block at
> the end of `frontend/src/app/globals.css`**. A rule inside `@layer components`
> loses to the Tailwind classes already on the element; an unlayered rule wins.

## Headings (inside every section)

Most sections open with the same pair: a small gradient label and a large
title. These classes are on every one of them, so heading fixes (for example
mobile font sizes) are written once.

| Class | Element | Example |
|---|---|---|
| `sp-eyebrow` | Small gradient label above a title | "• Core Capabilities", "• Proven Impact" |
| `sp-title` | Main `h2` title of a section | "Engineering Scalable Solutions for Enterprise Growth" |
| `sp-page-title` | The page's `h1` in the hero | "Building Next-gen AI-ready Software", "AI/ML" |

```css
/* All section titles on phones */
@media (max-width: 767px) {
  .sp-title { font-size: 26px; line-height: 1.25; }
  .sp-eyebrow { font-size: 16px; }
}

/* Only the dark-section titles (Proven Impact, Client Spotlight, FAQ…) */
.sp-proven-impact .sp-title,
.sp-testimonials .sp-title,
.sp-faq .sp-title { … }
```

Some sections have no eyebrow by design (heroes, "Trusted by", the service
intro, the CTA banner, FAQ, Let's Talk); their title still has `sp-title`.
The highlighted word(s) inside a title (e.g. "Growth") come from Strapi
already wrapped in a `<span>` (`Enterprise <span>Growth</span>`); `AccentHeading`
renders it with the section's gradient class, so `.sp-title span` reaches it.

## Pages

| Class | Page |
|---|---|
| `sp-page-home` | `/` Home |
| `sp-page-services` | `/services` Services landing |
| `sp-page-service-detail` | `/services/…` service page, e.g. AI/ML |
| `sp-page-service-sub-service` | `/services/…` sub-service page, e.g. AI Development |
| `sp-page-case-study` | `/case-study` Case-study listing |
| `sp-page-case-study-detail` | `/case-study/…` one case study |
| `sp-page-live-bi` | `/live-bi-visualization` Live BI listing |
| `sp-page-live-bi-detail` | `/live-bi-visualization/…` one dashboard, e.g. CEO Dashboard |
| `sp-page-about` | `/about/overview` About Us |
| `sp-page-testimonials` | `/about/testimonials` Testimonials listing |
| `sp-page-whitepaper` | `/whitepaper` Whitepaper listing |
| `sp-page-industries` | `/industries` Industries landing |
| `sp-page-industry-detail` | `/industries/…` industry page, e.g. Manufacturing |
| `sp-page-contact-us` | `/contact-us` Contact Us |

## Layout (every page)

| Class | Section |
|---|---|
| `sp-header` | Top navigation bar — fixed, stays on screen while scrolling |
| `sp-header-bar` | The header's glass bar (translucent black + backdrop blur) |
| `sp-nav-item` | Each top menu trigger (What we do, Who we are, Industries, Insights) |
| `sp-nav-bar` | Gradient bar under the open menu (or the current page's section) |
| `sp-mega-menu` | The dropped-down mega-menu panel (desktop, `lg` and up) |
| `sp-mega-services` / `sp-mega-about` / `sp-mega-industries` / `sp-mega-insights` | Inside the panel: What we do / Who we are / Industries / Insights layout |
| `sp-mobile-menu` | Accordion menu below `lg` |

Inside the mega menu, repeated parts share these hooks: `mega-heading` (gradient
title + ↗), `mega-link` / `mega-link-label` (links — gradient on hover, focus and
current page), `mega-intro` (first-column title + text), `mega-card` (image card
with gradient caption on hover), `mega-social` (Follow Us icons), `mega-showcase`
and `mega-portfolio` (Industries carousel + Behance/Dribbble pills), `mega-insight`
(Insights thumbnails), `mega-testimonial`, `mega-progress` (carousel track).
| `sp-footer` | Whole footer |
| `sp-footer-contact` | Light band holding Let's Talk + the enquiry form |
| `sp-lets-talk` | "Let's Talk to OUR EXPERT!" card + "Share Your Project's Vision" form |
| `sp-footer-awards` | Certificates + review-scores strip |
| `sp-footer-links` | Dark footer: link columns, copyright, policies |

## Shared sections (used on more than one page)

| Class | Section (Figma name) | Appears on |
|---|---|---|
| `sp-page-hero` | Inner-page hero: breadcrumb, title, intro, button | Services, service, sub-service, case study |
| `sp-page-hero-skeleton` | Loading placeholder of the hero | Same pages, while loading |
| `sp-clients-strip` | "Trusted by global leaders" logo marquee | Home, Services, Contact Us |
| `sp-proven-impact` | "Proven Impact" stats (`sp-proven-impact--light` on the grey About band) | Home, service, About |
| `sp-case-studies` | "Client Success Stories" carousel | Home, service, sub-service, industry |
| `sp-testimonials` | "Client Spotlight" video cards | Home, Services, case study |
| `sp-faq` | "Frequently Asked Questions" | Service, industry, Live BI detail |
| `sp-cta-banner` | "Hire Dedicated Development Team" banner | Service, sub-service, industry, Live BI detail |
| `sp-service-intro` | Overview band: gradient heading + text with More + / Less – | Service, case study, Live BI detail, About |
| `sp-dark-card-grid` | Dark titled-card grid (also carries `sp-industry-services` / `sp-case-study-challenges` / `sp-dashboard-highlights`) | Industry, case study detail, Live BI detail |
| `sp-facts-card` | White facts card: gradient labels + values, then a labelled chip row (also carries `sp-case-study-facts` / `sp-dashboard-facts`) | Case study detail, Live BI detail |
| `sp-blog` | "Latest Insights" blog carousel | Home, sub-service |

## Page-specific sections

| Class | Section | Page |
|---|---|---|
| `sp-home-hero` | Hero with the dot sphere and "Ask SPEC" prompt | Home |
| `sp-home-hero-skeleton` | Loading placeholder of that hero | Home |
| `sp-home-services` | "Core Capabilities" four cards | Home |
| `sp-service-capability-tabs` | "Core Capabilities" tab bar + card | Services |
| `sp-service-capability-grid` | "Capabilities" numbered cards (dark on hover) | Service |
| `sp-service-offerings` | "Services We Are Offering" numbered cards | Sub-service |
| `sp-service-use-cases` | "Business Application and Use Cases" cards | Sub-service |
| `sp-case-study-listing` | Heading + filters + carousel band | Case study |
| `sp-case-study-filters` | "Services" / "Industries" filter boxes | Case study |
| `sp-case-study-carousel` | Case-study cards + progress bar + controls | Case study |
| `sp-case-study-empty` | "No case studies match" message | Case study |
| `sp-case-study-facts` | Client / Country / Services / Scale card + technology chips — the shared facts card on this page | Case study detail |
| `sp-case-study-challenges` | "Our Business Challenges" — the shared dark card grid on this page | Case study detail |
| `sp-case-study-gallery` | "Outcomes & Business Impact" image carousel (blurred next-slide peek) | Case study detail |
| `sp-case-study-solutions` | White solution cards under the gallery | Case study detail |
| `sp-case-study-results` | "Delivering Measurable Business Outcomes" metrics + result tiles | Case study detail |
| `sp-about-overview` | Image + "We believe technology…" statement card | About |
| `sp-guiding-principles` | "Our Guiding Principles" wide-slide carousel + progress bar | About |
| `sp-leader-spotlight` | Leaders "Client Spotlight" portrait + quote cards | About |
| `sp-team-testimonials` | Team "Client Spotlight" quote cards with avatar (carousel) | About |
| `sp-live-bi-listing` | Heading + category tabs + dashboard grid | Live BI |
| `sp-live-bi-tabs` | "All Visualization" / "Power BI" / … tab bar | Live BI |
| `sp-live-bi-grid` | Dashboard card grid | Live BI |
| `sp-live-bi-empty` | "No dashboards in this category" message | Live BI |
| `sp-dashboard-facts` | Dashboard / Platform / Focus card + audience chips — the shared facts card on this page | Live BI detail |
| `sp-dashboard-embed` | "See the dashboard in action": live report in the black-bordered frame | Live BI detail |
| `sp-dashboard-disclaimer` | Disclaimer line under the live report | Live BI detail |
| `sp-dashboard-highlights` | "What can leadership see at a glance?" — the shared card grid, white cards three to a row | Live BI detail |
| `sp-kpi-impact` | "Outcomes & Business Impact": image + KPI category rows of chips | Live BI detail |
| `sp-dashboard-improvements` | "What … Dashboard Can Improve?" metric cards (icon, figure, caption) | Live BI detail |
| `sp-dashboard-skeleton` | Loading placeholder under the hero | Live BI detail |
| `sp-testimonial-feature` | Light "Client Spotlight" carousel (wide quote cards) | Testimonials |
| `sp-testimonials-grid` | Card grid inside `sp-testimonials` when it uses `layout="grid"` | Testimonials |
| `sp-industry-gallery` | "Client & Industry" logo tiles ("Industry Compliances" badges, 4 to a row, on an industry page) | Testimonials, Industries, industry |
| `sp-whitepaper-listing` | Heading + whitepaper cards band | Whitepaper |
| `sp-whitepaper-grid` | Two-column whitepaper card grid | Whitepaper |
| `sp-whitepaper-empty` | "New whitepapers are on their way" message | Whitepaper |
| `sp-industries-intro` | "Capabilities" heading band above the explorer | Industries |
| `sp-industries-explorer` | Dark band holding the industry explorer | Industries |
| `sp-industry-explorer` | Industry list + selected industry panel | Industries |
| `sp-industry-use-cases` | "Key Use Cases" numbered card carousel | Industry |
| `sp-industry-services` | "Services We Are Offering" — the shared dark card grid on this page | Industry |
| `sp-industry-tech-stack` | "Tech Stack / Technology and Integration" cards | Industry |
| `sp-contact-hero` | Title, office details + socials beside the enquiry form, over the artwork | Contact Us |
| `sp-contact-career` | "For Career Inquiry" banner + "Current Job Opening" card | Contact Us |

## Repeated controls (inside sections)

These were added earlier and work the same way.

| Class | Element |
|---|---|
| `explore-more` (+ `--outline`/`--filled`, `--md`/`--lg`) | "Explore More" link |
| `explore-more-label`, `explore-more-arrow` | Its text and arrow pill |
| `offering-card-link`, `offering-card-arrow` | Arrow-only link + pill on a linked sub-service "Services We Are Offering" card |
| `carousel-controls` | Explore All + arrows row |
| `explore-all` (+ `-gradient` / `-on-light` / `-dark`) | "Explore All" button |
| `carousel-arrows`, `carousel-arrow` (+ `-prev` / `-next`) | Arrow buttons |
| `carousel-progress`, `carousel-progress-thumb` | Case-study progress bar |
| `gradient-hover` | Pills that fill with the gradient on hover |
| `live-bi-tab` | One Live BI category tab (`aria-pressed="true"` when selected) |
| `visualization-card`, `visualization-card-media` | Live BI dashboard card and its image tile |
| `testimonial-feature-card` | One wide card in the featured testimonial carousel |
| `industry-logo` (+ `industry-logo-img`, `industry-logo-description`) | One "Client & Industry" logo tile; on hover the logo moves top-left and the description fades in |
| `spotlight-card` (+ `has-quote`, `spotlight-shade`, `spotlight-identity`, `spotlight-quote`, `spotlight-play`) | Client Spotlight card; on hover the name collapses and the quote opens (CSS in `globals.css`) |
| `whitepaper-card`, `whitepaper-card-media` | One whitepaper card and its cover image |
| `contact-social-icons` | "Follow us on" icon row in the contact hero (white icons on dark) |
| `career-contact` | One HR phone / email link in the career banner |
| `reset-btn` | Grey "Reset" pill beside Submit in the enquiry form |
| `career-openings` | "Current Job Opening" card (white Explore More) |
| `industry-tab` | One industry in the explorer list (`aria-selected="true"` when active) |
| `use-case-track`, `use-case-card` (+ `use-case-card-title`, `use-case-card-detail`) | Key Use Cases track and card; on hover the bottom title fades out and the gradient title, divider and description rise in |
| `dark-card` (+ `dark-card-title`, `dark-card--light`) | One card in the dark card grid; title fades into the bright gradient on hover, Explore More (when present) stays static. `--light` marks the white-card tone (Live BI) |
| `dashboard-frame` | Live BI report frame (black border; sized to the report so it fills the border with nothing cut off) |
| `kpi-row`, `kpi-chip` | One "Outcomes & Business Impact" category row; on hover every chip in it fills with the brand gradient |
| `improvement-card` | One "Can Improve?" metric card |
| `cs-solution-card` (+ `cs-solution-card-title`) | Case-study solution card; title fades into the brand gradient on hover |
| `cs-result-tile` (+ `cs-result-tile-detail`) | Case-study result tile; on hover the title rises as a gradient with the description |
| `outcome-gallery-track`, `outcome-gallery-slide` | Case-study outcomes carousel track and one image (inactive ones blurred/greyed) |
| `tech-stack-card` (+ `tech-stack-card-title`, `tech-chip`) | Tech Stack card, its title (gradient on hover) and one technology chip |
| `about-overview-card` | About image + statement card |
| `principles-track`, `principle-card` | Guiding Principles track and one slide |
| `leader-card`, `leader-portrait` | About leader card and its pastel-gradient portrait panel |
| `team-testimonial-track`, `team-testimonial-card` | About team quote carousel track and one card |

## Rules for new work

Every new section gets `sp-section` plus its own `sp-<name>` on its outer
element; its main `h2` gets `sp-title` and its label uses `SectionEyebrow`
(which carries `sp-eyebrow`). A page hero `h1` gets `sp-page-title`, and every
new page's `<main>` gets `sp-page sp-page-<name>`. This
list is updated in the same change.

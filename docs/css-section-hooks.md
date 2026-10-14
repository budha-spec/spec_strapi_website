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
The highlighted last word inside a title (e.g. "Growth") is a `<span>` inside
`.sp-title`, so `.sp-title span` reaches it.

## Pages

| Class | Page |
|---|---|
| `sp-page-home` | `/` Home |
| `sp-page-services` | `/services` Services landing |
| `sp-page-service-detail` | `/services/…` service page, e.g. AI/ML |
| `sp-page-service-sub-service` | `/services/…` sub-service page, e.g. AI Development |
| `sp-page-case-study` | `/case-study` Case-study listing |
| `sp-page-live-bi` | `/live-bi-visualization` Live BI listing |
| `sp-page-testimonials` | `/about/testimonials` Testimonials listing |
| `sp-page-whitepaper` | `/whitepaper` Whitepaper listing |

## Layout (every page)

| Class | Section |
|---|---|
| `sp-header` | Top navigation bar — fixed, stays on screen while scrolling |
| `sp-header-bar` | The header's glass bar (translucent black + backdrop blur) |
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
| `sp-clients-strip` | "Trusted by global leaders" logo marquee | Home, Services |
| `sp-proven-impact` | "Proven Impact" stats | Home, service |
| `sp-case-studies` | "Client Success Stories" carousel | Home, service, sub-service |
| `sp-testimonials` | "Client Spotlight" video cards | Home, Services, case study |
| `sp-faq` | "Frequently Asked Questions" | Service |
| `sp-cta-banner` | "Hire Dedicated Development Team" banner | Service, sub-service |
| `sp-blog` | "Latest Insights" blog carousel | Home, sub-service |

## Page-specific sections

| Class | Section | Page |
|---|---|---|
| `sp-home-hero` | Hero with the dot sphere and "Ask SPEC" prompt | Home |
| `sp-home-hero-skeleton` | Loading placeholder of that hero | Home |
| `sp-home-services` | "Core Capabilities" four cards | Home |
| `sp-service-capability-tabs` | "Core Capabilities" tab bar + card | Services |
| `sp-service-intro` | "AI Built for Business Enterprise" text + More | Service |
| `sp-service-capability-grid` | "Capabilities" numbered cards (dark on hover) | Service |
| `sp-service-offerings` | "Services We Are Offering" numbered cards | Sub-service |
| `sp-service-use-cases` | "Business Application and Use Cases" cards | Sub-service |
| `sp-case-study-listing` | Heading + filters + carousel band | Case study |
| `sp-case-study-filters` | "Services" / "Industries" filter boxes | Case study |
| `sp-case-study-carousel` | Case-study cards + progress bar + controls | Case study |
| `sp-case-study-empty` | "No case studies match" message | Case study |
| `sp-live-bi-listing` | Heading + category tabs + dashboard grid | Live BI |
| `sp-live-bi-tabs` | "All Visualization" / "Power BI" / … tab bar | Live BI |
| `sp-live-bi-grid` | Dashboard card grid | Live BI |
| `sp-live-bi-empty` | "No dashboards in this category" message | Live BI |
| `sp-testimonial-feature` | Light "Client Spotlight" carousel (wide quote cards) | Testimonials |
| `sp-testimonials-grid` | Card grid inside `sp-testimonials` when it uses `layout="grid"` | Testimonials |
| `sp-industry-gallery` | "Client & Industry" logo tiles | Testimonials |
| `sp-whitepaper-listing` | Heading + whitepaper cards band | Whitepaper |
| `sp-whitepaper-grid` | Two-column whitepaper card grid | Whitepaper |
| `sp-whitepaper-empty` | "New whitepapers are on their way" message | Whitepaper |

## Repeated controls (inside sections)

These were added earlier and work the same way.

| Class | Element |
|---|---|
| `explore-more` (+ `--outline`/`--filled`, `--md`/`--lg`) | "Explore More" link |
| `explore-more-label`, `explore-more-arrow` | Its text and arrow pill |
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

## Rules for new work

Every new section gets `sp-section` plus its own `sp-<name>` on its outer
element; its main `h2` gets `sp-title` and its label uses `SectionEyebrow`
(which carries `sp-eyebrow`). A page hero `h1` gets `sp-page-title`, and every
new page's `<main>` gets `sp-page sp-page-<name>`. This
list is updated in the same change.

# SPEC India – Project Architecture

> Agent reference: `.agents/GEMINI.md` at monorepo root — single source of truth for all rules.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| CMS / Backend | Strapi v5 — REST API |
| Styling | Tailwind CSS v4 (utility-first, mobile-first) |
| Animations | tsParticles (hero globe + dot bg) + Framer Motion (scroll reveals) |
| Data Fetching | React Server Components + Parallel `Promise.all()` + ISR |
| Font | Inter via `next/font/google` |

---

## Frontend Folder Structure

```
frontend/src/
├── app/                              ← Next.js App Router (routes only — no UI logic)
│   ├── layout.tsx                    ← Header + Footer + fonts on every page
│   ├── globals.css                   ← @theme tokens + shared component classes
│   ├── page.tsx                      ← /                 Home (Strapi page `home` + WordPress posts)
│   └── services/
│       ├── page.tsx                  ← /services         Services landing (Service entry `slug=services`)
│       ├── loading.tsx
│       └── [slug]/
│           ├── page.tsx              ← /services/:slug   Service detail OR sub-service (matched
│           │                           on Strapi `url`; layout from serviceTemplate())
│           └── loading.tsx
│
├── components/
│   ├── layout/                       ← Header, Footer (Footer renders LetsTalk)
│   ├── sections/                     ← SECTIONS SHARED BY 2+ PAGES (Figma names)
│   │   ├── PageHero.tsx              ← inner-page hero (breadcrumb, title, CTA)
│   │   ├── PageHeroSkeleton.tsx
│   │   ├── ClientsStrip.tsx          ← "Trusted by" logo marquee
│   │   ├── ProvenImpact.tsx          ← "Proven Impact" stats
│   │   ├── CaseStudies.tsx           ← "Client Success Stories"
│   │   ├── Testimonials.tsx          ← "Client Spotlight"
│   │   ├── FaqSection.tsx            ← "Frequently Asked Questions"
│   │   ├── CtaBanner.tsx             ← "Hire Dedicated Team" banner
│   │   ├── BlogSection.tsx           ← "Latest Insights" (WordPress)
│   │   ├── LetsTalk.tsx              ← contact card + enquiry form
│   │   └── index.ts
│   └── ui/                           ← primitives: ExploreMore, CarouselControls,
│                                       CmsImage, RichText, SectionEyebrow, …
│
├── features/                         ← PAGE-SPECIFIC code
│   ├── home/
│   │   ├── components/               ← HeroSection, ServicesSection, HomeBlocks
│   │   ├── api/home.api.ts
│   │   └── types/
│   └── service/                      ← all three service page types
│       ├── api/service.api.ts        ← fetchServiceBySlug / fetchServiceByUrl, serviceTemplate()
│       ├── types/service.types.ts
│       ├── components/ServiceBlocks.tsx  ← one block renderer, `template` prop
│       ├── landing/components/       ← /services          CapabilityTabs
│       ├── detail/components/        ← /services/ai-ml-development       CapabilityGrid, ServiceIntro
│       └── sub-service/components/   ← /services/artificial-intelligence-development
│                                       OfferingGrid, UseCaseGrid (+ Insights by blog category)
│
├── lib/
│   ├── api/strapi.ts, wordpress.ts   ← the only places that call fetch()
│   ├── api/blogs.api.ts              ← fetchLatestBlogs(category?) — WordPress Insights
│   ├── api/endpoints.ts              ← every endpoint + populate query
│   ├── media.ts                      ← cmsText, hrefPath, media URLs
│   └── utils.ts                      ← cn()
│
└── types/
    ├── strapi.ts                     ← response wrappers
    ├── sections.types.ts             ← Strapi `shared.*` blocks used by shared sections
    └── blog.types.ts                 ← WordPress blog feed

frontend/scripts/check-layout.mjs     ← `npm run check:layout -- <path>` responsive check
```

### Dynamic zones → components
Each page fetches one Strapi entry and maps its `content` dynamic zone, in
Strapi's order, through a block renderer (`HomeBlocks`, `ServiceBlocks`). A
block the renderer does not know is skipped, so editors cannot break a page.
Adding a section to a page = add the block to the renderer + its `populate`
line in `endpoints.ts`.

---

## CTA + Footer Strategy

> The Footer (in `app/layout.tsx`) renders `LetsTalk` — the contact card and
> enquiry form — followed by the certifications strip and the link columns.
> Every page gets it automatically; pages never render `LetsTalk` themselves.

---

## Data Fetching Strategy

**Method: Parallel `Promise.all()` in Server Components — NO GraphQL.**

Each section has its own fetch function in `home.api.ts`. The home `page.tsx` calls them all in parallel:

```typescript
// app/page.tsx
export default async function HomePage() {
  const [hero, services, stats, caseStudies, testimonials, blogs, clients] =
    await Promise.all([
      fetchHero(),
      fetchServices(),
      fetchStats(),
      fetchCaseStudies(),
      fetchTestimonials(),
      fetchBlogs(),          // /api/blogs — separate endpoint, no problem
      fetchClients(),
    ]);

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection data={hero} />
      </Suspense>
      {/* ... */}
    </>
  );
}
```

Why this works:
- All fetches happen in parallel → fastest possible load
- Each section wrapped in `<Suspense>` → independent loading states
- ISR `revalidate: 60` → cached, not re-fetched on every request
- Blog API being on a different endpoint doesn't matter at all

---

## API Endpoints (Assumed — backend dev will confirm)

| Endpoint | Revalidate | Section |
|---|---|---|
| `GET /api/global?populate=*` | 3600s | Header nav, footer links |
| `GET /api/home-page?populate=deep` | 60s | Hero, stats, CTA text |
| `GET /api/services?populate=*` | 60s | Services section |
| `GET /api/case-studies?populate=*` | 60s | Case studies carousel |
| `GET /api/testimonials?populate=*` | 60s | Testimonials |
| `GET /api/blogs?populate=*&pagination[limit]=4` | 60s | Blog grid (4 latest) |
| `GET /api/clients?populate=*` | 3600s | Clients logo strip |

---

## ⚠️ Route / URL Rules

**Never create new routes.** The existing site is indexed by search engines — all URLs are registered in the sitemap and SEO tools.

- Map new API data to **existing route files only**
- The USER will explicitly provide the exact URL path if a new route is ever needed
- Do not rename or restructure existing `app/` route folders

---

## Performance Checklist

- [ ] `next/image` for all images — hero image has `priority` prop
- [ ] `dynamic(() => import('./ParticlesCanvas'), { ssr: false })` for particles
- [ ] `LazyMotion` + `domAnimation` from framer-motion
- [ ] `<Suspense fallback={<Skeleton />}>` per section
- [ ] ISR revalidation per endpoint (see table above)
- [ ] Particles disabled on mobile (`hidden md:block`) for performance

---

## Responsive Breakpoints

| Tailwind Prefix | Width | Target Device |
|---|---|---|
| *(default)* | 0–639px | Mobile phones |
| `sm:` | 640px+ | Large mobile |
| `md:` | 768px+ | iPad portrait |
| `lg:` | 1024px+ | iPad landscape, small laptop |
| `xl:` | 1280px+ | Desktop |
| `2xl:` | 1536px+ | Large / wide desktop |

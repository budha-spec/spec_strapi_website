# SPEC India – Project Architecture

> Agent reference: `.agents/GEMINI.md` at monorepo root — single source of truth for all rules.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| CMS / Backend | Strapi v5 — REST API |
| Styling | Tailwind CSS v4 (utility-first, mobile-first) |
| Animations | tsParticles (hero globe + dot bg) + Framer Motion (scroll reveals) |
| Data Fetching | React Server Components + Parallel `Promise.all()` + ISR |
| Font | Inter via `next/font/google` |

---

## Frontend Folder Structure

```
frontend/src/
├── app/                         ← Next.js App Router
│   ├── layout.tsx               ← Root layout: loads Header, Footer, fonts, global CSS
│   ├── globals.css              ← Tailwind v4 @theme tokens + base styles
│   ├── not-found.tsx
│   └── page.tsx                 ← Home page (Server Component, parallel data fetching)
│
├── features/                    ← FEATURE-BASED MODULES
│   └── home/
│       ├── components/          ← Section components (Server or Client as needed)
│       │   ├── HeroSection.tsx
│       │   ├── ClientsStrip.tsx       ← Marquee + hover-pause + logo color highlight
│       │   ├── ServicesSection.tsx
│       │   ├── StatsSection.tsx       ← Animated counters
│       │   ├── CaseStudiesSection.tsx ← Framer Motion carousel
│       │   ├── TestimonialsSection.tsx
│       │   └── BlogSection.tsx
│       ├── api/
│       │   └── home.api.ts      ← All home-page data fetching functions
│       ├── types/
│       │   └── home.types.ts    ← TypeScript interfaces for all home sections
│       └── index.ts             ← Barrel export
│
├── components/                  ← SHARED / GLOBAL COMPONENTS
│   ├── layout/
│   │   ├── Header.tsx           ← Used on ALL pages via app/layout.tsx
│   │   ├── Footer.tsx           ← Footer + CTA contact form (shown on all pages)
│   │   └── index.ts
│   └── ui/                      ← Design system primitives
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── SectionWrapper.tsx   ← Standard section padding/max-width wrapper
│       ├── AnimatedCounter.tsx
│       ├── ParticlesCanvas.tsx  ← tsParticles wrapper (dynamic import, ssr:false)
│       └── index.ts
│
├── lib/
│   ├── api/
│   │   ├── strapi.ts            ← Base fetcher: strapiGet<T>()
│   │   └── endpoints.ts         ← All API endpoint path constants
│   └── utils.ts                 ← cn(), formatDate(), getStrapiMedia()
│
├── hooks/
│   ├── useCounter.ts            ← Animated number counter for stats
│   └── useInView.ts             ← Intersection observer hook
│
└── types/
    ├── strapi.ts                ← Generic StrapiResponse<T>, StrapiMedia
    └── common.ts                ← Shared enums, utility types
```

---

## CTA + Footer Strategy

> **CTA contact form lives INSIDE the Footer component.**
> Every page automatically gets the CTA + footer because Footer is in `app/layout.tsx`.
> No separate CTASection component needed.

```
Footer.tsx = [CTA Banner / Contact Form] + [Footer Links + Social + Copyright]
```

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

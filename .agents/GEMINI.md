# SPEC India – Common Agent Reference
# Read this file before starting ANY task in this monorepo.

---

## Monorepo Structure

```
spec_strapi_website/
├── frontend/        ← Next.js 16 (React 19, TypeScript, Tailwind v4)
├── backend/         ← Strapi v5 (CMS / REST API)
├── docs/            ← architecture.md, design.md
├── CLAUDE.md        ← points Claude Code here
└── .agents/
    └── GEMINI.md    ← THIS FILE — single source of truth for all agents
```

---

## Project Context
- **Corporate IT company website** — enterprise grade (Infosys / TCS / Wipro style).
- Frontend and backend are **separate concerns** — only touch the side relevant to the task.
- Backend dev provides Strapi REST APIs — frontend consumes them.
- Always read `docs/architecture.md` for folder structure.
- Always read `docs/design.md` for color tokens and design system.

---

## Environment
- Frontend dev server: `cd frontend && npm run dev` → http://localhost:3000
- Backend (Strapi): `cd backend && npm run develop` → http://localhost:1337
- Strapi admin panel: http://localhost:1337/admin

---

## ⚠️ Route / URL Rules — CRITICAL

**Never create new URL routes or page files without explicit instruction.**

The existing SPEC India website is already indexed by search engines and all URLs are registered in SEO tools (sitemap, Google Search Console, etc.).

- **Always use existing routes** — do not invent new `/page` paths.
- If a new page is needed, the USER will explicitly name the route.
- Adding an unplanned route can break SEO rankings and cause 404s on indexed URLs.
- When a backend API is added for a new page, map it to the **exact existing route** — do not rename it.

---

## Frontend Rules (Next.js 16 / React 19 / TypeScript)

### Stack
- Framework: Next.js 16 App Router (`params` is a Promise — `await params`)
- Language: TypeScript (strict — never use `any`)
- CSS: Tailwind CSS v4 — utility classes only, tokens in `src/app/globals.css` `@theme {}`
- Animations: tsParticles (canvas/particles) + Framer Motion (scroll reveals)
- Data: React Server Components + `Promise.all()` parallel fetches + ISR

### Folder Rules
- Page-specific sections → `src/features/[page]/components/` (e.g. `home`)
- A feature that serves several page types gets **one sub-folder per page type**, with shared api/types/renderer at its root — e.g. `features/service/{landing,detail,sub-service}/components/`
- **Sections used on 2+ pages → `src/components/sections/`** (see catalogue below)
- Shared layout (Header, Footer) → `src/components/layout/`
- Reusable UI primitives (buttons, images, headings) → `src/components/ui/`
- API fetchers → `src/lib/api/strapi.ts` + `src/features/[page]/api/[page].api.ts`
- TypeScript types → `src/types/` (global), `src/types/sections.types.ts` (Strapi `shared.*` blocks rendered by shared sections), or `src/features/[page]/types/` (page-specific)
- When a section starts being used by a second page, **move it** to `src/components/sections/` (with `git mv`) and its block type to `sections.types.ts` — never copy it
- Custom hooks → `src/hooks/`

### CSS Rules
- Tailwind v4 classes only — no inline `style={{}}` for static values
- All color/spacing tokens defined in `src/app/globals.css` under `@theme {}` — never hardcode hex values in components
- **Mobile-first always**: write base (mobile) class first, then `sm:` → `md:` → `lg:` → `xl:`
- Use `cn()` from `src/lib/utils.ts` for conditional class names

### Component Rules
- Every API-driven section needs a skeleton component for its loading state
- Wrap every API-driven section in `<Suspense fallback={<Skeleton />}>`
- Use `next/image` for all images — **never `<img>`**
- tsParticles: always `dynamic(() => import(...), { ssr: false })`
- Framer Motion: always `whileInView` + `viewport={{ once: true }}`
- The Footer renders `LetsTalk` (contact card + enquiry form) on every page — do not add it to pages again

### Data Fetching Rules
- Server Components by default — fetch in RSC, not in client components
- Use `Promise.all()` for parallel section fetches on a page
- All fetches via `strapiGet()` helper in `src/lib/api/strapi.ts` — never raw `fetch()` in components
- ISR: `next: { revalidate: 60 }` for content, `next: { revalidate: 3600 }` for nav/footer
- Always handle loading, error, and empty states

### Naming Conventions
- Components: `PascalCase.tsx` → `HeroSection.tsx`
- Hooks: `useHookName.ts` → `useCounter.ts`
- API files: `name.api.ts` → `home.api.ts`
- Type files: `name.types.ts` → `home.types.ts`
- Constants: `UPPER_SNAKE_CASE`

---

## ✅ Page Build Checklist — MANDATORY for every page or section

**Before building**
1. Get the route from the user (see Route Rules). Service pages map to Strapi's `url` field, not `slug` — e.g. `/services/x` ⇢ `filters[url][$eq]=services/x`. Detail and sub-service pages share `/services/:slug`; `serviceTemplate()` picks the layout from the entry's `parent` (child of the landing ⇒ detail, deeper ⇒ sub-service).
2. Fetch the real Strapi response first and type it from what comes back (`curl` the endpoint). Do not guess field names.
3. Check `src/components/sections/` for an existing section before writing a new one. Compare against the Figma section label.
4. Read the hover/interaction reference (Figma prototype, video, or screenshots) — rest **and** hover states are part of the spec.

**While building**
5. Mobile-first classes; size with `clamp()` against the 1920px canvas, like the existing sections. No fixed widths that add up past the `.shell`.
6. Long or unknown-length rows (tab bars, chips, logo strips) must wrap or scroll inside their own container — never widen the page.
7. Every hover effect also works on keyboard focus (`group-focus-within:` / `:focus-visible`) and respects `prefers-reduced-motion` for long animations.
8. Give repeated controls a stable class hook (`.explore-more`, `.explore-all`, `.carousel-arrow`, …) so design can restyle them in one place.

**Before calling it done**
9. `npm run type-check` passes.
10. `npm run check:layout -- <path>` passes at every default width (320 → 2560). Fix any reported overflow, including in shared parts like the Footer.
11. Look at the page at a phone width and a desktop width (`--shots=<dir>` saves full-page screenshots), and check hover states.

---

## Shared Sections Catalogue (`src/components/sections/`)

Names follow the Figma section labels so designers and developers mean the same thing.

| Component | Figma section | Strapi block |
|---|---|---|
| `PageHero` (+ `PageHeroSkeleton`) | Inner-page hero: breadcrumb pill, title, intro, CTA | entry `title` / `description` + `shared.contact-us` |
| `ClientsStrip` | "Trusted by global leaders" logo marquee | `shared.gallery` |
| `ProvenImpact` | "Proven Impact" stats band | `shared.key-metrics-section` |
| `CaseStudies` | "Client Success Stories" carousel | `shared.case-studies` |
| `Testimonials` | "Client Spotlight" video cards | `shared.testimonial-section` |
| `FaqSection` | "Frequently Asked Questions" accordion | `shared.faqs` |
| `CtaBanner` | "Hire Dedicated Development Team" banner | `shared.cta` |
| `BlogSection` | "Latest Insights" carousel (WordPress, optional category) | — (`fetchLatestBlogs(category?)` in `src/lib/api/blogs.api.ts`) |
| `LetsTalk` | "Let's Talk to OUR EXPERT!" + enquiry form | Strapi `footer` single type (`fetchFooter()` in `src/lib/api/footer.api.ts`), rendered by Footer with the awards/ratings strip |

---

## Strapi Query Rules
- Dynamic zones: populate each block explicitly — `populate[content][on][shared.<block>][populate]=*`, nesting one more level for relations (`…[populate][case_studies][populate]=*`). Keep every endpoint in `src/lib/api/endpoints.ts`.
- `populate[seo]=*` is rejected (`Invalid key ogImage`) — request SEO text fields only: `populate[seo][fields][0]=metaTitle`.
- Strapi text can contain mojibake (`Â`, `â€™`, `�`). `cmsText()` strips the stray `Â` before a non-breaking space; anything else must be fixed in the CMS, not in code.
- Third-party feeds (WordPress Insights) must fail soft: return `[]` and hide the section, never crash the page.
- WordPress filters blogs by **its own category slug** (`?category=ai`), which is Strapi's `blog_category.slug` — not the page URL slug. Populate `blog_category` with `fields` only (populating `blog_posts` is rejected).
- A relation Strapi drops silently (e.g. `industries`) is often a missing Public `find` permission — check `/api/<type>` for a 403.

---

## Styling Gotchas (learned the hard way)
- **Tailwind utilities beat `@layer components`.** If an element has `text-text-primary`, a `.my-class:hover { color: … }` rule in `globals.css` will NOT win. Put state colours on the element as utilities (`hover:text-white`, `group-hover:…`) or target a property no utility sets.
- Tailwind v4 normally wraps `hover:` / `group-hover:` in `@media (hover: hover)`, which hides them on phones and iPads. `globals.css` overrides this with `@custom-variant hover (&:hover);` so a tap triggers the same hover state as a mouse. Keep that line, and when adding an effect, test it with touch emulation as well as a mouse.
- Hover must never hide required content — on touch it only appears after a tap.
- Gradient text (`.gradient-text`) uses `-webkit-text-fill-color: transparent`; to switch it to a solid colour on hover, set `-webkit-text-fill-color`, not `color`.
- `globals.css` ends with an **unlayered** "custom css" block (designer-owned Explore More / Explore All / carousel styles). Unlayered CSS beats every `@layer` rule *and* Tailwind utilities, whatever the specificity. To override it for one component (e.g. the dark `.capability-grid-card` hover), add an unlayered rule **after** that block — a rule inside `@layer components` can never win.
- Tailwind v4 `scale-*` / `rotate-*` / `translate-*` set the separate CSS `scale` / `rotate` / `translate` properties, not `transform`. Animate them with `transition-transform` (covers all four) or list them explicitly (`transition-[scale,filter]`) — `transition-[transform,…]` makes the zoom jump.
- Figma uses **Poppins** for the footer card headings ("Let's Talk to", "OUR EXPERT!", "Share Your Project's Vision") — use the `font-display` class, not Inter. `docs/landing page/` is a code export of the landing design: grep it for exact font sizes/weights when Figma's API is rate-limited.
- Fade gradients with an opacity layer (`::before` or an absolutely positioned span) — `background-image` does not transition.

---

## What NOT to Do

- ❌ Never create a new route/page unless explicitly told the exact URL path
- ❌ Never use `<img>` — always `next/image`
- ❌ Never hardcode hex colors or font names in components
- ❌ Never import tsParticles without `dynamic()`
- ❌ Never put page-specific components in `src/components/`
- ❌ Never put shared components in `src/features/`
- ❌ Never use `any` in TypeScript
- ❌ Never skip skeleton loaders for API-driven sections
- ❌ Never call a page done without `npm run check:layout` passing
- ❌ Never duplicate a section that already exists in `src/components/sections/`
- ❌ Never touch backend code unless task explicitly says so
- ❌ Never modify frontend code unless task explicitly says so

---

## Commit Message Format
```
feat(scope): short description
fix(scope): short description
chore(scope): short description
```

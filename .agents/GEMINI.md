# SPEC India – Common Agent Reference
# Read this file before starting ANY task in this monorepo.

---

## Monorepo Structure

```
spec_strapi_website/
├── frontend/        ← Next.js 15 (React 19, TypeScript, Tailwind v4)
├── backend/         ← Strapi v5 (CMS / REST API)
├── docs/            ← architecture.md, design.md
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

## Frontend Rules (Next.js 15 / React 19 / TypeScript)

### Stack
- Framework: Next.js 15 App Router
- Language: TypeScript (strict — never use `any`)
- CSS: Tailwind CSS v4 — utility classes only, tokens in `src/app/globals.css` `@theme {}`
- Animations: tsParticles (canvas/particles) + Framer Motion (scroll reveals)
- Data: React Server Components + `Promise.all()` parallel fetches + ISR

### Folder Rules
- Home-page sections → `src/features/home/components/`
- Shared layout (Header, Footer) → `src/components/layout/`
- Reusable UI → `src/components/ui/`
- API fetchers → `src/lib/api/strapi.ts` + `src/features/[page]/api/[page].api.ts`
- TypeScript types → `src/types/` (global) or `src/features/[page]/types/` (page-specific)
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
- Footer component includes CTA contact form — no separate CTASection

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

## What NOT to Do

- ❌ Never create a new route/page unless explicitly told the exact URL path
- ❌ Never use `<img>` — always `next/image`
- ❌ Never hardcode hex colors or font names in components
- ❌ Never import tsParticles without `dynamic()`
- ❌ Never put page-specific components in `src/components/`
- ❌ Never put shared components in `src/features/`
- ❌ Never use `any` in TypeScript
- ❌ Never skip skeleton loaders for API-driven sections
- ❌ Never touch backend code unless task explicitly says so
- ❌ Never modify frontend code unless task explicitly says so

---

## Commit Message Format
```
feat(scope): short description
fix(scope): short description
chore(scope): short description
```

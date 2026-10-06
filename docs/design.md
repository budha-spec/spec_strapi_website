# SPEC India – Design System & Color Tokens
> ✅ Values confirmed from Figma exports in `docs/figma/`

---

## Logo

File: `docs/figma/Layer_1.png`

- **Logo**: SPEC India wordmark + "39+ YEARS" badge
- Colors in logo:
  - Globe icon: `#3AADEE` (blue) + `#6CC04A` (green)
  - "SPEC" text: `#6CC04A` (green)
  - "INDIA" text: `#3AADEE` (blue)
  - "39+ YEARS": `#FFB800` (amber/gold)
  - Divider bar: `#B9B9B9` (grey)
- Use `next/image` with this logo exported from Strapi `global` API
- On dark backgrounds: use the full-color version
- On light backgrounds: use the full-color version (logo has enough contrast on both)

---

## Typography

**Font: `Inter`** (confirmed from `docs/figma/image02.png`)
- Load via `next/font/google` — `{ subsets: ['latin'], display: 'swap' }`

### Font Sizes (confirmed from `docs/figma/image03.png`)

| Tag | Size (px) | Tailwind Class |
|---|---|---|
| H1 | 80px | `text-[80px]` / `text-7xl` (72px) → use `text-[80px]` |
| H2 | 60px | `text-[60px]` / `text-6xl` |
| H3 | 40px | `text-[40px]` / `text-4xl` |
| H4 | 36px | `text-[36px]` / `text-4xl` |
| H5 | 30px | `text-[30px]` / `text-3xl` |
| H6 | 26px | `text-[26px]` |
| Body L | 22px | `text-[22px]` |
| Body M | 20px | `text-xl` |
| Body S | 18px | `text-lg` |
| Small | 16px | `text-base` |
| Caption | 14px | `text-sm` |

> **Responsive scaling**: These are desktop sizes. Scale down for mobile:
> - H1 on mobile: `text-[40px] md:text-[60px] lg:text-[80px]`
> - H2 on mobile: `text-[32px] md:text-[48px] lg:text-[60px]`

---

## Color Palette (confirmed from `docs/figma/image01.png`)

All tokens defined in `src/app/globals.css` under `@theme {}`.

### Stroke / Border Colors

| Token | Hex | Figma Label | Usage |
|---|---|---|---|
| `--color-stroke-main` | `#B9B9B9` | Main stroke | Default borders, dividers |
| `--color-stroke-dark` | `#393939` | Dark stroke | Dark-mode card borders |
| `--color-stroke-outline` | `#D8D8D8` | Outline (label stroke) | Input outlines, label borders |

### Background Colors

| Token | Hex | Figma Label | Usage |
|---|---|---|---|
| `--color-bg-main` | `#000000` | Main (black) | Hero bg, dark sections |
| `--color-bg-dark` | `#393939` | Dark stroke bg | Dark card backgrounds |

### Text Colors

| Token | Hex | Figma Label | Usage |
|---|---|---|---|
| `--color-text-light` | `#5E5E5E` | Light Font | Secondary / muted text |
| `--color-text-para` | `#5E5E5E` | Para Font | Body paragraph text |
| `--color-text-primary` | `#000000` | Main | Primary text on light bg |
| `--color-text-inverse` | `#FFFFFF` | — | Text on dark backgrounds |

### Brand / Accent Colors (from logo — to be confirmed with hero export)

| Token | Hex | Source | Usage |
|---|---|---|---|
| `--color-brand-blue` | `#3AADEE` | Logo globe/INDIA | Primary brand blue |
| `--color-brand-green` | `#6CC04A` | Logo SPEC/globe | Secondary brand green |
| `--color-brand-amber` | `#FFB800` | Logo "39+ YEARS" | Highlight / badge accent |

---

## Hero Section — Confirmed from `Component 237.png`

| Element | Detail |
|---|---|
| **Background** | Pure black `#000000` with scattered white dot particles across entire canvas |
| **Bottom-left glow** | Radial gradient — deep blue `#0A2A6E` → transparent |
| **Bottom-right glow** | Radial gradient — dark green `#0A3D1F` → transparent |
| **Globe / particle ball** | tsParticles sphere — white dots `#FFFFFF`, upper-center position, large radius |
| **Tag pill** | Dark rounded pill with border — "Capabilities" badge (green `#6CC04A` bg) + "Digital Transformation" text (white, dark bg) |
| **H1 headline** | `"Building Next-gen AI-ready Software"` — white `#FFFFFF`, bold, ~80px, centered |
| **Subheadline** | `"Building custom software and intelligent platforms since 1987..."` — `#B9B9B9`, ~18–20px, centered |
| **Search bar** | Dark glass card — bg `rgba(255,255,255,0.06)`, border `rgba(255,255,255,0.12)`, `border-radius: 16px`, backdrop blur |
| **Search placeholder** | `"Ask SPEC to anything..."` — `#5E5E5E` |
| **Quick-link pills** | `"Modernize Legacy Software"`, `"Build a Business Application"`, `"AI to Our Product"` — dark outlined pills, white text, small size |
| **Submit button** | Circle, gradient blue-teal, right arrow icon `→` |

---

## globals.css @theme Block

```css
@import "tailwindcss";

@theme {
  /* Font */
  --font-sans: 'Inter', sans-serif;

  /* Stroke / Border */
  --color-stroke-main: #B9B9B9;
  --color-stroke-dark: #393939;
  --color-stroke-outline: #D8D8D8;

  /* Backgrounds */
  --color-bg-black: #000000;
  --color-bg-dark: #393939;
  --color-bg-light: #F9F9F9;
  --color-bg-white: #FFFFFF;

  /* Hero glow gradients */
  --color-hero-glow-blue: #0A2A6E;
  --color-hero-glow-green: #0A3D1F;

  /* Text */
  --color-text-primary: #000000;
  --color-text-secondary: #5E5E5E;
  --color-text-muted: #B9B9B9;
  --color-text-inverse: #FFFFFF;

  /* Brand */
  --color-brand-blue: #3AADEE;
  --color-brand-green: #6CC04A;
  --color-brand-amber: #FFB800;

  /* Glass / Hero search bar */
  --color-glass-bg: rgba(255, 255, 255, 0.06);
  --color-glass-border: rgba(255, 255, 255, 0.12);

  /* Particles */
  --color-particle-dot: #FFFFFF;

  /* Radius */
  --radius-card: 1rem;
  --radius-card-lg: 1.25rem;
  --radius-btn: 9999px;
}
```

---

## Section Backgrounds

| Section | Background |
|---|---|
| Hero | `#000000` (`--color-bg-black`) — confirmed dark |
| Clients Strip | `#FFFFFF` or very light |
| Services | `#F9F9F9` (light grey) |
| Stats | `#000000` or `#393939` |
| Case Studies | `#FFFFFF` |
| Testimonials | `#000000` or `#393939` |
| Blog | `#F9F9F9` |
| Footer + CTA | `#000000` |

---

## Clients Strip — Hover Behavior

- Default: greyscale logos `filter: grayscale(100%) opacity(60%)`
- Hover: full color `filter: grayscale(0%) opacity(100%)`
- Marquee pauses on logo hover (`animation-play-state: paused`)
- Transition: `transition: filter 0.3s ease`

---

## Particles Config (Hero Globe)

```
Container: circle/sphere shape
Background: #000000
Dots: #FFFFFF, size 1.5–2px
Movement: slow orbit
Hover: repulse (dots push away from cursor)
Mobile: hidden (disabled for performance)
```

## Particles Config (Other Sections)

```
Dots: #FFFFFF at opacity 0.15
Size: 1px
Movement: very slow drift
Hover: bubble (dots gently move toward cursor)
```

---

## Buttons

| Variant | Base Classes |
|---|---|
| Primary | `bg-brand-blue text-white rounded-full px-6 py-3 hover:brightness-110 transition` |
| Outline | `border border-brand-blue text-brand-blue rounded-full px-6 py-3 hover:bg-brand-blue hover:text-white transition` |
| Ghost | `text-brand-blue underline-offset-4 hover:underline transition` |

---

## Animation Timing (Framer Motion)

| Animation | Duration | Easing |
|---|---|---|
| Section fade-in | `0.6s` | `easeOut` |
| Card stagger | `0.1s` per child | `easeOut` |
| Counter count-up | `1.5s` | `easeOut` |
| Carousel slide | `0.4s` | `easeInOut` |
| Logo hover filter | `0.3s` | CSS transition |

---

## ⚠️ Still Needed from Figma

- [x] Hero section full export ✅ (`Component 237.png`)
- [ ] Services section card design
- [ ] Testimonials card layout
- [ ] Footer / CTA section design
- [ ] Any icon set used in services cards

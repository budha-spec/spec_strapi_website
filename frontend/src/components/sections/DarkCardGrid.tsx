import { AccentHeading } from '@/components/ui/AccentHeading';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';

export interface DarkCardItem {
  id: number;
  title: string;
  description?: string | null;
  /** Explore More under the copy — only when the item links somewhere. */
  link?: { href: string; label?: string } | null;
}

interface DarkCardGridProps {
  /** Small gradient label, e.g. "Industry Solutions" / "Challenges". */
  eyebrow?: string | null;
  /** Section heading; its last word gets the gradient. */
  heading?: string | null;
  items: DarkCardItem[];
  /** The page's own section hook, e.g. `sp-industry-services`. */
  className?: string;
  /**
   * `glass` — translucent cards, grey title, divider over white copy
   * (industry, case study). `light` — white cards, black title, grey copy
   * (Live BI "What can leadership see at a glance?").
   */
  tone?: 'glass' | 'light';
  /** Cards per row on wide screens; 3 drops to 2 at `md`. */
  columns?: 2 | 3;
}

/**
 * Dark band of titled cards, two to a row from `md` — industry "Services We
 * Are Offering" and case-study "Our Business Challenges" (same Figma
 * section, Figma 421:5631). Hovering a card, or focusing/tapping it, fades
 * its title into the bright brand ramp (`.dark-card` in globals.css) - the
 * card itself does not change. The `light` tone (Live BI, Figma 432:6879)
 * puts the same reveal on white cards, three to a row. Explore More shows only
 * for items with a link (industry services; case-study challenges never have
 * one) and stays static on hover — only the title animates.
 */
export function DarkCardGrid({
  eyebrow,
  heading,
  items,
  className,
  tone = 'glass',
  columns = 2,
}: DarkCardGridProps) {
  const cards = items.filter((item) => item.title);
  if (cards.length === 0) return null;
  const light = tone === 'light';

  return (
    <section
      className={cn(
        'sp-section sp-dark-card-grid w-full bg-bg-darker pt-[clamp(48px,6.25vw,120px)] pb-[clamp(48px,6.25vw,120px)]',
        className
      )}
    >
      <div className="shell">
        {eyebrow && <SectionEyebrow gradient="impact">{cmsText(eyebrow)}</SectionEyebrow>}

        {heading && (
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1320px] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(heading)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        <ul
          className={cn(
            'mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] md:grid-cols-2',
            columns === 3 && 'lg:grid-cols-3'
          )}
        >
          {cards.map((item) => (
            <li
              key={item.id}
              // A card without a link still needs to be reachable for the hover state.
              tabIndex={item.link ? undefined : 0}
              className={cn(
                'dark-card group flex flex-col rounded-[14px] outline-none',
                light
                  ? 'dark-card--light bg-bg-white px-[clamp(18px,1.3vw,25px)] py-[clamp(22px,2.08vw,40px)] focus-visible:shadow-[0_0_0_2px_rgb(255_255_255/0.4)]'
                  : 'bg-white/[0.08] py-[clamp(20px,1.82vw,35px)] pr-[clamp(18px,1.56vw,30px)] pl-[clamp(20px,1.82vw,35px)]'
              )}
            >
              {/*
                Grey title with a gradient copy over it that fades in. A
                gradient kept behind grey text (text-fill swap) tints the
                glyph edges green at rest, so the copy is a separate layer.
              */}
              <h3
                className={cn(
                  'dark-card-title relative w-fit text-d22 font-medium',
                  light ? 'leading-[1.3] text-text-primary' : 'leading-[1.21] text-text-light'
                )}
              >
                <span className="transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 group-focus-within:opacity-0 motion-reduce:transition-none">
                  {cmsText(item.title)}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    light ? 'gradient-text' : 'gradient-text-impact',
                    'absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none'
                  )}
                  style={{ ['--grad-angle' as string]: '-70deg' }}
                >
                  {cmsText(item.title)}
                </span>
              </h3>

              {item.description && (
                <p
                  className={cn(
                    'text-d18 leading-[1.3]',
                    light
                      ? 'mt-[clamp(10px,1.04vw,20px)] tracking-[0.01em] text-text-secondary'
                      : 'mt-[clamp(16px,1.56vw,30px)] border-t border-white/10 pt-[clamp(12px,1.04vw,20px)] text-white'
                  )}
                >
                  {cmsText(item.description)}
                </p>
              )}

              {item.link && (
                <ExploreMore
                  href={item.link.href}
                  label={item.link.label || undefined}
                  className="mt-auto w-fit pt-[clamp(18px,1.67vw,32px)]"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

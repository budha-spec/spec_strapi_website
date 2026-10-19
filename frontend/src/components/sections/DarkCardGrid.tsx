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
}

/**
 * Dark band of titled cards, two to a row from `md` — industry "Services We
 * Are Offering" and case-study "Our Business Challenges" (same Figma
 * section, Figma 421:5631). Hovering a card, or focusing/tapping it, fades
 * its title into the bright brand ramp (`.dark-card` in globals.css) - the
 * card itself does not change. Explore More shows only
 * for items with a link (industry services; case-study challenges never have
 * one) and stays static on hover — only the title animates.
 */
export function DarkCardGrid({ eyebrow, heading, items, className }: DarkCardGridProps) {
  const cards = items.filter((item) => item.title);
  if (cards.length === 0) return null;

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
          <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-white">
            <AccentHeading
              text={cmsText(heading)}
              accentClassName="gradient-text-impact font-semibold"
            />
          </h2>
        )}

        <ul className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.46vw,28px)] md:grid-cols-2">
          {cards.map((item) => (
            <li
              key={item.id}
              // A card without a link still needs to be reachable for the hover state.
              tabIndex={item.link ? undefined : 0}
              className="dark-card group flex flex-col rounded-[14px] bg-white/[0.08] py-[clamp(20px,1.82vw,35px)] pr-[clamp(18px,1.56vw,30px)] pl-[clamp(20px,1.82vw,35px)] outline-none"
            >
              {/*
                Grey title with a gradient copy over it that fades in. A
                gradient kept behind grey text (text-fill swap) tints the
                glyph edges green at rest, so the copy is a separate layer.
              */}
              <h3 className="dark-card-title relative w-fit text-d22 font-medium leading-[1.21] text-text-light">
                <span className="transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 group-focus-within:opacity-0 motion-reduce:transition-none">
                  {cmsText(item.title)}
                </span>
                <span
                  aria-hidden
                  className="gradient-text-impact absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
                  style={{ ['--grad-angle' as string]: '-70deg' }}
                >
                  {cmsText(item.title)}
                </span>
              </h3>

              {item.description && (
                <p className="mt-[clamp(16px,1.56vw,30px)] border-t border-white/10 pt-[clamp(12px,1.04vw,20px)] text-d18 leading-[1.3] text-white">
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

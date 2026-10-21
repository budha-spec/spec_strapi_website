'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CmsImage } from '@/components/ui/CmsImage';
import { RichText } from '@/components/ui/RichText';
import { cn } from '@/lib/utils';
import type { MenuCard, MenuIntro, MenuLink } from '@/types/header-menu.types';

/**
 * Figma's ↗ ("vuesax/linear/send"), both in a 24px box: `lg` (14px glyph) beside
 * "Service Offering" and on the cards, `sm` (10px glyph) beside the gradient headings.
 */
const ARROW_PATHS = {
  lg: ['M5 19 19 5', 'M8.73 5H19v10.27'],
  sm: ['M7 17 17 7', 'M9.66 7H17v7.34'],
} as const;

export function MenuArrow({
  variant = 'lg',
  className,
}: {
  variant?: keyof typeof ARROW_PATHS;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-[24px] shrink-0', className)}
      aria-hidden
    >
      {ARROW_PATHS[variant].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** A link when the CMS gave a URL, a plain box otherwise. */
export function MaybeLink({
  href,
  className,
  children,
}: {
  href: string | null;
  className?: string;
  children: ReactNode;
}) {
  if (!href || href === '#') return <div className={className}>{children}</div>;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

/**
 * Panel heading with its arrow: gradient for "About SPEC INDIA" and the
 * services categories (turns white on hover), white for "Service Offering"
 * (takes the gradient on hover). The swap lives in globals.css.
 */
export function MenuHeading({
  link,
  tone = 'gradient',
  className,
}: {
  link: MenuLink;
  tone?: 'gradient' | 'white';
  className?: string;
}) {
  const words = link.title.trim().split(/\s+/);
  const last = words.pop();
  const head = words.join(' ');

  return (
    <MaybeLink
      href={link.href}
      className={cn(
        `mega-heading mega-heading-${tone} group/heading block w-fit font-medium leading-[normal] text-white`,
        // Figma's 22 / 20px at 1920; eases down a little so narrower
        // columns do not wrap every category onto two lines.
        tone === 'white' ? 'text-[clamp(19px,1.15vw,22px)]' : 'text-[clamp(17px,1.04vw,20px)]',
        className
      )}
    >
      <span
        className={cn('mega-heading-label', tone === 'gradient' && 'gradient-text-impact')}
        // Figma's heading ramp angle (the class default is the flatter stats one).
        style={tone === 'gradient' ? { ['--grad-angle' as string]: '-31.8deg' } : undefined}
      >
        {head && `${head} `}
        {/* The arrow stays beside the last word when a long title wraps. */}
        <span className="whitespace-nowrap">
          {last}
          <MenuArrow
            variant={tone === 'white' ? 'lg' : 'sm'}
            className="ml-[5px] inline-block align-[-0.3em] text-white transition-transform duration-200 group-hover/heading:-translate-y-0.5 group-hover/heading:translate-x-0.5 group-focus-visible/heading:-translate-y-0.5 group-focus-visible/heading:translate-x-0.5 motion-reduce:transition-none" />
        </span>
      </span>
    </MaybeLink>
  );
}

/**
 * A menu link that takes the gradient on hover, focus and the current page.
 * `row` is the divided list (Who we are, Industries, Insights); `plain` the
 * services lists.
 */
export function MegaLink({
  link,
  variant = 'plain',
  active,
  onActivate,
}: {
  link: MenuLink;
  variant?: 'plain' | 'row';
  /** Insights: the category whose thumbnails are showing. */
  active?: boolean;
  onActivate?: () => void;
}) {
  const pathname = usePathname();
  const current = link.href === pathname;
  const className = cn(
    'mega-link text-[16px] leading-[normal] text-white outline-offset-4',
    variant === 'row'
      ? 'flex min-h-[clamp(42px,2.66vw,51px)] items-center border-b border-stroke-dark py-2'
      : // Block, so the list line is the link's own height (Figma: 19px text + 20px gap).
        'block w-fit'
  );
  const label = <span className="mega-link-label">{link.title}</span>;

  if (link.href === '#') {
    return <span className={className}>{label}</span>;
  }
  return (
    <Link
      href={link.href}
      className={className}
      aria-current={current ? 'page' : undefined}
      data-active={active || undefined}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </Link>
  );
}

/** Divided link list with a rule above the first row. */
export function MegaLinkList({
  links,
  className,
}: {
  links: MenuLink[];
  className?: string;
}) {
  return (
    <ul className={cn('border-t border-stroke-dark', className)}>
      {links.map((link) => (
        <li key={link.id}>
          <MegaLink link={link} variant="row" />
        </li>
      ))}
    </ul>
  );
}

/** First column of a panel: "Who we are" + its paragraph. */
export function MenuIntroBlock({ intro }: { intro: MenuIntro | null }) {
  if (!intro) return null;
  return (
    <div className="mega-intro max-w-[306px]">
      <p className="text-[20px] font-semibold leading-[1.4] text-white">{intro.title}</p>
      <RichText
        content={intro.content}
        className="mt-[20px] text-[14px] leading-[1.4] text-text-light"
      />
    </div>
  );
}

/**
 * Image card with a white caption.
 * `lg` ("SPEC AI"): on hover the image zooms and the caption fills with the
 * brand gradient — on its own layer, because `background-image` does not
 * transition. `md` ("40+ Years"): static, no arrow, as in Figma.
 */
export function MenuImageCard({
  card,
  eyebrow,
  size = 'lg',
  className,
}: {
  card: MenuCard;
  eyebrow?: string;
  size?: 'lg' | 'md';
  className?: string;
}) {
  const interactive = size === 'lg';

  return (
    <MaybeLink
      href={card.href}
      className={cn(
        'mega-card group/card flex w-full flex-col overflow-hidden rounded-[14px] bg-bg-white',
        className
      )}
    >
      <div className="overflow-hidden">
        <CmsImage
          media={card.image}
          fallback="cover"
          alt=""
          width={card.image?.width ?? 454}
          height={card.image?.height ?? 312}
          className={cn(
            'w-full object-cover',
            interactive
              ? 'aspect-[454/312] transition-transform duration-500 ease-out group-hover/card:scale-105 group-focus-visible/card:scale-105 motion-reduce:transition-none'
              : 'aspect-[532/226]'
          )}
        />
      </div>
      <div
        className={cn(
          'relative',
          interactive
            ? 'px-[clamp(20px,1.56vw,30px)] py-[clamp(20px,1.56vw,30px)]'
            : 'px-[clamp(20px,1.82vw,35px)] pt-[20px] pb-[19px]'
        )}
      >
        {interactive && (
          <span
            aria-hidden
            className="gradient-btn absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 group-focus-visible/card:opacity-100 motion-reduce:transition-none"
          />
        )}
        <div
          className={cn(
            'relative text-text-primary',
            interactive &&
              'transition-colors duration-300 group-hover/card:text-white group-focus-visible/card:text-white'
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-[clamp(8px,0.63vw,12px)] font-medium leading-[normal]">
              {eyebrow && <span className="text-[12px] uppercase">{eyebrow}</span>}
              <span className={interactive ? 'text-[18px]' : 'text-[15px]'}>{card.title}</span>
            </div>
            {interactive && (
              <MenuArrow className="transition-transform duration-200 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 motion-reduce:transition-none" />
            )}
          </div>
          {card.description && (
            <p
              className={cn(
                'leading-[normal]',
                interactive ? 'mt-[clamp(10px,0.94vw,18px)] text-[14px]' : 'mt-[12px] text-[12px]'
              )}
            >
              {card.description}
            </p>
          )}
        </div>
      </div>
    </MaybeLink>
  );
}

/** Slide timing shared by the menu carousels and their progress thumb. */
const SLIDE_MOTION =
  'duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none';

/**
 * Horizontal slide track for the menu carousels (Industries showcase,
 * Insights testimonials). Each child is one full-width slide (`w-full shrink-0`).
 */
export function MenuSlides({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn('flex transition-transform', SLIDE_MOTION, className)}
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {children}
    </div>
  );
}

/**
 * Figma's 204×5 progress track: grey rail, gradient thumb one slide wide.
 * Each slide's share of the rail is a button, so it also works as dots.
 */
export function MenuProgress({
  index,
  count,
  onSelect,
  label,
  className,
}: {
  index: number;
  count: number;
  onSelect: (index: number) => void;
  label: string;
  className?: string;
}) {
  if (count < 2) return null;
  return (
    <div
      className={cn(
        'mega-progress relative h-[5px] w-[clamp(120px,10.63vw,204px)] rounded-full bg-white/25',
        className
      )}
    >
      <span
        aria-hidden
        className={cn('gradient-btn absolute inset-y-0 rounded-full transition-[left]', SLIDE_MOTION)}
        style={{ width: `${100 / count}%`, left: `${(index * 100) / count}%` }}
      />
      <div className="absolute inset-x-0 -inset-y-2 flex">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${label} ${i + 1} of ${count}`}
            aria-current={i === index || undefined}
            className="flex-1 cursor-pointer rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

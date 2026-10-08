import Link from 'next/link';
import { cmsText, hrefPath } from '@/lib/media';

interface ServiceHeroProps {
  title: string;
  description?: string | null;
  /** Breadcrumb trail ahead of the current page. */
  crumbs: { label: string; href: string }[];
  /** Last breadcrumb, for the current page. Defaults to `title`. */
  currentCrumb?: string;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

export function ServiceHero({
  title,
  description,
  crumbs,
  currentCrumb,
  ctaLabel,
  ctaHref,
}: ServiceHeroProps) {
  return (
    <section className="w-full bg-bg-dark pt-[clamp(110px,7.6vw,146px)] pb-[clamp(40px,3.96vw,76px)]">
      <div className="shell">
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex h-[clamp(32px,1.98vw,38px)] max-w-full items-center gap-2 overflow-hidden rounded-full bg-white/10 px-[clamp(14px,1.04vw,20px)] text-d14 leading-[1.3]">
            {crumbs.map((crumb) => (
              <li key={crumb.href} className="flex shrink-0 items-center gap-2">
                <Link
                  href={crumb.href}
                  className="text-text-light transition-colors hover:text-white"
                >
                  {crumb.label}
                </Link>
                <span aria-hidden className="size-[3px] rounded-full bg-text-light" />
              </li>
            ))}
            <li aria-current="page" className="truncate font-medium text-white">
              {currentCrumb ?? cmsText(title)}
            </li>
          </ol>
        </nav>

        <h1 className="mt-[clamp(20px,2.08vw,40px)] text-d40 font-medium leading-[1.3] text-white">
          {cmsText(title)}
        </h1>

        {description && (
          <p className="mt-[clamp(10px,1.04vw,20px)] max-w-[994px] whitespace-pre-line text-d18 leading-[1.28] text-white">
            {cmsText(description)}
          </p>
        )}

        <Link
          href={hrefPath(ctaHref) === '#' ? '#contact' : hrefPath(ctaHref)}
          className="gradient-btn mt-[clamp(24px,2.08vw,40px)] inline-flex h-[clamp(36px,2.19vw,42px)] items-center justify-center rounded-full px-[clamp(14px,1.04vw,20px)] text-d16 leading-[1.4] whitespace-nowrap text-white transition-[filter] hover:brightness-110"
          style={{ ['--grad-angle' as string]: '-68.41deg' }}
        >
          {cmsText(ctaLabel) || 'Contact Us'}
        </Link>
      </div>
    </section>
  );
}

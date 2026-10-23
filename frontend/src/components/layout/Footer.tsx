import Link from 'next/link';
import { LetsTalk } from '@/components/sections';
import { CmsImage } from '@/components/ui/CmsImage';
import { fetchFooter } from '@/lib/api/footer.api';
import { fetchCountries } from '@/lib/api/countries.api';
import { cmsText, hrefPath } from '@/lib/media';
import type { FooterLink } from '@/types/footer.types';
import { HideOnRoutes } from './HideOnRoutes';

/** Pages that carry the enquiry form themselves, so the Footer skips it. */
const ROUTES_WITH_OWN_FORM = ['/contact-us'] as const;

const isExternal = (href: string) => /^https?:\/\//i.test(href);

/**
 * One dark-footer link. Takes the header menu's gradient on hover / focus
 * (`.footer-link` in globals.css). A `#` URL has no page yet, so it renders
 * as plain text rather than a dead link.
 */
function FooterLinkItem({ link }: { link: FooterLink }) {
  // `hrefPath('#')` would give `/#`, so catch the placeholder first.
  const placeholder = !link.url?.trim() || link.url.trim() === '#';
  const href = hrefPath(link.url);
  const className = 'footer-link text-d18 leading-[normal] text-text-footer outline-offset-4';
  const label = <span className="footer-link-label">{cmsText(link.title)}</span>;

  if (placeholder) return <span className={className}>{label}</span>;
  return (
    <Link
      href={href}
      className={className}
      {...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </Link>
  );
}

/**
 * Site footer on every page, all from the Strapi `footer` single type:
 * Let's Talk + enquiry form, the awards / review strip, the dark link
 * columns and the DMCA / Privacy / Terms bar. Only the copyright line is
 * static (its year is the current one).
 */
export async function Footer() {
  const [data, countries] = await Promise.all([fetchFooter(), fetchCountries()]);
  const certificates = (data?.certificates ?? []).filter((media) => media.url);
  const ratings = (data?.companyRating ?? []).filter((item) => item.logo?.url);
  const columns = (data?.footerMenu ?? []).filter(
    (column) => column.label && column.menuItem?.some((link) => link.title)
  );
  const privacy = data?.footerPrivacyMenu;
  const legalLinks = (privacy?.footerMenu ?? []).filter((link) => link.title);

  return (
    <footer className="sp-footer w-full">
      {/* ─── CTA: contact details + enquiry form ─────────────── */}
      <section className="sp-footer-contact relative z-10 w-full bg-bg-light ">
        {/* `#contact` anchors the form; pages with their own form carry it instead. */}
        <HideOnRoutes paths={ROUTES_WITH_OWN_FORM}>
          <div id="contact" className="scroll-mt-[86px]">
            <LetsTalk data={data} countries={countries} />
          </div>
        </HideOnRoutes>

        {/* Certifications + review scores. Overlaps the dark footer below. */}
        {(certificates.length > 0 || ratings.length > 0) && (
          <div className="sp-footer-awards shell relative z-20 mt-[clamp(16px,1.67vw,32px)] -mb-[clamp(24px,3.8vw,40px)]">
            <div className="flex flex-col items-center gap-[clamp(16px,1.67vw,32px)] overflow-hidden rounded-[20px]  bg-bg-white py-[clamp(16px,1.67vw,32px)] pl-[clamp(16px,1.77vw,34px)] pr-[clamp(8px,0.73vw,14px)] xl:flex-row xl:items-center xl:gap-[clamp(24px,4.58vw,88px)] xl:pr-0">
              <ul className="flex flex-1 flex-wrap items-center justify-center gap-[clamp(10px,1.15vw,22px)] xl:justify-start xl:gap-[clamp(4px,0.26vw,5px)]">
                {certificates.map((media, index) => (
                  <li key={media.url ?? index}>
                    <CmsImage
                      media={media}
                      fallback="logo"
                      alt={cmsText(media.alternativeText || media.name)}
                      width={100}
                      height={100}
                      className="size-[clamp(56px,5.2vw,100px)] rounded-full object-contain"
                    />
                  </li>
                ))}
              </ul>

              <ul className="flex w-full flex-wrap items-center justify-center gap-[clamp(16px,1.83vw,35px)] rounded-[20px] bg-bg-light px-[clamp(16px,1.56vw,30px)] py-[clamp(14px,1.61vw,31px)] xl:w-auto xl:pl-[clamp(16px,2.18vw,42px)] xl:pr-[clamp(8px,0.57vw,11px)] xl:min-w-[clamp(520px,44vw,844px)] xl:rounded-l-[88px] xl:rounded-r-none">
                {ratings.map((rating) => (
                  <li
                    key={rating.id}
                    className="flex w-[clamp(74px,6.78vw,130px)] flex-col items-center gap-[clamp(10px,0.95vw,18px)]"
                  >
                    <CmsImage
                      media={rating.logo}
                      fallback="logo"
                      alt={cmsText(
                        rating.logo?.alternativeText || rating.logo?.name,
                      )}
                      width={rating.logo?.width ?? 120}
                      height={rating.logo?.height ?? 24}
                      className="max-h-[clamp(16px,1.25vw,24px)] w-auto object-contain"
                    />
                    {rating.rating != null && (
                      <span className="flex items-center gap-[7px] text-d16 font-medium text-text-primary">
                        {rating.ratingImg?.url && (
                          <CmsImage
                            media={rating.ratingImg}
                            fallback="logo"
                            alt=""
                            width={24}
                            height={24}
                            className="size-[clamp(16px,1.22vw,23px)] object-contain"
                          />
                        )}
                        {Number(rating.rating).toFixed(1)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* ─── Dark footer ─────────────────────────────────────── */}
      <section className="sp-footer-links relative z-0 w-full bg-bg-black pt-[clamp(80px,8.07vw,155px)]">
        {columns.length > 0 && (
          <div className="shell">
            {/*
              From lg the CMS columns sit on one row, each as wide as its
              content and spread edge to edge (Figma's 96px rhythm at 1920),
              so any number of columns fits without fixed tracks.
            */}
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-flow-col lg:grid-cols-none lg:auto-cols-auto lg:justify-between lg:gap-x-[clamp(24px,5vw,96px)]">
              {columns.map((column) => (
                <nav
                  key={column.id}
                  aria-label={cmsText(column.label)}
                  className="flex min-w-0 flex-col gap-4 sm:gap-[clamp(16px,1.56vw,30px)]"
                >
                  <h4 className="text-d22 font-medium leading-[normal] text-white">
                    {cmsText(column.label)}
                  </h4>
                  <ul className="flex flex-col gap-3.5 sm:gap-5">
                    {(column.menuItem ?? [])
                      .filter((link) => link.title)
                      .map((link) => (
                        <li key={link.id}>
                          <FooterLinkItem link={link} />
                        </li>
                      ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        )}

        <div className="mt-[clamp(40px,3.96vw,76px)] border-t border-white/10">
          <div className="shell flex flex-col items-center gap-4 py-6 text-center md:flex-row md:justify-between md:py-[clamp(16px,1.15vw,22px)] md:text-left">
            <div className="flex flex-col items-center gap-3 md:flex-row md:gap-[30px]">
              {privacy?.image?.url && (
                <a
                  href={hrefPath(privacy.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0"
                >
                  <CmsImage
                    media={privacy.image}
                    fallback="logo"
                    alt={cmsText(privacy.image.alternativeText) || 'DMCA.com Protection Status'}
                    width={privacy.image.width ?? 121}
                    height={privacy.image.height ?? 24}
                    className="h-6 w-auto"
                  />
                </a>
              )}
              <p className="text-d18 leading-[normal] text-white">
                &copy; {new Date().getFullYear()} SPEC INDIA. All Rights Reserved.
              </p>
            </div>

            {legalLinks.length > 0 && (
              <ul className="flex items-center justify-center gap-8 md:gap-10">
                {legalLinks.map((link) => (
                  <li key={link.id}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </footer>
  );
}

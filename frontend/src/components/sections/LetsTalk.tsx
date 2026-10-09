import type { ReactNode } from 'react';
import { CmsImage } from '@/components/ui/CmsImage';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { FooterData, FooterSocial } from '@/types/footer.types';

type Network = 'linkedin' | 'instagram' | 'pinterest' | 'facebook' | 'twitter';

const NETWORK_LABELS: Record<Network, string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  pinterest: 'Pinterest',
  facebook: 'Facebook',
  twitter: 'X (Twitter)',
};

/**
 * Which brand colour a social button fills with on hover. Read from the icon
 * file first so the colour always matches the picture, then from the URL.
 */
function socialNetwork(social: FooterSocial): Network | null {
  for (const source of [social.icon?.name, social.url]) {
    const value = (source ?? '').toLowerCase();
    if (value.includes('linkedin')) return 'linkedin';
    if (value.includes('instagram')) return 'instagram';
    if (value.includes('pint')) return 'pinterest';
    if (value.includes('facebook')) return 'facebook';
    if (value.includes('twitter') || /(^|\/\/|\.)x\.com/.test(value))
      return 'twitter';
  }
  return null;
}

/**
 * Hover marks for the portfolio pills, keyed by title. Strapi only holds the
 * resting logo; on hover the circle turns white and shows this coloured mark.
 */
const PORTFOLIO_HOVER_ICONS: Record<string, string> = {
  behance: '/social/behance-hover.png',
  dribbble: '/social/dribbble-hover.png',
};

/**
 * Office address. `**…**` in Strapi marks bold explicitly. Without markers,
 * a leading building name (the text before the first comma, when it does not
 * start with a street number) is bold — Figma: "**SPEC House,** Parth
 * Complex, …" while "350 Grove Street, …" stays regular.
 */
function renderAddress(text: string): ReactNode[] {
  if (!text.includes('**')) {
    const match = text.match(/^([^,\d][^,]*,)([\s\S]*)$/);
    if (match) {
      return [
        <strong key="name" className="font-bold">
          {match[1]}
        </strong>,
        match[2],
      ];
    }
    return [text];
  }
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-bold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

const PhoneIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M6.6 10.8c1 2 2.6 3.6 4.6 4.6l1.5-1.5c.3-.3.7-.4 1-.2 1 .3 2 .5 3.1.5.5 0 .9.4.9.9V18c0 .5-.4.9-.9.9A15.3 15.3 0 0 1 1.2 3.6c0-.5.4-.9.9-.9h2.9c.5 0 .9.4.9.9 0 1 .2 2.1.5 3.1.1.3 0 .7-.2 1l-1.6 1.5Z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M3 5h18c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1Zm9 8.1 8-5.3V6.5l-8 5.3-8-5.3v1.3l8 5.3Z" />
  </svg>
);

const inputStyles =
  'h-[clamp(40px,2.4vw,46px)] w-full rounded-[10px] border border-stroke-outline bg-transparent px-[clamp(12px,0.94vw,18px)] text-d14 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-brand-cta-blue';

/** Figma places the two office columns 287px apart (256px + 31px gap). */
const OFFICE_GRID =
  'grid gap-[clamp(16px,1.5vw,28px)] sm:grid-cols-[repeat(2,minmax(0,clamp(200px,13.33vw,256px)))] sm:gap-x-[clamp(20px,1.61vw,31px)]';

/** Figma heading size 23.77px (Poppins) for "Let's Talk to" and the form title. */
const CARD_HEADING =
  'font-display text-[clamp(1.125rem,1.238vw,1.4854rem)] font-medium leading-[1.3] text-text-primary';

interface LetsTalkProps {
  /** Strapi `footer` single type; the contact card is skipped when null. */
  data?: FooterData | null;
  className?: string;
}

/**
 * "Let's Talk to OUR EXPERT!" contact card beside the "Share Your Project's
 * Vision" enquiry form. The Footer renders it on every page with content from
 * the Strapi `footer` single type; it carries no section background so a page
 * can drop it onto any surface. Spacing follows Figma node 87:882.
 */
export function LetsTalk({ data, className }: LetsTalkProps) {
  const offices = (data?.address ?? []).filter(
    (office) =>
      office.country || office.phone || office.email || office.address,
  );
  const socials = (data?.social ?? []).filter(
    (social) => social.url && social.icon?.url,
  );
  const portfolios = (data?.portfolio ?? []).filter(
    (item) => item.url && item.logo?.url,
  );

  // Figma: 980 + 32 + 688 = the 1700 shell.
  return (
    <div
      className={cn(
        'shell grid gap-[clamp(16px,1.67vw,32px)] lg:grid-cols-[980fr_688fr]',
        className,
      )}
    >
      {/* Let's talk */}
      {data && (
        <div className="flex flex-col rounded-[16px] border border-stroke-outline/70 bg-bg-white px-[clamp(20px,2.14vw,41px)] pt-[clamp(24px,2.55vw,49px)] pb-[clamp(24px,2.6vw,50px)]">
          {data.title && <p className={CARD_HEADING}>{cmsText(data.title)}</p>}
          {data.subTitle && (
            <h2 className="mt-[clamp(8px,0.83vw,16px)] font-display text-d60 font-bold leading-[1.3] text-text-heading">
              {cmsText(data.subTitle)}
            </h2>
          )}

          {offices.length > 0 && (
            <>
              <div className={cn(OFFICE_GRID, 'mt-[clamp(20px,2.08vw,40px)]')}>
                {offices.map((office) => (
                  <div
                    key={office.id}
                    className="flex flex-col gap-[clamp(8px,0.94vw,18px)]"
                  >
                    {office.phone && (
                      <a
                        href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                        className="contact-link flex w-fit items-center gap-2 text-d16"
                      >
                        <PhoneIcon />
                        {office.phone}
                      </a>
                    )}
                    {office.email && (
                      <a
                        href={`mailto:${office.email}`}
                        className="contact-link flex w-fit items-center gap-2 text-d16"
                      >
                        <MailIcon />
                        {office.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className={cn(OFFICE_GRID, 'mt-[clamp(20px,2.08vw,40px)]')}>
                {offices.map((office) => (
                  <div key={office.id}>
                    {office.country && (
                      <p
                        className="gradient-text w-fit text-d26 font-semibold leading-[1.3]"
                      >
                        {cmsText(office.country)}
                      </p>
                    )}
                    {office.address && (
                      <address className="mt-[clamp(8px,0.83vw,16px)] max-w-[clamp(200px,13.44vw,258px)] whitespace-pre-line text-d18 font-normal leading-[1.22] text-text-secondary not-italic">
                        {renderAddress(cmsText(office.address))}
                      </address>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {(socials.length > 0 || portfolios.length > 0) && (
            <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-[clamp(24px,2.08vw,40px)]">
              {socials.length > 0 && (
                <div className="flex flex-col gap-[clamp(10px,0.89vw,17px)]">
                  {data.followTxt && (
                    <span className="text-d18 font-medium leading-[1.3] text-text-secondary">
                      {cmsText(data.followTxt)}
                    </span>
                  )}
                  <ul className="flex items-center gap-[clamp(8px,0.89vw,17px)]">
                    {socials.map((social) => {
                      const network = socialNetwork(social);
                      return (
                        <li key={social.id}>
                          <a
                            href={social.url ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={
                              network
                                ? NETWORK_LABELS[network]
                                : cmsText(social.icon?.alternativeText) ||
                                  'Social profile'
                            }
                            data-network={network ?? undefined}
                            className="social-btn flex size-[clamp(30px,1.93vw,37px)] items-center justify-center overflow-hidden rounded-[8px] transition-colors"
                          >
                            {/* The Strapi icon is the whole button, border included. */}
                            <CmsImage
                              media={social.icon}
                              fallback="logo"
                              alt=""
                              width={38}
                              height={38}
                              className="size-full object-contain"
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {portfolios.length > 0 && (
                <div className="flex items-center gap-[clamp(8px,0.78vw,15px)]">
                  {portfolios.map((item) => {
                    const hoverIcon =
                      PORTFOLIO_HOVER_ICONS[
                        (item.title ?? '').trim().toLowerCase()
                      ];
                    return (
                      <a
                        key={item.id}
                        href={item.url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="behance-pill group flex h-[clamp(38px,2.4vw,46px)] items-center gap-2 rounded-full border border-stroke-grey p-[clamp(4px,0.26vw,5px)] pr-[clamp(10px,0.83vw,16px)] text-text-primary transition-colors"
                      >
                        <span className="behance-pill-icon relative flex aspect-square h-full items-center justify-center overflow-hidden rounded-full">
                          {/* The Strapi logo is the whole coloured circle. */}
                          <CmsImage
                            media={item.logo}
                            fallback="logo"
                            alt=""
                            width={36}
                            height={36}
                            className={cn(
                              'size-full object-contain',
                              hoverIcon &&
                                'transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0',
                            )}
                          />
                          {hoverIcon && (
                            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={hoverIcon}
                                alt=""
                                width={18}
                                height={18}
                                className="size-[18px] object-contain"
                              />
                            </span>
                          )}
                        </span>
                        <span className="text-d16 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                          {cmsText(item.title)}
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Enquiry form */}
      <div className="rounded-[16px] border border-stroke-outline/70 bg-bg-white px-[clamp(20px,2.08vw,40px)] pt-[clamp(20px,1.56vw,30px)] pb-[clamp(20px,1.93vw,37px)]">
        <h3 className={CARD_HEADING}>Share Your Project&rsquo;s Vision</h3>

        <form className="mt-[clamp(16px,1.56vw,30px)] flex flex-col gap-[clamp(12px,1.04vw,20px)]">
          <div className="grid gap-[clamp(12px,1.25vw,24px)] sm:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name*"
              aria-label="Your Name*"
              required
              className={inputStyles}
            />
            <input
              type="email"
              placeholder="Email Address*"
              aria-label="Email Address*"
              required
              className={inputStyles}
            />
          </div>

          <div className="grid gap-[clamp(12px,1.25vw,24px)] sm:grid-cols-2">
            <select
              aria-label="Country"
              defaultValue="India"
              className={`${inputStyles} appearance-none text-text-secondary`}
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            <div className="flex">
              <span className="flex h-[clamp(40px,2.4vw,46px)] shrink-0 items-center rounded-l-[10px] border border-r-0 border-stroke-outline px-[clamp(10px,0.78vw,15px)] text-d14 text-text-secondary">
                +01
              </span>
              <input
                type="tel"
                placeholder="Phone Number"
                aria-label="Phone Number"
                className={`${inputStyles} rounded-l-none`}
              />
            </div>
          </div>

          <div className="grid gap-[clamp(12px,1.25vw,24px)] sm:grid-cols-2">
            <input
              type="text"
              placeholder="Company Name"
              aria-label="Company Name"
              className={inputStyles}
            />
            <input
              type="text"
              placeholder="Designation"
              aria-label="Designation"
              className={inputStyles}
            />
          </div>

          <textarea
            placeholder="Requirement Brief*"
            aria-label="Requirement Brief*"
            required
            rows={4}
            className="h-[clamp(72px,4.69vw,90px)] w-full resize-none rounded-[10px] border border-stroke-outline bg-transparent px-[clamp(12px,0.94vw,18px)] py-[clamp(10px,0.73vw,14px)] text-d14 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-brand-cta-blue"
          />

          <label className="flex cursor-pointer items-center gap-[clamp(8px,0.63vw,12px)] rounded-[10px] border border-stroke-outline p-[clamp(8px,0.63vw,12px)] transition-colors hover:border-text-primary">
            <input type="file" accept=".doc,.docx,.pdf" className="sr-only" />
            <span className="flex size-[clamp(26px,1.67vw,32px)] shrink-0 items-center justify-center rounded-[6px] bg-bg-dark text-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M21.4 11 12.3 20a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
              </svg>
            </span>
            <span className="flex flex-col">
              <span className="text-d14 text-text-primary">Attach a file</span>
              <span className="text-d10 text-text-muted">
                .doc, .docx and .pdf files below 5MB size allowed.
              </span>
            </span>
          </label>

          {/*
            Captcha and submit share a row so the card keeps Figma's 615px
            height — the design leaves only 37px below the captcha, which is
            padding, not space for a button.
          */}
          <div className="flex flex-wrap items-end justify-between gap-[clamp(12px,1.04vw,20px)]">
            <div>
              <p className="text-d12 font-medium text-text-secondary">
                Verify that you are human*
              </p>
              <div className="mt-[clamp(8px,0.63vw,12px)] flex w-full max-w-[300px] items-center gap-3 rounded-[10px] border border-stroke-outline p-[clamp(10px,0.73vw,14px)]">
                <input
                  type="checkbox"
                  aria-label="I am human"
                  className="size-4 shrink-0 rounded border-stroke-main accent-brand-cta-blue"
                />
                <span className="text-d14 text-text-primary">I am human</span>
                <span className="ml-auto text-right text-[9px] leading-tight text-text-muted">
                  hCaptcha
                  <br />
                  Privacy &middot; Terms
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="gradient-btn inline-flex h-[clamp(32px,1.88vw,36px)] w-fit shrink-0 items-center justify-center rounded-full px-[clamp(14px,1.04vw,20px)] text-d16 text-white transition-[filter] hover:brightness-110"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import Image from 'next/image';
import {
  CARD_HEADING,
  EnquiryCard,
  NETWORK_LABELS,
  PORTFOLIO_HOVER_ICONS,
  renderAddress,
  socialNetwork,
} from '@/components/sections';
import { CmsImage } from '@/components/ui/CmsImage';
import { cmsText } from '@/lib/media';
import { cn } from '@/lib/utils';
import type { Country } from '@/types/contact.types';
import type { FooterData } from '@/types/footer.types';
import type { ContactIntroBlock } from '../types/contact-us.types';

/** Figma office columns: 258px wide, 338px apart. */
const OFFICE_COLUMNS =
  'sm:grid-cols-[repeat(2,minmax(0,clamp(200px,13.44vw,258px)))] sm:gap-x-[clamp(32px,4.17vw,80px)]';

interface ContactHeroProps {
  title: string;
  description?: string | null;
  /** Heading and text beside the offices (`shared.challenges-item`). */
  intro?: ContactIntroBlock;
  /** Strapi `footer` single type — offices, socials and portfolio links. */
  footer: FooterData | null;
  countries: Country[];
}

/**
 * Contact page hero (Figma node 375:7743): title and intro on the dark band,
 * then the office details beside the enquiry form over a blurred artwork.
 */
export function ContactHero({ title, description, intro, footer, countries }: ContactHeroProps) {
  const offices = (footer?.address ?? []).filter(
    (office) => office.country || office.phone || office.email || office.address,
  );
  const socials = (footer?.social ?? []).filter(
    (social) => social.url && social.icon?.url,
  );
  const portfolios = (footer?.portfolio ?? []).filter(
    (item) => item.url && item.logo?.url,
  );

  return (
    <section className="sp-section sp-contact-hero relative w-full overflow-hidden bg-bg-dark pt-[clamp(110px,7.66vw,147px)] pb-[clamp(32px,2.4vw,46px)]">
      {/* Artwork: right of the title on desktop, a dim backdrop on phones. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 lg:inset-auto lg:top-[clamp(86px,5.52vw,106px)] lg:left-[42.5%] lg:h-[52.19vw] lg:w-[79.38vw] lg:overflow-hidden lg:rounded-r-[14px] lg:opacity-100"
      >
        <Image
          src="/contact/hero-art.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover object-[50%_37%]"
        />
      </div>

      <div className="shell relative ">
        <h1 className="sp-page-title text-d60 font-semibold leading-[1.3] text-white">
          {cmsText(title)}
        </h1>
        {description && (
          <p className="mt-[clamp(10px,1.04vw,20px)] max-w-[clamp(320px,36vw,690px)] whitespace-pre-line text-d18 leading-[1.22] text-white">
            {cmsText(description)}
          </p>
        )}
      </div>

      <div className="relative mt-[clamp(32px,9.64vw,185px)]">
        {/* Frosted band behind the details and form (Figma: blur 19.45, black 30%). */}
        <div
          aria-hidden
          className="absolute inset-x-0 -top-[clamp(24px,3.7vw,71px)] bottom-0 hidden bg-black/30 backdrop-blur-[19.45px] lg:block"
        />

        <div className="shell relative grid gap-[clamp(32px,3vw,56px)] lg:grid-cols-[minmax(0,866fr)_688fr] lg:gap-0 ">
          <div className="min-w-0 lg:pt-[clamp(20px,2.03vw,39px)] lg:pr-[clamp(24px,6vw,115px)]">
            {intro?.title && (
              <h2 className={cn(CARD_HEADING, 'sp-title text-white')}>{cmsText(intro.title)}</h2>
            )}
            {intro?.description && (
              <p className="mt-[clamp(10px,0.89vw,17px)] max-w-[749px] text-d18 leading-[1.4] text-text-light">
                {cmsText(intro.description)}
              </p>
            )}

            {offices.length > 0 && (
              <div
                className={cn(
                  'mt-[clamp(28px,4.17vw,80px)] grid gap-y-7 sm:grid-flow-col sm:gap-y-[clamp(12px,0.89vw,17px)] sm:grid-rows-[auto_auto]',
                  OFFICE_COLUMNS,
                )}
              >
                {offices.flatMap((office) => [
                  <div key={`${office.id}-place`}>
                    {office.country && (
                      <p className="contact-office-name gradient-text w-full text-d26 font-semibold leading-[1.3]">
                        {cmsText(office.country)}
                      </p>
                    )}
                    {office.address && (
                      <address className="mt-[clamp(8px,0.83vw,16px)] whitespace-pre-line text-d18 leading-[1.22] text-text-light not-italic">
                        {renderAddress(cmsText(office.address))}
                      </address>
                    )}
                  </div>,
                  <div
                    key={`${office.id}-contact`}
                    className="flex flex-col gap-[clamp(8px,0.94vw,18px)]"
                  >
                    {office.phone && (
                      <a
                        href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                        className="contact-link flex w-fit items-center gap-3 text-d16 text-white"
                      >
                        <Image src="/contact/office-phone.svg" alt="" width={16} height={16} className="size-[clamp(14px,0.83vw,16px)] shrink-0" />
                        {office.phone}
                      </a>
                    )}
                    {office.email && (
                      <a
                        href={`mailto:${office.email}`}
                        className="contact-link flex w-fit items-center gap-3 text-d16 text-white"
                      >
                        <Image src="/contact/office-mail.svg" alt="" width={16} height={14} className="h-auto w-[clamp(14px,0.83vw,16px)] shrink-0" />
                        {office.email}
                      </a>
                    )}
                  </div>,
                ])}
              </div>
            )}

            {(socials.length > 0 || portfolios.length > 0) && (
              /* The portfolio pills (2 × 128px + gap) are wider than an office
                 column, so the second track sizes to them instead of wrapping. */
              <div className="mt-[clamp(32px,4.53vw,87px)] flex flex-wrap items-end gap-6 sm:grid sm:grid-cols-[clamp(200px,13.44vw,258px)_max-content] sm:gap-x-[clamp(32px,4.17vw,80px)]">
                {socials.length > 0 && (
                  <div className="flex flex-col gap-[clamp(10px,0.89vw,17px)]">
                    {footer?.followTxt && (
                      <span className="text-d18 font-medium leading-[1.3] text-white">
                        {cmsText(footer.followTxt)}
                      </span>
                    )}
                    <ul className="contact-social-icons flex items-center gap-[clamp(8px,0.89vw,17px)]">
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
                                  : cmsText(social.icon?.alternativeText) || 'Social profile'
                              }
                              data-network={network ?? undefined}
                              className="social-btn flex size-[clamp(30px,1.93vw,37px)] items-center justify-center overflow-hidden rounded-[8px] transition-colors"
                            >
                              {/* The Strapi icon is the whole button, border included —
                                  grey for the white card, so flip it to white. */}
                              <CmsImage
                                media={social.icon}
                                fallback="logo"
                                alt=""
                                width={38}
                                height={38}
                                className="size-full object-contain brightness-0 invert"
                              />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {portfolios.length > 0 && (
                  <div className="flex flex-wrap items-center gap-[clamp(8px,0.78vw,15px)] sm:flex-nowrap">
                    {portfolios.map((item) => {
                      const hoverIcon =
                        PORTFOLIO_HOVER_ICONS[(item.title ?? '').trim().toLowerCase()];
                      return (
                        <a
                          key={item.id}
                          href={item.url ?? '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="behance-pill group flex h-[clamp(38px,2.4vw,46px)] items-center gap-2 rounded-full border border-white p-[clamp(4px,0.26vw,5px)] pr-[clamp(10px,0.83vw,16px)] text-white transition-colors"
                        >
                          <span className="behance-pill-icon relative flex aspect-square h-full items-center justify-center overflow-hidden rounded-full">
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
                                <Image
                                  src={hoverIcon}
                                  alt=""
                                  width={18}
                                  height={18}
                                  className="size-[18px] object-contain"
                                />
                              </span>
                            )}
                          </span>
                          <span className="text-d16">{cmsText(item.title)}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div id="contact" className="min-w-0 scroll-mt-[86px]">
            <EnquiryCard countries={countries} className="rounded-[20px]" />
            <p className="mt-[clamp(10px,0.78vw,15px)] px-[clamp(0px,2.08vw,40px)] text-d14 leading-[1.3] text-white/60">
              By clicking the button &lsquo;SUBMIT&rsquo; you acknowledge reading and
              accepting our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

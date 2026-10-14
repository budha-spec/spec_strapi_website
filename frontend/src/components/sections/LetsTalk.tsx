import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LetsTalkForm } from './LetsTalkForm';

const PHONES = [
  { phone: '+91-79-26404031', email: 'lead@spec-india.com' },
  { phone: '+1 908-450-9862', email: 'lead@spec-usa.net' },
];

const OFFICES = [
  {
    country: 'India',
    lines: ['SPEC House, Parth Complex,', 'Near Swastik Cross Roads,', 'Navarangpura, Ahmedabad'],
    bold: true,
  },
  {
    country: 'USA',
    lines: ['350 Grove Street,', 'Bridgewater, NJ 08807,', 'United States.'],
    bold: false,
  },
];

const SOCIALS = [
  { name: 'LinkedIn', src: '/social/linkedin.png', network: 'linkedin' },
  { name: 'Instagram', src: '/social/instagram.png', network: 'instagram' },
  { name: 'Pinterest', src: '/social/pinterest.png', network: 'pinterest' },
  { name: 'Facebook', src: '/social/facebook.png', network: 'facebook' },
  { name: 'X', src: '/social/twitter.png', network: 'twitter' },
];

/**
 * `src` is the white mark on the coloured circle at rest; `hoverSrc` is the
 * coloured mark shown on the white circle while the pill is hovered. All four
 * files share an 18×18 canvas, so the swap never shifts the layout.
 */
const PORTFOLIOS = [
  {
    name: 'Behance',
    src: '/social/behance.png',
    hoverSrc: '/social/behance-hover.png',
    variant: 'behance',
  },
  {
    name: 'Dribbble',
    src: '/social/dribbble.png',
    hoverSrc: '/social/dribbble-hover.png',
    variant: 'dribbble',
  },
];

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M6.6 10.8c1 2 2.6 3.6 4.6 4.6l1.5-1.5c.3-.3.7-.4 1-.2 1 .3 2 .5 3.1.5.5 0 .9.4.9.9V18c0 .5-.4.9-.9.9A15.3 15.3 0 0 1 1.2 3.6c0-.5.4-.9.9-.9h2.9c.5 0 .9.4.9.9 0 1 .2 2.1.5 3.1.1.3 0 .7-.2 1l-1.6 1.5Z" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M3 5h18c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1Zm9 8.1 8-5.3V6.5l-8 5.3-8-5.3v1.3l8 5.3Z" />
  </svg>
);

interface LetsTalkProps {
  className?: string;
}

/**
 * "Let's Talk to OUR EXPERT!" contact card beside the "Share Your Project's
 * Vision" enquiry form. The Footer renders it on every page; it carries no
 * section background so a page can drop it onto any surface.
 */
export function LetsTalk({ className }: LetsTalkProps) {
  // Figma: 980 + 32 + 688 = the 1700 shell.
  return (
    <div
      className={cn(
        'shell grid gap-[clamp(16px,1.67vw,32px)] lg:grid-cols-[980fr_688fr]',
        className
      )}
    >
      {/* Let's talk */}
      <div className="flex flex-col rounded-[16px] border border-stroke-outline/70 bg-bg-white p-[clamp(20px,1.88vw,36px)]">
        <p className="text-d24 font-medium text-text-primary">Let&rsquo;s Talk to</p>
        <h2 className="mt-[clamp(4px,0.78vw,15px)] text-d60 font-bold leading-[1.05] text-text-heading">
          OUR EXPERT!
        </h2>

        <div className="mt-[clamp(24px,3.13vw,60px)] grid gap-[clamp(16px,1.5vw,28px)] sm:grid-cols-2">
          {PHONES.map((item) => (
            <div key={item.phone} className="flex flex-col gap-[clamp(6px,0.83vw,16px)]">
              <a
                href={`tel:${item.phone.replace(/[^+\d]/g, '')}`}
                className="contact-link flex items-center gap-2 text-d16"
              >
                <PhoneIcon />
                {item.phone}
              </a>
              <a
                href={`mailto:${item.email}`}
                className="contact-link flex items-center gap-2 text-d16"
              >
                <MailIcon />
                {item.email}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(20px,2.4vw,46px)] grid gap-[clamp(16px,1.5vw,28px)] sm:grid-cols-2">
          {OFFICES.map((office) => (
            <div key={office.country}>
              <p
                className="gradient-text w-fit text-d26 font-semibold"
                style={{ ['--grad-angle' as string]: '-17.74deg' }}
              >
                {office.country}
              </p>
              <address
                className={`mt-[clamp(6px,0.52vw,10px)] text-d18 leading-[1.25] text-text-secondary not-italic ${
                  office.bold ? 'font-bold' : 'font-normal'
                }`}
              >
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-6 pt-[clamp(24px,3.44vw,66px)]">
          <div className="flex items-center gap-[clamp(10px,0.89vw,17px)]">
            <span className="text-d18 font-medium text-text-secondary">Follow us on</span>
            <ul className="flex items-center gap-[clamp(8px,0.89vw,17px)]">
              {SOCIALS.map((social) => (
                <li key={social.name}>
                  <Link
                    href="#"
                    aria-label={social.name}
                    data-network={social.network}
                    className="social-btn flex size-[clamp(30px,1.93vw,37px)] items-center justify-center rounded-[8px] border border-stroke-grey transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={social.src} alt="" width={18} height={18} className="size-[18px] object-contain" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-[clamp(8px,0.78vw,15px)]">
            {PORTFOLIOS.map((item) => (
              <Link
                key={item.name}
                href="#"
                className="behance-pill group flex h-[clamp(38px,2.4vw,46px)] items-center gap-2 rounded-full border border-stroke-grey p-[clamp(4px,0.26vw,5px)] pr-[clamp(10px,0.83vw,16px)] text-text-primary transition-colors"
              >
                <span
                  className={`behance-pill-icon relative flex aspect-square h-full items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-bg-white group-focus-visible:bg-bg-white ${
                    item.variant === 'dribbble' ? 'bg-brand-pink' : 'bg-brand-cta-blue'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px] object-contain transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.hoverSrc}
                    alt=""
                    width={18}
                    height={18}
                    className="absolute size-[18px] object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
                <span className="text-d16 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry form */}
      <div className="rounded-[16px] border border-stroke-outline/70 bg-bg-white p-[clamp(20px,2.08vw,40px)]">
        <h3 className="text-d24 font-medium text-text-primary">
          Share Your Project&rsquo;s Vision
        </h3>

        <LetsTalkForm />
      </div>
    </div>
  );
}

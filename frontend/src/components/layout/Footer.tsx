import Link from 'next/link';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

const PHONES = [
  { phone: '+91-79-26404031', email: 'lead@spec-india.com' },
  { phone: '+1 908-450-9862', email: 'lead@spec-usa.net' },
];

const OFFICES = [
  {
    country: 'INDIA',
    accent: 'text-brand-cta-blue',
    lines: ['SPEC House, Parth Complex,', 'Near Swastik Cross Roads,', 'Navarangpura, Ahmedabad'],
    bold: true,
  },
  {
    country: 'USA',
    accent: 'text-brand-green',
    lines: ['350 Grove Street,', 'Bridgewater, NJ 08807,', 'United States.'],
    bold: false,
  },
];

const SOCIALS = [
  {
    name: 'LinkedIn',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05A4.2 4.2 0 0 1 17.6 8.7c3.2 0 4.4 2 4.4 5.4V21h-4v-6c0-1.5-.5-2.5-1.9-2.5-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1V21h-4V9Z',
  },
  {
    name: 'Instagram',
    path: 'M12 2.2c-2.7 0-3 0-4.1.1-1 0-1.8.2-2.4.5a4.9 4.9 0 0 0-1.8 1.1 4.9 4.9 0 0 0-1.1 1.8c-.3.6-.4 1.3-.5 2.4C2 9.2 2 9.5 2 12s0 2.8.1 3.9c0 1 .2 1.8.5 2.4a4.9 4.9 0 0 0 1.1 1.8 4.9 4.9 0 0 0 1.8 1.1c.6.3 1.3.4 2.4.5 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c1 0 1.8-.2 2.4-.5a5.2 5.2 0 0 0 2.9-2.9c.3-.6.4-1.3.5-2.4.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c0-1-.2-1.8-.5-2.4a4.9 4.9 0 0 0-1.1-1.8 4.9 4.9 0 0 0-1.8-1.1c-.6-.3-1.3-.4-2.4-.5C15 2.2 14.7 2.2 12 2.2Zm0 1.8c2.7 0 2.9 0 4 .1.8 0 1.3.2 1.6.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.6.1 1.1.1 1.3.1 4s0 2.9-.1 4c0 .8-.2 1.3-.3 1.6-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.6.3-1.1.1-1.3.1-4 .1s-2.9 0-4-.1c-.8 0-1.3-.2-1.6-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.3-.8-.3-1.6-.1-1.1-.1-1.3-.1-4s0-2.9.1-4c0-.8.2-1.3.3-1.6.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.6-.3 1.1-.1 1.3-.1 4-.1Zm0 3.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm6.3-8.2a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0Z',
  },
  {
    name: 'Pinterest',
    path: 'M12 2a10 10 0 0 0-3.6 19.3c-.1-.7-.2-1.8 0-2.6l1.3-5.5s-.3-.7-.3-1.7c0-1.6.9-2.8 2-2.8 1 0 1.4.7 1.4 1.6 0 1-.6 2.5-1 3.9-.3 1.1.6 2 1.7 2 2 0 3.5-2.1 3.5-5.2 0-2.7-1.9-4.6-4.7-4.6-3.2 0-5 2.4-5 4.8 0 1 .4 2 .8 2.6l-.3 1.3c-.1.3-.3.4-.6.2-1.1-.5-1.8-2.2-1.8-3.5 0-2.9 2.1-5.5 6-5.5 3.2 0 5.6 2.3 5.6 5.3 0 3.2-2 5.7-4.8 5.7-.9 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.8 1.9-1.2 2.5A10 10 0 1 0 12 2Z',
  },
  {
    name: 'Facebook',
    path: 'M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.2-1.5 1.5-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.2H7.5V13h2.8v8h3.2Z',
  },
  {
    name: 'X',
    path: 'M17.5 3h3.3l-7.2 8.3L21.6 21h-5.3l-4.2-5.4L7.3 21H4l7.5-8.6L3.6 3H9l3.9 5.1L17.5 3Zm-1.2 16h1.8L7.6 4.8H5.7l10.6 14.2Z',
  },
];

const RATINGS = [
  { site: 'Clutch', score: '4.6' },
  { site: 'GoodFirms', score: '4.8' },
  { site: 'AmbitionBox', score: '4.6' },
  { site: 'Google', score: '4.5' },
  { site: 'Glassdoor', score: '4.2' },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Services',
    links: [
      'Custom Software Development',
      'Enterprise software Development',
      'Web Development',
      'UI/UX Design',
      'Mobile App Development',
      'Software Testing & QA Services',
      'Dedicated Development Team',
    ],
  },
  {
    heading: 'Hire Developers',
    links: [
      'Hire Mobile App Developers',
      'Hire BI Developers',
      'Hire UI/UX Designers',
      'Hire Software Tester',
      'Hire Frontend Developers',
      'Hire Backend Developers',
      'Hire Full Stack Developers',
    ],
  },
  {
    heading: 'Industries',
    links: [
      'Healthcare',
      'Fitness',
      'Fintech',
      'Manufacturing',
      'Retail',
      'Media & Entertainment',
      'Advertising',
    ],
  },
  {
    heading: 'Solutions',
    links: [
      'Custom ERP',
      'Learning Management',
      'Enterprise CRM',
      'Enterprise Service',
      'Help Desk Management',
      'Spot Billing System',
      'Warehouse Management',
    ],
  },
  {
    heading: 'Resource',
    links: [
      'Overview',
      'Blog',
      'Newsletter',
      'Sitemap',
      'Live BI Examples',
      'Career',
      'Contact Us',
    ],
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

const inputStyles =
  'h-[clamp(40px,2.4vw,46px)] w-full rounded-[10px] border border-stroke-outline bg-transparent px-[clamp(12px,0.94vw,18px)] text-d14 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-brand-cta-blue';

export function Footer() {
  return (
    <footer id="contact" className="w-full">
      {/* ─── CTA: contact details + enquiry form ─────────────── */}
      <section className="relative z-10 w-full bg-bg-light pt-[clamp(40px,3.65vw,70px)]">
        <div className="shell grid gap-[clamp(16px,1.46vw,28px)] lg:grid-cols-[979fr_688fr]">
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
                    className="flex items-center gap-2 text-d16 text-text-primary hover:text-brand-cta-blue"
                  >
                    <PhoneIcon />
                    {item.phone}
                  </a>
                  <a
                    href={`mailto:${item.email}`}
                    className="flex items-center gap-2 text-d16 text-text-primary hover:text-brand-cta-blue"
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
                  <p className={`text-d18 font-bold ${office.accent}`}>{office.country}</p>
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
                        className="flex size-[clamp(30px,1.93vw,37px)] items-center justify-center rounded-[8px] border border-stroke-grey text-text-primary transition-colors hover:border-brand-cta-blue hover:text-brand-cta-blue"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d={social.path} />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-[clamp(8px,0.78vw,15px)]">
                {[
                  { name: 'Behance', bg: 'bg-brand-cta-blue', glyph: 'Bē' },
                  { name: 'Dribbble', bg: 'bg-brand-pink', glyph: 'Dr' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href="#"
                    className="flex h-[clamp(38px,2.4vw,46px)] items-center gap-2 rounded-full border border-stroke-grey p-[clamp(4px,0.26vw,5px)] pr-[clamp(10px,0.83vw,16px)] transition-colors hover:border-text-primary"
                  >
                    <span
                      className={`flex aspect-square h-full items-center justify-center rounded-full text-[11px] font-bold text-white ${item.bg}`}
                    >
                      {item.glyph}
                    </span>
                    <span className="text-d16 text-text-primary">{item.name}</span>
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

            <form className="mt-[clamp(16px,1.72vw,33px)] flex flex-col gap-[clamp(12px,1.04vw,20px)]">
              <div className="grid gap-[clamp(12px,1.25vw,24px)] sm:grid-cols-2">
                <input type="text" placeholder="Your Name*" aria-label="Your Name*" required className={inputStyles} />
                <input type="email" placeholder="Email Address*" aria-label="Email Address*" required className={inputStyles} />
              </div>

              <div className="grid gap-[clamp(12px,1.25vw,24px)] sm:grid-cols-2">
                <select aria-label="Country" defaultValue="India" className={`${inputStyles} appearance-none text-text-secondary`}>
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
                <input type="text" placeholder="Company Name" aria-label="Company Name" className={inputStyles} />
                <input type="text" placeholder="Designation" aria-label="Designation" className={inputStyles} />
              </div>

              <textarea
                placeholder="Requirement Brief*"
                aria-label="Requirement Brief*"
                required
                rows={4}
                className="w-full resize-none rounded-[10px] border border-stroke-outline bg-transparent px-[clamp(12px,0.94vw,18px)] py-[clamp(10px,0.73vw,14px)] text-d14 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-brand-cta-blue"
              />

              <label className="flex cursor-pointer items-center gap-[clamp(8px,0.63vw,12px)] rounded-[10px] border border-stroke-outline p-[clamp(8px,0.63vw,12px)] transition-colors hover:border-text-primary">
                <input type="file" accept=".doc,.docx,.pdf" className="sr-only" />
                <span className="flex size-[clamp(26px,1.67vw,32px)] shrink-0 items-center justify-center rounded-[6px] bg-bg-dark text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
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
                className="gradient-btn mt-[clamp(4px,0.42vw,8px)] inline-flex h-[clamp(40px,2.4vw,46px)] w-fit items-center justify-center rounded-full px-[clamp(24px,1.98vw,38px)] text-d16 text-white transition-[filter] hover:brightness-110"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>

        {/* Certifications + review scores. Overlaps the dark footer below. */}
        <div className="shell relative z-20 mt-[clamp(16px,1.67vw,32px)] -mb-[clamp(24px,3.8vw,73px)]">
          <div className="flex flex-col items-center gap-[clamp(20px,1.67vw,32px)] rounded-[20px] border border-stroke-outline/70 bg-bg-white px-[clamp(16px,1.56vw,30px)] py-[clamp(20px,1.3vw,25px)] xl:flex-row">
            <ul className="flex flex-1 flex-wrap items-center justify-center gap-[clamp(12px,1.25vw,24px)]">
              {Array.from({ length: 7 }).map((_, i) => (
                <li key={i}>
                  <PlaceholderImage
                    label=""
                    showLabel={false}
                    className="size-[clamp(48px,3.65vw,70px)] rounded-full"
                  />
                </li>
              ))}
            </ul>

            <div aria-hidden className="hidden h-[clamp(50px,3.65vw,70px)] w-px bg-stroke-outline xl:block" />

            <ul className="flex flex-1 flex-wrap items-center justify-center gap-[clamp(16px,1.98vw,38px)] rounded-[16px] bg-bg-light px-[clamp(12px,1.25vw,24px)] py-[clamp(12px,0.83vw,16px)]">
              {RATINGS.map((rating) => (
                <li key={rating.site} className="flex flex-col items-center gap-1.5">
                  <span className="text-d14 font-medium whitespace-nowrap text-text-primary">
                    {rating.site}
                  </span>
                  <span className="flex items-center gap-1 text-d16 font-medium text-text-primary">
                    <span className="text-[#FFB800]" aria-hidden>
                      ★★★★★
                    </span>
                    {rating.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Dark footer ─────────────────────────────────────── */}
      <section className="relative z-0 w-full bg-bg-black pt-[clamp(60px,8.07vw,155px)] pb-[clamp(20px,1.88vw,36px)]">
        <div className="shell">
          <div className="grid grid-cols-2 gap-x-[clamp(16px,1.67vw,32px)] gap-y-[clamp(28px,2.6vw,50px)] md:grid-cols-3 lg:grid-cols-5">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h4 className="text-d22 font-medium text-white">{column.heading}</h4>
                <ul className="mt-[clamp(14px,1.2vw,23px)] flex flex-col gap-[clamp(10px,1.2vw,23px)]">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-d18 text-text-footer transition-colors hover:text-white"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-[clamp(32px,3.65vw,70px)] flex flex-col items-center gap-4 border-t border-white/10 pt-[clamp(16px,1.56vw,30px)] md:flex-row md:justify-between">
            <div className="flex items-center gap-[clamp(12px,1.25vw,24px)]">
              <span className="gradient-btn flex h-[clamp(16px,1.04vw,20px)] w-[clamp(60px,3.65vw,70px)] items-center justify-center rounded-[3px] text-[8px] font-bold tracking-wide text-white">
                DMCA
              </span>
              <p className="text-d18 text-white">
                &copy; 2024 SPEC INDIA. All Rights Reserved.
              </p>
            </div>

            <div className="flex items-center gap-[clamp(16px,1.09vw,21px)]">
              <Link href="#" className="text-d18 text-white hover:text-brand-green">
                Privacy Policy
              </Link>
              <Link href="#" className="text-d18 text-white hover:text-brand-green">
                Terms of use
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

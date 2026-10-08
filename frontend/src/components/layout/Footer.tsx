import Link from 'next/link';
import { LetsTalk } from '@/components/sections';

const MEDALS = [
  '/reviews/medal01.png',
  '/reviews/medal02.png',
  '/reviews/medal03.png',
  '/reviews/medal04.png',
  '/reviews/medal05.png',
  '/reviews/medal06.png',
  '/reviews/medal07.png',
];

const RATINGS = [
  { site: 'Clutch', score: '4.6', logo: '/reviews/clutch.png', width: 68, height: 20 },
  { site: 'GoodFirms', score: '4.8', logo: '/reviews/goodfirm.png', width: 112, height: 17 },
  { site: 'AmbitionBox', score: '4.6', logo: '/reviews/ambitionbox.png', width: 120, height: 24 },
  { site: 'Google', score: '4.5', logo: '/reviews/google.png', width: 70, height: 24 },
  { site: 'Glassdoor', score: '4.2', logo: '/reviews/glassdoor.png', width: 76, height: 24 },
];

const FOOTER_COLUMNS: {
  heading: string;
  width: string;
  nowrap?: boolean;
  links: string[];
}[] = [
  {
    heading: 'Services',
    width: 'lg:w-[280px]',
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
    width: 'lg:w-[233px]',
    nowrap: true,
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
    width: 'lg:w-[195px]',
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
    width: 'lg:w-[248px]',
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
    width: 'lg:w-[140px]',
    links: [
      'Overview',
      'Blog',
      'Newsletter',
      'Sitemap',
      'Live Bi Examples',
      'Career',
      'Contact Us',
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="w-full">
      {/* ─── CTA: contact details + enquiry form ─────────────── */}
      <section className="relative z-10 w-full bg-bg-light pt-[clamp(40px,3.65vw,70px)]">
        <LetsTalk />

        {/* Certifications + review scores. Overlaps the dark footer below. */}
        <div className="shell relative z-20 mt-[clamp(16px,1.67vw,32px)] -mb-[clamp(24px,3.8vw,73px)]">
          <div className="flex flex-col items-center gap-[clamp(16px,1.67vw,32px)] overflow-hidden rounded-[20px] border border-stroke-outline/70 bg-bg-white py-[clamp(16px,1.67vw,32px)] pl-[clamp(16px,1.77vw,34px)] pr-[clamp(8px,0.73vw,14px)] xl:flex-row xl:items-center xl:gap-[clamp(24px,4.58vw,88px)] xl:pr-0">
            <ul className="flex flex-1 flex-wrap items-center justify-center gap-[clamp(10px,1.15vw,22px)] xl:justify-start xl:gap-[clamp(4px,0.26vw,5px)]">
              {MEDALS.map((src) => (
                <li key={src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    width={100}
                    height={100}
                    className="size-[clamp(56px,5.2vw,100px)] rounded-full object-contain"
                  />
                </li>
              ))}
            </ul>

            <ul className="flex w-full flex-wrap items-center justify-center gap-[clamp(16px,1.83vw,35px)] rounded-[20px] bg-bg-light px-[clamp(16px,1.56vw,30px)] py-[clamp(14px,1.61vw,31px)] xl:w-auto xl:pl-[clamp(16px,2.18vw,42px)] xl:pr-[clamp(8px,0.57vw,11px)] xl:min-w-[clamp(520px,44vw,844px)] xl:rounded-l-[88px] xl:rounded-r-none">
              {RATINGS.map((rating) => (
                <li
                  key={rating.site}
                  className="flex w-[clamp(74px,6.78vw,130px)] flex-col items-center gap-[clamp(10px,0.95vw,18px)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rating.logo}
                    alt={rating.site}
                    width={rating.width}
                    height={rating.height}
                    className="max-h-[clamp(16px,1.25vw,24px)] w-auto object-contain"
                  />
                  <span className="flex items-center gap-[7px] text-d16 font-medium text-text-primary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/reviews/star.png" alt="" width={24} height={24} className="size-[clamp(16px,1.22vw,23px)]" />
                    {rating.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Dark footer ─────────────────────────────────────── */}
      <section className="relative z-0 w-full bg-bg-black pt-[clamp(80px,8.07vw,155px)]">
        <div className="shell">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:flex lg:flex-nowrap lg:gap-x-24">
            {FOOTER_COLUMNS.map((column) => (
              <nav
                key={column.heading}
                aria-label={column.heading}
                className={`flex shrink-0 flex-col gap-[clamp(16px,1.56vw,30px)] ${column.width}`}
              >
                <h4 className="text-d22 font-medium leading-[normal] text-white">
                  {column.heading}
                </h4>
                <ul className="flex flex-col gap-5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className={`text-d18 leading-[normal] text-[#BBB] transition-colors hover:text-white ${
                          column.nowrap ? 'whitespace-nowrap' : ''
                        }`}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(40px,3.96vw,76px)] border-t border-white/10">
          <div className="shell flex flex-col items-center gap-4 py-[clamp(16px,1.15vw,22px)] md:flex-row md:justify-between">
            <div className="flex items-center gap-[30px]">
              <img
                src="/footer/dmca.png"
                alt="DMCA Protected"
                width={121}
                height={24}
                className="h-6 w-[121px]"
              />
              <p className="text-d18 leading-[normal] text-white">
                &copy; 2024 SPEC INDIA. All Rights Reserved.
              </p>
            </div>

            <div className="flex items-center gap-10">
              <Link
                href="#"
                className="text-d18 leading-[normal] text-white hover:text-brand-green"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-d18 leading-[normal] text-white hover:text-brand-green"
              >
                Terms of use
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

import Image from 'next/image';
import { ExploreMore } from '@/components/ui/ExploreMore';

/** Not in Strapi yet — Figma copy for the career banner. */
const CAREER_CONTACTS = [
  { kind: 'phone', label: '+91 79 2640 4026' },
  { kind: 'phone', label: '+91 79 2640 4080' },
  { kind: 'email', label: 'hr@spec-india.com' },
] as const;

/** No careers route exists yet; point this at it once one does. */
const JOB_OPENINGS_HREF = '#';

function contactHref({ kind, label }: (typeof CAREER_CONTACTS)[number]) {
  return kind === 'email' ? `mailto:${label}` : `tel:${label.replace(/[^+\d]/g, '')}`;
}

/**
 * "For Career Inquiry" banner with the HR phone numbers and email, beside
 * the "Current Job Opening" card (Figma node 375:7839).
 */
export function CareerInquiry() {
  return (
    <section className="sp-section sp-contact-career w-full bg-bg-light pt-[clamp(40px,3.54vw,68px)] pb-[clamp(24px,2.6vw,50px)]">
      <div className="shell grid gap-[clamp(12px,1.04vw,20px)] lg:grid-cols-[1342fr_338fr]">
        <div className="relative flex min-h-[clamp(160px,9.69vw,186px)] min-w-0 items-center overflow-hidden rounded-[20px] bg-bg-black px-[clamp(20px,2.6vw,50px)] py-[clamp(24px,1.67vw,32px)]">
          {/*
            Figma lays the portrait artwork on its side across the right of
            the card; rotating keeps the asset untouched.
          */}
          <div
            aria-hidden
            className="absolute top-1/2 right-[calc(var(--art)*-0.0001)] aspect-[736/1308] h-(--art) -translate-y-1/2 -rotate-90 opacity-50 [--art:clamp(420px,46.9vw,900px)] lg:opacity-100"
          >
            <Image
              src="/contact/career-banner.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 47vw, 420px"
              className="object-cover"
            />
          </div>

          <div className="relative flex flex-col gap-[clamp(14px,1.09vw,21px)]">
            <h2 className="sp-title text-d18 leading-[1.5] font-normal text-white">
              For Career Inquiry
            </h2>
            <ul className="flex flex-wrap items-center gap-x-[clamp(24px,3.07vw,59px)] gap-y-4">
              {CAREER_CONTACTS.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contactHref(contact)}
                    className="career-contact flex items-center gap-[clamp(10px,1.04vw,20px)] text-d18 leading-[1.5] font-medium text-white"
                  >
                    <span className="flex size-[clamp(40px,3.13vw,60px)] shrink-0 items-center justify-center">
                      {contact.kind === 'phone' ? (
                        <Image
                          src="/contact/phone-icon.svg"
                          alt=""
                          width={60}
                          height={60}
                          className="size-full"
                        />
                      ) : (
                        <Image
                          src="/contact/mail-icon.svg"
                          alt=""
                          width={28}
                          height={28}
                          className="size-[46.67%]"
                        />
                      )}
                    </span>
                    <span>{contact.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="career-openings flex min-h-[clamp(140px,9.74vw,187px)] items-center gap-[clamp(14px,0.99vw,19px)] rounded-[19px] bg-bg-darker px-[clamp(24px,2.03vw,39px)] py-6">
          <Image
            src="/contact/users-icon.svg"
            alt=""
            width={38}
            height={60}
            className="h-[clamp(44px,3.13vw,60px)] w-auto shrink-0"
          />
          <div className="flex min-w-0 flex-col gap-[clamp(6px,0.52vw,10px)]">
            <h3 className="text-[clamp(1rem,1.04vw,1.25rem)] leading-[1.35] font-medium text-white">
              Current Job Opening
            </h3>
            <ExploreMore href={JOB_OPENINGS_HREF} className="w-fit" />
          </div>
        </div>
      </div>
    </section>
  );
}

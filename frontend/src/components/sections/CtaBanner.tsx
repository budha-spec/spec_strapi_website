import Image from 'next/image';
import Link from 'next/link';
import { CmsImage } from '@/components/ui/CmsImage';
import { cmsText, hrefPath } from '@/lib/media';
import type { CtaBlock } from '@/types/sections.types';

interface CtaBannerProps {
  data: CtaBlock;
}

/**
 * Call-to-action banner (e.g. "Hire Dedicated Development Team…").
 *
 * At rest: brand-gradient panel with a curved lower-right corner over a
 * greyscale image. On hover (or keyboard focus) the panel fades to black,
 * the image to full colour, the click icon zooms in, and the arrow pill
 * goes from solid to outline.
 * Below `md` the image becomes a strip under the panel. On touch screens a
 * tap triggers the same states (see the `hover` variant in globals.css).
 */
export function CtaBanner({ data }: CtaBannerProps) {
  return (
    <section className="w-full bg-bg-light pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell">
        <div className="cta-banner group relative isolate flex flex-col overflow-hidden rounded-[20px] bg-bg-black md:block md:min-h-[clamp(240px,18.2vw,350px)]">
          {data.image?.url && (
            <div aria-hidden className="relative order-2 h-[clamp(160px,42vw,260px)] md:absolute md:inset-y-0 md:right-0 md:order-none md:h-auto md:w-[42%]">
              <CmsImage
                media={data.image}
                fallback="cover"
                alt=""
                className="cta-banner-image size-full object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0 group-focus-within:grayscale-0"
              />
              {/* Centred in the image area that shows past the panel's curve. */}
              <div className="absolute inset-0 flex items-center justify-center md:left-[12%]">
                <Image
                  src="/cta/click-icon.png"
                  alt=""
                  width={138}
                  height={130}
                  className="cta-banner-icon h-auto w-[clamp(64px,7.2vw,138px)] transition-transform duration-500 ease-out group-hover:scale-[1.18] group-focus-within:scale-[1.18] motion-reduce:transition-none"
                />
              </div>
            </div>
          )}

          <div className="cta-banner-panel relative isolate flex h-full flex-col justify-center overflow-hidden px-[clamp(20px,3.13vw,60px)] py-[clamp(28px,3.13vw,60px)] md:min-h-[inherit] md:w-[63%] md:rounded-br-[clamp(48px,5.2vw,100px)]">
            <span
              aria-hidden
              className="gradient-btn absolute inset-0 -z-10"
              style={{ ['--grad-angle' as string]: '-80deg' }}
            />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-bg-black opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
            />

            <h2 className="max-w-[720px] text-d30 font-medium leading-[1.3] text-white">
              {cmsText(data.title)}
            </h2>

            {data.description && (
              <p className="mt-[clamp(10px,1.04vw,20px)] max-w-[640px] whitespace-pre-line text-d16 leading-[1.5] text-white/90">
                {cmsText(data.description)}
              </p>
            )}

            {data.url && (
              <Link
                href={hrefPath(data.url)}
                className="cta-banner-link mt-[clamp(20px,2.6vw,50px)] inline-flex w-fit items-center gap-3 text-d16 text-white"
              >
                {cmsText(data.txt) || 'Explore More'}
                <span className="cta-banner-arrow flex h-[clamp(26px,1.72vw,33px)] w-[clamp(44px,2.92vw,56px)] items-center justify-center rounded-full border border-transparent bg-bg-white text-text-primary transition-colors duration-500 group-hover:border-white group-hover:bg-transparent group-hover:text-white group-focus-within:border-white group-focus-within:bg-transparent group-focus-within:text-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h13" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

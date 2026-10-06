import { CmsImage } from '@/components/ui/CmsImage';
import { cmsText } from '@/lib/media';
import type { HomeGalleryBlock } from '../types/home.types';

interface ClientsStripProps {
  data: HomeGalleryBlock;
}

export function ClientsStrip({ data }: ClientsStripProps) {
  const title = cmsText(data.title);
  const images = data.images ?? [];
  const loop = images.length > 0 ? [0, 1] : [];

  return (
    <section className="w-full bg-bg-light pt-[clamp(28px,2.03vw,39px)] pb-[clamp(28px,2.4vw,46px)]">
      <div className="shell flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
        {title && (
          <h2 className="shrink-0 whitespace-pre-line text-d22 font-medium leading-[1.2] text-text-primary lg:w-[clamp(240px,21.4vw,411px)]">
            {title}
          </h2>
        )}

        {title && images.length > 0 && (
          <div
            aria-hidden
            className="hidden h-[clamp(70px,6.56vw,126px)] w-px shrink-0 bg-stroke-main lg:block"
          />
        )}

        {images.length > 0 && (
          <div className="marquee-viewport relative flex-1 overflow-hidden lg:pl-[clamp(20px,2.6vw,50px)]">
            <div className="marquee-track items-center">
              {loop.map((copy) => (
                <ul
                  key={copy}
                  className="flex shrink-0 items-center"
                  aria-hidden={copy === 1}
                >
                  {images.map((logo, index) => (
                    <li
                      key={`${copy}-${logo.url}-${index}`}
                      className="flex items-center justify-center px-[clamp(28px,3.1vw,60px)]"
                    >
                      <CmsImage
                        media={logo}
                        fallback="logo"
                        alt={copy === 0 ? cmsText(logo.alternativeText || logo.name) : ''}
                        width={logo.width ?? 140}
                        height={logo.height ?? 40}
                        className="client-logo h-auto w-auto max-h-[clamp(28px,2.66vw,51px)] max-w-[clamp(90px,8vw,168px)] object-contain"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg-light to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg-light to-transparent"
            />
          </div>
        )}
      </div>
    </section>
  );
}

const CLIENT_LOGOS = [
  { name: 'Schneider Electric', src: '/clients/schneider.png', width: 137, height: 41 },
  { name: 'Adani', src: '/clients/adani.png', width: 100, height: 35 },
  { name: 'ADNOC', src: '/clients/adnoc.png', width: 115, height: 51 },
];

export function ClientsStrip() {
  return (
    <section className="w-full bg-bg-light pt-[clamp(28px,2.03vw,39px)] pb-[clamp(28px,2.4vw,46px)]">
      <div className="shell flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
        <h2 className="shrink-0 text-d22 font-medium leading-[1.2] text-text-primary lg:w-[clamp(240px,21.4vw,411px)]">
          Trusted by global leaders to build
          <br />
          next-generation enterprises.
        </h2>

        <div
          aria-hidden
          className="hidden h-[clamp(70px,6.56vw,126px)] w-px shrink-0 bg-stroke-main lg:block"
        />

        <div className="marquee-viewport relative flex-1 overflow-hidden lg:pl-[clamp(20px,2.6vw,50px)]">
          <div className="marquee-track items-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1}
              >
                {CLIENT_LOGOS.map((logo) => (
                  <li
                    key={`${copy}-${logo.name}`}
                    className="flex items-center justify-center px-[clamp(28px,3.1vw,60px)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={copy === 0 ? logo.name : ''}
                      width={logo.width}
                      height={logo.height}
                      className="client-logo h-auto w-auto max-h-[clamp(28px,2.66vw,51px)]"
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
      </div>
    </section>
  );
}

const CLIENT_LOGOS = [
  'PEPSICO',
  "Kellogg's",
  'Schneider Electric',
  'HITACHI',
  'ADNOC',
  'UHN',
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

        {/* Divider matching the thin rule in the design */}
        <div
          aria-hidden
          className="hidden h-[clamp(70px,6.56vw,126px)] w-px shrink-0 bg-stroke-main lg:block"
        />

        {/* Logos scroll gently; the track is duplicated so the loop is seamless */}
        <div className="marquee-viewport relative flex-1 overflow-hidden lg:pl-[clamp(20px,2.6vw,50px)]">
          <div className="marquee-track items-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1}
              >
                {CLIENT_LOGOS.map((name) => (
                  <li
                    key={name}
                    className="flex items-center justify-center px-[clamp(22px,2.6vw,50px)]"
                  >
                    {/* Placeholder wordmark until the real logo lands in Strapi */}
                    <span className="text-d22 font-bold whitespace-nowrap text-[#9A9A9A] grayscale transition-all duration-300 hover:text-text-primary hover:grayscale-0">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* Soft edges so logos fade rather than clip */}
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

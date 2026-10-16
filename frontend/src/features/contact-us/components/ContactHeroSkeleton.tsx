/** Loading state for `ContactHero` — same dark band, title and form outline. */
export function ContactHeroSkeleton() {
  return (
    <section
      aria-hidden
      className="w-full animate-pulse bg-bg-dark pt-[clamp(110px,7.66vw,147px)] pb-[clamp(32px,2.4vw,46px)]"
    >
      <div className="shell lg:pl-[clamp(0px,7.5vw,144px)]">
        <div className="h-[clamp(40px,3.9vw,78px)] w-3/4 rounded-lg bg-white/10" />
        <div className="mt-4 h-5 w-1/2 rounded bg-white/10" />
      </div>
      <div className="shell mt-[clamp(32px,9.64vw,185px)] grid gap-8 lg:grid-cols-[minmax(0,866fr)_688fr] lg:gap-0 lg:pl-[clamp(0px,7.5vw,144px)]">
        <div className="flex flex-col gap-4 lg:pr-[clamp(24px,6vw,115px)]">
          <div className="h-7 w-2/3 rounded bg-white/10" />
          <div className="h-16 w-full rounded bg-white/10" />
          <div className="mt-8 h-32 w-full rounded bg-white/10" />
        </div>
        <div className="h-[clamp(480px,32vw,615px)] rounded-[20px] bg-white/10" />
      </div>
    </section>
  );
}

export function ServiceHeroSkeleton() {
  return (
    <section className="w-full bg-bg-dark pt-[clamp(110px,7.6vw,146px)] pb-[clamp(40px,3.96vw,76px)]">
      <div className="shell flex animate-pulse flex-col">
        <div className="h-[clamp(32px,1.98vw,38px)] w-[184px] rounded-full bg-white/10" />
        <div className="mt-[clamp(20px,2.08vw,40px)] h-[clamp(36px,2.7vw,52px)] w-[min(850px,100%)] rounded-xl bg-white/10" />
        <div className="mt-[clamp(10px,1.04vw,20px)] h-[clamp(40px,2.4vw,46px)] w-[min(994px,100%)] rounded-xl bg-white/10" />
        <div className="mt-[clamp(24px,2.08vw,40px)] h-[clamp(36px,2.19vw,42px)] w-[125px] rounded-full bg-white/10" />
      </div>
    </section>
  );
}

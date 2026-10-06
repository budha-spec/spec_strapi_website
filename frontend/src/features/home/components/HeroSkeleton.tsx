export function HeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-bg-black h-[clamp(660px,52.08vw,1000px)]">
      <div className="shell flex h-full flex-col items-center pt-[clamp(110px,14.48vw,278px)]">
        <div className="flex w-full max-w-[1400px] animate-pulse flex-col items-center">
          <div className="h-[clamp(24px,2.6vw,50px)] w-[min(346px,80%)] rounded-full bg-white/10" />
          <div className="mt-[clamp(16px,2.45vw,47px)] h-[clamp(40px,5vw,97px)] w-full rounded-2xl bg-white/10" />
          <div className="mt-[clamp(10px,0.9vw,14px)] h-[clamp(32px,2.3vw,45px)] w-[min(660px,90%)] rounded-xl bg-white/10" />
          <div className="mt-[clamp(26px,4.27vw,82px)] h-[clamp(84px,5.31vw,102px)] w-[min(835px,100%)] rounded-[16px] bg-white/10" />
        </div>
      </div>
    </section>
  );
}

/** Loading state under the hero of a Live BI dashboard — overview, facts card and the dashboard frame. */
export function VisualizationDetailSkeleton() {
  return (
    <section className="sp-section sp-dashboard-skeleton w-full bg-bg-light pt-[clamp(40px,3.65vw,70px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell animate-pulse motion-reduce:animate-none">
        <div className="grid gap-[clamp(16px,2vw,32px)] lg:grid-cols-[minmax(0,404fr)_minmax(0,836fr)] lg:gap-x-[clamp(40px,8.96vw,172px)]">
          <div className="h-[clamp(32px,2.6vw,50px)] w-3/4 rounded-xl bg-stroke-outline/60" />
          <div className="flex flex-col gap-3">
            <div className="h-4 rounded bg-stroke-outline/60" />
            <div className="h-4 rounded bg-stroke-outline/60" />
            <div className="h-4 w-4/5 rounded bg-stroke-outline/60" />
          </div>
        </div>
        <div className="mt-[clamp(40px,4.17vw,80px)] h-[clamp(140px,11.46vw,220px)] rounded-[14px] bg-bg-white" />
        <div className="mt-[clamp(32px,3.13vw,60px)] h-6 w-60 rounded-full bg-stroke-outline/60" />
        <div className="mt-[clamp(20px,3.13vw,60px)] rounded-[14px] bg-bg-white p-[clamp(8px,1.56vw,30px)]">
          <div className="aspect-video rounded-[clamp(8px,0.73vw,14px)] bg-bg-chip" />
        </div>
      </div>
    </section>
  );
}

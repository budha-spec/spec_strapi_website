/** Loading state for the Live BI listing band — heading, tabs and eight cards. */
export function VisualizationGridSkeleton() {
  return (
    <section className="sp-section sp-live-bi-listing-skeleton w-full bg-bg-light pt-[clamp(40px,3.13vw,60px)] pb-[clamp(48px,6.25vw,120px)]">
      <div className="shell animate-pulse">
        <div className="h-5 w-40 rounded-full bg-stroke-outline/60" />
        <div className="mt-[clamp(6px,0.52vw,10px)] h-[clamp(32px,2.6vw,50px)] w-[min(760px,100%)] rounded-xl bg-stroke-outline/60" />
        <div className="mt-[clamp(28px,2.6vw,50px)] h-[clamp(52px,3.65vw,70px)] rounded-[14px] bg-bg-white" />
        <div className="mt-[clamp(24px,2.08vw,40px)] grid gap-[clamp(16px,1.25vw,24px)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="rounded-[14px] bg-bg-white p-[clamp(10px,0.63vw,12px)]">
              <div className="aspect-[1296/816] rounded-[10px] bg-bg-chip" />
              <div className="mt-4 h-4 w-4/5 rounded bg-bg-chip" />
              <div className="mt-2 h-4 w-3/5 rounded bg-bg-chip" />
              <div className="mt-6 mb-2 h-6 w-32 rounded-full bg-bg-chip" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

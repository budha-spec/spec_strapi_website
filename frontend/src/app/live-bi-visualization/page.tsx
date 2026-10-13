import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import {
  VisualizationExplorer,
  fetchLiveBiPage,
  fetchVisualizationCategories,
  findLiveBiBlock,
  findLiveBiContact,
  type Visualization,
  type VisualizationCategory,
  type VisualizationTab,
} from '@/features/live-bi';
import { cmsText } from '@/lib/media';

const CRUMBS = [{ label: 'What we do', href: '/services' }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLiveBiPage();
  return {
    title: cmsText(page?.title) || 'Live BI Visualization',
    description: cmsText(page?.description) || undefined,
  };
}

/** Categories that at least one card belongs to, in Strapi order. */
function tabOptions(
  categories: VisualizationCategory[],
  items: Visualization[]
): VisualizationTab[] {
  const used = new Set(
    items.flatMap((item) => (item.category ?? []).map((category) => category.slug))
  );
  return categories
    .filter((category) => category.slug && category.title && used.has(category.slug))
    .map((category) => ({
      slug: category.slug as string,
      title: cmsText(category.title),
    }));
}

export default async function LiveBiVisualizationPage() {
  const [page, categories] = await Promise.all([
    fetchLiveBiPage(),
    fetchVisualizationCategories(),
  ]);
  if (!page) notFound();

  const blocks = page.content ?? [];
  const listing = findLiveBiBlock(blocks);
  const contact = findLiveBiContact(blocks);
  const items = (listing?.visualizations ?? []).filter((item) => item.title);

  return (
    <main className="sp-page sp-page-live-bi flex w-full flex-col bg-bg-white">
      <PageHero
        title={page.title}
        description={page.description}
        crumbs={CRUMBS}
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />

      {items.length > 0 && (
        <section className="sp-section sp-live-bi-listing w-full bg-bg-light pt-[clamp(40px,3.13vw,60px)] pb-[clamp(48px,6.25vw,120px)]">
          <div className="shell">
            {listing?.title && <SectionEyebrow>{cmsText(listing.title)}</SectionEyebrow>}
            {listing?.subTitle && (
              <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
                <AccentHeading
                  text={cmsText(listing.subTitle)}
                  accentClassName="gradient-text font-semibold"
                />
              </h2>
            )}

            <VisualizationExplorer items={items} tabs={tabOptions(categories, items)} />
          </div>
        </section>
      )}
    </main>
  );
}

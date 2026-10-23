import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections';
import { AccentHeading } from '@/components/ui/AccentHeading';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import {
  WhitepaperCard,
  fetchWhitepaperPage,
  findWhitepaperContact,
  findWhitepaperListing,
} from '@/features/whitepaper';
import { cmsText } from '@/lib/media';

const CRUMBS = [{ label: 'Home', href: '/' }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchWhitepaperPage();
  return {
    title: cmsText(page?.title) || 'Whitepapers',
    description: cmsText(page?.description) || undefined,
  };
}

export default async function WhitepaperListingPage() {
  const page = await fetchWhitepaperPage();
  if (!page) notFound();

  const blocks = page.content ?? [];
  const listing = findWhitepaperListing(blocks);
  const contact = findWhitepaperContact(blocks);
  const items = listing?.items ?? [];

  return (
    <main className="sp-page sp-page-whitepaper flex w-full flex-col bg-bg-white">
      <PageHero
        title={page.title}
        description={page.description}
        crumbs={CRUMBS}
        currentCrumb="Whitepapers"
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />

      {listing && (
        <section className="sp-section sp-whitepaper-listing w-full bg-bg-light pt-[clamp(40px,3.13vw,60px)] pb-[clamp(48px,6.25vw,50px)]">
          <div className="shell">
            {listing.title && <SectionEyebrow>{cmsText(listing.title)}</SectionEyebrow>}
            {listing.subTitle && (
              <h2 className="sp-title mt-[clamp(6px,0.52vw,10px)] max-w-[1200px] text-d40 font-medium leading-[1.2] text-text-heading">
                <AccentHeading
                  text={cmsText(listing.subTitle)}
                  accentClassName="gradient-text font-semibold"
                />
              </h2>
            )}

            {items.length > 0 ? (
              <ul className="sp-whitepaper-grid mt-[clamp(24px,2.6vw,50px)] grid gap-[clamp(16px,1.25vw,24px)] lg:grid-cols-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <WhitepaperCard item={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sp-whitepaper-empty mt-[clamp(24px,2.6vw,50px)] rounded-[14px] bg-bg-white px-6 py-[clamp(40px,4.17vw,80px)] text-center text-d18 text-text-secondary">
                New whitepapers are on their way — check back soon.
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

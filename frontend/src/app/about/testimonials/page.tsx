import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero, Testimonials } from '@/components/sections';
import {
  FeaturedTestimonials,
  IndustryGallery,
  fetchTestimonialsPage,
  type IndustryGalleryBlock,
  type TestimonialsPageBlock,
} from '@/features/testimonials';
import { cmsText } from '@/lib/media';
import type { ContactBlock, TestimonialsBlock } from '@/types/sections.types';

const CRUMBS = [{ label: 'Home', href: '/' }];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchTestimonialsPage();
  return {
    title: cmsText(page?.title) || 'Testimonials',
    description: cmsText(page?.description) || undefined,
  };
}

const isTestimonials = (block: TestimonialsPageBlock): block is TestimonialsBlock =>
  block.__component === 'shared.testimonial-section';

/**
 * Renders the page's dynamic zone in Strapi order. The first "Client
 * Spotlight" block is the light featured carousel; any later one is the dark
 * video grid. `shared.contact-us` only feeds the hero button.
 */
function renderBlocks(blocks: TestimonialsPageBlock[]) {
  let spotlightSeen = false;

  return blocks.map((block) => {
    const key = `${block.__component}-${block.id}`;
    if (isTestimonials(block)) {
      const first = !spotlightSeen;
      spotlightSeen = true;
      return first ? (
        <FeaturedTestimonials key={key} data={block} />
      ) : (
        <Testimonials key={key} data={block} layout="grid" accentWords={2} />
      );
    }
    if (block.__component === 'shared.industry-gallery') {
      return <IndustryGallery key={key} data={block as IndustryGalleryBlock} />;
    }
    return null;
  });
}

export default async function TestimonialsListingPage() {
  const page = await fetchTestimonialsPage();
  if (!page) notFound();

  const blocks = page.content ?? [];
  const contact = blocks.find(
    (block): block is ContactBlock => block.__component === 'shared.contact-us'
  );

  return (
    <main className="sp-page sp-page-testimonials flex w-full flex-col bg-bg-white">
      <PageHero
        title={page.title}
        description={page.description}
        crumbs={CRUMBS}
        currentCrumb="Testimonials"
        ctaLabel={contact?.txt}
        ctaHref={contact?.url}
      />
      {renderBlocks(blocks)}
    </main>
  );
}

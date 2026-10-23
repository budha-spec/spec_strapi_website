import { IndustryGallery, ProvenImpact, ServiceIntro } from '@/components/sections';
import type { AboutBlock, AboutPage } from '../types/about.types';
import { AboutOverview } from './AboutOverview';
import { GuidingPrinciples } from './GuidingPrinciples';
import { LeaderSpotlight } from './LeaderSpotlight';
import { TeamTestimonials } from './TeamTestimonials';

function isBlock<T extends AboutBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<AboutBlock, { __component: T }> {
  return block.__component === name;
}

/**
 * Renders the about dynamic zone in Strapi order. `shared.contact-us` only
 * feeds the hero button; an unknown block is skipped.
 */
export function AboutBlocks({ blocks }: { blocks: NonNullable<AboutPage['content']> }) {
  return (
    <>
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;

        if (isBlock(block, 'shared.rich-text')) {
          return <ServiceIntro key={key} data={block} />;
        }
        if (isBlock(block, 'shared.text-block')) {
          return <AboutOverview key={key} data={block} />;
        }
        if (isBlock(block, 'shared.industry-case-study')) {
          return <GuidingPrinciples key={key} data={block} />;
        }
        if (isBlock(block, 'shared.key-metrics-section')) {
          return <ProvenImpact key={key} data={block} tone="light" />;
        }
        if (isBlock(block, 'shared.leaders')) {
          return <LeaderSpotlight key={key} data={block} />;
        }
        if (isBlock(block, 'shared.industry-gallery')) {
          return <IndustryGallery key={key} data={block} />;
        }
        if (isBlock(block, 'shared.testimonial-section')) {
          return <TeamTestimonials key={key} data={block} />;
        }

        return null;
      })}
    </>
  );
}

import {
  CaseStudies,
  ClientsStrip,
  ProvenImpact,
  Testimonials,
} from '@/components/sections';
import type { HomeBlock } from '../types/home.types';
import { HeroSection } from './HeroSection';
import { ServicesSection } from './ServicesSection';

interface HomeBlocksProps {
  blocks: Array<HomeBlock | { __component: string; id: number }>;
}

function isBlock<T extends HomeBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<HomeBlock, { __component: T }> {
  return block.__component === name;
}

/**
 * Renders the home dynamic zone in the order Strapi returns it. The Insights
 * carousel is not a CMS block — the page renders it from WordPress.
 */
export function HomeBlocks({ blocks }: HomeBlocksProps) {
  return (
    <>
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;

        if (isBlock(block, 'shared.home-page-section1')) {
          return <HeroSection key={key} data={block} />;
        }
        if (isBlock(block, 'shared.gallery')) {
          return <ClientsStrip key={key} data={block} />;
        }
        if (isBlock(block, 'shared.enterprise-solution')) {
          return <ServicesSection key={key} data={block} />;
        }
        if (isBlock(block, 'shared.key-metrics-section')) {
          return <ProvenImpact key={key} data={block} />;
        }
        if (isBlock(block, 'shared.case-studies')) {
          return <CaseStudies key={key} data={block} />;
        }
        if (isBlock(block, 'shared.testimonial-section')) {
          return <Testimonials key={key} data={block} />;
        }

        return null;
      })}
    </>
  );
}

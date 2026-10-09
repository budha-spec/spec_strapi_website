import {
  CaseStudies,
  ClientsStrip,
  CtaBanner,
  FaqSection,
  ProvenImpact,
  Testimonials,
} from '@/components/sections';
import type { ContactBlock, ServiceBlock } from '../types/service.types';
import { CapabilityGrid } from './CapabilityGrid';
import { CapabilityTabs } from './CapabilityTabs';
import { ServiceIntro } from './ServiceIntro';

type AnyBlock = ServiceBlock | { __component: string; id: number };

interface ServiceBlocksProps {
  blocks: AnyBlock[];
  /** `tabs` on the services landing page, `grid` on a service detail page. */
  capabilities: 'tabs' | 'grid';
}

function isBlock<T extends ServiceBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<ServiceBlock, { __component: T }> {
  return block.__component === name;
}

/** The `shared.contact-us` block, which drives the hero button. */
export function findContactBlock(blocks: AnyBlock[]): ContactBlock | undefined {
  return blocks.find((block): block is ContactBlock =>
    isBlock(block, 'shared.contact-us')
  );
}

/**
 * Renders a service's dynamic zone in the order Strapi returns it.
 * `shared.contact-us` feeds the hero instead, so it is skipped here.
 */
export function ServiceBlocks({ blocks, capabilities }: ServiceBlocksProps) {
  return (
    <>
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;

        if (isBlock(block, 'shared.gallery')) {
          return <ClientsStrip key={key} data={block} />;
        }
        if (isBlock(block, 'shared.rich-text')) {
          return <ServiceIntro key={key} data={block} />;
        }
        if (isBlock(block, 'shared.services')) {
          return capabilities === 'tabs' ? (
            <CapabilityTabs key={key} data={block} />
          ) : (
            <CapabilityGrid key={key} data={block} />
          );
        }
        if (isBlock(block, 'shared.cta')) {
          return <CtaBanner key={key} data={block} />;
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
        if (isBlock(block, 'shared.faqs')) {
          return <FaqSection key={key} data={block} />;
        }

        return null;
      })}
    </>
  );
}

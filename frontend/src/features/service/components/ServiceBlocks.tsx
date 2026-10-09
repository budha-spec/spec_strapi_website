import {
  CaseStudies,
  ClientsStrip,
  CtaBanner,
  FaqSection,
  ProvenImpact,
  Testimonials,
} from '@/components/sections';
import { CapabilityGrid } from '../detail/components/CapabilityGrid';
import { ServiceIntro } from '../detail/components/ServiceIntro';
import { CapabilityTabs } from '../landing/components/CapabilityTabs';
import { OfferingGrid } from '../sub-service/components/OfferingGrid';
import { UseCaseGrid } from '../sub-service/components/UseCaseGrid';
import type {
  ContactBlock,
  ServiceBlock,
  ServiceTemplate,
} from '../types/service.types';

type AnyBlock = ServiceBlock | { __component: string; id: number };

interface ServiceBlocksProps {
  blocks: AnyBlock[];
  /** Which page is rendering — decides how `shared.services` is drawn. */
  template: ServiceTemplate;
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

/** How each template draws a `shared.services` block. */
const SERVICES_BY_TEMPLATE = {
  landing: CapabilityTabs,
  detail: CapabilityGrid,
  'sub-service': OfferingGrid,
} as const;

/**
 * Renders a service's dynamic zone in the order Strapi returns it — shared by
 * the landing, detail and sub-service pages. `shared.contact-us` feeds the
 * hero instead, so it is skipped here.
 */
export function ServiceBlocks({ blocks, template }: ServiceBlocksProps) {
  const Services = SERVICES_BY_TEMPLATE[template];

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
          return <Services key={key} data={block} />;
        }
        if (isBlock(block, 'shared.industries')) {
          return <UseCaseGrid key={key} data={block} />;
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

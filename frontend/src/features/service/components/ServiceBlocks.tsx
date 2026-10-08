import { ClientsStrip, Testimonials } from '@/components/sections';
import type { ServiceBlock } from '../types/service.types';
import { CapabilityTabs } from './CapabilityTabs';

interface ServiceBlocksProps {
  blocks: Array<ServiceBlock | { __component: string; id: number }>;
}

function isBlock<T extends ServiceBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<ServiceBlock, { __component: T }> {
  return block.__component === name;
}

/** Renders a service's dynamic zone in the order Strapi returns it. */
export function ServiceBlocks({ blocks }: ServiceBlocksProps) {
  return (
    <>
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;

        if (isBlock(block, 'shared.gallery')) {
          return <ClientsStrip key={key} data={block} />;
        }
        if (isBlock(block, 'shared.services')) {
          return <CapabilityTabs key={key} data={block} />;
        }
        if (isBlock(block, 'shared.testimonial-section')) {
          return <Testimonials key={key} data={block} />;
        }

        return null;
      })}
    </>
  );
}

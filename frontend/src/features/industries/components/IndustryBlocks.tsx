import {
  CaseStudies,
  CtaBanner,
  FaqSection,
  IndustryGallery,
} from '@/components/sections';
import { IndustryServices } from '../detail/components/IndustryServices';
import { TechStack } from '../detail/components/TechStack';
import { UseCaseCarousel } from '../detail/components/UseCaseCarousel';
import type {
  IndustryDetail,
  IndustryDetailBlock,
} from '../types/industries.types';

type AnyBlock = NonNullable<IndustryDetail['content']>[number];

function isBlock<T extends IndustryDetailBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<IndustryDetailBlock, { __component: T }> {
  return block.__component === name;
}

/**
 * Renders an industry's dynamic zone in the order Strapi returns it. Blocks
 * the page does not know are skipped, so editors cannot break it.
 */
export function IndustryBlocks({ blocks }: { blocks: AnyBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;

        if (isBlock(block, 'shared.key-metrics-section')) {
          return <UseCaseCarousel key={key} data={block} />;
        }
        if (isBlock(block, 'shared.industry-service')) {
          return <IndustryServices key={key} data={block} />;
        }
        if (isBlock(block, 'shared.case-studies')) {
          return <CaseStudies key={key} data={block} />;
        }
        if (isBlock(block, 'shared.cta')) {
          return <CtaBanner key={key} data={block} />;
        }
        if (isBlock(block, 'shared.industry-gallery')) {
          return <IndustryGallery key={key} data={block} columns={4} />;
        }
        if (isBlock(block, 'shared.technologies')) {
          return <TechStack key={key} data={block} />;
        }
        if (isBlock(block, 'shared.faqs')) {
          return <FaqSection key={key} data={block} />;
        }

        return null;
      })}
    </>
  );
}

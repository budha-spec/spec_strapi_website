import { DarkCardGrid, ServiceIntro, Testimonials } from '@/components/sections';
import { CaseStudyResults } from '../detail/components/CaseStudyResults';
import { CaseStudySolutions } from '../detail/components/CaseStudySolutions';
import { OutcomeGallery } from '../detail/components/OutcomeGallery';
import type {
  CaseStudyDetail,
  CaseStudyDetailBlock,
} from '../types/case-study.types';

type AnyBlock = NonNullable<CaseStudyDetail['content']>[number];

function isBlock<T extends CaseStudyDetailBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<CaseStudyDetailBlock, { __component: T }> {
  return block.__component === name;
}

/**
 * Renders a case study's dynamic zone in the order Strapi returns it. Blocks
 * the page does not know are skipped, so editors cannot break it.
 */
export function CaseStudyBlocks({ blocks }: { blocks: AnyBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;

        if (isBlock(block, 'shared.rich-text')) {
          return <ServiceIntro key={key} data={block} />;
        }
        if (isBlock(block, 'shared.challenges')) {
          // Challenges never link anywhere: no Explore More.
          return (
            <DarkCardGrid
              key={key}
              className="sp-case-study-challenges"
              eyebrow={block.title}
              heading={block.subTitle}
              items={block.challange ?? []}
            />
          );
        }
        if (isBlock(block, 'shared.gallery')) {
          return <OutcomeGallery key={key} data={block} />;
        }
        if (isBlock(block, 'shared.solutions')) {
          return <CaseStudySolutions key={key} data={block} />;
        }
        if (isBlock(block, 'shared.cs-result')) {
          return <CaseStudyResults key={key} data={block} />;
        }
        if (isBlock(block, 'shared.testimonial-section')) {
          return <Testimonials key={key} data={block} />;
        }

        return null;
      })}
    </>
  );
}

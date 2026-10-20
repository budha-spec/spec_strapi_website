import {
  CtaBanner,
  DarkCardGrid,
  FactsCard,
  FaqSection,
  ServiceIntro,
} from '@/components/sections';
import { cmsText } from '@/lib/media';
import { DashboardEmbed } from '../detail/components/DashboardEmbed';
import { DashboardImprovements } from '../detail/components/DashboardImprovements';
import { KpiImpact } from '../detail/components/KpiImpact';
import type {
  VisualizationDetail,
  VisualizationDetailBlock,
} from '../types/live-bi.types';

type AnyBlock = NonNullable<VisualizationDetail['content']>[number];

/** Blocks drawn on the near-black band. */
const DARK_BLOCKS = new Set([
  'shared.challenges',
  'shared.dashboard-improvement',
  'shared.faqs',
]);

function isBlock<T extends VisualizationDetailBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<VisualizationDetailBlock, { __component: T }> {
  return block.__component === name;
}

interface VisualizationBlocksProps {
  blocks: AnyBlock[];
  /** The dashboard's name, for the live embed's accessible title. */
  title: string;
}

/**
 * Renders a dashboard's dynamic zone in the order Strapi returns it. Blocks
 * the page does not know are skipped, so editors cannot break it;
 * `shared.contact-us` feeds the hero button instead.
 */
export function VisualizationBlocks({ blocks, title }: VisualizationBlocksProps) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block.__component}-${block.id}`;

        if (isBlock(block, 'shared.rich-text')) {
          return <ServiceIntro key={key} data={block} />;
        }
        if (isBlock(block, 'shared.audience-section')) {
          return (
            <FactsCard
              key={key}
              className="sp-dashboard-facts"
              spacing="none"
              facts={[
                { label: 'Dashboard', value: block.dashboard },
                { label: 'Platform', value: block.platform?.title },
                { label: 'Focus', value: block.focus },
              ]}
              chips={{ label: 'Audience', items: block.audience ?? [] }}
            />
          );
        }
        if (isBlock(block, 'shared.dashboard-action')) {
          return <DashboardEmbed key={key} data={block} dashboardTitle={cmsText(title)} />;
        }
        if (isBlock(block, 'shared.challenges')) {
          return (
            <DarkCardGrid
              key={key}
              className="sp-dashboard-highlights"
              tone="light"
              columns={3}
              eyebrow={block.title}
              heading={block.subTitle}
              items={block.challange ?? []}
            />
          );
        }
        if (isBlock(block, 'shared.kpi-business-impact')) {
          return <KpiImpact key={key} data={block} />;
        }
        if (isBlock(block, 'shared.dashboard-improvement')) {
          return <DashboardImprovements key={key} data={block} />;
        }
        if (isBlock(block, 'shared.cta')) {
          // A light band above already spaces the banner; a dark one does not.
          const afterDark = DARK_BLOCKS.has(blocks[i - 1]?.__component ?? '');
          return <CtaBanner key={key} data={block} padTop={afterDark} />;
        }
        if (isBlock(block, 'shared.faqs')) {
          return <FaqSection key={key} data={block} />;
        }

        return null;
      })}
    </>
  );
}

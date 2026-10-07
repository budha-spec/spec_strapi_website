import type { HomeBlock } from '../types/home.types';
import { BlogSection, type BlogCardData } from './BlogSection';
import { CaseStudies } from './CaseStudies';
import { ClientsStrip } from './ClientsStrip';
import { HeroSection } from './HeroSection';
import { ServicesSection } from './ServicesSection';
import { StatsSection } from './StatsSection';
import { Testimonials } from './Testimonials';

interface HomeBlocksProps {
  blocks: Array<HomeBlock | { __component: string; id: number }>;
  /** Insights posts from the live WordPress feed. */
  blogs: BlogCardData[];
}

function isBlock<T extends HomeBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<HomeBlock, { __component: T }> {
  return block.__component === name;
}

/** Renders the home dynamic zone in the order Strapi returns it. */
export function HomeBlocks({ blocks, blogs }: HomeBlocksProps) {
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
          return <StatsSection key={key} data={block} />;
        }
        if (isBlock(block, 'shared.case-studies')) {
          return <CaseStudies key={key} data={block} />;
        }
        if (isBlock(block, 'shared.testimonial-section')) {
          return <Testimonials key={key} data={block} />;
        }
        if (isBlock(block, 'shared.home-blogs')) {
          // Heading still comes from Strapi; the posts come from WordPress.
          return (
            <BlogSection
              key={key}
              title={block.title}
              subTitle={block.subTitle}
              posts={blogs}
            />
          );
        }

        return null;
      })}
    </>
  );
}

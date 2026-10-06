import { cmsText, joinPath } from '@/lib/media';
import type { HomeBlock, HomeBlog } from '../types/home.types';
import { BlogSection } from './BlogSection';
import { CaseStudies } from './CaseStudies';
import { ClientsStrip } from './ClientsStrip';
import { HeroSection } from './HeroSection';
import { ServicesSection } from './ServicesSection';
import { StatsSection } from './StatsSection';
import { Testimonials } from './Testimonials';

interface HomeBlocksProps {
  blocks: Array<HomeBlock | { __component: string; id: number }>;
}

function blogCategory(post: HomeBlog): string | null {
  const category = post.category;
  if (!category) return null;
  const name = Array.isArray(category) ? category[0]?.name : category.name;
  const text = cmsText(name);
  return text || null;
}

function isBlock<T extends HomeBlock['__component']>(
  block: { __component: string },
  name: T
): block is Extract<HomeBlock, { __component: T }> {
  return block.__component === name;
}

/** Renders the home dynamic zone in the order Strapi returns it. */
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
          return <StatsSection key={key} data={block} />;
        }
        if (isBlock(block, 'shared.case-studies')) {
          return <CaseStudies key={key} data={block} />;
        }
        if (isBlock(block, 'shared.testimonial-section')) {
          return <Testimonials key={key} data={block} />;
        }
        if (isBlock(block, 'shared.home-blogs')) {
          return (
            <BlogSection
              key={key}
              title={block.title}
              subTitle={block.subTitle}
              posts={(block.blogs ?? []).map((post) => ({
                id: post.id,
                title: post.title,
                href: joinPath(block.url ?? '/blog', post.slug),
                excerpt: post.excerpt,
                category: blogCategory(post),
                image: post.featuredImage
                  ? {
                      url: post.featuredImage.url,
                      alternativeText: post.featuredImage.alternativeText,
                      width: post.featuredImage.width,
                      height: post.featuredImage.height,
                    }
                  : null,
              }))}
            />
          );
        }

        return null;
      })}
    </>
  );
}

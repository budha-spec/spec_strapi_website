import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ExploreMore } from '@/components/ui/ExploreMore';
import { CarouselControls } from '@/components/ui/CarouselControls';

const BLOG_POSTS = [
  {
    id: 1,
    title:
      'Enterprise Data Management: A Strategic Foundation for Data-Driven Business Growth',
    category: 'App Development',
  },
  {
    id: 2,
    title: 'How Much Does It Cost to Develop an App in UK?',
    category: 'App Development',
  },
  {
    id: 3,
    title: 'How Much Does It Cost to Develop an App in UK?',
    category: 'App Development',
  },
  {
    id: 4,
    title: 'How Much Does It Cost to Develop an App in UK?',
    category: 'App Development',
  },
];

export function BlogSection() {
  return (
    <section
      id="insights"
      className="w-full bg-bg-light pt-[clamp(40px,3.33vw,64px)] pb-[clamp(40px,3.65vw,70px)]"
    >
      <div className="shell">
        <SectionEyebrow>Latest Insights</SectionEyebrow>

        <h2 className="mt-[clamp(6px,0.52vw,10px)] text-d40 font-medium leading-[1.2] text-text-heading">
          Expert Perspectives on Technology &{' '}
          <span className="gradient-text font-bold">Growth</span>
        </h2>

        <div className="mt-[clamp(24px,3.33vw,64px)] grid grid-cols-1 gap-[clamp(16px,1.67vw,32px)] sm:grid-cols-2 lg:grid-cols-4">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-[16px] bg-bg-white transition-shadow hover:shadow-lg"
            >
              <PlaceholderImage
                label="Article image"
                className="h-[clamp(150px,10.57vw,203px)] w-full shrink-0"
              />

              <div className="flex flex-1 flex-col p-[clamp(12px,0.83vw,16px)]">
                <span className="gradient-btn inline-flex h-[clamp(24px,1.67vw,32px)] w-fit items-center rounded-full px-[clamp(10px,0.78vw,15px)] text-d12 text-white">
                  {post.category}
                </span>

                <h4 className="mt-[clamp(10px,0.94vw,18px)] text-d18 font-medium leading-[1.4] text-text-primary transition-colors group-hover:text-brand-cta-blue">
                  {post.title}
                </h4>

                <ExploreMore className="mt-auto pt-[clamp(14px,1.09vw,21px)]" />
              </div>
            </article>
          ))}
        </div>

        <CarouselControls pill="dark" arrows="outline" className="mt-[clamp(16px,1.98vw,38px)]" />
      </div>
    </section>
  );
}

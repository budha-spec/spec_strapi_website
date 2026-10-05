import Image from 'next/image';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Enterprise Data Management: A Strategic Foundation for Data-Driven Business Growth',
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
    <section className="w-full bg-[#f6f6f6] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-brand-green text-sm font-semibold mb-4 block">• Latest Insights</span>
          <h2 className="text-3xl md:text-4xl font-medium text-text-primary">
            Expert Perspectives on Technology & <span className="text-[#0050FE] font-bold">Growth</span>
          </h2>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="flex flex-col group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-stroke-outline/50 p-2 pb-6">
              {/* Image */}
              <div className="w-full h-[160px] bg-gray-200 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                 <span className="text-gray-400 text-xs font-medium">Image</span>
              </div>
              
              <div className="px-2 flex flex-col flex-1">
                {/* Category Tag */}
                <div className="mb-3">
                  <span className="text-[9px] font-bold text-white bg-brand-green px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                
                {/* Title */}
                <h4 className="text-xs font-bold text-text-primary leading-snug mb-6 group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h4>
                
                {/* Explore More link */}
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-[10px] font-bold text-text-primary">Explore More</span>
                  <div className="h-5 w-5 rounded-full border border-stroke-main flex items-center justify-center group-hover:border-black transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots/Buttons */}
        <div className="flex justify-end gap-3">
          <div className="px-6 py-2 bg-black text-white rounded-full text-xs font-semibold cursor-pointer flex items-center">Explore All</div>
          <div className="h-10 w-16 bg-white border border-stroke-outline rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
               <path d="M5 12h14" />
               <path d="m12 5 7 7-7 7" />
             </svg>
          </div>
          <div className="h-10 w-16 bg-white border border-stroke-outline rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M5 12h14" />
               <path d="m12 5 7 7-7 7" />
             </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

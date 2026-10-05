import Image from 'next/image';

const CASE_STUDIES_TAGS = [
  'SaaS Platform',
  'AI Workflows',
  'EHR Integration',
  'Cloud Security',
];

export function CaseStudies() {
  return (
    <section className="w-full bg-[#f6f6f6] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-10">
          <span className="text-brand-blue text-sm font-semibold mb-4 block">• Client Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-medium text-text-primary">
            Proven Software Platforms Delivering Tangible <span className="text-brand-green font-bold">Business Value</span>
          </h2>
        </div>

        {/* Featured Case Study Card */}
        <div className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-sm border border-stroke-outline">
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Healthcare</h3>
            <p className="text-xs text-text-secondary mb-12 max-w-sm leading-relaxed">
              Modernized a legacy claims processing system into an AI-powered SaaS
              platform, Reducing processing time by 40% while ensuring full HIPAA
              compliance and seamless EHR integration.
            </p>
            
            {/* Divider */}
            <div className="w-full h-px bg-stroke-outline mb-8" />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {CASE_STUDIES_TAGS.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-[10px] text-text-secondary border border-stroke-outline">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Explore More link */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-xs font-bold text-text-primary">Explore More</span>
              <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-brand-blue transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full bg-gray-200 min-h-[300px] md:min-h-0 relative flex items-center justify-center">
             <span className="text-gray-400 font-medium">Dashboard Image Placeholder</span>
          </div>
        </div>

        {/* Thumbnails Navigation */}
        <div className="flex justify-end gap-3 mt-6">
          <div className="px-6 py-2 bg-black text-white rounded-full text-xs font-semibold cursor-pointer hover:bg-gray-800 transition-colors flex items-center">
            Explore All
          </div>
          <div className="h-10 w-16 bg-white border border-stroke-outline rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 text-text-primary">
               <path d="M5 12h14" />
               <path d="m12 5 7 7-7 7" />
             </svg>
          </div>
          <div className="h-10 w-16 bg-white border border-stroke-outline rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary">
               <path d="M5 12h14" />
               <path d="m12 5 7 7-7 7" />
             </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

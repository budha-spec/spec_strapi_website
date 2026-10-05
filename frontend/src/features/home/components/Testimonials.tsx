import Image from 'next/image';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marwa Abdelfattah',
    role: 'Founder, CoAuthor INC',
    bgColor: 'bg-gradient-to-t from-black via-[#0B5C66] to-[#1ABEC3]',
  },
  {
    id: 2,
    name: 'Fredrik Wittboldt',
    role: 'CEO, Dynamic Documents',
    bgColor: 'bg-gradient-to-t from-black via-[#0D4478] to-[#2B95F5]',
  },
  {
    id: 3,
    name: 'Kriti Anand',
    role: 'CoFounder, CAREERKUL',
    bgColor: 'bg-gradient-to-t from-black via-[#051C3F] to-[#0A3D8C]',
  },
  {
    id: 4,
    name: 'Johan Scott',
    role: 'CTO, Redeal STHLM',
    bgColor: 'bg-gradient-to-t from-black via-[#0C4430] to-[#1FA878]',
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-[#151515] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-brand-green text-sm font-semibold mb-4 block">• Client Spotlight</span>
          <h2 className="text-3xl md:text-4xl font-medium text-white">
            What Enterprise Leaders Say About <span className="text-brand-green font-bold">Partnering</span> <span className="text-brand-blue font-bold">Us</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className={`relative rounded-2xl overflow-hidden h-[360px] group cursor-pointer ${testimonial.bgColor} flex flex-col items-center justify-end pb-6 px-4 text-center`}>
              
              {/* Person Image Placeholder */}
              <div className="absolute inset-0 top-10 bottom-32 flex items-end justify-center pointer-events-none">
                 <div className="w-[180px] h-[180px] bg-black/20 rounded-full" />
              </div>
              
              {/* Play Button */}
              <div className="relative z-10 flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-4 hover:scale-105 transition-transform shadow-lg">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="text-xs font-bold text-black">Play</span>
              </div>
              
              <h4 className="relative z-10 text-sm font-bold text-white mb-1">{testimonial.name}</h4>
              <p className="relative z-10 text-[10px] text-white/80">{testimonial.role}</p>
            </div>
          ))}
        </div>
        
        {/* Navigation Dots/Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <div className="px-6 py-2 bg-brand-blue text-white rounded-full text-xs font-semibold cursor-pointer hover:brightness-110 flex items-center">
            Explore All
          </div>
          <div className="h-10 w-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
               <path d="M5 12h14" />
               <path d="m12 5 7 7-7 7" />
             </svg>
          </div>
          <div className="h-10 w-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M5 12h14" />
               <path d="m12 5 7 7-7 7" />
             </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

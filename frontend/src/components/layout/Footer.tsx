import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full relative">
      {/* 
        ========================================
        CTA / CONTACT SECTION
        ========================================
      */}
      <div className="w-full bg-[#f6f6f6] pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Left side: Let's Talk */}
            <div className="flex-1 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stroke-outline">
              <span className="text-sm font-bold text-text-primary mb-2 block">Let's Talk to</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-secondary mb-12 tracking-tight">
                OUR EXPERT!
              </h2>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <p className="text-[11px] font-bold">+91-79-26404031</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <p className="text-[11px] font-bold">lead@spec-india.com</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <p className="text-[11px] font-bold">+1 908-450-9882</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <p className="text-[11px] font-bold">lead@spec-usa.net</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-16">
                <div>
                  <p className="text-[13px] font-bold text-brand-blue mb-2">India</p>
                  <p className="text-[11px] text-text-secondary leading-relaxed"><strong>SPEC House,</strong> Parth Complex,<br/>Near Swastik Cross Roads,<br/>Navrangpura, Ahmedabad</p>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-brand-green mb-2">USA</p>
                  <p className="text-[11px] text-text-secondary leading-relaxed">350 Grove Street,<br/>Bridgewater, NJ 08807,<br/>United States.</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary mr-2">Follow us on</span>
                  {['in', 'ig', 'p', 'f', 'x'].map(social => (
                    <div key={social} className="w-7 h-7 rounded-md border border-stroke-main flex items-center justify-center text-[10px] font-bold uppercase cursor-pointer hover:bg-gray-50">
                      {social}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 border border-[#1769ff] text-[#1769ff] rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                    <span className="w-3 h-3 bg-[#1769ff] text-white rounded-full flex items-center justify-center text-[8px]">Be</span>
                    Behance
                  </div>
                  <div className="px-3 py-1 border border-[#ea4c89] text-[#ea4c89] rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer">
                    <span className="w-3 h-3 bg-[#ea4c89] text-white rounded-full flex items-center justify-center text-[8px]">Dr</span>
                    Dribbble
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side: Form */}
            <div className="flex-1 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stroke-outline">
              <h3 className="text-lg font-bold text-text-primary mb-8">Share Your Project's Vision</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name*" className="w-full text-xs outline-none border border-stroke-outline rounded-md px-4 py-3" />
                  <input type="email" placeholder="Email Address*" className="w-full text-xs outline-none border border-stroke-outline rounded-md px-4 py-3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full text-xs outline-none border border-stroke-outline rounded-md px-4 py-3 text-text-secondary appearance-none bg-transparent">
                    <option>India</option>
                  </select>
                  <div className="flex">
                    <span className="border border-r-0 border-stroke-outline rounded-l-md px-3 py-3 text-xs bg-gray-50">+91</span>
                    <input type="text" placeholder="Phone Number" className="w-full text-xs outline-none border border-stroke-outline rounded-r-md px-4 py-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Company Name" className="w-full text-xs outline-none border border-stroke-outline rounded-md px-4 py-3" />
                  <input type="text" placeholder="Designation" className="w-full text-xs outline-none border border-stroke-outline rounded-md px-4 py-3" />
                </div>
                
                <textarea placeholder="Requirement Brief*" rows={4} className="w-full text-xs outline-none border border-stroke-outline rounded-md px-4 py-3 resize-none"></textarea>
                
                {/* File attachment */}
                <div className="flex items-center gap-3 p-3 bg-gray-50/50 border border-stroke-outline border-dashed rounded-md cursor-pointer">
                   <div className="bg-black text-white p-1 rounded">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                     </svg>
                   </div>
                   <div className="text-[10px]">
                     <span className="font-bold text-text-primary block">Attach a file</span>
                     <span className="text-text-secondary">.doc, .docx and .pdf files below 5MB are allowed.</span>
                   </div>
                </div>

                <div className="text-[10px] text-text-secondary pt-2">Verify that you are human*</div>
                <div className="flex items-center gap-2 border border-stroke-outline p-3 rounded-md w-max bg-gray-50/30">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-xs">I am human</span>
                  <div className="ml-8 text-[8px] text-center text-text-secondary">
                    <div>hCaptcha</div>
                    <div>Privacy - Terms</div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Certificates/Badges Row */}
          <div className="mt-8 bg-white p-6 rounded-[32px] border border-stroke-outline shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative z-20">
             <div className="flex flex-wrap items-center gap-6 md:gap-8 justify-center flex-1">
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[8px]">ISO 27001</div>
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[8px]">ISO</div>
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[8px]">Badge</div>
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[8px]">Clutch</div>
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[8px]">Badge</div>
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-[8px]">Badge</div>
             </div>
             
             <div className="h-12 w-px bg-stroke-outline hidden md:block" />

             <div className="flex flex-wrap gap-8 items-center justify-center flex-1">
               {Object.entries({
                 'Clutch': '4.6',
                 'GoodFirms': '4.8',
                 'AmbitionBox': '4.6',
                 'Google': '4.5',
                 'Glassdoor': '4.2'
               }).map(([site, rating]) => (
                 <div key={site} className="flex flex-col items-center">
                   <span className="text-xs font-bold text-text-secondary mb-1">{site}</span>
                   <span className="text-[10px] font-bold text-black flex items-center gap-1">
                     <span className="text-[#FFB800]">★</span> {rating}
                   </span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* 
        ========================================
        MAIN FOOTER (Dark)
        ========================================
      */}
      <div className="w-full bg-[#000000] pt-24 pb-8 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
            
            {/* Services Col */}
            <div>
              <h4 className="text-white text-sm mb-6">Services</h4>
              <ul className="space-y-4 text-[11px] text-[#888888]">
                <li><Link href="#" className="hover:text-white">Custom Software Development</Link></li>
                <li><Link href="#" className="hover:text-white">Enterprise software Development</Link></li>
                <li><Link href="#" className="hover:text-white">Web Development</Link></li>
                <li><Link href="#" className="hover:text-white">UI/UX Design</Link></li>
                <li><Link href="#" className="hover:text-white">Mobile App Development</Link></li>
                <li><Link href="#" className="hover:text-white">Software Testing & QA Services</Link></li>
                <li><Link href="#" className="hover:text-white">Dedicated Development Team</Link></li>
              </ul>
            </div>
            
            {/* Hire Developers Col */}
            <div>
              <h4 className="text-white text-sm mb-6">Hire Developers</h4>
              <ul className="space-y-4 text-[11px] text-[#888888]">
                <li><Link href="#" className="hover:text-white">Hire Mobile App Developers</Link></li>
                <li><Link href="#" className="hover:text-white">Hire BI Developers</Link></li>
                <li><Link href="#" className="hover:text-white">Hire UI/UX Designers</Link></li>
                <li><Link href="#" className="hover:text-white">Hire Software Tester</Link></li>
                <li><Link href="#" className="hover:text-white">Hire Frontend Developers</Link></li>
                <li><Link href="#" className="hover:text-white">Hire Backend Developers</Link></li>
                <li><Link href="#" className="hover:text-white">Hire Full Stack Developers</Link></li>
              </ul>
            </div>
            
            {/* Industries Col */}
            <div>
              <h4 className="text-white text-sm mb-6">Industries</h4>
              <ul className="space-y-4 text-[11px] text-[#888888]">
                <li><Link href="#" className="hover:text-white">Healthcare</Link></li>
                <li><Link href="#" className="hover:text-white">Fitness</Link></li>
                <li><Link href="#" className="hover:text-white">Fintech</Link></li>
                <li><Link href="#" className="hover:text-white">Manufacturing</Link></li>
                <li><Link href="#" className="hover:text-white">Retail</Link></li>
                <li><Link href="#" className="hover:text-white">Media & Entertainment</Link></li>
                <li><Link href="#" className="hover:text-white">Advertising</Link></li>
              </ul>
            </div>
            
            {/* Solutions Col */}
            <div>
              <h4 className="text-white text-sm mb-6">Solutions</h4>
              <ul className="space-y-4 text-[11px] text-[#888888]">
                <li><Link href="#" className="hover:text-white">Custom ERP</Link></li>
                <li><Link href="#" className="hover:text-white">Learning Management</Link></li>
                <li><Link href="#" className="hover:text-white">Enterprise CRM</Link></li>
                <li><Link href="#" className="hover:text-white">Enterprise Service</Link></li>
                <li><Link href="#" className="hover:text-white">Help Desk Management</Link></li>
                <li><Link href="#" className="hover:text-white">Spot Billing System</Link></li>
                <li><Link href="#" className="hover:text-white">Warehouse Management</Link></li>
              </ul>
            </div>
            
            {/* Resource Col */}
            <div>
              <h4 className="text-white text-sm mb-6">Resource</h4>
              <ul className="space-y-4 text-[11px] text-[#888888]">
                <li><Link href="#" className="hover:text-white">Overview</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Newsletter</Link></li>
                <li><Link href="#" className="hover:text-white">Sitemap</Link></li>
                <li><Link href="#" className="hover:text-white">Live BI Examples</Link></li>
                <li><Link href="#" className="hover:text-white">Career</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            
          </div>
          
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#888888]">
            <div className="flex items-center gap-4">
              <div className="bg-[#1e1e1e] border border-white/20 px-2 py-1 rounded text-white font-bold text-[8px]">DMCA PROTECTED</div>
              <p>&copy; 2024 SPEC INDIA. All Rights Reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

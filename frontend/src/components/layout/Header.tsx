import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent h-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between border-b border-white/10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Logo Placeholder matching Figma */}
          <div className="flex items-center gap-2 text-white font-bold tracking-tighter">
            <span className="text-2xl">
              <span className="text-brand-green">SPEC</span>
              <span> INDIA</span>
            </span>
            <div className="flex flex-col ml-1 border-l border-white/20 pl-2 leading-none">
              <span className="text-brand-blue font-bold text-sm">39+</span>
              <span className="text-brand-green text-[10px]">YEARS</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-semibold text-white hover:text-brand-green transition-colors">
            What we do
          </Link>
          <Link href="#" className="text-sm font-semibold text-white hover:text-brand-green transition-colors">
            Who we are
          </Link>
          <Link href="#" className="text-sm font-semibold text-white hover:text-brand-green transition-colors">
            Industries
          </Link>
          <Link href="#" className="text-sm font-semibold text-white hover:text-brand-green transition-colors">
            Insights
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full gradient-btn text-white font-semibold text-sm whitespace-nowrap shrink-0 hover:brightness-110 transition-all">
            Contact Us
          </button>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}

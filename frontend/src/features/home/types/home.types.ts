import type { StrapiMedia } from '@/types/strapi';

/* ─── Hero ─────────────────────────────────────────────────── */
export interface HeroData {
  headline: string;
  subheadline: string;
  tagBadgeLabel: string;
  tagText: string;
  searchPlaceholder: string;
  quickLinks: QuickLink[];
}

export interface QuickLink {
  id: number;
  label: string;
}

/* ─── Clients ───────────────────────────────────────────────── */
export interface Client {
  id: number;
  name: string;
  logo: StrapiMedia;
}

/* ─── Services ──────────────────────────────────────────────── */
export interface Service {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
  link: string;
}

/* ─── Stats ─────────────────────────────────────────────────── */
export interface Stat {
  id: number;
  value: string;   // e.g. "4X", "60%", "25%", "50%"
  label: string;
  description: string;
}

/* ─── Case Studies ──────────────────────────────────────────── */
export interface CaseStudy {
  id: number;
  client: string;
  clientLogo: StrapiMedia;
  headline: string;
  description: string;
  mockupImage: StrapiMedia;
  link: string;
}

/* ─── Testimonials ──────────────────────────────────────────── */
export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  photo: StrapiMedia;
  quote: string;
}

/* ─── Blog ──────────────────────────────────────────────────── */
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  coverImage: StrapiMedia;
  publishedAt: string;
  readTime: string;
}

/* ─── Global (Header / Footer) ─────────────────────────────── */
export interface GlobalData {
  logo: StrapiMedia;
  navLinks: NavLink[];
  footerLinks: FooterLinkGroup[];
  socialLinks: SocialLink[];
  ctaHeadline: string;
  ctaSubtext: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  copyright: string;
}

export interface NavLink {
  id: number;
  label: string;
  href: string;
  children?: NavLink[];
}

export interface FooterLinkGroup {
  id: number;
  title: string;
  links: { id: number; label: string; href: string }[];
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

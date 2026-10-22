import type { CmsMedia } from '@/lib/media';

/** One office in the Let's Talk card (`shared.office-addresses`). */
export interface FooterOffice {
  id: number;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
  /** Free text. `**…**` marks bold, newlines are kept. */
  address?: string | null;
}

/** A "Follow us on" button (`shared.social`); the icon is the whole button. */
export interface FooterSocial {
  id: number;
  url?: string | null;
  icon?: CmsMedia | null;
}

/** A Behance / Dribbble pill (`shared.portfolio`); the logo is the whole circle. */
export interface FooterPortfolio {
  id: number;
  title?: string | null;
  url?: string | null;
  logo?: CmsMedia | null;
}

/** A review score in the certifications strip (`shared.company-ratings`). */
export interface FooterRating {
  id: number;
  rating?: number | string | null;
  logo?: CmsMedia | null;
  ratingImg?: CmsMedia | null;
}

/** One footer link (`shared.footer-columns`). `#` means no page yet. */
export interface FooterLink {
  id: number;
  title?: string | null;
  url?: string | null;
}

/** A dark-footer link column (`shared.footer-menu-items`). */
export interface FooterMenuColumn {
  id: number;
  label?: string | null;
  menuItem?: FooterLink[] | null;
}

/** Bottom bar: DMCA badge + Privacy / Terms links (`shared.footer-privacy-section`). */
export interface FooterPrivacy {
  id: number;
  image?: CmsMedia | null;
  url?: string | null;
  footerMenu?: FooterLink[] | null;
}

/** Strapi single type `footer` — drives Let's Talk, the awards strip and the dark link columns. */
export interface FooterData {
  id: number;
  title?: string | null;
  subTitle?: string | null;
  followTxt?: string | null;
  /** "Portfolio" label over the Behance / Dribbble pills; hidden when empty. */
  portfolioTxt?: string | null;
  address?: FooterOffice[] | null;
  social?: FooterSocial[] | null;
  portfolio?: FooterPortfolio[] | null;
  certificates?: CmsMedia[] | null;
  companyRating?: FooterRating[] | null;
  footerMenu?: FooterMenuColumn[] | null;
  footerPrivacyMenu?: FooterPrivacy | null;
}

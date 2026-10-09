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

/** Strapi single type `footer` — drives Let's Talk and the awards strip. */
export interface FooterData {
  id: number;
  title?: string | null;
  subTitle?: string | null;
  followTxt?: string | null;
  address?: FooterOffice[] | null;
  social?: FooterSocial[] | null;
  portfolio?: FooterPortfolio[] | null;
  certificates?: CmsMedia[] | null;
  companyRating?: FooterRating[] | null;
}

import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAudienceSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_audience_sections';
  info: {
    displayName: 'Audience Section';
  };
  attributes: {
    audience: Schema.Attribute.Component<'shared.capabilities-item', true>;
    dashboard: Schema.Attribute.String & Schema.Attribute.Required;
    focus: Schema.Attribute.String;
    platform: Schema.Attribute.Relation<
      'oneToOne',
      'api::visualization-category.visualization-category'
    >;
  };
}

export interface SharedBlogs extends Struct.ComponentSchema {
  collectionName: 'components_shared_blogs';
  info: {
    displayName: 'Blogs';
  };
  attributes: {
    blog: Schema.Attribute.Relation<'oneToMany', 'api::blog-post.blog-post'>;
    subTitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCapabilitiesItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_capabilities_items';
  info: {
    displayName: 'Capabilities Item';
  };
  attributes: {
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface SharedCareerInquiryCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_career_inquiry_ctas';
  info: {
    displayName: 'Career Inquiry CTA';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    inquiryItems: Schema.Attribute.Component<
      'shared.career-inquiry-item',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCareerInquiryItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_career_inquiry_items';
  info: {
    displayName: 'Career Inquiry Item';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    item: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface SharedCaseStudies extends Struct.ComponentSchema {
  collectionName: 'components_shared_case_studies';
  info: {
    displayName: 'Home Case Studies';
  };
  attributes: {
    caseStudy: Schema.Attribute.Component<'shared.case-study-item', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedCaseStudyItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_case_study_items';
  info: {
    displayName: 'Case Study Item';
  };
  attributes: {
    btnText: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tags: Schema.Attribute.Relation<'oneToMany', 'api::cs-tag.cs-tag'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedChallenges extends Struct.ComponentSchema {
  collectionName: 'components_shared_challenges';
  info: {
    displayName: 'Challenges';
  };
  attributes: {
    challange: Schema.Attribute.Component<'shared.challenges-item', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedChallengesItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_challenges_items';
  info: {
    displayName: 'Challenges Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCompanyRatings extends Struct.ComponentSchema {
  collectionName: 'components_shared_company_ratings';
  info: {
    displayName: 'Company Ratings';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    rating: Schema.Attribute.Decimal & Schema.Attribute.Required;
    ratingImg: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
  };
}

export interface SharedContactUs extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_uses';
  info: {
    displayName: 'Contact Us';
  };
  attributes: {
    txt: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCsResult extends Struct.ComponentSchema {
  collectionName: 'components_shared_cs_results';
  info: {
    displayName: 'CS Result';
  };
  attributes: {
    result: Schema.Attribute.Component<'shared.cs-result-item', false>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCsResultItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_cs_result_items';
  info: {
    displayName: 'CS Result Item';
  };
  attributes: {
    csResult: Schema.Attribute.Component<'shared.challenges-item', true>;
    keyMetrics: Schema.Attribute.Component<'shared.key-metrics', true>;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    txt: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedDashboardAction extends Struct.ComponentSchema {
  collectionName: 'components_shared_dashboard_actions';
  info: {
    displayName: 'Dashboard Action';
  };
  attributes: {
    disclaimerTxt: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedDashboardImprovement extends Struct.ComponentSchema {
  collectionName: 'components_shared_dashboard_improvements';
  info: {
    displayName: 'Dashboard Improvement';
  };
  attributes: {
    improvement: Schema.Attribute.Component<'shared.text-block', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEnterpriseSolution extends Struct.ComponentSchema {
  collectionName: 'components_shared_enterprise_solutions';
  info: {
    displayName: 'Enterprise Solution';
  };
  attributes: {
    enterpriseSolution: Schema.Attribute.Component<
      'shared.enterprise-solution-item',
      true
    >;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedEnterpriseSolutionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_enterprise_solution_items';
  info: {
    displayName: 'Enterprise Solution Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    pages: Schema.Attribute.Relation<
      'oneToMany',
      'api::content-item.content-item'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    txt: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'Faq Item';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFaqs extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'Faqs';
  };
  attributes: {
    faq: Schema.Attribute.Component<'shared.faq-item', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedGallery extends Struct.ComponentSchema {
  collectionName: 'components_shared_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedHomeBlogs extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_blogs';
  info: {
    displayName: 'Home Blogs';
  };
  attributes: {
    blogs: Schema.Attribute.Relation<'oneToMany', 'api::blog-post.blog-post'>;
    subTitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedHomePageSection1 extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_page_section1s';
  info: {
    displayName: 'HomeSection1';
  };
  attributes: {
    capabilities: Schema.Attribute.Component<'shared.capabilities-item', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedIndustryCaseStudy extends Struct.ComponentSchema {
  collectionName: 'components_shared_industry_case_studies';
  info: {
    displayName: 'Industry Use Cases';
  };
  attributes: {
    caseStudy: Schema.Attribute.Component<'shared.text-block', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedIndustryGallery extends Struct.ComponentSchema {
  collectionName: 'components_shared_industry_galleries';
  info: {
    displayName: 'Industry Gallery';
  };
  attributes: {
    gallery: Schema.Attribute.Component<'shared.industry-gallery-item', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedIndustryGalleryItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_industry_gallery_items';
  info: {
    displayName: 'Industry Gallery Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface SharedIndustrySection extends Struct.ComponentSchema {
  collectionName: 'components_shared_industry_sections';
  info: {
    displayName: 'Industry Section';
  };
  attributes: {
    industries: Schema.Attribute.Relation<
      'oneToMany',
      'api::industry.industry'
    >;
    subTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedIndustryService extends Struct.ComponentSchema {
  collectionName: 'components_shared_industry_services';
  info: {
    displayName: 'Industry Service';
  };
  attributes: {
    industryServices: Schema.Attribute.Component<
      'shared.industry-service-item',
      true
    >;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedIndustryServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_industry_service_items';
  info: {
    displayName: 'Industry Service Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    txt: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedKeyMetrics extends Struct.ComponentSchema {
  collectionName: 'components_shared_key_metrics';
  info: {
    displayName: 'Key Metrics Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedKeyMetricsSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_key_metrics_sections';
  info: {
    displayName: 'Key Metrics Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    keyMetrics: Schema.Attribute.Component<'shared.key-metrics', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedKpiBusinessImpact extends Struct.ComponentSchema {
  collectionName: 'components_shared_kpi_business_impacts';
  info: {
    displayName: 'KPI Business Impact';
  };
  attributes: {
    category: Schema.Attribute.Component<'shared.kpi-category', true>;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedKpiCategory extends Struct.ComponentSchema {
  collectionName: 'components_shared_kpi_categories';
  info: {
    displayName: 'KPI Category';
  };
  attributes: {
    subCategory: Schema.Attribute.Component<'shared.capabilities-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface SharedLiveBiVisualization extends Struct.ComponentSchema {
  collectionName: 'components_shared_live_bi_visualizations';
  info: {
    displayName: 'Live BI Visualization';
  };
  attributes: {
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    visualizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::visualization.visualization'
    >;
  };
}

export interface SharedOfficeAddresses extends Struct.ComponentSchema {
  collectionName: 'components_shared_office_addresses';
  info: {
    displayName: 'Office Addresses';
  };
  attributes: {
    address: Schema.Attribute.Text;
    country: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPortfolio extends Struct.ComponentSchema {
  collectionName: 'components_shared_portfolios';
  info: {
    displayName: 'Portfolio';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich Text';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    canonicalURL: Schema.Attribute.Text;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    ogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedServiceCards extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_cards';
  info: {
    displayName: 'Service Cards';
  };
  attributes: {
    ServiceCards: Schema.Attribute.Component<'shared.services-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_items';
  info: {
    displayName: 'Service Item';
  };
  attributes: {
    btnText: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subServices: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedServices extends Struct.ComponentSchema {
  collectionName: 'components_shared_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    services: Schema.Attribute.Component<'shared.service-item', true>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServicesCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_services_cards';
  info: {
    displayName: 'Services Card Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    number: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_socials';
  info: {
    displayName: 'Social';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSolutions extends Struct.ComponentSchema {
  collectionName: 'components_shared_solutions';
  info: {
    displayName: 'Solutions';
  };
  attributes: {
    solution: Schema.Attribute.Component<'shared.challenges-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedTableOfContentItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_table_of_content_items';
  info: {
    displayName: 'Table Of Content Item';
  };
  attributes: {
    contentId: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTechnologies extends Struct.ComponentSchema {
  collectionName: 'components_shared_technologies';
  info: {
    displayName: 'Technologies';
  };
  attributes: {
    subTitle: Schema.Attribute.String;
    technology: Schema.Attribute.Component<'shared.technology-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTechnologyItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_technology_items';
  info: {
    displayName: 'Technology Item';
  };
  attributes: {
    technologies: Schema.Attribute.Relation<
      'oneToMany',
      'api::technology.technology'
    >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface SharedTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonial_items';
  info: {
    displayName: 'Testimonial Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    designation: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.Text;
  };
}

export interface SharedTestimonialSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonial_sections';
  info: {
    displayName: 'Testimonial Section';
  };
  attributes: {
    subTitle: Schema.Attribute.String;
    testimonials: Schema.Attribute.Component<'shared.testimonial-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_blocks';
  info: {
    displayName: 'TextBlock';
  };
  attributes: {
    btnText: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedWhitepapers extends Struct.ComponentSchema {
  collectionName: 'components_shared_whitepapers';
  info: {
    displayName: 'Whitepaper Section';
  };
  attributes: {
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    whitepapers: Schema.Attribute.Relation<
      'oneToMany',
      'api::whitepaper.whitepaper'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.audience-section': SharedAudienceSection;
      'shared.blogs': SharedBlogs;
      'shared.capabilities-item': SharedCapabilitiesItem;
      'shared.career-inquiry-cta': SharedCareerInquiryCta;
      'shared.career-inquiry-item': SharedCareerInquiryItem;
      'shared.case-studies': SharedCaseStudies;
      'shared.case-study-item': SharedCaseStudyItem;
      'shared.challenges': SharedChallenges;
      'shared.challenges-item': SharedChallengesItem;
      'shared.company-ratings': SharedCompanyRatings;
      'shared.contact-us': SharedContactUs;
      'shared.cs-result': SharedCsResult;
      'shared.cs-result-item': SharedCsResultItem;
      'shared.cta': SharedCta;
      'shared.dashboard-action': SharedDashboardAction;
      'shared.dashboard-improvement': SharedDashboardImprovement;
      'shared.enterprise-solution': SharedEnterpriseSolution;
      'shared.enterprise-solution-item': SharedEnterpriseSolutionItem;
      'shared.faq-item': SharedFaqItem;
      'shared.faqs': SharedFaqs;
      'shared.gallery': SharedGallery;
      'shared.home-blogs': SharedHomeBlogs;
      'shared.home-page-section1': SharedHomePageSection1;
      'shared.industry-case-study': SharedIndustryCaseStudy;
      'shared.industry-gallery': SharedIndustryGallery;
      'shared.industry-gallery-item': SharedIndustryGalleryItem;
      'shared.industry-section': SharedIndustrySection;
      'shared.industry-service': SharedIndustryService;
      'shared.industry-service-item': SharedIndustryServiceItem;
      'shared.key-metrics': SharedKeyMetrics;
      'shared.key-metrics-section': SharedKeyMetricsSection;
      'shared.kpi-business-impact': SharedKpiBusinessImpact;
      'shared.kpi-category': SharedKpiCategory;
      'shared.live-bi-visualization': SharedLiveBiVisualization;
      'shared.office-addresses': SharedOfficeAddresses;
      'shared.portfolio': SharedPortfolio;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.service-cards': SharedServiceCards;
      'shared.service-item': SharedServiceItem;
      'shared.services': SharedServices;
      'shared.services-card': SharedServicesCard;
      'shared.social': SharedSocial;
      'shared.solutions': SharedSolutions;
      'shared.table-of-content-item': SharedTableOfContentItem;
      'shared.technologies': SharedTechnologies;
      'shared.technology-item': SharedTechnologyItem;
      'shared.testimonial-item': SharedTestimonialItem;
      'shared.testimonial-section': SharedTestimonialSection;
      'shared.text-block': SharedTextBlock;
      'shared.whitepapers': SharedWhitepapers;
    }
  }
}

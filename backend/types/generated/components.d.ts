import type { Schema, Struct } from '@strapi/strapi';

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

export interface SharedCaseStudies extends Struct.ComponentSchema {
  collectionName: 'components_shared_case_studies';
  info: {
    displayName: 'Home Case Studies';
  };
  attributes: {
    case_studies: Schema.Attribute.Relation<
      'oneToMany',
      'api::case-study.case-study'
    >;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
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
    pages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>;
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
    answer: Schema.Attribute.Blocks & Schema.Attribute.Required;
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

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich Text';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
    videoUrl: Schema.Attribute.Text & Schema.Attribute.Required;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.blogs': SharedBlogs;
      'shared.capabilities-item': SharedCapabilitiesItem;
      'shared.case-studies': SharedCaseStudies;
      'shared.enterprise-solution': SharedEnterpriseSolution;
      'shared.enterprise-solution-item': SharedEnterpriseSolutionItem;
      'shared.faq-item': SharedFaqItem;
      'shared.faqs': SharedFaqs;
      'shared.gallery': SharedGallery;
      'shared.home-blogs': SharedHomeBlogs;
      'shared.home-page-section1': SharedHomePageSection1;
      'shared.key-metrics': SharedKeyMetrics;
      'shared.key-metrics-section': SharedKeyMetricsSection;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.service-cards': SharedServiceCards;
      'shared.services-card': SharedServicesCard;
      'shared.testimonial-item': SharedTestimonialItem;
      'shared.testimonial-section': SharedTestimonialSection;
    }
  }
}

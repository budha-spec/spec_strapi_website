import type { Schema, Struct } from '@strapi/strapi';

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
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.enterprise-solution': SharedEnterpriseSolution;
      'shared.enterprise-solution-item': SharedEnterpriseSolutionItem;
      'shared.gallery': SharedGallery;
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

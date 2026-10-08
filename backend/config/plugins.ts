import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({});

export default () => ({
  'deep-populate': {
    enabled: true,
  },

  'deep-copy': {
    enabled: true,
    config: {
      contentTypes: {
        'api::page.page': {
          enabled: true,
          showButtonInAdmin: true,
        },
        'api::industry.industry': {
          enabled: true,
          showButtonInAdmin: true,
        },
        'api::case-study.case-study': {
          enabled: true,
          showButtonInAdmin: true,
        },
        'api::cs-industry.cs-industry': {
          enabled: true,
          showButtonInAdmin: true,
        },
        'api::cs-tag.cs-tag': {
          enabled: true,
          showButtonInAdmin: true,
        },
        'api::category.category': {
          enabled: true,
          showButtonInAdmin: true,
        },
        'api::blog-post.blog-post': {
          enabled: true,
          showButtonInAdmin: true,
        },
        'api::service.service': {
          enabled: true,
          showButtonInAdmin: true,
        },
        'api::section.section': {
          enabled: true,
          showButtonInAdmin: false,
        },
      },
    },
  },
});


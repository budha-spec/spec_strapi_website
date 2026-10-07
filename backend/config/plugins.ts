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
      },
    },
  },
});


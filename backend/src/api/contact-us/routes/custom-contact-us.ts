/**
 * Custom contact-us routes
 */

import type { Core } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-us/submit',
      handler: 'api::contact-us.contact-us.submit',
      info: {
        type: 'content-api',
        apiName: 'contact-us',
      },
      config: {
        auth: false,
      },
    },
  ],
};
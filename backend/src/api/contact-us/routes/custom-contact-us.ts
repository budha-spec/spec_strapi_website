/**
 * Custom contact-us routes
 */

import type { Core } from '@strapi/strapi';

/**
 * Custom contact-us routes for Strapi v5.
 */
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
    {
      method: 'GET',
      path: '/contact-us/inquiries',
      handler: 'api::contact-us.contact-us.findForHr',
      info: {
        type: 'content-api',
        apiName: 'contact-us',
      },
      config: {
        auth: {},
      },
    },
    {
      method: 'GET',
      path: '/contact-us/inquiries/:documentId',
      handler: 'api::contact-us.contact-us.findOneForHr',
      info: {
        type: 'content-api',
        apiName: 'contact-us',
      },
      config: {
        auth: {},
      },
    },
    {
      method: 'PATCH',
      path: '/contact-us/inquiries/read-status',
      handler: 'api::contact-us.contact-us.updateReadStatusBulk',
      info: {
        type: 'content-api',
        apiName: 'contact-us',
      },
      config: {
        auth: {},
      },
    },
    {
      method: 'PATCH',
      path: '/contact-us/inquiries/:documentId/read-status',
      handler: 'api::contact-us.contact-us.updateReadStatus',
      info: {
        type: 'content-api',
        apiName: 'contact-us',
      },
      config: {
        auth: {},
      },
    },
  ],
} satisfies { routes: Core.Route[] };


/**
 * blog-post router
 */

import { factories } from '@strapi/strapi';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/blog',
      handler: 'api::blog-post.blog-post.find',
      config: {},
    },
    {
      method: 'GET',
      path: '/blog/:id',
      handler: 'api::blog-post.blog-post.findOne',
      config: {},
    },
    {
      method: 'POST',
      path: '/blog',
      handler: 'api::blog-post.blog-post.create',
      config: {},
    },
    {
      method: 'PUT',
      path: '/blog/:id',
      handler: 'api::blog-post.blog-post.update',
      config: {},
    },
    {
      method: 'DELETE',
      path: '/blog/:id',
      handler: 'api::blog-post.blog-post.delete',
      config: {},
    },
  ],
};


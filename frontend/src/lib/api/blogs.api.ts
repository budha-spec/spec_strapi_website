/**
 * Insights carousel data — shared by every page that shows `BlogSection`.
 * Posts come from the live WordPress feed on spec-india.com, not from Strapi.
 */

import { wordpressGet } from '@/lib/api/wordpress';
import { BLOG_LIMIT, REVALIDATE, WP_ENDPOINTS } from '@/lib/api/endpoints';
import { decodeEntities } from '@/lib/media';
import type { BlogCardData } from '@/components/sections/BlogSection';
import type { WpBlogsResponse } from '@/types/blog.types';

/** Maps one WordPress post onto the card shape the carousel renders. */
function toCard(post: WpBlogsResponse['blogs'][number]): BlogCardData {
  const category = post.categories?.[0]?.name;

  return {
    id: post.id,
    title: decodeEntities(post.title),
    href: post.url,
    // The design shows image, category, and title only — the WordPress
    // excerpt is deliberately left out so the cards keep their height.
    excerpt: null,
    category: category ? decodeEntities(category) : null,
    image: post.image
      ? { url: post.image, alternativeText: post.image_alt ?? null }
      : null,
  };
}

/**
 * Latest posts, newest first — optionally only one WordPress category
 * (its slug, e.g. `ai`; a service passes its Strapi `blog_category.slug`).
 *
 * WordPress is a third-party origin, so a failure here degrades to an empty
 * carousel instead of taking the whole page down. `BlogSection` hides itself
 * when the list is empty, which also covers a category with no posts.
 */
export async function fetchLatestBlogs(
  category?: string | null
): Promise<BlogCardData[]> {
  try {
    const data = await wordpressGet<WpBlogsResponse>(
      WP_ENDPOINTS.LATEST_BLOGS(category),
      { next: { revalidate: REVALIDATE.CONTENT } }
    );

    if (!data?.success || !Array.isArray(data.blogs)) return [];
    // `limit` is already in the query — this just guarantees the ceiling.
    return data.blogs.slice(0, BLOG_LIMIT).map(toCard);
  } catch (error) {
    console.error('[blogs] falling back to an empty carousel:', error);
    return [];
  }
}

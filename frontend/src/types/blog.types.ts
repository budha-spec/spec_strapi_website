/** Shapes returned by the live WordPress feed at spec-india.com. */

export interface WpBlogCategory {
  id: number;
  name: string;
  slug: string;
  url: string;
}

export interface WpBlog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  date?: string | null;
  /** Absolute permalink on spec-india.com. */
  url: string;
  image?: string | null;
  image_alt?: string | null;
  categories?: WpBlogCategory[] | null;
}

export interface WpBlogsResponse {
  success: boolean;
  count: number;
  category: string | null;
  blogs: WpBlog[];
}

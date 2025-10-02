export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
  };
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
  publishedAt: string;
  readingTime: number;
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

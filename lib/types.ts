import type { PortableTextBlock } from "@portabletext/react";

declare global {
  interface SanityImage {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
    caption?: string;
  }

  interface SEO {
    seoTitle?: string;
    seoDescription?: string;
    focusKeyphrase?: string;
    relatedKeyphrases?: string[];
    canonicalUrl?: string;
    noIndex?: boolean;
    ogImage?: SanityImage;
  }

  interface BlogFaq {
    _key: string;
    question?: string;
    answer?: PortableTextBlock[];
    answerText?: string;
  }

  interface IPost {
    _id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    publishedAt?: string;
    updatedAt?: string | null;
    readingTime?: string;
    isFeatured: boolean;
    topics: string[];
    coverImage?: SanityImage | null;
    seo?: SEO;
    faqs?: BlogFaq[];
    body?: PortableTextBlock[];
  }

  interface IProject {
    _id: string;
    _createdAt?: string;
    _updatedAt?: string,
    title: string;
    slug: string;
    projectType?: string | null;
    projectLabel?: string | null;
    summary?: string | null;
    stack?: string[];
    contribution?: PortableTextBlock[];
    coverImage?: SanityImage | null;
    liveUrl?: string | null;
    githubUrl?: string | null;
    isFeatured?: boolean;
    seo?: SEO;
  }
}

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
    body?: any[];
}
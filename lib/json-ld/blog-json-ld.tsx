import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "../site-data";

interface BlogPostJsonLdProps {
  post: IPost;
}


export function generateBlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const pageUrl = `${siteConfig.url}/blog/${post.slug}`;
  const title = post.seo?.seoTitle || post.title;
  const description = post.seo?.seoDescription || post.excerpt;
  const image = post.seo?.ogImage || post.coverImage;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "en",
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${pageUrl}#article`,
        },
      },
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: post.title,
        description,
        image: image?.asset
          ? urlFor(image).width(1200).height(630).url()
          : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
          "@type": "Person",
          name: "Edwin Promise",
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Person",
          name: "Edwin Promise",
        },
        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },
        keywords: post.topics?.join(", "),
        articleSection: post.category,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteConfig.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
import { defineQuery } from "next-sanity";

export const allPostsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    readingTime,
    isFeatured,
    topics,
    coverImage {
      asset,
      alt,
      caption
    }
  }
`);

export const featuredPostQuery = defineQuery(`
  *[_type == "blogPost" && isFeatured == true && defined(slug.current)]
  | order(publishedAt desc)[0] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    readingTime,
    topics,
    coverImage {
      asset,
      alt,
      caption
    }
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    publishedAt,
    updatedAt,
    readingTime,
    topics,
    coverImage {
      asset,
      alt,
      caption
    },
    seo,
    body
  }
`);
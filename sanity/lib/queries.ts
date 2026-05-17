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
    faqs[]{
      _key,
      question,
      answer,
      "answerText": pt::text(answer)
    },
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          "slug": reference->slug.current,
          "type": reference->_type,
          "title": reference->title
        }
      }
    }
  }
`);

export const allProjectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  | order(isFeatured desc, _createdAt desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    projectType,
    projectLabel,
    summary,
    stack,
    contribution,
    coverImage {
      asset,
      alt
    },
    liveUrl,
    githubUrl,
    isFeatured
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    projectType,
    projectLabel,
    summary,
    stack,
    contribution,
    coverImage {
      asset,
      alt
    },
    liveUrl,
    githubUrl,
    isFeatured,
    seo
  }
`);

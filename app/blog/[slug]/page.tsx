import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/components/portableText";
import { generateBlogPostJsonLd } from "@/lib/json-ld/blog-json-ld";
import { allPostsQuery, postBySlugQuery } from "@/sanity/lib/queries";
import { ArrowLeft, ArrowUpRight, Clock3, CalendarDays } from "lucide-react";


export const dynamicParams = false;

// formats date
function formatDate(date?: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

//generates dynamic routes
export async function generateStaticParams() {
  const posts = await client.fetch(allPostsQuery);

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

//generates dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: IPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  const title = post.seo?.seoTitle || post.title;
  const description = post.seo?.seoDescription || post.excerpt;
  const image = post.seo?.ogImage || post.coverImage;
  const keywords = [
    post.seo?.focusKeyphrase,
    ...(post.seo?.relatedKeyphrases || [])
  ].filter((keyword): keyword is string => Boolean(keyword));

  return {
    title: `${title}`,
    description,
    keywords,
    alternates: {
      canonical: post.seo?.canonicalUrl || `/blog/${post.slug}`,
    },
    robots: {
      index: !post.seo?.noIndex,
      follow: !post.seo?.noIndex,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || undefined,
      authors: ["Edwin Promise"],
      tags: post.topics,
      url: `/blog/${post.slug}`,
      images: image?.asset
        ? [
            {
              url: urlFor(image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: image.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image?.asset ? [urlFor(image).width(1200).height(630).url()] : undefined,
    },
  };
}

// main page component
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: IPost | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  // Generates json/ld
  const jsonLd = generateBlogPostJsonLd({ post });

  const posts: IPost[] = await client.fetch(allPostsQuery);
  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => item.category === post.category)
    .slice(0, 3);

  const fallbackRelatedPosts = posts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const displayedRelatedPosts =
    relatedPosts.length > 0 ? relatedPosts : fallbackRelatedPosts;

  const publishedDate = formatDate(post.publishedAt);
  const updatedDate = formatDate(post.updatedAt);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="section-shell py-10 md:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-silver transition hover:text-brass"
        >
          <ArrowLeft size={15} />
          Back to blog
        </Link>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.34fr]">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
              <span className="eyebrow text-[0.68rem] text-brass">
                {post.category}
              </span>

              {publishedDate ? <span>{publishedDate}</span> : null}
              {post.readingTime ? <span>{post.readingTime} min read</span> : null}
            </div>

            <h1 className="mt-5 max-w-4xl font-display text-5xl text-balance text-cream md:text-6xl">
              {post.title}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
              {post.excerpt}
            </p>

            {post.topics?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-xs text-silver"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="section-card rounded-[2.5rem] p-6">
            <p className="eyebrow text-xs text-brass">Article notes</p>

            <div className="mt-6 space-y-4">
              {post.readingTime ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs text-silver">Reading time</p>
                  <div className="mt-2 flex items-center gap-2 text-cream">
                    <Clock3 size={15} className="text-brass" />
                    <span className="text-sm font-semibold">
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
              ) : null}

              {publishedDate ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs text-silver">Published</p>
                  <div className="mt-2 flex items-center gap-2 text-cream">
                    <CalendarDays size={15} className="text-brass" />
                    <span className="text-sm font-semibold">{publishedDate}</span>
                  </div>
                </div>
              ) : null}

              {updatedDate ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs text-silver">Updated</p>
                  <p className="mt-2 text-sm font-semibold text-cream">
                    {updatedDate}
                  </p>
                </div>
              ) : null}

              {post.seo?.focusKeyphrase ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs text-silver">Focus keyphrase</p>
                  <p className="mt-2 text-sm font-semibold text-cream">
                    {post.seo.focusKeyphrase}
                  </p>
                </div>
              ) : null}
            </div>
          </aside>
        </section>

        {post.coverImage?.asset ? (
          <figure className="mt-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03]">
            <Image
              src={urlFor(post.coverImage).width(1600).height(850).url()}
              alt={post.coverImage.alt || post.title}
              width={1600}
              height={850}
              priority
              className="h-auto w-full object-cover"
            />

            {post.coverImage.caption ? (
              <figcaption className="px-6 py-4 text-sm text-silver">
                {post.coverImage.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.78fr_0.22fr]">
          <article className="rounded-3xl sm:rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <div className="space-y-6">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          </article>

          <aside className="h-fit rounded-3xl sm:rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 lg:sticky lg:top-24">
            <p className="eyebrow text-xs text-brass">Article summary</p>

            <p className="mt-4 text-sm leading-7 text-silver">
              {post.excerpt}
            </p>

            {post.seo?.relatedKeyphrases?.length ? (
              <div className="mt-6">
                <p className="text-xs text-silver">Related keyphrases</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {post.seo.relatedKeyphrases.map((keyphrase) => (
                    <span
                      key={keyphrase}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-silver"
                    >
                      {keyphrase}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>

        {displayedRelatedPosts.length ? (
          <section className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow text-xs text-brass">More writing</p>
                <h2 className="mt-4 font-display text-4xl text-cream md:text-5xl">
                  Continue with related notes.
                </h2>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-silver transition hover:text-brass"
              >
                Browse all articles
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {displayedRelatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="section-card rounded-[1.85rem] p-6 transition hover:border-brass"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
                    <span className="eyebrow text-[0.68rem] text-brass">
                      {relatedPost.category}
                    </span>

                    <span>{formatDate(relatedPost.publishedAt)}</span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl text-balance text-cream">
                    {relatedPost.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-silver">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

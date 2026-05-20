import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { BlogReadingProgress } from "@/components/blog-reading-progress";
import { BlogShare } from "@/components/blog-share";
import portableTextComponents from "@/components/portableText";
import { SocialIcon } from "@/components/social-icon";
import { TrackedLink } from "@/components/tracked-link";
import { generateBlogPostJsonLd } from "@/lib/json-ld/blog-json-ld";
import { siteConfig, socials } from "@/lib/site-data";
import { allPostsQuery, postBySlugQuery } from "@/sanity/lib/queries";
import { ArrowLeft, ArrowUpRight, Clock3, CalendarDays, UserRound } from "lucide-react";


export const revalidate = 60;

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
  const posts = await client.fetch(allPostsQuery, {}, 
    {
      next: {
        revalidate: 60,
      },
    }
  );

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
  const post: IPost | null = await client.fetch(postBySlugQuery, { slug }, 
    {
      next: {
        revalidate: 60,
      },
    }
  );

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
  const post: IPost | null = await client.fetch(postBySlugQuery, { slug }, 
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!post) {
    notFound();
  }

  // Generates json/ld
  const jsonLd = generateBlogPostJsonLd({ post });

  const posts: IPost[] = await client.fetch(allPostsQuery, {}, 
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const postTopics = new Set(post.topics ?? []);
  const displayedRelatedPosts = posts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      const matchesCategory = item.category === post.category;
      const matchesTopic = (item.topics ?? []).some((topic) => postTopics.has(topic));

      return matchesCategory || matchesTopic;
    })
    .slice(0, 3);

  const callToAction = post.callToAction;
  const hasCallToAction = Boolean(
    callToAction?.title && callToAction.label && callToAction.href,
  );
  const callToActionHref = callToAction?.href ?? "";
  const shouldOpenCallToActionInNewTab = Boolean(
    callToAction?.openInNewTab &&
      callToActionHref &&
      !callToActionHref.startsWith("/") &&
      !callToActionHref.startsWith("#"),
  );

  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const publishedDate = formatDate(post.publishedAt);
  const authorSocials = socials.filter((social) =>
    ["LinkedIn", "GitHub", "X"].includes(social.label),
  );

  return (
    <>
      <BlogReadingProgress />

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

              <Link href="/about" className="transition hover:text-brass">
                By {siteConfig.name}
              </Link>
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
              <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-xs text-silver">Author</p>
                <Link
                  href="/about"
                  className="micro-press mt-2 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-cream transition hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                >
                  <UserRound size={15} className="text-brass" />
                  {siteConfig.name}
                </Link>

                {authorSocials.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {authorSocials.map((social) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="micro-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-silver transition hover:-translate-y-0.5 hover:border-brass hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                      >
                        <SocialIcon label={social.label} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex justify-between md:flex-col gap-3">
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
              </div>

              {/* {post.seo?.focusKeyphrase ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs text-silver">Focus keyphrase</p>
                  <p className="mt-2 text-sm font-semibold text-cream">
                    {post.seo.focusKeyphrase}
                  </p>
                </div>
              ) : null} */}

            </div>
          </aside>
        </section>

        {post.coverImage?.asset ? (
          <figure className="mt-8 overflow-hidden rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-white/[0.03]">
            <Image
              src={urlFor(post.coverImage).width(900).height(480).quality(75).format("webp").url()}
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

        <section className="mt-7 grid gap-6 md:mt-9 lg:grid-cols-[0.78fr_0.22fr]">
          <article className="rounded-3xl sm:rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <div className="space-y-6">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>

            {post.faqs?.length ? (
              <section className="mt-12 border-t border-white/10 pt-10">
                <p className="eyebrow text-xs text-brass">FAQs</p>
                <h2 className="mt-4 font-display text-4xl text-cream md:text-5xl">
                  Common questions
                </h2>

                <div className="mt-6 space-y-3">
                  {post.faqs.map((faq) => (
                    <section
                      key={faq._key}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <h3 className="text-base font-semibold leading-7 text-cream">
                        {faq.question}
                      </h3>

                      {faq.answer?.length ? (
                        <div className="mt-4 space-y-4">
                          <PortableText
                            value={faq.answer}
                            components={portableTextComponents}
                          />
                        </div>
                      ) : null}
                    </section>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="h-fit rounded-3xl sm:rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 lg:sticky lg:top-24">
            <p className="eyebrow text-xs text-brass">Article summary</p>

            <p className="mt-4 text-sm leading-7 text-silver">
              {post.excerpt}
            </p>

            <div className="mt-6">
              <BlogShare
                title={post.title}
                excerpt={post.excerpt}
                url={articleUrl}
              />
            </div>

            {/* {post.seo?.relatedKeyphrases?.length ? (
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
            ) : null} */}
          </aside>
        </section>

        {hasCallToAction ? (
          <section className="mt-12 overflow-hidden rounded-3xl border border-brass/35 bg-[rgba(255,255,255,0.03)] p-6 text-center sm:rounded-[2.4rem] md:p-8 lg:p-10">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                {callToAction?.eyebrow ? (
                  <p className="eyebrow text-xs text-brass mb-3">
                    {callToAction.eyebrow}
                  </p>
                ) : null}

                <h2 className="mt-4 max-w-4xl font-display text-4xl text-balance text-cream md:text-5xl">
                  {callToAction?.title}
                </h2>

                {callToAction?.description ? (
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-silver md:text-base">
                    {callToAction.description}
                  </p>
                ) : null}
              </div>

              <TrackedLink
                href={callToActionHref}
                target={shouldOpenCallToActionInNewTab ? "_blank" : undefined}
                rel={shouldOpenCallToActionInNewTab ? "noopener noreferrer" : undefined}
                tracking={{
                  type: "external_link_click",
                  location: "blog_post_cta",
                  label: callToAction?.label ?? "Blog post CTA",
                  url: callToActionHref,
                }}
                className="micro-press inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brass bg-brass px-5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-transparent hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass sm:w-fit"
              >
                {callToAction?.label}
                <ArrowUpRight size={16} />
              </TrackedLink>
            </div>
          </section>
        ) : null}

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
                className="inline-flex items-center gap-2 text-sm text-silver! transition! hover:text-brass!"
              >
                Browse all articles
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {displayedRelatedPosts.map((relatedPost) => (
                <TrackedLink
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  tracking={{ type: "blog_view", location: "blog_related_card", postTitle: relatedPost.title }}
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
                </TrackedLink>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/lib/site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="section-shell py-10 md:py-14">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-silver transition hover:text-brass">
        <ArrowLeft size={15} />
        Back to blog
      </Link>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.34fr]">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(140deg,rgba(214,161,74,0.15),rgba(255,255,255,0.04),rgba(102,169,255,0.12))] p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
            <span className="eyebrow text-[0.68rem] text-brass">{post.category}</span>
            <span>{post.publishedAt}</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-5 max-w-4xl font-display text-5xl text-balance md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
            {post.excerpt}
          </p>

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
        </div>

        <aside className="section-card rounded-[2.5rem] p-6">
          <p className="eyebrow text-xs text-brass">Article notes</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs text-silver">Reading time</p>
              <div className="mt-2 flex items-center gap-2 text-cream">
                <Clock3 size={15} className="text-brass" />
                <span className="text-sm font-semibold">{post.readingTime}</span>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs text-silver">Published</p>
              <p className="mt-2 text-sm font-semibold text-cream">{post.publishedAt}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs text-silver">Main takeaway</p>
              <p className="mt-2 text-sm leading-7 text-cream">{post.takeaway}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.78fr_0.22fr]">
        <article className="rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
          <blockquote className="border-l border-brass/60 pl-5 font-display text-3xl leading-tight text-cream md:text-4xl">
            “{post.pullQuote}”
          </blockquote>

          <p className="mt-8 text-base leading-8 text-silver md:text-lg">
            {post.intro}
          </p>

          <div className="mt-10 space-y-10">
            {post.sections.map((section, index) => (
              <section key={section.title}>
                <div className="flex items-center gap-4">
                  <span className="eyebrow text-[0.68rem] text-brass">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-3xl text-balance md:text-4xl">{section.title}</h2>
                </div>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-8 text-silver md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        <aside className="rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6">
          <p className="eyebrow text-xs text-brass">Summary</p>
          <p className="mt-4 font-display text-3xl text-cream">
            {post.takeaway}
          </p>
          <p className="mt-6 text-sm leading-7 text-silver">
            This route is ready to be replaced with a CMS or markdown source later, but it already gives each article a proper landing page instead of treating the blog as a static archive only.
          </p>
        </aside>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-xs text-brass">More writing</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Continue with related notes.</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-silver transition hover:text-brass">
            Browse all articles
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.slug}
              href={`/blog/${relatedPost.slug}`}
              className="section-card rounded-[1.85rem] p-6 transition hover:border-brass"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
                <span className="eyebrow text-[0.68rem] text-brass">{relatedPost.category}</span>
                <span>{relatedPost.publishedAt}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl text-balance">{relatedPost.title}</h3>
              <p className="mt-4 text-sm leading-7 text-silver">{relatedPost.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { BlogBrowser } from "@/components/blog-browser";
import { editorialPillars } from "@/lib/site-data";
import { TrackedLink } from "@/components/tracked-link";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { getBlogSchema } from "@/lib/json-ld/json-ld";

export const revalidate = 60

// =============== Metadata ================ //
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read practical notes from Edwin Promise on web development, SEO, performance, product thinking, WordPress, Next.js, and building better digital products.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Edwin Promise",
    description:
      "Practical notes on web development, SEO, performance, product thinking, and building better digital products.",
    url: "/blog",
    siteName: "Edwin Promise",
    type: "website",
    images: [
      {
        url: "/images/blogpage.jpg",
        width: 1200,
        height: 630,
        alt: "Blog by Edwin Promise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Edwin Promise",
    description:
      "Practical notes on web development, SEO, performance, and product thinking.",
    images: ["/images/blogpage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function formatDate(date?: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatReadingTime(readingTime?: string | null) {
  if (!readingTime) return null;

  return readingTime.includes("min") ? readingTime : `${readingTime} min read`;
}

export default async function BlogPage() {
  const posts: IPost[] = await client.fetch(allPostsQuery, {}, 
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const featuredPost = posts.find((post) => post.isFeatured) ?? posts[0];

  const jsonLd = getBlogSchema(posts)

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div id="blog" className="section-shell py-10 md:py-14">
        <section className="grid gap-6 lg:grid-cols-[1fr_0.62fr]">
          <div className="overflow-hidden rounded-3xl sm:rounded-3xl sm:rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Blog</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl text-balance md:text-6xl">
              Writing that shows how I think, build, and solve problems.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
              Practical notes on web development, product thinking, SEO, performance, and lessons from the projects I build. This space helps turn my experience into proof of how I approach real problems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {editorialPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-full border border-white/10 bg-[rgba(10,10,10,0.28)] px-4 py-2 text-xs text-silver"
                >
                  {pillar.title}
                </div>
              ))}
            </div>
          </div>

          <div className="section-card rounded-3xl sm:rounded-[2.4rem] p-6">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-xs text-brass">Editorial desk</p>
              <BookOpen size={16} className="text-brass" />
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-xs text-silver">Publishing rhythm</p>
                <p className="mt-2 text-lg font-semibold text-cream">Practical, honest, and easy to understand.</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-xs text-silver">Best use</p>
                <p className="mt-2 text-lg font-semibold text-cream">Turning project experience, mistakes, and lessons into proof of thinking.</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-xs text-silver">Content mix</p>
                <p className="mt-2 text-lg font-semibold text-cream">Build breakdowns, development notes, product opinions, SEO lessons, and shipping reflections.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-xs text-brass">Featured note</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">Lessons from building real digital products.</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-silver">
              A selected article showing how I approach product decisions, user flows, SEO, performance, and launch-ready execution.
            </p>
          </div>

          {featuredPost ? (
            <article
              id={featuredPost.slug}
              className="mt-8 overflow-hidden rounded-3xl sm:rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)]"
            >
              <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
                    <span className="eyebrow text-[0.68rem] text-brass">{featuredPost.category}</span>
                    {formatDate(featuredPost.publishedAt) ? (
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    ) : null}
                    {formatReadingTime(featuredPost.readingTime) ? (
                      <span>{formatReadingTime(featuredPost.readingTime)}</span>
                    ) : null}
                  </div>

                  <h3 className="mt-5 max-w-2xl font-display text-4xl text-balance md:text-5xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
                    {featuredPost.excerpt}
                  </p>

                  {featuredPost.topics?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {featuredPost.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-xs text-silver"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <TrackedLink
                    href={`/blog/${featuredPost.slug}`}
                    tracking={{ type: "blog_view", location: "blog_featured_card", postTitle: featuredPost.title }}
                    className="group micro-link micro-press mt-5 inline-flex items-center gap-2 rounded-full border border-brass px-5 py-2.5 text-sm text-white! transition duration-150 hover:bg-brass!"
                  >
                    Read article
                    <ArrowUpRight size={14} />
                  </TrackedLink>
                </div>

                <div className="border-t hidden lg:block border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-xs text-silver">Highlighted line</p>
                  <blockquote className="mt-5 font-display text-3xl leading-tight text-cream md:text-4xl">
                    &ldquo;{featuredPost.excerpt}&rdquo;
                  </blockquote>

                  <div className="mt-8 rounded-3xl border border-white/10 bg-[rgba(0,0,0,0.16)] p-4">
                    <p className="text-xs text-silver">Why read this</p>
                    <p className="mt-2 text-sm leading-7 text-cream">
                      Practical notes on websites, SEO, performance, and building better digital experiences for businesses.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <div className="mt-8 rounded-3xl sm:rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 text-sm leading-7 text-silver md:p-8">
              No published Sanity posts are available yet.
            </div>
          )}
        </section>

        <BlogBrowser posts={posts} />

        <section className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Content lanes</p>
            <div className="mt-6 grid gap-4">
              {editorialPillars.map((pillar, index) => (
                <div key={pillar.title} className="rounded-[1.5rem] border border-white/10 p-4">
                  <p className="text-xs text-brass">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-xl font-semibold text-cream">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-silver">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Newsletter-style CTA</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl text-balance md:text-5xl">
              Get product notes from the promise desk.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-silver md:text-base">
              For now, reach out directly for product thinking, build notes, or a closer look at how Promise approaches launch-ready interfaces.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="rounded-full border border-white/10 bg-[rgba(0,0,0,0.22)] px-5 py-3 text-sm text-silver">
                promnix10@gmail.com
              </div>
              <TrackedLink
                href="mailto:contact@promnix.dev?subject=Promnix%20product%20notes"
                tracking={{ type: "email_click", location: "blog_newsletter_cta", label: "Contact the desk" }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5"
              >
                Contact the desk
                <ArrowUpRight size={15} />
              </TrackedLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

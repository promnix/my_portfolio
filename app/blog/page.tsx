import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import { blogPosts, editorialPillars } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const [featuredPost, ...recentPosts] = blogPosts;

  return (
    <div className="section-shell py-10 md:py-14">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.62fr]">
        <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(140deg,rgba(214,161,74,0.16),rgba(255,255,255,0.03),rgba(102,169,255,0.12))] p-6 md:p-8">
          <p className="eyebrow text-xs text-brass">Blog</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl text-balance md:text-6xl">
            Writing on product craft, delivery pace, and cleaner interfaces.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
            This page extends the portfolio with an editorial layer. Use it for product notes, behind-the-build breakdowns, design opinions, and practical development essays that deepen your credibility.
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

        <div className="section-card rounded-[2.4rem] p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-xs text-brass">Editorial desk</p>
            <BookOpen size={16} className="text-brass" />
          </div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs text-silver">Publishing rhythm</p>
              <p className="mt-2 text-lg font-semibold text-cream">Thoughtful, practical, and compact.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs text-silver">Best use</p>
              <p className="mt-2 text-lg font-semibold text-cream">Turn project experience into durable proof of thinking.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs text-silver">Content mix</p>
              <p className="mt-2 text-lg font-semibold text-cream">Process notes, product opinions, and shipping lessons.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-xs text-brass">Featured note</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Lead with one strong article.</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-silver">
            A single featured essay gives the page a clear entry point and makes the writing feel intentionally curated.
          </p>
        </div>

        <article
          id={featuredPost.slug}
          className="mt-8 overflow-hidden rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)]"
        >
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
                <span className="eyebrow text-[0.68rem] text-brass">{featuredPost.category}</span>
                <span>{featuredPost.publishedAt}</span>
                <span>{featuredPost.readingTime}</span>
              </div>

              <h3 className="mt-5 max-w-2xl font-display text-4xl text-balance md:text-5xl">
                {featuredPost.title}
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
                {featuredPost.excerpt}
              </p>

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

              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm text-brass transition hover:text-cream"
              >
                Read article
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs text-silver">Highlighted line</p>
              <blockquote className="mt-5 font-display text-3xl leading-tight text-cream md:text-4xl">
                “{featuredPost.pullQuote}”
              </blockquote>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(0,0,0,0.16)] p-4">
                  <p className="text-xs text-silver">Tone</p>
                  <p className="mt-2 text-sm leading-7 text-cream">
                    Editorial, practical, and clear enough to read quickly between delivery cycles.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(0,0,0,0.16)] p-4">
                  <p className="text-xs text-silver">Use this space for</p>
                  <p className="mt-2 text-sm leading-7 text-cream">
                    A cover image later, or a secondary summary block if you prefer a fully text-led blog.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow text-xs text-brass">Recent writing</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">A clean archive with strong summaries.</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-silver">
            These cards are structured to read well even before you add images, tags, or full CMS-backed post pages.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              id={post.slug}
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="section-card rounded-[1.9rem] p-6 transition hover:border-brass hover:bg-[rgba(255,255,255,0.05)]"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
                <span className="eyebrow text-[0.68rem] text-brass">{post.category}</span>
                <span>{post.publishedAt}</span>
              </div>

              <h3 className="mt-4 font-display text-3xl text-balance">{post.title}</h3>
              <p className="mt-4 text-sm leading-7 text-silver">{post.excerpt}</p>

              <div className="mt-5 flex items-center gap-2 text-xs text-silver">
                <Clock3 size={14} className="text-brass" />
                {post.readingTime}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.topics.map((topic) => (
                  <span key={topic} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver">
                    {topic}
                  </span>
                ))}
              </div>

              <p className="mt-6 border-l border-white/10 pl-4 text-sm leading-7 text-cream/85">
                “{post.pullQuote}”
              </p>
            </Link>
          ))}
        </div>
      </section>

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

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(214,161,74,0.15),rgba(255,255,255,0.04),rgba(102,169,255,0.13))] p-6 md:p-8">
          <p className="eyebrow text-xs text-brass">Newsletter-style CTA</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl text-balance md:text-5xl">
            Turn writing into another trust surface for your portfolio.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-silver md:text-base">
            Replace this section with a real email form, Substack link, or article archive CTA when you are ready to publish consistently.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-full border border-white/10 bg-[rgba(0,0,0,0.22)] px-5 py-3 text-sm text-silver">
              hello@yourname.dev
            </div>
            <a
              href="mailto:hello@yourname.dev?subject=Send%20me%20your%20latest%20articles"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5"
            >
              Set up article delivery
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

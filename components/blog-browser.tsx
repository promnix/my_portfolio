"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ArrowUpRight, Clock3, Search, X } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";

type BlogBrowserPost = Pick<
  IPost,
  "_id" | "title" | "slug" | "category" | "excerpt" | "publishedAt" | "readingTime" | "topics"
>;

type BlogBrowserProps = {
  posts: BlogBrowserPost[];
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

export function BlogBrowser({ posts }: BlogBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(posts.map((post) => post.category).filter(Boolean));
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const terms = deferredQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const searchableText = `${post.title} ${post.category} ${post.excerpt}`.toLowerCase();
      const matchesQuery = terms.length === 0 || terms.every((term) => searchableText.includes(term));

      return matchesCategory && matchesQuery;
    });
  }, [category, deferredQuery, posts]);

  const hasActiveFilters = query.trim() || category !== "All";

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow text-xs text-brass">Browse writing</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Practical notes on websites, SEO, and digital products.</h2>
        </div>
        <p className="max-w-lg text-sm leading-7 text-silver">
          Clear, useful articles from my work building websites, improving performance, and helping businesses turn online presence into real trust and action.
        </p>
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="flex min-h-12 items-center gap-3 rounded-full border border-white/10 bg-[rgba(10,10,10,0.28)] px-4">
            <Search size={17} className="shrink-0 text-brass" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles"
              className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-silver/70"
            />
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter articles by category"
            className="min-h-12 rounded-full border border-white/10 bg-[rgba(10,10,10,0.28)] px-4 text-sm text-cream outline-none transition hover:border-brass focus-visible:border-brass"
          >
            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption} className="bg-charcoal text-cream">
                {categoryOption === "All" ? "All categories" : categoryOption}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-silver">
          <span>
            {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"} found
          </span>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="micro-press inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-brass transition hover:-translate-y-0.5 hover:border-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              <X size={13} />
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <TrackedLink
            id={post.slug}
            key={post.slug}
            href={`/blog/${post.slug}`}
            tracking={{ type: "blog_view", location: "blog_browse_card", postTitle: post.title }}
            className="section-card rounded-[1.9rem] p-6 transition hover:border-brass! hover:bg-[rgba(255,255,255,0.05)]"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
              <span className="eyebrow text-[0.68rem] text-brass">{post.category}</span>
              {formatDate(post.publishedAt) ? <span>{formatDate(post.publishedAt)}</span> : null}
            </div>

            <h3 className="mt-4 font-display text-3xl text-balance">{post.title}</h3>
            <p className="mt-4 text-sm leading-7 text-silver">{post.excerpt}</p>

            {formatReadingTime(post.readingTime) ? (
              <div className="mt-5 flex items-center gap-2 text-xs text-silver">
                <Clock3 size={14} className="text-brass" />
                {formatReadingTime(post.readingTime)}
              </div>
            ) : null}

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass">
              Read article
              <ArrowUpRight size={14} />
            </span>
          </TrackedLink>
        ))}
      </div>

      {!filteredPosts.length ? (
        <div className="mt-8 rounded-[1.75rem] border border-dashed border-white/10 p-8 text-center text-sm leading-7 text-silver">
          No articles match those filters yet.
        </div>
      ) : null}
    </section>
  );
}

import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="section-shell py-16 md:py-24">
      <div className="mx-auto max-w-3xl rounded-3xl sm:rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-8 text-center md:p-12">
        <p className="eyebrow text-xs text-brass">404</p>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">Article not found.</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-silver md:text-base">
          This post does not exist in the current portfolio data set, or its slug has changed.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center rounded-full border border-brass bg-brass px-6 py-3 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5 hover:bg-[#e2b267]"
        >
          Back to blog
        </Link>
      </div>
    </div>
  );
}

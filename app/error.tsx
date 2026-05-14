"use client";

import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="section-shell py-16 md:py-24">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-8 text-center sm:rounded-[2.4rem] md:p-12">
        <p className="eyebrow text-xs text-brass">Error</p>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
          Something went wrong.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-silver md:text-base">
          The page could not finish loading. Try again, or return home and continue browsing.
        </p>

        {error.digest ? (
          <p className="mt-4 text-xs text-silver/70">Error ID: {error.digest}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex items-center rounded-full border border-brass bg-brass px-6 py-3 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5 hover:bg-[#e2b267]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-silver transition hover:border-brass hover:text-brass"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

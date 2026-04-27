"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDeferredValue, useOptimistic, useTransition } from "react";

type SearchEntry = {
  title: string;
  href: string;
  category: string;
  body: string;
};

export function SearchClient({
  entries,
  initialQuery,
}: {
  entries: SearchEntry[];
  initialQuery: string;
}) {
  const router = useRouter();
  const [query, setOptimisticQuery] = useOptimistic(initialQuery);
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();

  const needle = deferredQuery.trim().toLowerCase();
  const results = needle
    ? entries.filter((entry) =>
        `${entry.title} ${entry.category} ${entry.body}`.toLowerCase().includes(needle),
      )
    : entries;

  return (
    <div className="section-shell py-10 md:py-14">
      <div className="max-w-3xl">
        <p className="eyebrow text-xs text-brass">Search</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl">Find pages, sections, projects, and articles.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-silver md:text-base">
          The reference site includes a dedicated search route. This version keeps that pattern and searches your portfolio structure and blog content locally.
        </p>
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 md:p-5">
        <label className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-[rgba(10,10,10,0.36)] px-4 py-3">
          <Search size={18} className="text-brass" />
          <input
            value={query}
            onChange={(event) => {
              const nextQuery = event.target.value;

              const params = new URLSearchParams();
              if (nextQuery.trim()) {
                params.set("q", nextQuery);
              }

              startTransition(() => {
                setOptimisticQuery(nextQuery);
                router.replace(params.size ? `/search?${params.toString()}` : "/search", {
                  scroll: false,
                });
              });
            }}
            placeholder="Search projects, skills, and pages"
            className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-silver/70 md:text-base"
          />
        </label>
        <div className="mt-3 text-xs text-silver">
          {isPending ? "Updating query..." : `${results.length} result${results.length === 1 ? "" : "s"}`}
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {results.map((entry) => (
          <Link
            key={`${entry.href}-${entry.title}`}
            href={entry.href}
            className="rounded-[1.75rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 transition hover:border-brass hover:bg-[rgba(255,255,255,0.05)]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-[0.68rem] text-brass">{entry.category}</span>
              <span className="text-xs text-silver">{entry.href}</span>
            </div>
            <h2 className="mt-3 font-display text-3xl">{entry.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-silver">{entry.body}</p>
          </Link>
        ))}

        {!results.length ? (
          <div className="rounded-[1.75rem] border border-dashed border-white/10 p-8 text-center text-silver">
            No results matched “{deferredQuery}”.
          </div>
        ) : null}
      </div>
    </div>
  );
}

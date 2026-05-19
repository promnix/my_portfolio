function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-white/10 ${className}`} />;
}

function ArticleSidebarSkeleton() {
  return (
    <aside className="section-card rounded-[2.5rem] p-6">
      <SkeletonLine className="h-3 w-28 bg-brass/20" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
            <SkeletonLine className="h-3 w-24" />
            <SkeletonLine className="mt-4 h-6 w-3/4" />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function BlogPostLoading() {
  return (
    <div className="section-shell py-10 md:py-14" aria-busy="true" aria-label="Loading article">
      <SkeletonLine className="h-5 w-28" />

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.34fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
          <SkeletonLine className="h-3 w-24 bg-brass/20" />
          <SkeletonLine className="mt-5 h-14 w-full max-w-4xl" />
          <SkeletonLine className="mt-3 h-14 w-5/6 max-w-3xl" />
          <div className="mt-6 max-w-2xl space-y-3">
            <SkeletonLine className="h-3 w-full" />
            <SkeletonLine className="h-3 w-11/12" />
            <SkeletonLine className="h-3 w-2/3" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLine key={index} className="h-8 w-24" />
            ))}
          </div>
        </div>

        <ArticleSidebarSkeleton />
      </section>

      <div className="mt-8 aspect-[16/8.5] animate-pulse rounded-[2.5rem] border border-white/10 bg-white/10" />

      <section className="mt-7 grid gap-6 md:mt-9 lg:grid-cols-[0.78fr_0.22fr]">
        <article className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 sm:rounded-[2.4rem] md:p-8">
          <div className="space-y-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <SkeletonLine
                key={index}
                className={index % 3 === 2 ? "h-3 w-3/4" : "h-3 w-full"}
              />
            ))}
          </div>
        </article>

        <aside className="h-fit rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 sm:rounded-[2.4rem]">
          <SkeletonLine className="h-3 w-28 bg-brass/20" />
          <div className="mt-5 space-y-3">
            <SkeletonLine className="h-3 w-full" />
            <SkeletonLine className="h-3 w-11/12" />
            <SkeletonLine className="h-3 w-2/3" />
          </div>
          <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
            <SkeletonLine className="h-3 w-24" />
            <div className="mt-4 flex flex-wrap gap-2.5">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonLine key={index} className="h-11 w-24" />
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-white/10 ${className}`} />;
}

function BlogCardSkeleton() {
  return (
    <article className="section-card rounded-[1.9rem] p-6">
      <div className="flex items-center gap-3">
        <SkeletonLine className="h-3 w-20 bg-brass/20" />
        <SkeletonLine className="h-3 w-24" />
      </div>
      <SkeletonLine className="mt-5 h-9 w-full" />
      <SkeletonLine className="mt-3 h-9 w-4/5" />
      <div className="mt-5 space-y-3">
        <SkeletonLine className="h-3 w-full" />
        <SkeletonLine className="h-3 w-11/12" />
        <SkeletonLine className="h-3 w-2/3" />
      </div>
      <SkeletonLine className="mt-6 h-10 w-32 bg-brass/20" />
    </article>
  );
}

export default function BlogLoading() {
  return (
    <div id="blog" className="section-shell py-10 md:py-14" aria-busy="true" aria-label="Loading blog">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.62fr]">
        <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 sm:rounded-[2.4rem] md:p-8">
          <SkeletonLine className="h-3 w-20 bg-brass/20" />
          <SkeletonLine className="mt-5 h-14 w-full max-w-3xl" />
          <SkeletonLine className="mt-3 h-14 w-4/5 max-w-2xl" />
          <div className="mt-6 max-w-2xl space-y-3">
            <SkeletonLine className="h-3 w-full" />
            <SkeletonLine className="h-3 w-11/12" />
            <SkeletonLine className="h-3 w-2/3" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLine key={index} className="h-9 w-28" />
            ))}
          </div>
        </div>

        <aside className="section-card rounded-3xl p-6 sm:rounded-[2.4rem]">
          <SkeletonLine className="h-3 w-28 bg-brass/20" />
          <div className="mt-6 grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                <SkeletonLine className="h-3 w-24" />
                <SkeletonLine className="mt-4 h-6 w-full" />
                <SkeletonLine className="mt-2 h-6 w-3/4" />
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-12">
        <SkeletonLine className="h-3 w-28 bg-brass/20" />
        <SkeletonLine className="mt-5 h-12 w-full max-w-2xl" />
        <article className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] sm:rounded-[2.4rem]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 md:p-8">
              <SkeletonLine className="h-3 w-24 bg-brass/20" />
              <SkeletonLine className="mt-5 h-11 w-full max-w-xl" />
              <SkeletonLine className="mt-3 h-11 w-4/5 max-w-lg" />
              <div className="mt-5 max-w-2xl space-y-3">
                <SkeletonLine className="h-3 w-full" />
                <SkeletonLine className="h-3 w-11/12" />
                <SkeletonLine className="h-3 w-2/3" />
              </div>
              <SkeletonLine className="mt-6 h-10 w-32 bg-brass/20" />
            </div>
            <div className="border-t border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8 lg:border-l lg:border-t-0">
              <SkeletonLine className="h-3 w-28" />
              <SkeletonLine className="mt-5 h-10 w-full" />
              <SkeletonLine className="mt-3 h-10 w-5/6" />
            </div>
          </div>
        </article>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </section>
    </div>
  );
}

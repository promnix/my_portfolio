function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-white/10 ${className}`} />;
}

export default function ServiceDetailLoading() {
  return (
    <div className="section-shell py-10 md:py-14" aria-busy="true" aria-label="Loading service">
      <SkeletonLine className="h-5 w-32" />

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.36fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-6 sm:px-6 md:p-8">
          <SkeletonLine className="h-3 w-28 bg-brass/20" />
          <SkeletonLine className="mt-6 h-14 w-full max-w-3xl" />
          <SkeletonLine className="mt-3 h-14 w-4/5 max-w-2xl" />
          <div className="mt-6 max-w-2xl space-y-3">
            <SkeletonLine className="h-3 w-full" />
            <SkeletonLine className="h-3 w-11/12" />
            <SkeletonLine className="h-3 w-2/3" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <SkeletonLine className="h-11 w-36 bg-brass/20" />
            <SkeletonLine className="h-11 w-28" />
          </div>
        </div>

        <aside className="section-card rounded-[2.5rem] px-4 py-6 sm:px-6">
          <SkeletonLine className="h-3 w-32 bg-brass/20" />
          <div className="mt-6 space-y-4">
            <SkeletonLine className="h-28 w-full" />
            <SkeletonLine className="h-28 w-full" />
          </div>
        </aside>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.64fr_0.36fr]">
        <article className="rounded-[2.2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-6 sm:px-6 md:p-8">
          <SkeletonLine className="h-3 w-24 bg-brass/20" />
          <SkeletonLine className="mt-5 h-12 w-full max-w-xl" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLine key={index} className="h-24 w-full" />
            ))}
          </div>
        </article>
        <aside className="rounded-[2.2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-6 sm:px-6 md:p-8">
          <SkeletonLine className="h-3 w-28 bg-brass/20" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLine key={index} className="h-12 w-full" />
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

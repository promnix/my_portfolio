function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-white/10 ${className}`} />;
}

function ServiceCardSkeleton({ index }: { index: number }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-7">
      <SkeletonLine className="h-11 w-14 bg-brass/20" />
      <SkeletonLine className="mt-6 h-10 w-full max-w-md" />
      <SkeletonLine className="mt-3 h-10 w-4/5 max-w-sm" />
      <div className="mt-6 space-y-3">
        <SkeletonLine className="h-3 w-full" />
        <SkeletonLine className="h-3 w-11/12" />
        <SkeletonLine className="h-3 w-2/3" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, itemIndex) => (
          <SkeletonLine key={`${index}-${itemIndex}`} className="h-8 w-24" />
        ))}
      </div>
      <SkeletonLine className="mt-6 h-10 w-32 bg-brass/20" />
    </article>
  );
}

export default function ServicesLoading() {
  return (
    <div id="services" className="section-shell py-10 md:py-14" aria-busy="true" aria-label="Loading services">
      <section className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
        <div className="rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
          <SkeletonLine className="h-3 w-24 bg-brass/20" />
          <SkeletonLine className="mt-5 h-14 w-full max-w-3xl" />
          <SkeletonLine className="mt-3 h-14 w-4/5 max-w-2xl" />
          <div className="mt-6 max-w-2xl space-y-3">
            <SkeletonLine className="h-3 w-full" />
            <SkeletonLine className="h-3 w-11/12" />
            <SkeletonLine className="h-3 w-2/3" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <SkeletonLine className="h-11 w-36 bg-brass/20" />
            <SkeletonLine className="h-11 w-36" />
          </div>
        </div>

        <aside className="section-card rounded-[2.4rem] p-6">
          <SkeletonLine className="h-3 w-28 bg-brass/20" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLine key={index} className="h-16 w-full" />
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-12">
        <SkeletonLine className="h-3 w-28 bg-brass/20" />
        <SkeletonLine className="mt-5 h-12 w-full max-w-2xl" />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <ServiceCardSkeleton key={index} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

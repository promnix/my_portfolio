function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-white/10 ${className}`} />;
}

function ProjectCardSkeleton({ index }: { index: number }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-stretch">
        <div className="min-w-0">
          <div className="space-y-4">
            <SkeletonLine className="h-12 w-16 bg-brass/20" />
            <SkeletonLine className="h-3 w-20" />
          </div>

          <div className="mt-8">
            <SkeletonLine className="h-3 w-28 bg-brass/20" />
            <SkeletonLine className="mt-4 h-11 w-full max-w-xl" />
            <SkeletonLine className="mt-3 h-11 w-4/5 max-w-lg" />
            <div className="mt-5 max-w-2xl space-y-3">
              <SkeletonLine className="h-3 w-full" />
              <SkeletonLine className="h-3 w-11/12" />
              <SkeletonLine className="h-3 w-2/3" />
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
              <SkeletonLine className="h-3 w-12" />
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, itemIndex) => (
                  <SkeletonLine
                    key={`${index}-${itemIndex}`}
                    className="h-8 w-20"
                  />
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <SkeletonLine className="h-10 w-32 bg-brass/20" />
                <SkeletonLine className="h-10 w-44" />
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-64 animate-pulse rounded-[1.7rem] border border-white/10 bg-white/10 lg:min-h-full" />
      </div>
    </article>
  );
}

export default function ProjectsLoading() {
  return (
    <div id="projects" className="section-shell py-10 md:py-14" aria-busy="true" aria-label="Loading projects">
      <div className="max-w-3xl">
        <SkeletonLine className="h-3 w-24 bg-brass/20" />
        <SkeletonLine className="mt-5 h-14 w-full max-w-2xl" />
        <SkeletonLine className="mt-3 h-14 w-4/5 max-w-xl" />
        <div className="mt-5 max-w-2xl space-y-3">
          <SkeletonLine className="h-3 w-full" />
          <SkeletonLine className="h-3 w-11/12" />
          <SkeletonLine className="h-3 w-2/3" />
        </div>
      </div>

      <div className="mt-10 space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProjectCardSkeleton key={index} index={index} />
        ))}
      </div>
    </div>
  );
}

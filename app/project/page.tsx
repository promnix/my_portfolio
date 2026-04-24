import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectPage() {
  return (
    <div className="section-shell py-10 md:py-14">
      <div className="max-w-3xl">
        <p className="eyebrow text-xs text-brass">Projects</p>
        <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
          A dedicated portfolio page, matching the reference site’s rhythm.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-silver md:text-base">
          Each project block is structured for fast scanning now, while leaving room for screenshots, live links, and deeper case study copy later.
        </p>
      </div>

      <div className="mt-10 space-y-5">
        {featuredProjects.map((project, index) => (
          <article
            id={project.slug}
            key={project.slug}
            className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-[0.14fr_0.86fr]">
              <div className="text-sm text-silver">
                <p>{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2">{project.year}</p>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow text-[0.68rem] text-brass">{project.accent}</span>
                  <span className="text-xs text-silver">{project.kind}</span>
                </div>
                <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
                  <div>
                    <h2 className="font-display text-4xl md:text-5xl">{project.title}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-8 text-silver md:text-base">
                      {project.summary}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                    <p className="text-xs text-silver">Stack</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver">
                          {item}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/#contact"
                      className="mt-6 inline-flex items-center gap-2 text-sm text-brass transition hover:text-cream"
                    >
                      Replace with live project URL
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

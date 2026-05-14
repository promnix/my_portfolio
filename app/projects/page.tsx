import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { getProjectSchema } from "@/lib/json-ld/json-ld";

// ======= Metadata ===================//
export const metadata: Metadata = {
  title: "Projects | Edwin Promise",
  description:
    "Explore selected websites, MVPs, and digital products built by Edwin Promise, focused on clarity, performance, SEO, and business results.",
  alternates: {
    canonical: "/projectss",
  },
  openGraph: {
    title: "Projects | Edwin Promise",
    description:
      "Selected websites, MVPs, and digital products built with clean design, reliable development, and product thinking.",
    url: "/projectss",
    siteName: "Edwin Promise",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Projects by Edwin Promise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Edwin Promise",
    description:
      "Selected websites, MVPs, and digital products by Edwin Promise.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function getProjectYear(project: IProject) {
  return project._createdAt ? new Date(project._createdAt).getFullYear().toString() : "";
}

// ======= Get schema ===================//
const jsonLd = getProjectSchema()

export default async function ProjectPage() {
  const projects: IProject[] = await client.fetch(allProjectsQuery);

  return (
    <>
      <script 
        type="application/json+ld"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div id="projects" className="section-shell py-10 md:py-14">
        <div className="max-w-3xl">
          <p className="eyebrow text-xs text-brass">Projects</p>
          <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
            Selected projects built around real business needs.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-silver md:text-base">
            A mix of personal builds, freelance work, and collaborative company projects showing how I approach user flows, interface design, reliable development, and launch-ready execution.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          {projects.map((project, index) => (
            <article
              id={project.slug}
              key={project.slug}
              className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8"
            >
              <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-stretch">
                <div className="min-w-0">
                  <div className="flex flex-col gap-x-5 gap-y-3 text-sm text-silver">
                    <span className="text-5xl text-brass">{String(index + 1).padStart(2, "0")}</span>
                    {getProjectYear(project) ? <span>{getProjectYear(project)}</span> : null}
                  </div>

                  <div className="mt-5">
                    {project.projectType ? (
                      <span className="eyebrow text-[0.68rem] text-brass">{project.projectType}</span>
                    ) : null}
                    {project.projectLabel ? <span className="ml-2 text-xs text-silver">{project.projectLabel}</span> : null}
                    <h2 className="max-w-3xl font-display text-4xl md:text-5xl">{project.title}</h2>
                    <p className="hyphens-auto mt-4 max-w-2xl text-sm leading-8 text-silver md:text-base">
                      {project.summary}
                    </p>

                    <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
                      <p className="text-xs text-silver">Stack</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack?.map((item) => (
                          <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-brass/40!important bg-brass!important px-4 py-2 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5 hover:bg-cream hover:text-charcoal! focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
                        >
                          View project
                          <ArrowUpRight size={14} />
                        </Link>
                        <Link
                          href="/#contact"
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-silver transition hover:-translate-y-0.5 hover:border-brass/50 hover:bg-white/[0.04] hover:text-cream focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
                        >
                          Discuss a similar build
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-64 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[rgba(255,255,255,0.04)] lg:min-h-full">
                  {project.coverImage?.asset ? (
                    <Image
                      src={urlFor(project.coverImage).width(880).height(1040).fit("crop").url()}
                      alt={project.coverImage.alt || project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 384px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-64 flex-col justify-between bg-[linear-gradient(145deg,rgba(214,161,74,0.22),rgba(102,169,255,0.12)_48%,rgba(255,255,255,0.04))] p-6">
                      <span className="text-xs uppercase tracking-[0.24em] text-brass">Project</span>
                      <span className="font-display text-5xl text-cream">{project.title.slice(0, 1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

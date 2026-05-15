import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import portableTextComponents from "@/components/portableText";
import { TrackedLink } from "@/components/tracked-link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { allProjectsQuery, projectBySlugQuery } from "@/sanity/lib/queries";
import { generateProjectJsonLd } from "@/lib/json-ld/project-json-ld";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects: IProject[] = await client.fetch(allProjectsQuery, {}, 
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project: IProject | null = await client.fetch(projectBySlugQuery, { slug }, 
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const title = project.seo?.seoTitle || project.title;
  const description = project.seo?.seoDescription || project.summary || undefined;
  const image = project.seo?.ogImage || project.coverImage;
  const keywords = [
    project.seo?.focusKeyphrase,
    ...(project.seo?.relatedKeyphrases || []),
    ...(project.stack || []),
    project.projectType,
    project.projectLabel,
  ].filter((keyword): keyword is string => Boolean(keyword));

  return {
    title: `${title}`,
    description,
    keywords,
    alternates: {
      canonical: project.seo?.canonicalUrl || `/projects/${project.slug}`,
    },
    robots: {
      index: !project.seo?.noIndex,
      follow: !project.seo?.noIndex,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: image?.asset
        ? [
            {
              url: urlFor(image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: image.alt || project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image?.asset ? [urlFor(image).width(1200).height(630).url()] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project: IProject | null = await client.fetch(projectBySlugQuery, { slug }, 
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!project) {
    notFound();
  }

  // ============== Generate Project Schema ============= //
  const jsonLd = generateProjectJsonLd({ project })

  return (
    <>
    <script 
      type="application/json+ld"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
      <div className="section-shell py-10 md:py-14">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-silver transition hover:text-brass"
        >
          <ArrowLeft size={15} />
          Back to projects
        </Link>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.34fr]">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
              {project.projectType ? (
                <span className="eyebrow text-[0.68rem] text-brass">
                  {project.projectType}
                </span>
              ) : null}
              {project.projectLabel ? <span>{project.projectLabel}</span> : null}
              {project.isFeatured ? <span>Featured</span> : null}
            </div>

            <h1 className="mt-5 max-w-4xl font-display text-5xl text-balance text-cream md:text-6xl">
              {project.title}
            </h1>

            {project.summary ? (
              <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
                {project.summary}
              </p>
            ) : null}
          </div>

          <aside className="section-card rounded-[2.5rem] p-6">
            <p className="eyebrow text-xs text-brass">Project details</p>

            <div className="mt-6 space-y-4">
              {project.projectType ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs text-silver">Type</p>
                  <p className="mt-2 text-sm font-semibold text-cream">
                    {project.projectType}
                  </p>
                </div>
              ) : null}

              {project.projectLabel ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs text-silver">Category</p>
                  <p className="mt-2 text-sm font-semibold text-cream">{project.projectLabel}</p>
                </div>
              ) : null}

              {project.stack?.length ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                  <p className="text-xs text-silver">Stack</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </section>

        {project.coverImage?.asset ? (
          <figure className="mt-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03]">
            <Image
              src={urlFor(project.coverImage).width(1600).height(850).url()}
              alt={project.coverImage.alt || project.title}
              width={1600}
              height={850}
              priority
              className="h-auto w-full object-cover"
            />
          </figure>
        ) : null}

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.78fr_0.22fr]">
          <article className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 sm:rounded-[2.4rem] md:p-8">
            {project.contribution?.length ? (
              <div className="space-y-6">
                <PortableText value={project.contribution} components={portableTextComponents} />
              </div>
            ) : (
              <p className="text-sm leading-8 text-silver md:text-base">
                This case study is being updated in Sanity.
              </p>
            )}
          </article>

          <aside className="h-fit rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 sm:rounded-[2.4rem] lg:sticky lg:top-24">
            <p className="eyebrow text-xs text-brass">Project links</p>

            <div className="mt-5 space-y-4">
              {project.liveUrl ? (
                <TrackedLink
                  href={project.liveUrl}
                  tracking={{ type: "project_visit", location: "project_detail_links", projectTitle: project.title, url: project.liveUrl }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-silver transition hover:border-brass hover:text-brass"
                >
                  View live
                  <ArrowUpRight size={14} />
                </TrackedLink>
              ) : null}

              {project.githubUrl ? (
                <TrackedLink
                  href={project.githubUrl}
                  tracking={{ type: "external_link_click", location: "project_detail_links", label: `${project.title} source`, url: project.githubUrl }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-silver transition hover:border-brass hover:text-brass"
                >
                  View code
                  <ArrowUpRight size={14} />
                </TrackedLink>
              ) : null}

              <TrackedLink
                href="/#contact"
                tracking={{ type: "contact_click", location: "project_detail_links", label: "Discuss a similar build" }}
                className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-silver transition hover:border-brass hover:text-brass"
              >
                Discuss a similar build
                <ArrowUpRight size={14} />
              </TrackedLink>
            </div>

            {project.seo?.relatedKeyphrases?.length ? (
              <div className="mt-6">
                <p className="text-xs text-silver">Related keyphrases</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.seo.relatedKeyphrases.map((keyphrase) => (
                    <span
                      key={keyphrase}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-silver"
                    >
                      {keyphrase}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>
      </div>
    </>
  );
}

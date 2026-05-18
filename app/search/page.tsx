import type { Metadata } from "next";
import { SearchClient } from "@/components/search-client";
import { searchEntries } from "@/lib/site-data";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, allProjectsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [params, posts, projects] = await Promise.all([
    searchParams,
    client.fetch<IPost[]>(allPostsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch<IProject[]>(allProjectsQuery, {}, { next: { revalidate: 60 } }),
  ]);

  const sanityEntries = [
    ...projects.map((project) => ({
      title: project.title,
      href: `/projects/${project.slug}`,
      category: project.projectLabel || project.projectType || "Project",
      body: [
        project.summary,
        project.projectLabel,
        project.projectType,
        project.stack?.join(" "),
      ]
        .filter(Boolean)
        .join(" "),
    })),
    ...posts.map((post) => ({
      title: post.title,
      href: `/blog/${post.slug}`,
      category: post.category,
      body: [post.excerpt, post.topics?.join(" ")].filter(Boolean).join(" "),
    })),
  ];

  const staticEntries = searchEntries.filter(
    (entry) => !entry.href.startsWith("/blog/") && !entry.href.startsWith("/projects#"),
  );

  return (
    <SearchClient
      entries={[...staticEntries, ...sanityEntries]}
      initialQuery={params.q ?? ""}
    />
  );
}

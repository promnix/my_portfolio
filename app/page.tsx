import { PortfolioHome } from "@/components/portfolio-home";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, allProjectsQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    client.fetch<IProject[]>(allProjectsQuery),
    client.fetch<IPost[]>(allPostsQuery),
  ]);

  return <PortfolioHome projects={projects} posts={posts} />;
}

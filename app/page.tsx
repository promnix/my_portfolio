import { Suspense } from "react";
import { HomeBlogSection, HomeProjectSection, PortfolioHome } from "@/components/portfolio-home";
import { getHomeSchema } from "@/lib/json-ld/json-ld";
import { siteConfig } from "@/lib/site-data";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, allProjectsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";


export const revalidate = 60

const homeMetaDescription =
  "Fast, SEO-ready business websites and MVPs built with Next.js and WordPress. Edwin Promise helps small businesses and founders launch, convert, and compete online.";

// home page metadata
export const metadata: Metadata = {
  title: "Edwin Promise | Web Developer for Business Websites & MVPs",
  description: homeMetaDescription,
  keywords: [
    "Edwin Promise",
    "web developer in Nigeria",
    "freelance web developer",
    "business website developer",
    "SEO-ready websites",
    "Next.js developer",
    "WordPress developer",
    "MVP developer",
    "website designer for businesses",
    "portfolio website developer",
    "Go developer",
    "Laravel developer"
  ],
  authors: [{ name: "Edwin Promise" }],
  creator: "Edwin Promise",
  publisher: "Edwin Promise",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Edwin Promise | Fast, Modern Websites for Businesses",
    description: homeMetaDescription,
    url: siteConfig.url,
    siteName: "Edwin Promise",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Edwin Promise - Web Developer for Business Websites and MVPs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edwin Promise | Web Developer for Business Websites & MVPs",
    description: homeMetaDescription,
    images: ["/images/homepage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
} 


// get the home page schema
const jsonLd = getHomeSchema()

async function DeferredProjectSection({ projectsPromise }: { projectsPromise: Promise<IProject[]> }) {
  const projects = await projectsPromise;

  return <HomeProjectSection projects={projects} />;
}

async function DeferredBlogSection({ postsPromise }: { postsPromise: Promise<IPost[]> }) {
  const posts = await postsPromise;

  return <HomeBlogSection posts={posts} />;
}

function SectionFallback({ label }: { label: string }) {
  return (
    <section className="section-shell py-10 md:py-14" aria-label={label}>
      <div className="h-40 rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)]" />
    </section>
  );
}

export default function Home() {
  const projectsPromise = client.fetch<IProject[]>(allProjectsQuery, {}, {
    next: {
      revalidate: 60,
      tags: ["projects"],
    },
  });

  const postsPromise = client.fetch<IPost[]>(allPostsQuery, {}, {
    next: {
      revalidate: 60,
      tags: ["posts"],
    },
  });

  return(
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }} 
      />
      <PortfolioHome
        projectSection={
          <Suspense fallback={<SectionFallback label="Loading selected projects" />}>
            <DeferredProjectSection projectsPromise={projectsPromise} />
          </Suspense>
        }
        blogSection={
          <Suspense fallback={<SectionFallback label="Loading latest articles" />}>
            <DeferredBlogSection postsPromise={postsPromise} />
          </Suspense>
        }
      />
    </>
  )
}

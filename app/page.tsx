import { PortfolioHome } from "@/components/portfolio-home";
import { getHomeschema } from "@/lib/json-ld/json-ld";
import { siteConfig } from "@/lib/site-data";
import { client } from "@/sanity/lib/client";
import { allPostsQuery, allProjectsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";

// home page metadata
export const metadata: Metadata = {
  title: "Edwin Promise | Web Developer for Business Websites & MVPs",
  description: "Edwin Promise designs and builds fast, responsive, SEO-ready websites and MVPs for businesses, founders, and startups that want to look credible and convert visitors.",
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
    description:
      "I design and build fast, responsive, SEO-ready websites that help businesses look credible, build trust, and convert visitors into customers.",
    url: siteConfig.url,
    siteName: "Edwin Promise",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Edwin Promise - Web Developer for Business Websites and MVPs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edwin Promise | Web Developer for Business Websites & MVPs",
    description:
      "Fast, responsive, SEO-ready websites and MVPs for businesses, founders, and startups.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
} 

// get the home page schema
const jsonLd = getHomeschema()

export default async function Home() {
  const [projects, posts] = await Promise.all([
    client.fetch<IProject[]>(allProjectsQuery),
    client.fetch<IPost[]>(allPostsQuery),
  ]);

  return(
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }} 
      />
      <PortfolioHome projects={projects} posts={posts} />
    </>
  )
}

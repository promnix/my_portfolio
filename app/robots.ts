import { siteConfig } from "@/lib/site-data";
import { sitemapPath } from "@/lib/sitemap";
import type { MetadataRoute } from "next";

const siteUrl = siteConfig.url.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/search/"],
    },
    sitemap: `${siteUrl}${sitemapPath}`,
  };
}

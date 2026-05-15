import { siteConfig } from "@/lib/site-data";
import type { MetadataRoute } from "next";

const siteUrl = siteConfig.url;

export default function robots(): MetadataRoute.Robots {
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/search"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
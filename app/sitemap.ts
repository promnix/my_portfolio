import { getSitemapEntries, sitemapRevalidate } from "@/lib/sitemap";
import type { MetadataRoute } from "next";

export const revalidate = sitemapRevalidate;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return getSitemapEntries();
}

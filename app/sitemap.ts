import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { services, siteConfig } from "@/lib/site-data";

export const revalidate = 86400;

const siteUrl = siteConfig.url.replace(/\/$/, "");

type SitemapPost = {
    slug: string;
    publishedAt?: string;
    updatedAt?: string;
    _updatedAt?: string;
};

type SitemapProject = {
    slug: string;
    _createdAt?: string;
    _updatedAt?: string;
};

const sitemapBlogPostsQuery = defineQuery(`
    *[_type == "blogPost" && defined(slug.current) && (!defined(seo.noIndex) || seo.noIndex != true)] {
        "slug": slug.current,
        publishedAt,
        updatedAt,
        _updatedAt
    }
`);

const sitemapProjectsQuery = defineQuery(`
    *[_type == "project" && defined(slug.current) && (!defined(seo.noIndex) || seo.noIndex != true)] {
        "slug": slug.current,
        _createdAt,
        _updatedAt
    }
`);

function formatDate(date?: string | Date): Date {
    const parsedDate = date ? new Date(date) : new Date();

    if (Number.isNaN(parsedDate.getTime())) {
        return new Date();
    }

    return parsedDate;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, projects] = await Promise.all([
        client.fetch<SitemapPost[]>(sitemapBlogPostsQuery, {}, {
            next: { revalidate: 86400 },
        }),
        client.fetch<SitemapProject[]>(sitemapProjectsQuery, {}, {
            next: { revalidate: 86400 },
        }),
    ]);

    const today = formatDate();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${siteUrl}/services`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/projects`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${siteUrl}/blog`,
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
        url: `${siteUrl}/services/${service.slug}`,
        lastModified: today,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: formatDate(post.updatedAt || post._updatedAt || post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${siteUrl}/projects/${project.slug}`,
        lastModified: formatDate(project._updatedAt || project._createdAt),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}

import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "../site-data";

interface ProjectJsonLdProps {
    project: IProject;
}

const BASE_URL = siteConfig.url.replace(/\/$/, "")
const PERSON_ID = `${BASE_URL}/#person`
const WEBSITE_ID = `${BASE_URL}/#website`

// Maps known stack tools to their schema.org SoftwareApplication / Thing type
// Extend as you add more stack items in Sanity
const TECH_URLS: Record<string, string> = {
    "Next.js": "https://nextjs.org",
    "React": "https://reactjs.org",
    "TypeScript": "https://www.typescriptlang.org",
    "Tailwind CSS": "https://tailwindcss.com",
    "Laravel": "https://laravel.com",
    "PHP": "https://www.php.net",
    "Go": "https://go.dev",
    "MySQL": "https://www.mysql.com",
    "Supabase": "https://supabase.com",
    "WordPress": "https://wordpress.org",
    "Elementor": "https://elementor.com",
    "WooCommerce": "https://woocommerce.com",
    "Yoast SEO": "https://yoast.com",
    "Motion": "https://motion.dev",
}

export function generateProjectJsonLd({ project }: ProjectJsonLdProps) {
    const image = project.seo?.ogImage || project.coverImage;
    const pageUrl = `${BASE_URL}/projects/${project.slug}`;
    const title = project.seo?.seoTitle || project.title;
    const description =
        project.seo?.seoDescription ||
        project.summary ||
        `Read about ${project.title}, a project by Edwin Promise.`;

    const imageUrl = image?.asset
        ? urlFor(image).width(1200).height(630).url()
        : `${BASE_URL}/og-image.jpg`;

    const keywords = [
        project.seo?.focusKeyphrase,
        ...(project.seo?.relatedKeyphrases || []),
        ...(project.stack || []),
        project.projectType,
        project.projectLabel,
    ].filter(Boolean) as string[];

    // Build typed SoftwareApplication nodes for each stack item
    const techStack = (project.stack || []).map((tech: string) => ({
        "@type": "SoftwareApplication",
        name: tech,
        applicationCategory: "DeveloperApplication",
        ...(TECH_URLS[tech] && { url: TECH_URLS[tech] }),
    }))

    return {
        "@context": "https://schema.org",
        "@graph": [
            // ── Person ref ──
            {
                "@type": "Person",
                "@id": PERSON_ID,
                name: "Edwin Promise",
                url: BASE_URL,
                sameAs: [
                    "https://www.linkedin.com/in/edwin-promise-a73b822b6",
                    "https://github.com/promnix",
                    "https://x.com/promnix",
                    "https://www.instagram.com/promnix10",
                    "https://www.tiktok.com/@promnix",
                ],
            },

            // ── WebSite ref ──
            {
                "@type": "WebSite",
                "@id": WEBSITE_ID,
                url: BASE_URL,
                name: "Edwin Promise",
            },

            // ── WebPage ──
            {
                "@type": "WebPage",
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: title,
                description,
                inLanguage: "en",
                datePublished: project._createdAt,
                dateModified: project._updatedAt || project._createdAt,
                isPartOf: { "@id": WEBSITE_ID },
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                },
                breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
                mainEntity: { "@id": `${pageUrl}#project` },
            },

            // ── CreativeWork (the project itself) ──
            {
                "@type": "CreativeWork",
                "@id": `${pageUrl}#project`,
                name: project.title,
                headline: title,
                description,
                url: pageUrl,
                image: {
                    "@type": "ImageObject",
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                },
                creator: {
                    "@type": "Person",
                    "@id": PERSON_ID,
                    name: "Edwin Promise",
                    url: BASE_URL,
                },
                author: {
                    "@type": "Person",
                    "@id": PERSON_ID,
                    name: "Edwin Promise",
                    url: BASE_URL,
                },
                publisher: {
                    "@type": "Person",
                    "@id": PERSON_ID,
                    name: "Edwin Promise",
                    url: BASE_URL,
                },
                dateCreated: project._createdAt,
                dateModified: project._updatedAt || project._createdAt,
                mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
                isPartOf: { "@id": `${BASE_URL}/projects#collectionpage` },
                inLanguage: "en",
                keywords: keywords.length ? keywords.join(", ") : undefined,

                // Project type and label as typed Thing nodes
                about: [
                    project.projectType && {
                        "@type": "Thing",
                        name: project.projectType,
                    },
                    project.projectLabel && {
                        "@type": "Thing",
                        name: project.projectLabel,
                    },
                ].filter(Boolean),

                // Typed SoftwareApplication nodes instead of a raw string array
                ...(techStack.length && {
                    hasPart: techStack,
                }),

                // GitHub repo if available
                ...(project.githubUrl && {
                    codeRepository: project.githubUrl,
                }),

                // Live site as a workExample WebSite node
                ...(project.liveUrl && {
                    workExample: {
                        "@type": "WebSite",
                        name: project.title,
                        url: project.liveUrl,
                        description: description,
                    },
                }),

                // Offer to build similar — connects the project back to the service
                offers: {
                    "@type": "Offer",
                    description: `Interested in a similar build? Edwin Promise is available for ${project.projectType || "web development"} projects.`,
                    seller: { "@id": PERSON_ID },
                    url: `${BASE_URL}/#contact`,
                },
            },

            // ── BreadcrumbList ──
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: BASE_URL,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Projects",
                        item: `${BASE_URL}/projects`,
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        name: project.title,
                        item: pageUrl,
                    },
                ],
            },
        ],
    };
}

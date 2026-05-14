import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "../site-data";

interface ProjectJsonLdProps {
    project: IProject;
}

export function generateProjectJsonLd({ project }: ProjectJsonLdProps) {

    const image = project.seo?.ogImage || project.coverImage;
    const pageUrl = `${siteConfig.url}/projects/${project.slug}`;
    const title = project.seo?.seoTitle || project.title;
    const description =
        project.seo?.seoDescription || 
        project.summary || 
        `Read about ${project.title}, a project by Edwin Promise.`;
    const keywords = [
        project.seo?.focusKeyphrase,
        ...(project.seo?.relatedKeyphrases || []),
        ...(project.stack || []),
        project.projectType,
        project.projectLabel,
        ].filter(Boolean);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: title,
            description,
            inLanguage: "en",
            datePublished: project._createdAt,
            dateModified: project._updatedAt || project._createdAt,
            breadcrumb: {
                "@id": `${pageUrl}#breadcrumb`,
            },
            mainEntity: {
                "@id": `${pageUrl}#project`,
            },
            },
            {
            "@type": "CreativeWork",
            "@id": `${pageUrl}#project`,
            name: project.title,
            headline: title,
            description,
            image: image?.asset
                ? urlFor(image).width(1200).height(630).url()
                : `${siteConfig.url}/og-image.jpg`,
            creator: {
                "@type": "Person",
                "@id": `${siteConfig.url}#person`,
                name: "Edwin Promise",
                url: siteConfig.url,
            },
            author: {
                "@type": "Person",
                "@id": `${siteConfig.url}#person`,
                name: "Edwin Promise",
                url: siteConfig.url,
            },
            publisher: {
                "@type": "Person",
                "@id": `${siteConfig.url}#person`,
                name: "Edwin Promise",
                url: siteConfig.url,
            },
            dateCreated: project._createdAt,
            dateModified: project._updatedAt || project._createdAt,
            mainEntityOfPage: {
                "@id": `${pageUrl}#webpage`,
            },
            keywords: keywords.length ? keywords.join(", ") : undefined,
            about: [
                project.projectType,
                project.projectLabel,
                ...(project.stack || []),
            ].filter(Boolean),
            programmingLanguage: project.stack?.length ? project.stack : undefined,
            codeRepository: project.githubUrl || undefined,
            url: pageUrl,
            workExample: project.liveUrl
                ? {
                    "@type": "WebSite",
                    name: project.title,
                    url: project.liveUrl,
                }
                : undefined,
            },
            {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
                {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteConfig.url,
                },
                {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: `${siteConfig.url}/projects`,
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
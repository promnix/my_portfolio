import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "../site-data";

interface BlogPostJsonLdProps {
    post: IPost;
}

const BASE_URL = siteConfig.url.replace(/\/$/, "")
const PERSON_ID = `${BASE_URL}/#person`
const WEBSITE_ID = `${BASE_URL}/#website`

function getReadingTimeMinutes(readingTime?: string) {
    if (!readingTime) return undefined;

    const minutes = Number.parseInt(readingTime, 10);

    return Number.isFinite(minutes) && minutes > 0 ? minutes : undefined;
}

export function generateBlogPostJsonLd({ post }: BlogPostJsonLdProps) {
    const pageUrl = `${BASE_URL}/blog/${post.slug}`;
    const title = post.seo?.seoTitle || post.title;
    const description = post.seo?.seoDescription || post.excerpt;
    const image = post.seo?.ogImage || post.coverImage;
    const imageUrl = image?.asset
        ? urlFor(image).width(1200).height(630).url()
        : `${BASE_URL}/og-image.jpg`;

    const faqs = post.faqs?.filter(
        (faq): faq is BlogFaq & { question: string; answerText: string } =>
            Boolean(faq.question && faq.answerText),
    );

    const readingTimeMinutes = getReadingTimeMinutes(post.readingTime);
    const wordCount = readingTimeMinutes
        ? readingTimeMinutes * 200
        : undefined;

    const graph: Record<string, unknown>[] = [
        // ── Person node (lightweight ref — full node lives on home/about) ──
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
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            isPartOf: { "@id": WEBSITE_ID },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: imageUrl,
                width: 1200,
                height: 630,
            },
            breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
            mainEntity: { "@id": `${pageUrl}#article` },
        },

        // ── Article / BlogPosting ──
        {
            "@type": ["Article", "BlogPosting"],
            "@id": `${pageUrl}#article`,
            headline: post.title,
            name: title,
            description,
            url: pageUrl,
            image: {
                "@type": "ImageObject",
                url: imageUrl,
                width: 1200,
                height: 630,
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
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
            mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
            isPartOf: { "@id": `${BASE_URL}/blog#blog` },
            inLanguage: "en",
            keywords: post.topics?.join(", "),
            articleSection: post.category,
            // Reading time as timeRequired in ISO 8601 duration (PT5M = 5 minutes)
            ...(readingTimeMinutes && {
                timeRequired: `PT${readingTimeMinutes}M`,
            }),
            ...(wordCount && { wordCount }),
            // If post has a cover image with alt text, surface it
            ...(image?.asset && {
                thumbnailUrl: urlFor(image).width(600).height(315).url(),
            }),
            // Explicit mentions of linked resources crawled from the article
            mentions: [
                post.topics?.map((topic: string) => ({
                    "@type": "Thing",
                    name: topic,
                })),
            ]
                .flat()
                .filter(Boolean),
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
                    name: "Blog",
                    item: `${BASE_URL}/blog`,
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: post.title,
                    item: pageUrl,
                },
            ],
        },
    ];

    // ── FAQPage (only injected when FAQs exist) ──
    if (faqs?.length) {
        graph.push({
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            // FAQPage should be linked back to the article
            mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answerText,
                    // If your Sanity FAQ has a URL field you can add:
                    // url: `${pageUrl}#faq`,
                },
            })),
        });

        // Also link the FAQPage from the WebPage node
        const webPageNode = graph.find(
            (node) => node["@id"] === `${pageUrl}#webpage`,
        ) as Record<string, unknown> | undefined;

        if (webPageNode) {
            webPageNode["speakable"] = {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", "h2", ".article-summary"],
            };
        }
    }

    // ── SpeakableSpecification (for voice search / Google Assistant) ──
    const articleNode = graph.find(
        (node) => node["@id"] === `${pageUrl}#article`,
    ) as Record<string, unknown> | undefined;

    if (articleNode) {
        articleNode["speakable"] = {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", ".article-excerpt", ".article-summary"],
        };
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}

import { services, siteConfig, socials, type Service } from "../site-data"
import { urlFor } from "@/sanity/lib/image"

const BASE_URL = siteConfig.url.replace(/\/$/, "")

const PERSON_ID = `${BASE_URL}/#person`
const WEBSITE_ID = `${BASE_URL}/#website`
const SERVICE_ID = `${BASE_URL}/#service`

const REAL_SOCIALS = socials.map((social) => social.href)
const CONTACT_EMAIL = "promnix10@gmail.com"
const CONTACT_TELEPHONE = "+2347058149298"
const CONTACT_ADDRESS = {
    "@type": "PostalAddress",
    streetAddress: "1 Bankole Street, off Johnson Bus Stop, Ijeshatedo",
    addressLocality: "Lagos",
    addressCountry: "NG",
}

// ─── Shared nodes reused across pages ────────────────────────────────────────

const personNode = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Edwin Promise",
    alternateName: "Promise",
    url: BASE_URL,
    email: CONTACT_EMAIL,
    image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/aboutpage.jpg`,
        width: 1200,
        height: 630,
    },
    jobTitle: "Full-Stack Developer",
    description:
        "Edwin Promise is a full-stack developer based in Lagos, Nigeria, focused on helping founders, startups, and small businesses turn ideas into fast, responsive, SEO-ready websites, MVPs, and digital products.",
    address: CONTACT_ADDRESS,
    knowsAbout: [
        "Web Development",
        "Full-Stack Development",
        "Frontend Development",
        "Backend Development",
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
        "Laravel",
        "PHP",
        "Go",
        "REST APIs",
        "MySQL",
        "Supabase",
        "WordPress",
        "Elementor",
        "WooCommerce",
        "Yoast SEO",
        "SEO",
        "Website Performance Optimization",
        "MVP Development",
        "Product Thinking",
        "Cloud Computing",
        "DevOps",
        "Responsive Design",
    ],
    hasOccupation: {
        "@type": "Occupation",
        name: "Full-Stack Developer",
        description:
            "Builds fast, modern websites, MVPs, and digital products for founders, startups, and small businesses.",
        occupationLocation: {
            "@type": "Country",
            name: "Nigeria",
        },
        skills: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Motion",
            "Laravel",
            "PHP",
            "Go",
            "REST APIs",
            "MySQL",
            "Supabase",
            "WordPress",
            "Elementor",
            "WooCommerce",
            "Yoast SEO",
            "SEO",
            "Performance Optimization",
            "DevOps",
        ],
    },
    sameAs: REAL_SOCIALS,
}

const websiteNode = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE_URL,
    name: "Edwin Promise",
    alternateName: "Build With Promise",
    description:
        "Portfolio of Edwin Promise, a full-stack developer building fast, modern websites and MVPs for businesses, founders, and startups.",
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    inLanguage: "en",
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
    },
}

const serviceNode = {
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: "Edwin Promise – Web Development Services",
    url: BASE_URL,
    image: `${BASE_URL}/images/homepage.jpg`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_TELEPHONE,
    address: CONTACT_ADDRESS,
    description:
        "Fast, responsive, SEO-ready website design and development for businesses, founders, and startups. Services include website design, full-stack development, WordPress builds, MVP development, and SEO optimization.",
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "Customer Support",
        availableLanguage: "English",
        telephone: CONTACT_TELEPHONE,
    },
    areaServed: [
        { "@type": "Country", name: "Nigeria" },
        { "@type": "Place", name: "Worldwide" },
    ],
    serviceType: [
        "Website Design",
        "Website Development",
        "Full-Stack Development",
        "SEO Website Optimization",
        "WordPress Website Development",
        "MVP Development",
        "Frontend Development",
        "Performance Optimization",
    ],
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: services.map(getServiceOffer),
    },
    sameAs: REAL_SOCIALS,
}

function getServiceOffer(service: Service) {
    return {
        "@type": "Offer",
        url: `${BASE_URL}/services/${service.slug}`,
        priceSpecification: service.investment
            ? {
                "@type": "PriceSpecification",
                priceCurrency: "USD",
                description: `Starting from ${service.investment.startingFrom}. ${service.investment.note}`,
            }
            : undefined,
        itemOffered: {
            "@type": "Service",
            "@id": `${BASE_URL}/services/${service.slug}#service`,
            name: service.title,
            description: service.summary,
            provider: { "@id": PERSON_ID },
            serviceType: service.shortTitle,
            areaServed: [
                { "@type": "Country", name: "Nigeria" },
                { "@type": "Place", name: "Worldwide" },
            ],
        },
    }
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export const getHomeSchema = () => {
    return {
        "@context": "https://schema.org",
        "@graph": [
            personNode,
            websiteNode,
            serviceNode,
            {
                "@type": "WebPage",
                "@id": `${BASE_URL}/#webpage`,
                url: BASE_URL,
                name: "Edwin Promise | Web Developer for Business Websites & MVPs",
                description:
                    "Edwin Promise designs and builds fast, responsive, SEO-ready websites and MVPs for businesses, founders, and startups that want to look credible and convert visitors.",
                isPartOf: { "@id": WEBSITE_ID },
                about: { "@id": PERSON_ID },
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: `${BASE_URL}/images/homepage.jpg`,
                    width: 1200,
                    height: 630,
                },
                mainEntity: { "@id": SERVICE_ID },
                inLanguage: "en",
                breadcrumb: {
                    "@type": "BreadcrumbList",
                    "@id": `${BASE_URL}/#breadcrumb`,
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Home",
                            item: BASE_URL,
                        },
                    ],
                },
            },
        ],
    }
}

// ─── About Page ───────────────────────────────────────────────────────────────

export const getAboutSchema = () => {
    const pageUrl = `${BASE_URL}/about`

    return {
        "@context": "https://schema.org",
        "@graph": [
            personNode,
            websiteNode,
            {
                "@type": "ProfilePage",
                "@id": `${pageUrl}#profilepage`,
                url: pageUrl,
                name: "About Edwin Promise | Full-Stack Web Developer",
                headline:
                    "Building digital products with clarity, purpose, and reliable execution.",
                description:
                    "Learn about Edwin Promise, a full-stack developer building fast websites, MVPs, and digital products for founders, startups, and businesses based in Lagos, Nigeria.",
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: `${BASE_URL}/images/aboutpage.jpg`,
                    width: 1200,
                    height: 630,
                },
                isPartOf: { "@id": WEBSITE_ID },
                about: { "@id": PERSON_ID },
                mainEntity: { "@id": PERSON_ID },
                inLanguage: "en",
                breadcrumb: {
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
                            name: "About",
                            item: pageUrl,
                        },
                    ],
                },
            },
        ],
    }
}

// ─── Projects Page ────────────────────────────────────────────────────────────

export const getProjectsSchema = () => {
    const pageUrl = `${BASE_URL}/projects`

    return {
        "@context": "https://schema.org",
        "@graph": [
            personNode,
            websiteNode,
            {
                "@type": "CollectionPage",
                "@id": `${pageUrl}#collectionpage`,
                url: pageUrl,
                name: "Projects | Edwin Promise",
                headline: "Selected projects built around real business needs.",
                description:
                    "A collection of websites, MVPs, and digital products built by Edwin Promise — covering personal builds, freelance work, and collaborative company projects.",
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: `${BASE_URL}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                },
                isPartOf: { "@id": WEBSITE_ID },
                about: { "@id": PERSON_ID },
                author: { "@id": PERSON_ID },
                inLanguage: "en",
                hasPart: [
                    {
                        "@type": "WebSite",
                        "@id": `${pageUrl}/freshly-folded-laundry-website#project`,
                        url: `${pageUrl}/freshly-folded-laundry-website`,
                        name: "Freshly Folded",
                        description:
                            "A San Diego laundry pickup and delivery website for a family-owned business offering wash and fold, dry cleaning, pressing, wedding gown care, and commercial laundry services. Edwin built pages, managed SEO content, and optimised performance.",
                        author: { "@id": PERSON_ID },
                        keywords:
                            "WordPress, Elementor, Yoast SEO, Performance Optimization, Responsive Design, Content Management",
                        inLanguage: "en",
                    },
                    {
                        "@type": "WebSite",
                        "@id": `${pageUrl}/build-with-promise-portfolio#project`,
                        url: `${pageUrl}/build-with-promise-portfolio`,
                        name: "Build With Promise",
                        description:
                            "Edwin's personal portfolio and service website built with Next.js, TypeScript, and Tailwind CSS to present his work, skills, projects, blog content, and availability.",
                        author: { "@id": PERSON_ID },
                        keywords:
                            "Next.js, TypeScript, Tailwind CSS, Responsive Design, SEO",
                        inLanguage: "en",
                    },
                    {
                        "@type": "WebSite",
                        "@id": `${pageUrl}/scarsdale-solicitors-website#project`,
                        url: `${pageUrl}/scarsdale-solicitors-website`,
                        name: "Scarsdale Solicitors",
                        description:
                            "A UK law firm website for a Rochdale-based legal practice serving clients across England and Wales. Edwin built pages, managed SEO content, and improved performance and page structure.",
                        author: { "@id": PERSON_ID },
                        keywords:
                            "WordPress, Elementor, Yoast SEO, Performance Optimization, Responsive Design, SEO",
                        inLanguage: "en",
                    },
                    {
                        "@type": "WebPage",
                        "@id": `${pageUrl}/twist-design-agency-landing-page#project`,
                        url: `${pageUrl}/twist-design-agency-landing-page`,
                        name: "Twist",
                        description:
                            "A modern design agency landing page built to present a subscription-based design service, covering offer, services, pricing, testimonials, and FAQs in a conversion-focused layout.",
                        author: { "@id": PERSON_ID },
                        keywords:
                            "HTML, CSS, JavaScript, Responsive Design",
                        inLanguage: "en",
                    },
                ],
                breadcrumb: {
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
                            item: pageUrl,
                        },
                    ],
                },
            },
        ],
    }
}

// ─── Services Page ───────────────────────────────────────────────────────────

export const getServicesSchema = () => {
    const pageUrl = `${BASE_URL}/services`

    return {
        "@context": "https://schema.org",
        "@graph": [
            personNode,
            websiteNode,
            serviceNode,
            {
                "@type": "CollectionPage",
                "@id": `${pageUrl}#collectionpage`,
                url: pageUrl,
                name: "Services | Edwin Promise",
                headline: "Services for websites, landing pages, MVPs, and WordPress builds.",
                description:
                    "Explore web development services from Edwin Promise, including business websites, landing pages, MVP development, and WordPress website development.",
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: `${BASE_URL}/images/homepage.jpg`,
                    width: 1200,
                    height: 630,
                },
                isPartOf: { "@id": WEBSITE_ID },
                about: { "@id": SERVICE_ID },
                author: { "@id": PERSON_ID },
                inLanguage: "en",
                hasPart: services.map((service) => ({
                    "@type": "Service",
                    "@id": `${pageUrl}/${service.slug}#service`,
                    url: `${pageUrl}/${service.slug}`,
                    name: service.title,
                    description: service.summary,
                    provider: { "@id": PERSON_ID },
                    serviceType: service.shortTitle,
                    areaServed: [
                        { "@type": "Country", name: "Nigeria" },
                        { "@type": "Place", name: "Worldwide" },
                    ],
                    keywords: service.seoKeywords.join(", "),
                })),
                breadcrumb: {
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
                            name: "Services",
                            item: pageUrl,
                        },
                    ],
                },
            },
        ],
    }
}

export const getServiceSchema = (service: Service) => {
    const pageUrl = `${BASE_URL}/services/${service.slug}`
    const faqNode = service.faqs.length
        ? {
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            url: `${pageUrl}#faq`,
            mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        }
        : null

    return {
        "@context": "https://schema.org",
        "@graph": [
            personNode,
            websiteNode,
            serviceNode,
            {
                "@type": "WebPage",
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: `${service.title} | Edwin Promise`,
                description: service.summary,
                isPartOf: { "@id": WEBSITE_ID },
                about: { "@id": `${pageUrl}#service` },
                mainEntity: { "@id": `${pageUrl}#service` },
                hasPart: faqNode ? [{ "@id": `${pageUrl}#faq` }] : undefined,
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: `${BASE_URL}/images/homepage.jpg`,
                    width: 1200,
                    height: 630,
                },
                inLanguage: "en",
                breadcrumb: {
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
                            name: "Services",
                            item: `${BASE_URL}/services`,
                        },
                        {
                            "@type": "ListItem",
                            position: 3,
                            name: service.title,
                            item: pageUrl,
                        },
                    ],
                },
            },
            {
                "@type": "Service",
                "@id": `${pageUrl}#service`,
                url: pageUrl,
                name: service.title,
                alternateName: service.shortTitle,
                description: service.description,
                provider: { "@id": PERSON_ID },
                broker: { "@id": PERSON_ID },
                serviceType: service.shortTitle,
                keywords: service.seoKeywords.join(", "),
                image: `${BASE_URL}/images/homepage.jpg`,
                areaServed: [
                    { "@type": "Country", name: "Nigeria" },
                    { "@type": "Place", name: "Worldwide" },
                ],
                audience: {
                    "@type": "Audience",
                    audienceType: service.audience,
                },
                offers: getServiceOffer(service),
                mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
            },
            ...(faqNode ? [faqNode] : []),
        ],
    }
}

// ─── Blog Page ────────────────────────────────────────────────────────────────

function getBlogPostSchema(posts: IPost[], pageUrl: string) {
    return posts.map((post) => {
        const imageUrl = post.coverImage?.asset
            ? urlFor(post.coverImage).width(1200).height(630).url()
            : `${BASE_URL}/og-image.jpg`

        return {
            "@type": "BlogPosting",
            url: `${BASE_URL}/blog/${post.slug}`,
            name: post.title,
            headline: post.title,
            description: post.excerpt,
            image: {
                "@type": "ImageObject",
                url: imageUrl,
                width: 1200,
                height: 630,
            },
            thumbnailUrl: post.coverImage?.asset
                ? urlFor(post.coverImage).width(600).height(315).url()
                : `${BASE_URL}/og-image.jpg`,
            ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
            ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
            author: { "@id": PERSON_ID },
            publisher: { "@id": PERSON_ID },
            inLanguage: "en",
            ...(post.topics?.length ? { keywords: post.topics.join(", ") } : {}),
            ...(post.category ? { articleSection: post.category } : {}),
            isPartOf: { "@id": `${pageUrl}#blog` },
        }
    })
}

export const getBlogSchema = (posts: IPost[] = []) => {
    const pageUrl = `${BASE_URL}/blog`

    return {
        "@context": "https://schema.org",
        "@graph": [
            personNode,
            websiteNode,
            {
                "@type": "Blog",
                "@id": `${pageUrl}#blog`,
                url: pageUrl,
                name: "Blog | Edwin Promise",
                headline: "Writing that shows how I think, build, and solve problems.",
                description:
                    "Practical notes from Edwin Promise on web development, SEO, performance, product thinking, and lessons from the projects he builds.",
                primaryImageOfPage: {
                    "@type": "ImageObject",
                    url: `${BASE_URL}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                },
                isPartOf: { "@id": WEBSITE_ID },
                author: { "@id": PERSON_ID },
                publisher: { "@id": PERSON_ID },
                inLanguage: "en",
                about: [
                    { "@type": "Thing", name: "Web Development" },
                    { "@type": "Thing", name: "Product Thinking" },
                    { "@type": "Thing", name: "SEO" },
                    { "@type": "Thing", name: "Website Performance" },
                    { "@type": "Thing", name: "MVP Development" },
                ],
                blogPost: getBlogPostSchema(posts, pageUrl),
                breadcrumb: {
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
                            item: pageUrl,
                        },
                    ],
                },
            },
        ],
    }
}

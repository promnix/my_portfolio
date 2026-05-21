// import { siteConfig, socials } from "../site-data"

const BASE_URL = "https://buildwithpromise.vercel.app"

const PERSON_ID = `${BASE_URL}/#person`
const WEBSITE_ID = `${BASE_URL}/#website`
const SERVICE_ID = `${BASE_URL}/#service`

const REAL_SOCIALS = [
    "https://www.linkedin.com/in/edwin-promise-a73b822b6",
    "https://github.com/promnix",
    "https://x.com/promnix",
    "https://www.instagram.com/promnix10",
    "https://www.tiktok.com/@promnix",
]

// ─── Shared nodes reused across pages ────────────────────────────────────────

const personNode = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Edwin Promise",
    alternateName: "Promise",
    url: BASE_URL,
    email: "promnix10@gmail.com",
    image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/aboutpage.jpg`,
        width: 1200,
        height: 630,
    },
    jobTitle: "Full-Stack Developer",
    description:
        "Edwin Promise is a full-stack developer based in Lagos, Nigeria, focused on helping founders, startups, and small businesses turn ideas into fast, responsive, SEO-ready websites, MVPs, and digital products.",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
    },
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
    description:
        "Fast, responsive, SEO-ready website design and development for businesses, founders, and startups. Services include website design, full-stack development, WordPress builds, MVP development, and SEO optimization.",
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    contactPoint: {
        "@type": "ContactPoint",
        email: "promnix10@gmail.com",
        contactType: "Customer Support",
        availableLanguage: "English",
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
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Business Website Design & Development",
                    description:
                        "Fast, responsive, SEO-ready websites for businesses that want to look credible and convert visitors.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "MVP Development",
                    description:
                        "Full-stack MVP builds for founders and startups ready to launch with confidence.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "WordPress Website Development",
                    description:
                        "Custom WordPress builds using Elementor, WooCommerce, and Yoast SEO for business-ready sites.",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "SEO & Performance Optimization",
                    description:
                        "Improving page speed, structure, and SEO signals so your site ranks and converts.",
                },
            },
        ],
    },
    sameAs: REAL_SOCIALS,
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
                "@id": `${pageUrl}/#profilepage`,
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
                    "@id": `${pageUrl}/#breadcrumb`,
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
                "@id": `${pageUrl}/#collectionpage`,
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
                        "@id": `${pageUrl}/freshly-folded-laundry-website/#project`,
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
                        "@id": `${pageUrl}/build-with-promise-portfolio/#project`,
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
                        "@id": `${pageUrl}/scarsdale-solicitors-website/#project`,
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
                        "@id": `${pageUrl}/twist-design-agency-landing-page/#project`,
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
                    "@id": `${pageUrl}/#breadcrumb`,
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

// ─── Blog Page ────────────────────────────────────────────────────────────────

export const getBlogSchema = () => {
    const pageUrl = `${BASE_URL}/blog`

    return {
        "@context": "https://schema.org",
        "@graph": [
            personNode,
            websiteNode,
            {
                "@type": "Blog",
                "@id": `${pageUrl}/#blog`,
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
                // Recent posts — expand this array as you publish more
                blogPost: [
                    {
                        "@type": "BlogPosting",
                        url: `${BASE_URL}/blog/landing-page-for-small-business-ads-how-to-stop-wasting-paid-traffic`,
                        name: "Landing Page for Small Business Ads: How to Stop Wasting Paid Traffic",
                        headline:
                            "Landing Page for Small Business Ads: How to Stop Wasting Paid Traffic",
                        description:
                            "How to plan a landing page for small business ads so paid traffic has a clear offer, strong proof, and one practical next step.",
                        datePublished: "2026-05",
                        author: { "@id": PERSON_ID },
                        publisher: { "@id": PERSON_ID },
                        inLanguage: "en",
                        keywords: "landing pages, paid ads, small business, conversion",
                        isPartOf: { "@id": `${pageUrl}/#blog` },
                    },
                    {
                        "@type": "BlogPosting",
                        url: `${BASE_URL}/blog/affordable-website-for-small-business-what-you-should-pay-for-and-what-can-wait`,
                        name: "Affordable Website for Small Business: What You Should Pay For and What Can Wait",
                        headline:
                            "Affordable Website for Small Business: What You Should Pay For and What Can Wait",
                        description:
                            "A practical guide to planning an affordable website for small business needs without wasting money on features that do not support enquiries.",
                        datePublished: "2026-05",
                        author: { "@id": PERSON_ID },
                        publisher: { "@id": PERSON_ID },
                        inLanguage: "en",
                        keywords:
                            "affordable websites, website planning, small business, website cost",
                        isPartOf: { "@id": `${pageUrl}/#blog` },
                    },
                    {
                        "@type": "BlogPosting",
                        url: `${BASE_URL}/blog/how-to-check-if-your-website-is-optimized`,
                        name: "Is Your Website Any Good? Here's the Simple Free Tool to Check",
                        headline:
                            "Is Your Website Any Good? Here's the Simple Free Tool to Check",
                        description:
                            "How to check if your website is optimized with a free Google tool. Learn what the four scores mean and what to fix first.",
                        datePublished: "2026-05",
                        author: { "@id": PERSON_ID },
                        publisher: { "@id": PERSON_ID },
                        inLanguage: "en",
                        keywords:
                            "PageSpeed, website performance, website optimization, Google tools",
                        isPartOf: { "@id": `${pageUrl}/#blog` },
                    },
                ],
                breadcrumb: {
                    "@type": "BreadcrumbList",
                    "@id": `${pageUrl}/#breadcrumb`,
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
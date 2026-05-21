import { siteConfig, socials } from "../site-data"

//Home page schema
export const getHomeschema = () => {
    const siteUrl = siteConfig.url.replace(/\/$/, "")

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${siteUrl}/#person`,
                name: "Edwin Promise",
                alternateName: "Promise",
                url: siteUrl,
                jobTitle: "Web Developer",
                description:
                    "Edwin Promise designs and builds fast, responsive, SEO-ready websites and MVPs for businesses, founders, and startups.",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lagos",
                    addressCountry: "NG",
                },
                knowsAbout: [
                    "Web Development",
                    "Frontend Development",
                    "Next.js",
                    "React",
                    "WordPress",
                    "SEO",
                    "Website Optimization",
                    "MVP Development",
                    "Business Websites",
                ],
                sameAs: socials.map((social) => social.href),
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                url: siteUrl,
                name: "Edwin Promise",
                alternateName: "Promise Portfolio",
                description:
                    "Portfolio of Edwin Promise, a web developer building fast, modern websites and MVPs for businesses.",
                publisher: {
                    "@id": `${siteUrl}/#person`,
                },
                inLanguage: "en",
            },
            {
                "@type": "ProfessionalService",
                "@id": `${siteUrl}/#service`,
                name: "Edwin Promise Web Development",
                url: siteUrl,
                image: `${siteUrl}/images/homepage.jpg`,
                description:
                    "Fast, responsive, SEO-ready website design and development services for businesses, founders, and startups.",
                founder: {
                    "@id": `${siteUrl}/#person`,
                },
                areaServed: [
                    {
                        "@type": "Country",
                        name: "Nigeria",
                    },
                    {
                        "@type": "Place",
                        name: "Worldwide",
                    },
                ],
                serviceType: [
                    "Website Design",
                    "Website Development",
                    "SEO Website Optimization",
                    "WordPress Website Development",
                    "MVP Development",
                    "Frontend Development",
                ],
            }
        ],
    }
}


// About Page schema
export const getAboutSchema = () => {
    
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://buildwithpromise.vercel.app/#person",
                name: "Edwin Promise",
                alternateName: "Promise",
                url: "https://buildwithpromise.vercel.app",
                jobTitle: "Full-Stack Developer",
                description:
                    "Edwin Promise is a full-stack developer focused on helping founders, startups, and small businesses turn ideas into polished websites, MVPs, and digital products.",
                image: "https://buildwithpromise.vercel.app/og-image.jpg",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lagos",
                    addressCountry: "NG",
                },
                knowsAbout: [
                    "Full-Stack Development",
                    "Frontend Development",
                    "Backend Development",
                    "Web Development",
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
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
                ],
                hasOccupation: {
                    "@type": "Occupation",
                    name: "Full-Stack Developer",
                    description:
                        "Builds fast, modern websites, MVPs, and digital products for founders, startups, and small businesses.",
                    skills: [
                        "Next.js",
                        "React",
                        "TypeScript",
                        "Tailwind CSS",
                        "Laravel",
                        "PHP",
                        "Go",
                        "MySQL",
                        "Supabase",
                        "WordPress",
                        "SEO",
                        "DevOps",
                    ],
                },
                sameAs: socials.map((social) => social.href),
            },
            {
                "@type": "WebSite",
                "@id": "https://buildwithpromise.vercel.app/#website",
                url: "https://buildwithpromise.vercel.app",
                name: "Edwin Promise",
                description:
                    "Portfolio website of Edwin Promise, a full-stack developer building websites, MVPs, and digital products with clarity and purpose.",
                publisher: {
                    "@id": "https://buildwithpromise.vercel.app/#person",
                },
                inLanguage: "en",
            },
            {
                "@type": "AboutPage",
                "@id": "https://buildwithpromise.vercel.app/about/#aboutpage",
                url: "https://buildwithpromise.vercel.app/about",
                name: "About Edwin Promise",
                headline: "Building digital products with clarity, purpose, and reliable execution.",
                description:
                    "Learn more about Edwin Promise, a full-stack developer helping founders, startups, and small businesses build polished websites, MVPs, and digital products.",
                isPartOf: {
                    "@id": "https://buildwithpromise.vercel.app/#website",
                },
                about: {
                    "@id": "https://buildwithpromise.vercel.app/#person",
                },
                mainEntity: {
                    "@id": "https://buildwithpromise.vercel.app/#person",
                },
                inLanguage: "en",
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://buildwithpromise.vercel.app/about/#breadcrumb",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://buildwithpromise.vercel.app",
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "About",
                        item: "https://buildwithpromise.vercel.app/about",
                    },
                ],
            },
        ],
    }
}


//projects main page schema
export const getProjectSchema = () => {
    const pageUrl = `${siteConfig.url}/projects`;

    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}/#collectionpage`,
        url: pageUrl,
        name: "Projects | Edwin Promise",
        description:
            "A collection of selected websites, MVPs, and digital products built by Edwin Promise.",
        isPartOf: {
            "@id": `${siteConfig.url}/#website`,
        },
        about: {
            "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en",
    }
}


//Blog main page
export const getBlogSchema = () => {
    const pageUrl = `${siteConfig.url}/blog`;

    return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${pageUrl}/#blog`,
        url: pageUrl,
        name: "Blog | Edwin Promise",
        description:
            "Practical notes from Edwin Promise on web development, SEO, performance, product thinking, and digital product development.",
        isPartOf: {
            "@id": `${siteConfig.url}/#website`,
        },
        author: {
            "@id": `${siteConfig.url}/#person`,
        },
        publisher: {
            "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en",
    }
}

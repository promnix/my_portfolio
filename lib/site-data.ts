export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  accent: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  excerpt: string;
  pullQuote: string;
  topics: string[];
  intro: string;
  sections: {
    title: string;
    paragraphs: string[];
  }[];
  takeaway: string;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  audience: string;
  timeline: string;
  timelineDetail: {
    typical: string;
    weeks: string[];
    note: string;
  };
  startingPoint: string;
  investment: {
    startingFrom: string;
    note: string;
  };
  outcomes: string[];
  deliverables: string[];
  process: {
    title: string;
    body: string;
  }[];
  fit: {
    good: string[];
    notIdeal: {
      text: string;
      betterServiceSlug?: string;
    }[];
  };
  proofProjects: {
    title: string;
    body: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedInsights?: {
    title: string;
    href: string;
  }[];
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
  relatedSkills: string[];
  seoKeywords: string[];
};

export const siteConfig = {
  name: "Edwin Promise",
  shortName: "PX",
  role: "Fast, modern websites for businesses that want to look credible and convert visitors.",
  url: "https://buildwithpromise.vercel.app",
  description:
    "Edwin Promise helps founders, startups, and small businesses turn ideas into modern websites, MVPs, and digital products that are polished, reliable, and ready to launch.",
  tagline: "Web • Product",
  heroLead:
    "I design and build fast, responsive, SEO-ready websites that make your business easier to trust, find, and contact.",
  heroBody:
    "I combine product thinking, clean interface design, and reliable engineering to build digital experiences that help teams launch faster, improve their online presence, and serve customers better.",
  email: "promnix10@gmail.com",
  contactHref:
    "mailto:promnix10@gmail.com?subject=Project%20Inquiry",
  whatsappHref:
    "https://wa.me/2347058149298?text=Hi%20Promise%2C%20I%27d%20like%20to%20start%20a%20project.",
  location: "Lagos, Nigeria",
  availability: "Available for website projects, MVP builds, and collaborations",
};

export const navItems = [
  { href: "/about", label: "About me" },
  { href: "/services", label: "Services" },
  { href: "/#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
] as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/edwin-promise-a73b822b6" },
  { label: "GitHub", href: "https://github.com/promnix" },
  { label: "X", href: "https://x.com/promnix" },
  { label: "Instagram", href: "https://www.instagram.com/promnix10" },
  { label: "TikTok", href: "https://www.tiktok.com/@promnix" },
];

export const skillGroups = [
  // {
  //   title: "Mobile",
  //   items: ["React Native", "Expo", "Swift", "App Store delivery"],
  // },
  {
    title: "Frontend & Interface",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "React"],
  },
  {
    title: "Backend & APIs",
    items: ["Laravel", "PHP", "Go", "REST APIs", "MySQL", "Supabase"],
  },
  {
    title: "CMS & Business Websites",
    items: ["WordPress", "Elementor", "WooCommerce", "Yoast SEO"],
  },
];

export const workPattern = [
  {
    title: "Understand the goal",
    description: [
      "Before building, I clarify what the business needs, who the users are, and what success should look like."
    ]
  },
  {
    title: "Design and build",
    description: [
      "I create clean interfaces and functional systems using practical tools that fit the project."
    ]
  },
  {
    title: "Launch and improve",
    description: [
      "I help prepare the product for real users, improve performance, and support the next version."
    ]
  },
]

export const services: Service[] = [
  {
    slug: "business-website-design-development",
    title: "Business Website Design & Development",
    shortTitle: "Business Websites",
    summary:
      "Fast, responsive, SEO-ready websites for small businesses that need to look credible and turn visitors into enquiries.",
    description:
      "A practical website build for businesses that need a stronger online presence, clearer messaging, and a site that makes it easy for customers to understand the offer and get in touch.",
    audience:
      "Best for service businesses, consultants, agencies, local companies, and founders who need a polished website that supports enquiries.",
    timeline: "3-4 weeks typical",
    timelineDetail: {
      typical: "3-4 weeks typical",
      weeks: [
        "Week 1: Discovery, structure, and content planning",
        "Week 2-3: Design, development, mobile layout, and SEO setup",
        "Week 4: Testing, revisions, tracking, and launch prep",
      ],
      note: "Rush builds may be possible when content is ready. Larger sites, custom integrations, or heavy copy support can extend the timeline.",
    },
    startingPoint: "Good for new builds, redesigns, and websites that need clearer structure.",
    investment: {
      startingFrom: "$500",
      note:
        "Final pricing depends on page count, content readiness, custom features, integrations, and launch timeline.",
    },
    outcomes: [
      "A polished website that explains the offer clearly",
      "Responsive pages that work well across mobile and desktop",
      "SEO-ready page structure, metadata, and performance-minded implementation",
      "Clear enquiry paths through contact, WhatsApp, or booking links",
    ],
    deliverables: [
      "Homepage",
      "4-6 core pages",
      "Contact section or form",
      "Mobile responsive layout",
      "Basic on-page SEO",
      "Metadata",
      "Schema where relevant",
      "Google Analytics or tracking setup",
      "2 rounds of revisions",
      "Handoff walkthrough",
    ],
    process: [
      {
        title: "Clarify the business and offer",
        body: "We define what the business does, who it serves, what makes the offer credible, and what action visitors should take.",
      },
      {
        title: "Plan the page structure and conversion flow",
        body: "The pages, section order, proof points, CTAs, and enquiry paths are mapped before design and development begin.",
      },
      {
        title: "Design, build, optimize, and launch",
        body: "The website is built responsively, optimized for speed and search basics, tested, connected to tracking, and prepared for launch.",
      },
    ],
    fit: {
      good: [
        "You need a professional website that explains your services clearly.",
        "Your current site looks dated, unclear, or hard to trust.",
        "You want customers to contact you through forms, email, WhatsApp, or booking links.",
        "You need SEO basics, metadata, mobile responsiveness, and launch support handled properly.",
      ],
      notIdeal: [
        {
          text: "You only need one focused campaign page for ads or a launch.",
          betterServiceSlug: "landing-pages-for-ads-and-campaigns",
        },
        {
          text: "You need a working software product with accounts, data, and app workflows.",
          betterServiceSlug: "mvp-development-for-founders",
        },
      ],
    },
    proofProjects: [
      {
        title: "Freshly Folded",
        body:
          "Contributed to website pages, content management, SEO support, and performance improvements for a laundry service website.",
      },
      {
        title: "Scarsdale Solicitors",
        body:
          "Contributed to website pages, SEO-focused content management, performance improvements, and service/practice area page support for a law firm website.",
      },
    ],
    faqs: [
      {
        question: "Do I need to provide the content?",
        answer:
          "You can provide final copy, rough notes, or an existing website. I can help organize and improve the page copy, but deeper copywriting may affect scope and timeline.",
      },
      {
        question: "Can I update the website after launch?",
        answer:
          "Yes. The handoff can include a walkthrough, documentation, and guidance on what can be updated safely after launch.",
      },
      {
        question: "Do you handle hosting and domain setup?",
        answer:
          "I can help connect hosting, domain DNS, SSL, redirects, and launch settings. Hosting or domain fees stay separate from the build cost.",
      },
      {
        question: "Will the website be mobile responsive?",
        answer:
          "Yes. Mobile responsiveness is included, with checks for layout, forms, navigation, and CTA visibility across common screen sizes.",
      },
      {
        question: "Do you include SEO basics?",
        answer:
          "Yes. The build includes basic on-page SEO, metadata, headings, internal links where relevant, and schema where it fits the page content.",
      },
    ],
    relatedInsights: [
      {
        title: "Is your slow website losing customers before they contact you?",
        href: "/blog/is-your-slow-website-losing-customers-before-they-contact-you",
      },
      {
        title: "How to check if your website is optimized",
        href: "/blog/how-to-check-if-your-website-is-optimized",
      },
      {
        title: "Social media vs website for business: what should come first?",
        href: "/blog/social-media-vs-website-for-business-what-should-come-first",
      },
    ],
    ctaLabel: "Request a website quote",
    metaTitle: "Business Website Design & Development",
    metaDescription:
      "Business website design and development for credible, SEO-ready sites that help customers understand your offer and get in touch.",
    relatedSkills: ["Next.js", "WordPress", "Tailwind CSS", "SEO", "Responsive Design"],
    seoKeywords: [
      "business website design",
      "small business website development",
      "SEO-ready website",
      "responsive website design",
    ],
  },
  {
    slug: "landing-pages-for-ads-and-campaigns",
    title: "Landing Pages for Ads & Campaigns",
    shortTitle: "Landing Pages",
    summary:
      "Focused landing pages for paid ads, launches, and campaigns where every section supports one clear next action.",
    description:
      "A focused landing page service for businesses spending time or money on traffic and needing a page that explains the offer, builds trust, and gives visitors one practical next step.",
    audience:
      "Best for paid ad campaigns, service offers, lead magnets, product launches, waitlists, and seasonal promotions.",
    timeline: "1-2 weeks typical",
    timelineDetail: {
      typical: "1-2 weeks typical",
      weeks: [
        "Day 1-2: Campaign goal, audience, offer, and CTA planning",
        "Week 1: Page copy structure, design, and responsive build",
        "Week 2: Tracking, form/WhatsApp/email connection, QA, and launch prep",
      ],
      note: "Rush timelines work best when the offer, copy inputs, assets, and tracking requirements are ready before kickoff.",
    },
    startingPoint: "Good when traffic is coming in but the current page is unclear or too general.",
    investment: {
      startingFrom: "$200",
      note:
        "Final pricing depends on page count, content readiness, custom features, integrations, and launch timeline.",
    },
    outcomes: [
      "A sharper campaign page built around one offer",
      "Clear section flow for benefits, proof, objections, and action",
      "Mobile-first layout for paid traffic",
      "Tracking-ready structure for measuring enquiries or clicks",
    ],
    deliverables: [
      "One focused landing page",
      "Offer, benefits, proof, objections, and CTA section flow",
      "Mobile responsive campaign layout",
      "Lead capture form, WhatsApp, email, or booking link integration",
      "Tracking/analytics setup support",
      "Metadata and social sharing basics",
      "Speed and launch QA",
      "1-2 rounds of revisions",
    ],
    process: [
      {
        title: "Define the campaign goal and target audience",
        body: "We clarify the traffic source, audience, offer, promise, proof, and single action the page must drive.",
      },
      {
        title: "Build a focused page around one action",
        body: "The page is structured around one conversion path, with sections that answer questions and reduce hesitation before the CTA.",
      },
      {
        title: "Test speed, mobile layout, tracking, and CTA flow",
        body: "Before launch, the page is checked for mobile behavior, load speed, tracking events, forms, links, and CTA visibility.",
      },
    ],
    fit: {
      good: [
        "You are sending paid ads, email traffic, or social traffic to one offer.",
        "You need a campaign page for a launch, lead magnet, waitlist, event, or promotion.",
        "Your current page has too many distractions or unclear CTAs.",
        "You want tracking, forms, WhatsApp, email, or booking links set up for the campaign.",
      ],
      notIdeal: [
        {
          text: "You need a full website with multiple pages and a broader business presence.",
          betterServiceSlug: "business-website-design-development",
        },
        {
          text: "You need user accounts, dashboards, or product workflows.",
          betterServiceSlug: "mvp-development-for-founders",
        },
      ],
    },
    proofProjects: [
      {
        title: "Freshly Folded",
        body:
          "Contributed to website pages, content management, SEO support, and performance improvements for a laundry service website.",
      },
    ],
    faqs: [
      {
        question: "Can this be used for paid ads?",
        answer:
          "Yes. Landing pages are built around focused traffic, clear offers, fast mobile loading, and a single action that supports campaign measurement.",
      },
      {
        question: "Do you help with the page copy?",
        answer:
          "Yes. I can help structure and refine the copy from your notes, offer details, proof points, and campaign goal.",
      },
      {
        question: "Can you add tracking or analytics?",
        answer:
          "Yes. I can add Google Analytics or event tracking support for CTA clicks, form submissions, WhatsApp clicks, or other agreed actions.",
      },
      {
        question: "How fast can a landing page be launched?",
        answer:
          "A straightforward landing page can usually launch in 1-2 weeks when the offer, assets, and feedback are ready. Rush builds depend on scope.",
      },
      {
        question: "Can it connect to WhatsApp, email, or forms?",
        answer:
          "Yes. The page can connect to WhatsApp, email, contact forms, booking links, or other lightweight lead capture tools.",
      },
    ],
    relatedInsights: [
      {
        title: "Landing page for small business ads: how to stop wasting paid traffic",
        href: "/blog/landing-page-for-small-business-ads-how-to-stop-wasting-paid-traffic",
      },
      {
        title: "How to make a business website look professional without overcomplicating it",
        href: "/blog/how-to-make-a-business-website-look-professional-without-overcomplicating-it",
      },
    ],
    ctaLabel: "Plan your landing page",
    metaTitle: "Landing Pages for Ads & Campaigns",
    metaDescription:
      "Focused landing pages for ads, launches, and campaigns with clear CTA flow, mobile layout, tracking, and conversion structure.",
    relatedSkills: ["Conversion", "SEO", "Performance", "Responsive Design", "Analytics"],
    seoKeywords: [
      "landing page for small business ads",
      "campaign landing page",
      "paid ads landing page",
      "conversion landing page",
    ],
  },
  {
    slug: "mvp-development-for-founders",
    title: "MVP Development for Founders",
    shortTitle: "MVP Development",
    summary:
      "Lean product builds for founders who need a usable first version with clear flows, reliable foundations, and launch momentum.",
    description:
      "A focused MVP build for founders and startups who need to turn an idea into a usable product without overbuilding before the first launch or validation cycle.",
    audience:
      "Best for founders, early startups, internal tools, portals, booking flows, dashboards, and product prototypes that need to become real software.",
    timeline: "4-8 weeks typical",
    timelineDetail: {
      typical: "4-8 weeks typical",
      weeks: [
        "Week 1: Scope, feature prioritization, user flows, and data planning",
        "Week 2-5: Iterative build of core screens, backend, database, and integrations",
        "Week 6-8: Testing, deployment, fixes, handoff, and next-version planning",
      ],
      note: "Complex apps, payment flows, role-based permissions, or changing feature requirements can extend the build into a longer phased roadmap.",
    },
    startingPoint: "Good when you have a clear product idea and need help shaping the first buildable version.",
    investment: {
      startingFrom: "$1,200",
      note:
        "Final pricing depends on page count, content readiness, custom features, integrations, and launch timeline.",
    },
    outcomes: [
      "A scoped first version that focuses on the core workflow",
      "Clean frontend and backend foundations",
      "Practical user flows for testing the product in the real world",
      "A product base that can grow after launch",
    ],
    deliverables: [
      "MVP scope and feature priority list",
      "Core user flows and screen structure",
      "Responsive product interface",
      "Backend/API implementation where needed",
      "Database setup and data model",
      "Auth, forms, dashboard, cart, or workflow features as scoped",
      "Deployment and launch support",
      "Testing checklist and handoff notes",
      "Repository access and walkthrough",
    ],
    process: [
      {
        title: "Scope and feature prioritization",
        body: "We turn the idea into a buildable first version by separating must-have workflows from later-version features.",
      },
      {
        title: "Iterative build in stages",
        body: "The product is built in practical stages so core screens, data flow, integrations, and feedback can be reviewed as the MVP takes shape.",
      },
      {
        title: "Deploy, test, and handoff",
        body: "The MVP is deployed, tested against the agreed flows, documented, and handed off with clear next steps for iteration.",
      },
    ],
    fit: {
      good: [
        "You have a product idea and need a usable first version.",
        "You need accounts, forms, dashboards, databases, carts, or workflow logic.",
        "You want to validate a product before investing in a larger platform.",
        "You need a technical partner who can help reduce scope and ship in stages.",
      ],
      notIdeal: [
        {
          text: "You only need a credibility website for your business.",
          betterServiceSlug: "business-website-design-development",
        },
        {
          text: "You only need a single conversion page for ads or a launch.",
          betterServiceSlug: "landing-pages-for-ads-and-campaigns",
        },
      ],
    },
    proofProjects: [
      // {
      //   title: "Bellefood MVP",
      //   body:
      //     "Food ordering MVP built with Next.js and Supabase, including menu, cart, delivery zone logic, and WhatsApp order flow.",
      // },
      {
        title: "Build With Promise / Promnix portfolio",
        body:
          "Personal portfolio and service site built with Next.js, SEO structure, blog/content system, service pages, schema, and performance focus.",
      },
    ],
    faqs: [
      {
        question: "How do we avoid scope creep?",
        answer:
          "We start with a defined feature priority list, agree what belongs in version one, and move non-essential ideas into a later roadmap.",
      },
      {
        question: "Do I own the code after launch?",
        answer:
          "Yes. You receive repository access and handoff guidance for the code and deployment setup used for the agreed MVP build.",
      },
      {
        question: "Can the MVP scale later?",
        answer:
          "The MVP is built with a practical foundation so it can be improved after validation, but scale requirements should be discussed early.",
      },
      {
        question: "Can you continue after the first version?",
        answer:
          "Yes. After launch, we can plan follow-up improvements, new features, bug fixes, performance work, or product iteration.",
      },
      {
        question: "What happens if features change mid-project?",
        answer:
          "We review the impact on timeline and budget, then decide whether the change replaces an existing feature or becomes a new phase.",
      },
    ],
    relatedInsights: [
      {
        title: "What to ask a web developer before hiring",
        href: "/blog/what-to-ask-a-web-developer-before-hiring",
      },
      {
        title: "Website performance optimization",
        href: "/blog/website-performance-optimization",
      },
    ],
    ctaLabel: "Discuss your MVP idea",
    metaTitle: "MVP Development for Founders",
    metaDescription:
      "MVP development for founders who need scoped features, staged builds, deployment, testing, and handoff for a usable first version.",
    relatedSkills: ["Next.js", "React", "Laravel", "REST APIs", "MySQL", "Supabase"],
    seoKeywords: [
      "MVP development",
      "startup MVP developer",
      "founder product development",
      "web app development",
    ],
  },
  {
    slug: "wordpress-website-development",
    title: "WordPress Website Development",
    shortTitle: "WordPress Websites",
    summary:
      "Business-ready WordPress websites using practical tools like Elementor, WooCommerce, and Yoast SEO where they fit the project.",
    description:
      "A WordPress build service for businesses that need a manageable website, CMS flexibility, SEO structure, and a clean front-end experience without unnecessary complexity.",
    audience:
      "Best for small businesses, service websites, content-heavy websites, simple ecommerce, and teams that prefer managing content in WordPress.",
    timeline: "2-4 weeks typical",
    timelineDetail: {
      typical: "2-4 weeks typical",
      weeks: [
        "Week 1: Platform, theme, plugin, hosting, and content planning",
        "Week 2-3: Page build, content setup, SEO plugin setup, forms, and responsive checks",
        "Week 4: Performance cleanup, revisions, admin walkthrough, and launch prep",
      ],
      note: "WooCommerce, content-heavy sites, plugin conflicts, or existing-site cleanup can require a longer timeline.",
    },
    startingPoint: "Good for new WordPress builds, redesigns, cleanup work, and performance improvements.",
    investment: {
      startingFrom: "$400",
      note:
        "Final pricing depends on page count, content readiness, custom features, integrations, and launch timeline.",
    },
    outcomes: [
      "A WordPress site that is easier to manage",
      "Cleaner page structure and stronger visual hierarchy",
      "Basic SEO and performance improvements",
      "Practical plugin choices without bloating the site",
    ],
    deliverables: [
      "WordPress setup or redesign",
      "Theme and plugin planning",
      "Homepage and core page build",
      "Elementor setup where appropriate",
      "WooCommerce setup for simple stores when scoped",
      "SEO plugin configuration",
      "Forms, menus, and basic content management setup",
      "Mobile responsive checks",
      "Performance cleanup and launch checks",
      "Admin access walkthrough",
    ],
    process: [
      {
        title: "Platform, theme, plugin, and hosting planning",
        body: "We review the current WordPress setup or plan the theme, plugins, hosting, pages, and content structure before the build.",
      },
      {
        title: "Build pages, configure content, SEO, and forms",
        body: "The site pages, menus, forms, SEO plugin settings, and content areas are configured with maintainability in mind.",
      },
      {
        title: "Training, handoff, and admin access walkthrough",
        body: "Before launch, I walk through the admin area, update process, plugin basics, and handoff steps so the site can be managed confidently.",
      },
    ],
    fit: {
      good: [
        "You want a website your team can update through WordPress.",
        "You need service pages, blog/content management, forms, or simple ecommerce.",
        "Your current WordPress site needs cleanup, better page structure, or performance support.",
        "You prefer Elementor, WooCommerce, Yoast SEO, or a familiar CMS workflow where appropriate.",
      ],
      notIdeal: [
        {
          text: "You want a custom Next.js website with more control over performance and structure.",
          betterServiceSlug: "business-website-design-development",
        },
        {
          text: "You need a custom web app or MVP with database-driven product workflows.",
          betterServiceSlug: "mvp-development-for-founders",
        },
      ],
    },
    proofProjects: [
      {
        title: "Freshly Folded",
        body:
          "Contributed to website pages, content management, SEO support, and performance improvements for a laundry service website.",
      },
      {
        title: "Scarsdale Solicitors",
        body:
          "Contributed to website pages, SEO-focused content management, performance improvements, and service/practice area page support for a law firm website.",
      },
    ],
    faqs: [
      {
        question: "Can I edit the content myself?",
        answer:
          "Yes. WordPress is a good fit when you want to update pages, posts, images, menus, and basic content without editing code.",
      },
      {
        question: "Do you use Elementor or custom WordPress setup?",
        answer:
          "I can use Elementor where it fits the project, or a more custom setup when performance, maintainability, or design needs call for it.",
      },
      {
        question: "Can you help with SEO plugins?",
        answer:
          "Yes. I can configure SEO plugin basics, metadata, titles, descriptions, redirects where relevant, and page-level SEO structure.",
      },
      {
        question: "Do you handle WooCommerce?",
        answer:
          "Yes, for simple WooCommerce stores or product/service checkout needs. More complex ecommerce flows should be scoped separately.",
      },
      {
        question: "Do you provide a handoff walkthrough?",
        answer:
          "Yes. The handoff includes an admin walkthrough so you understand how to update common areas and manage the site after launch.",
      },
    ],
    relatedInsights: [
      {
        title: "Next.js vs WordPress for business websites: which should you choose?",
        href: "/blog/nextjs-vs-wordpress-for-business-websites-which-should-you-choose",
      },
      {
        title: "Affordable website for small business: what you should pay for and what can wait",
        href: "/blog/affordable-website-for-small-business-what-you-should-pay-for-and-what-can-wait",
      },
    ],
    ctaLabel: "Build your WordPress website",
    metaTitle: "WordPress Website Development",
    metaDescription:
      "WordPress website development with page builds, SEO plugin setup, forms, performance cleanup, and admin handoff walkthrough.",
    relatedSkills: ["WordPress", "Elementor", "WooCommerce", "Yoast SEO", "Performance"],
    seoKeywords: [
      "WordPress website developer",
      "Elementor website design",
      "WooCommerce setup",
      "WordPress SEO",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const featuredProjects: Project[] = [
  {
    slug: "atlas-travel",
    title: "Atlas Travel",
    kind: "Flight booking product",
    year: "2026",
    summary:
      "A booking app concept focused on cleaner search, sharper itinerary flow, and a more premium reservation experience.",
    stack: ["React Native", "TypeScript", "Expo"],
    accent: "Travel app",
  },
  {
    slug: "north-course",
    title: "North Course",
    kind: "Learning platform",
    year: "2025",
    summary:
      "An online learning experience with a quieter interface, stronger program hierarchy, and easier course discovery.",
    stack: ["Next.js", "Tailwind CSS", "Node.js"],
    accent: "Education platform",
  },
  {
    slug: "luma-shop",
    title: "Luma Shop",
    kind: "Mobile commerce",
    year: "2025",
    summary:
      "A storefront concept for curated products with tighter merchandising, elegant browsing, and a calmer checkout path.",
    stack: ["iOS UI", "React Native", "Stripe-ready"],
    accent: "Shopping app",
  },
  {
    slug: "signal-desk",
    title: "Signal Desk",
    kind: "CRM workspace",
    year: "2026",
    summary:
      "A support and CRM surface unifying messages, tasks, and escalation views into a single operator workspace.",
    stack: ["Next.js", "Postgres", "Server Actions"],
    accent: "Business platform",
  },
  {
    slug: "stayboard",
    title: "Stayboard",
    kind: "Property booking site",
    year: "2024",
    summary:
      "A booking website with better search affordances, more inviting property storytelling, and a stronger conversion path.",
    stack: ["Next.js", "Maps", "Responsive UI"],
    accent: "Booking website",
  },
  {
    slug: "adept-pay",
    title: "Adept Pay",
    kind: "Payments brand website",
    year: "2025",
    summary:
      "A growth site for a digital finance product with clearer trust signals, cleaner narrative pacing, and bolder visual hierarchy.",
    stack: ["Next.js", "Motion", "Tailwind CSS"],
    accent: "Fintech website",
  },
];

export const testimonials = [
  {
    quote:
      "Promnix brings pace, clarity, and product taste to the build. Designs become working software without losing polish.",
    author: "Startup Founder",
    role: "Startup founder",
  },
  {
    quote:
      "Communication stays sharp, delivery stays organized, and the final product feels more refined than the original brief.",
    author: "Product Lead",
    role: "Product manager",
  },
  {
    quote:
      "The strongest part is the finish. Small details across motion, spacing, and usability make the product feel trusted.",
    author: "Design Partner",
    role: "Creative collaborator",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-polish-without-drag",
    title: "Shipping polish without slowing the team down.",
    category: "Delivery notes",
    publishedAt: "April 2026",
    readingTime: "6 min read",
    excerpt:
      "A practical system for keeping interfaces sharp while still moving fast through product decisions, QA, and launch windows.",
    pullQuote:
      "Polish works best when it is designed into the workflow, not added as a last-minute rescue pass.",
    topics: ["Process", "QA", "Product finish"],
    intro:
      "Teams usually do not lose polish because they lack taste. They lose it because refinement is treated as a separate phase that starts after the important decisions have already been rushed. The better approach is to make polish part of delivery itself.",
    sections: [
      {
        title: "Build review moments into the workflow",
        paragraphs: [
          "A product gets better when the team knows exactly when to pause and look critically at hierarchy, spacing, copy, and edge states. If those moments are missing, quality becomes accidental.",
          "Small scheduled review passes near key milestones work better than one dramatic cleanup sprint near launch. They reduce pressure, shorten bug lists, and make the last stretch calmer.",
        ],
      },
      {
        title: "Treat QA as part of presentation quality",
        paragraphs: [
          "Broken states, mismatched paddings, and awkward transitions all weaken trust in the same way. Users do not separate visual polish from reliability. They experience them together.",
          "That is why quality assurance should cover the feel of the interface as well as the correctness of the feature. The best release checklists look at both.",
        ],
      },
      {
        title: "Leave space for the last decisions",
        paragraphs: [
          "The final ten percent usually contains the choices that make the product feel intentional: tightening a headline, simplifying a flow, clarifying a button, or softening a transition.",
          "If the schedule has no room for those calls, the work ships technically complete but emotionally unfinished.",
        ],
      },
    ],
    takeaway:
      "Make polish part of the system, not the emergency response at the end.",
  },
  {
    slug: "calm-interfaces-convert-better",
    title: "Why calmer interfaces usually convert better.",
    category: "Interface thinking",
    publishedAt: "March 2026",
    readingTime: "4 min read",
    excerpt:
      "Visual restraint can make calls to action clearer, trust signals stronger, and decision-making easier for users.",
    pullQuote:
      "When every block shouts, the page stops guiding and starts negotiating with the user.",
    topics: ["Conversion", "Visual hierarchy", "UX writing"],
    intro:
      "A calm interface is not a quiet one. It is an interface that chooses what deserves emphasis and refuses to compete with itself. That restraint often improves performance because users can decide faster.",
    sections: [
      {
        title: "Hierarchy reduces decision fatigue",
        paragraphs: [
          "When every card is vivid, every headline oversized, and every message urgent, the user has to spend more effort deciding what matters. That cost is easy to miss during design reviews and obvious during real usage.",
          "A calmer page helps the right action stand out by lowering the noise around it. The user spends less energy decoding and more energy acting.",
        ],
      },
      {
        title: "Trust often lives in restraint",
        paragraphs: [
          "Products that feel too eager can feel less trustworthy. Strong offers still need breathing room, credible language, and stable layout rhythm.",
          "In practice, this means cleaner blocks, fewer competing accents, and copy that explains instead of overselling.",
        ],
      },
      {
        title: "Clarity beats ornament at the point of action",
        paragraphs: [
          "Buttons, forms, and comparisons are the places where conversion really happens. If those areas are crowded, the page may look energetic while actually slowing the user down.",
          "Visual restraint gives those action zones more authority. It makes the product easier to choose.",
        ],
      },
    ],
    takeaway:
      "Conversion usually improves when emphasis is earned, not sprayed across the page.",
  },
  {
    slug: "making-mobile-web-feel-consistent",
    title: "Making mobile and web feel like the same product.",
    category: "Cross-platform",
    publishedAt: "February 2026",
    readingTime: "7 min read",
    excerpt:
      "Patterns for carrying one product voice across native apps, responsive sites, and internal tools without flattening each platform.",
    pullQuote:
      "Consistency is not duplication. It is shared intent expressed in the right native language.",
    topics: ["React Native", "Design systems", "Product systems"],
    intro:
      "Cross-platform consistency fails when teams confuse sameness with coherence. A strong product identity can travel between mobile and web, but it needs to respect the different strengths of each surface.",
    sections: [
      {
        title: "Start with shared principles, not shared screens",
        paragraphs: [
          "The strongest systems align around behavior, tone, spacing logic, and hierarchy before they align around exact layouts. That gives each platform more room to behave naturally.",
          "When teams start by cloning screens directly, one platform usually ends up feeling borrowed.",
        ],
      },
      {
        title: "Let each platform keep its native advantages",
        paragraphs: [
          "Mobile rewards tighter focus, stronger sequential flow, and faster tactile action. Web often rewards scanning, side-by-side comparison, and broader context.",
          "Consistency grows when both surfaces carry the same priorities, not when they pretend to have the same physical shape.",
        ],
      },
      {
        title: "Reuse language more than layout",
        paragraphs: [
          "Shared labels, motion character, tone of voice, and component logic often matter more than pixel-matching. Those are the signals users carry from one surface to another.",
          "They make the product recognizable even when the layout appropriately changes.",
        ],
      },
    ],
    takeaway:
      "Aim for a shared product voice with platform-specific expression.",
  },
  {
    slug: "the-last-10-percent-is-the-brand",
    title: "The last ten percent is where the brand starts.",
    category: "Craft",
    publishedAt: "January 2026",
    readingTime: "5 min read",
    excerpt:
      "Spacing, motion timing, microcopy, and empty states often decide whether a product feels trusted or temporary.",
    pullQuote:
      "Users may not name the detail they noticed, but they absolutely feel the difference it makes.",
    topics: ["Motion", "Microcopy", "Trust"],
    intro:
      "Brand is often discussed as identity, color, and logo. In use, though, brand is also how finished the product feels. That finish usually appears in the smallest decisions.",
    sections: [
      {
        title: "Microcopy shapes confidence",
        paragraphs: [
          "Short lines around forms, errors, and transitions tell users whether a product feels thoughtful. Good microcopy reduces hesitation and quietly carries the product voice.",
          "Weak microcopy does the opposite. It makes even polished interfaces feel generic.",
        ],
      },
      {
        title: "Motion tells users how refined the system is",
        paragraphs: [
          "Animation is not only decoration. Timing, easing, and entry behavior tell users whether the interface has been tuned carefully or assembled quickly.",
          "Subtle motion with clear purpose usually builds more trust than loud motion added for spectacle.",
        ],
      },
      {
        title: "Empty and edge states are brand moments too",
        paragraphs: [
          "Users notice how a product behaves when there is no content, when something fails, or when a process is still in progress. Those moments reveal discipline.",
          "A mature product feels designed even there, and that consistency becomes part of its identity.",
        ],
      },
    ],
    takeaway:
      "The product starts to feel branded when the small decisions stop feeling accidental.",
  },
];

export const editorialPillars = [
  {
    title: "Product thinking",
    body: "Short essays about reducing friction, improving hierarchy, and making interfaces easier to act on.",
  },
  {
    title: "Web development",
    body: "Notes on delivery pace, handoff quality, QA discipline, and keeping momentum without losing finish.",
  },
  {
    title: "SEO & performance",
    body: "Patterns for making mobile, web, and marketing surfaces feel related without becoming repetitive.",
  },
] as const;

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export const timeline = [
  {
    year: "Now",
    title: "Independent full-stack developer",
    body: "Helping founders, startups, and small businesses turn ideas into polished websites, MVPs, and digital products with clean design, reliable development, and product thinking.",
  },
  {
    year: "2025",
    title: "Production and freelance experience",
    body: "Worked on real business websites, SEO-focused pages, collaborative product interfaces, and full-stack projects while improving my workflow across React, TypeScript, Laravel, WordPress, and deployment.",
  },
  {
    year: "2023",
    title: "Full-stack learning foundation",
    body: "Started building a strong foundation in web development, learning how frontend interfaces, backend logic, databases, and real user flows connect inside practical applications.",
  },
];

export const searchEntries = [
  { title: "Home", href: "/", category: "Page", body: "Hero, reviews, and contact section." },
  { title: "About", href: "/about#about", category: "Page", body: "Bio, process, and work approach." },
  { title: "Projects", href: "/projects", category: "Page", body: "Selected portfolio work and case study summaries." },
  { title: "Services", href: "/services", category: "Page", body: "Website design, landing pages, MVP development, and WordPress builds." },
  { title: "Blog", href: "/blog", category: "Page", body: "Writing on product craft, delivery, and interface thinking." },
  { title: "Skills", href: "/#skills", category: "Section", body: "Mobile, frontend, backend, and workflow tools." },
  { title: "Contact", href: "/#contact", category: "Section", body: "Email and WhatsApp call to action." },
  ...featuredProjects.map((project) => ({
    title: project.title,
    href: `/projects#${project.slug}`,
    category: project.accent,
    body: project.summary,
  })),
  ...services.map((service) => ({
    title: service.title,
    href: `/services/${service.slug}`,
    category: "Service",
    body: service.summary,
  })),
  ...blogPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    category: post.category,
    body: post.excerpt,
  })),
];

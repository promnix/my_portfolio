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
  startingPoint: string;
  outcomes: string[];
  deliverables: string[];
  process: {
    title: string;
    body: string;
  }[];
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
    timeline: "Usually 2-5 weeks depending on content, page count, and integrations.",
    startingPoint: "Good for new builds, redesigns, and websites that need clearer structure.",
    outcomes: [
      "A polished website that explains the offer clearly",
      "Responsive pages that work well across mobile and desktop",
      "SEO-ready page structure, metadata, and performance-minded implementation",
      "Clear enquiry paths through contact, WhatsApp, or booking links",
    ],
    deliverables: [
      "Homepage and core service pages",
      "Responsive interface design and development",
      "Contact or lead enquiry flow",
      "Basic technical SEO setup",
      "Performance and launch checks",
    ],
    process: [
      {
        title: "Clarify the offer",
        body: "We define the pages, messages, proof points, and calls to action the website needs before design starts.",
      },
      {
        title: "Design the experience",
        body: "I shape the layout, hierarchy, and content flow so visitors can understand the business quickly.",
      },
      {
        title: "Build and launch",
        body: "The site is developed, optimized, tested, and prepared for launch with the right technical basics in place.",
      },
    ],
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
    timeline: "Usually 1-3 weeks depending on copy, proof, and tracking requirements.",
    startingPoint: "Good when traffic is coming in but the current page is unclear or too general.",
    outcomes: [
      "A sharper campaign page built around one offer",
      "Clear section flow for benefits, proof, objections, and action",
      "Mobile-first layout for paid traffic",
      "Tracking-ready structure for measuring enquiries or clicks",
    ],
    deliverables: [
      "Campaign landing page",
      "Offer and CTA structure",
      "Responsive build",
      "Lead capture or contact integration",
      "Launch QA and performance checks",
    ],
    process: [
      {
        title: "Focus the campaign",
        body: "We identify the audience, traffic source, promise, proof, and action the landing page must support.",
      },
      {
        title: "Build the page flow",
        body: "The page is structured to answer the visitor's key questions in the order they naturally appear.",
      },
      {
        title: "Prepare for traffic",
        body: "The final page is tested on mobile and desktop, then prepared for campaign launch and measurement.",
      },
    ],
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
    timeline: "Usually 4-10 weeks depending on product scope, data model, and integrations.",
    startingPoint: "Good when you have a clear product idea and need help shaping the first buildable version.",
    outcomes: [
      "A scoped first version that focuses on the core workflow",
      "Clean frontend and backend foundations",
      "Practical user flows for testing the product in the real world",
      "A product base that can grow after launch",
    ],
    deliverables: [
      "Product scope and flow planning",
      "Responsive product interface",
      "Backend/API implementation where needed",
      "Database and integration setup",
      "Deployment and launch support",
    ],
    process: [
      {
        title: "Define the first version",
        body: "We reduce the idea to the core user journey and decide what must be built now versus what can wait.",
      },
      {
        title: "Build the product base",
        body: "I implement the main interface, data flow, and backend pieces needed for the product to work.",
      },
      {
        title: "Launch and learn",
        body: "The MVP is tested, deployed, and prepared for real usage so the next decisions can be based on feedback.",
      },
    ],
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
    timeline: "Usually 2-6 weeks depending on pages, ecommerce needs, and content readiness.",
    startingPoint: "Good for new WordPress builds, redesigns, cleanup work, and performance improvements.",
    outcomes: [
      "A WordPress site that is easier to manage",
      "Cleaner page structure and stronger visual hierarchy",
      "Basic SEO and performance improvements",
      "Practical plugin choices without bloating the site",
    ],
    deliverables: [
      "WordPress setup or redesign",
      "Elementor page building where appropriate",
      "WooCommerce setup for simple stores",
      "Yoast SEO basics",
      "Speed, responsive, and launch checks",
    ],
    process: [
      {
        title: "Audit or plan the site",
        body: "We review the existing setup or define the pages, plugins, and content model needed for the new site.",
      },
      {
        title: "Build the WordPress experience",
        body: "The pages are designed and built with a focus on clarity, speed, responsive behavior, and maintainability.",
      },
      {
        title: "Clean up for launch",
        body: "I check SEO basics, plugin load, mobile behavior, forms, and performance before the site goes live.",
      },
    ],
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

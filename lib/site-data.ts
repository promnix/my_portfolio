export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  accent: string;
};

export const siteConfig = {
  name: "Your Name",
  shortName: "YN",
  role: "Mobile & Web Developer",
  description:
    "A premium portfolio starter for a mobile and web developer, built as a close structural clone with personalized branding placeholders.",
  tagline: "iOS • Android • Web",
  heroLead:
    "I design and ship polished mobile products and modern websites for founders, startups, and ambitious teams.",
  heroBody:
    "This build mirrors the structure, pace, and atmosphere of the reference portfolio while keeping all content ready for your own name, projects, and links.",
  email: "hello@yourname.dev",
  contactHref:
    "mailto:hello@yourname.dev?subject=Project%20Inquiry",
  whatsappHref:
    "https://wa.me/2340000000000?text=Hi%20Your%20Name%2C%20I%27d%20like%20to%20start%20a%20project.",
  location: "Lagos, Nigeria",
  availability: "Open to freelance, startup, and product work",
};

export const navItems = [
  { href: "/about#about", label: "About me" },
  { href: "/#skills", label: "Skills" },
  { href: "/project", label: "Projects" },
] as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yourhandle" },
  { label: "GitHub", href: "https://github.com/yourhandle" },
  { label: "X", href: "https://x.com/yourhandle" },
  { label: "Instagram", href: "https://www.instagram.com/yourhandle" },
];

export const skillGroups = [
  {
    title: "Mobile",
    items: ["React Native", "Expo", "Swift", "App Store delivery"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Auth flows"],
  },
  {
    title: "Workflow",
    items: ["GitHub", "Figma handoff", "QA passes", "Product polish"],
  },
];

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
      "He brings pace, clarity, and product taste to the build. Designs become working software without losing polish.",
    author: "Founder Name",
    role: "Startup founder",
  },
  {
    quote:
      "Communication stays sharp, delivery stays organized, and the final product always feels more refined than the original brief.",
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

export const timeline = [
  {
    year: "Now",
    title: "Independent builder",
    body: "Designing and shipping cross-platform products and marketing sites for fast-moving teams.",
  },
  {
    year: "2025",
    title: "Product-focused delivery",
    body: "Leaning deeper into conversion, onboarding flow, and product clarity across web and mobile work.",
  },
  {
    year: "2023",
    title: "Mobile-first foundation",
    body: "Built out a workflow around React Native, iteration speed, QA discipline, and visual finish.",
  },
];

export const searchEntries = [
  { title: "Home", href: "/", category: "Page", body: "Hero, reviews, and contact section." },
  { title: "About", href: "/about#about", category: "Page", body: "Bio, process, and work approach." },
  { title: "Projects", href: "/project", category: "Page", body: "Selected portfolio work and case study summaries." },
  { title: "Skills", href: "/#skills", category: "Section", body: "Mobile, frontend, backend, and workflow tools." },
  { title: "Contact", href: "/#contact", category: "Section", body: "Email and WhatsApp call to action." },
  ...featuredProjects.map((project) => ({
    title: project.title,
    href: `/project#${project.slug}`,
    category: project.accent,
    body: project.summary,
  })),
];

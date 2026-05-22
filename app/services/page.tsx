import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { getServicesSchema } from "@/lib/json-ld/json-ld";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development for websites, landing pages, MVPs, and WordPress builds.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Edwin Promise",
    description:
      "Web development for websites, landing pages, MVPs, and WordPress builds.",
    url: "/services",
    siteName: "Edwin Promise",
    type: "website",
    images: [
      {
        url: "/images/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Web development services by Edwin Promise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Edwin Promise",
    description:
      "Web development for websites, landing pages, MVPs, and WordPress builds.",
    images: ["/images/homepage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = getServicesSchema();

const serviceCards = [
  {
    number: "01",
    title: "Business Website Design & Development",
    description:
      "Fast, responsive, SEO-ready websites for small businesses that need to look credible and turvisitors into enquiries.",
    tags: "Next.js • WordPress • Tailwind CSS • SEO",
    href: "/services/business-website-design-development",
  },
  {
    number: "02",
    title: "Landing Pages for Ads & Campaigns",
    description:
      "Focused landing pages for paid ads, launches, and campaigns where every section supports one clear next action.",
    tags: "Conversion • SEO • Performance • Responsive Design",
    href: "/services/landing-pages-for-ads-and-campaigns",
  },
  {
    number: "03",
    title: "MVP Development for Founders",
    description:
      "Lean product builds for founders who need a usable first version with clear flows, reliable foundations, and launch momentum.",
    tags: "Next.js • Laravel • Go • REST APIs",
    href: "/services/mvp-development-for-founders",
  },
  {
    number: "04",
    title: "WordPress Website Development",
    description:
      "Business-ready WordPress websites using Elementor, WooCommerce, and Yoast SEO where they fit the project.",
    tags: "WordPress • Yoast SEO",
    href: "/services/wordpress-website-development",
  },
];

const workSteps = [
  {
    title: "Scoping & Timeline Discussion",
    body: "We align on what's in scope, what's not, and what \"done\" looks like. I give you a realistic timeline and flag any blockers early.",
  },
  {
    title: "Iterative Build in Stages",
    body: "I build in stages—wireframes, MVP structure, then polish. You see progress at each checkpoint, not just at the end.",
  },
  {
    title: "Deployment & Handoff",
    body: "I deploy to production, document what's built, and hand over credentials and repository access. No mystery systems.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div id="services" className="section-shell py-10 md:py-14">
        <section className="rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
          <h1 className="max-w-4xl font-display text-5xl text-balance md:text-6xl">
            Services
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-cream/90 md:text-xl">
            Web development for websites, landing pages, MVPs, and WordPress builds.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
            Practical support for businesses and founders who need a clearer offer, a stronger online presence, or a first product ready for real users.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              href="mailto:promnix10@gmail.com?subject=Project%20Inquiry"
              tracking={{ type: "contact_click", location: "services_hero", label: "Discuss a project" }}
              className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-5 py-3 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5 hover:bg-cream focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              Discuss a project
              <ArrowUpRight size={15} />
            </TrackedLink>
            <TrackedLink
              href="/projects"
              tracking={{ type: "project_view", location: "services_hero", projectTitle: "Projects index" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-silver transition hover:-translate-y-0.5 hover:border-brass/50 hover:text-brass focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              See related work
              <ArrowUpRight size={15} />
            </TrackedLink>
          </div>
        </section>

        <section className="mt-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              What I Build
            </h2>
            <p className="mt-4 text-sm leading-8 text-silver md:text-base">
              I work on projects at different stages, from static sites that need to convert, to first-version products that need to launch. Choose what matches your stage.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {serviceCards.map((service) => (
              <article
                key={service.number}
                className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 transition hover:border-brass/50 hover:bg-white/[0.045]"
              >
                <p className="text-4xl text-brass">{service.number}</p>
                <h3 className="mt-5 font-display text-3xl text-balance">
                  {service.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-silver">
                  {service.description}
                </p>
                <p className="mt-6 text-xs leading-6 text-silver">
                  {service.tags}
                </p>
                <TrackedLink
                  href={service.href}
                  tracking={{ type: "external_link_click", location: "services_card", label: service.title, url: service.href }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass! transition! hover:text-cream! focus-visible:outline! focus-visible:outline-offset-4! focus-visible:outline-brass!"
                >
                  View service →
                </TrackedLink>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              How I Work
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {workSteps.map((step, index) => (
              <article
                key={step.title}
                className="section-card rounded-[1.8rem] p-6"
              >
                <p className="text-3xl text-brass">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 text-base font-semibold text-cream">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-silver">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(214,161,74,0.055),rgba(255,255,255,0.032)_52%,rgba(102,169,255,0.04))] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <h2 className="max-w-2xl font-display text-4xl text-balance md:text-5xl">
              Ready to discuss the project?
            </h2>
            <TrackedLink
              href="mailto:promnix10@gmail.com?subject=Project%20Inquiry"
              tracking={{ type: "contact_click", location: "services_footer_cta", label: "Discuss a project" }}
              className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              Discuss a project
              <ArrowUpRight size={15} />
            </TrackedLink>
          </div>
        </section>
      </div>
    </>
  );
}

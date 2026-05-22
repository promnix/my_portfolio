import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { getServiceSchema } from "@/lib/json-ld/json-ld";
import { getServiceBySlug, services } from "@/lib/site-data";

export const revalidate = 86400;

const CONTACT_HREF = "mailto:promnix10@gmail.com?subject=Project%20Inquiry";
const WHATSAPP_HREF =
  "https://wa.me/2347058149298?text=Hi%20Promise%2C%20I%27d%20like%20to%20start%20a%20project.";

const defaultProcess = [
  {
    number: "01",
    title: "Clarify the offer",
    body: "We define the pages, messages, proof points, and calls to action the website needs before design starts.",
  },
  {
    number: "02",
    title: "Design the experience",
    body: "I shape the layout, hierarchy, and content flow so visitors can understand the business quickly.",
  },
  {
    number: "03",
    title: "Build and launch",
    body: "The site is developed, optimized, tested, and launched with full repository access and handoff documentation.",
  },
];

const serviceDetails = {
  "business-website-design-development": {
    subheading:
      "A practical website build for businesses that need a stronger online presence, clearer messaging, and a site that makes it easy for customers to take action.",
    fit: "Good for new builds, redesigns, and sites where visitors leave confused or don't know what to do next.",
    timeline: "Usually 2-5 weeks depending on content, page count, and integrations.",
    outcomes: [
      "A polished website that explains the offer clearly",
      "Clear enquiry paths through contact, WhatsApp, or booking links",
      "Responsive pages that work well across mobile and desktop",
      "SEO-ready page structure, metadata, and performance-minded implementation",
    ],
    deliverables: [
      "Homepage and core service pages",
      "Responsive interface design and development",
      "Contact or lead enquiry flow",
      "Basic technical SEO setup",
      "Performance and launch checks",
      "Repository handoff and documentation",
    ],
  },
  "landing-pages-for-ads-and-campaigns": {
    subheading:
      "Focused landing pages built for paid ads, launches, and campaigns where every section is designed to support one clear next action.",
    fit: "Good for ad campaigns, product launches, and offers that need a dedicated conversion page.",
    timeline: "Usually 1-3 weeks depending on content complexity and integration needs.",
    outcomes: [
      "A focused page built around one campaign goal",
      "Clearer offer structure, proof, objections, and calls to action",
      "Mobile-first sections for paid traffic",
      "Tracking-ready structure for enquiries, clicks, or form submissions",
    ],
    deliverables: [
      "Campaign landing page",
      "Offer and CTA structure",
      "Responsive interface design and development",
      "Lead capture or contact integration",
      "Performance and launch checks",
      "Repository handoff and documentation",
    ],
  },
  "mvp-development-for-founders": {
    subheading:
      "Lean product builds for founders who need a usable first version with clear user flows, reliable technical foundations, and launch momentum.",
    fit: "Good for first-time founders, SaaS pilots, and products that need to validate demand before scaling.",
    timeline: "Usually 4-8 weeks depending on feature scope, integrations, and data complexity.",
    outcomes: [
      "A scoped first version focused on the core workflow",
      "Clear user flows for testing the product with real users",
      "Reliable frontend, backend, and data foundations",
      "A product base that can grow after launch",
    ],
    deliverables: [
      "MVP scope and feature planning",
      "Responsive product interface design and development",
      "Core user flow and data model implementation",
      "Backend/API setup where needed",
      "Deployment and launch checks",
      "Repository handoff and documentation",
    ],
  },
  "wordpress-website-development": {
    subheading:
      "Business-ready WordPress websites using Elementor, WooCommerce, and Yoast SEO where they fit the project goals.",
    fit: "Good for businesses that need content control, e-commerce, or non-technical team handoff.",
    timeline: "Usually 2-4 weeks depending on page count, e-commerce setup, and plugin integrations.",
    outcomes: [
      "A WordPress website that is easier to manage",
      "Clearer page structure and stronger visual hierarchy",
      "Practical plugin choices without unnecessary bloat",
      "Basic SEO and performance improvements",
    ],
    deliverables: [
      "Homepage and core website pages",
      "Responsive WordPress design and development",
      "Contact, e-commerce, or lead enquiry flow",
      "Yoast SEO and plugin setup",
      "Performance and launch checks",
      "Repository handoff and documentation",
    ],
  },
} as const;

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const detail = serviceDetails[slug as keyof typeof serviceDetails];

  if (!service || !detail) {
    return {
      title: "Service not found",
    };
  }

  return {
    title: service.title,
    description: detail.subheading,
    keywords: service.seoKeywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Edwin Promise`,
      description: detail.subheading,
      type: "website",
      url: `/services/${service.slug}`,
      images: [
        {
          url: "/images/homepage.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} by Edwin Promise`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Edwin Promise`,
      description: detail.subheading,
      images: ["/images/homepage.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const detail = serviceDetails[slug as keyof typeof serviceDetails];

  if (!service || !detail) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const jsonLd = getServiceSchema(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="section-shell py-10 md:py-14">
        <section className="grid gap-6 lg:grid-cols-[1fr_0.36fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-6 sm:px-6 md:p-8">
            <p className="eyebrow text-xs text-brass">{service.shortTitle}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl text-balance text-cream md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
              {detail.subheading}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href={CONTACT_HREF}
                tracking={{ type: "contact_click", location: "service_detail_hero", label: service.title }}
                className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-5 py-3 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5 hover:bg-cream focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                Start this project
                <ArrowUpRight size={15} />
              </TrackedLink>
              <TrackedLink
                href={WHATSAPP_HREF}
                tracking={{ type: "whatsapp_click", location: "service_detail_hero", label: service.title }}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-silver transition hover:-translate-y-0.5 hover:border-brass/50 hover:text-brass focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                WhatsApp
                <ArrowUpRight size={15} />
              </TrackedLink>
            </div>
          </div>

          <aside className="section-card rounded-[2.5rem] px-4 py-6 sm:px-6">
            <h2 className="eyebrow text-xs text-brass">Service details</h2>
            <div className="mt-6 space-y-4">
              <article className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-silver">Fit</p>
                <p className="mt-3 text-sm leading-7 text-cream">
                  {detail.fit}
                </p>
              </article>
              <article className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-silver">Timeline</p>
                <p className="mt-3 text-sm leading-7 text-cream">
                  {detail.timeline}
                </p>
              </article>
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-4xl text-balance md:text-5xl">
            Outcomes
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-silver md:text-base">
            What this service is designed to improve.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {detail.outcomes.map((outcome, index) => (
              <li
                key={outcome}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="text-3xl text-brass">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-sm leading-7 text-silver">{outcome}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-4xl text-balance md:text-5xl">
            Deliverables
          </h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {detail.deliverables.map((deliverable) => (
              <li
                key={deliverable}
                className="flex gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-silver"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              Process
            </h2>
            <p className="mt-4 text-sm leading-8 text-silver md:text-base">
              A simple path from unclear brief to launched work.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {defaultProcess.map((step) => (
              <article key={step.number} className="section-card rounded-[1.8rem] p-6">
                <p className="text-3xl text-brass">{step.number}</p>
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

        <section className="mt-12 rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(214,161,74,0.055),rgba(255,255,255,0.032)_52%,rgba(102,169,255,0.04))] px-4 py-6 sm:px-6 md:p-8">
          <p className="eyebrow text-xs text-brass">Next step</p>
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="max-w-2xl font-display text-4xl text-balance md:text-5xl">
                Ready to start?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-silver md:text-base">
                Email me the current state of the project, what you want it to achieve, and your target launch date.
              </p>
            </div>
            <TrackedLink
              href={CONTACT_HREF}
              tracking={{ type: "email_click", location: "service_detail_cta", label: service.title }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              Email me
              <ArrowUpRight size={15} />
            </TrackedLink>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-4xl text-balance md:text-5xl">
            Related services
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {relatedServices.map((relatedService) => (
              <Link
                key={relatedService.slug}
                href={`/services/${relatedService.slug}`}
                className="group rounded-[1.8rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 transition hover:border-brass/50 hover:bg-white/[0.045]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl text-balance">
                    {relatedService.shortTitle}
                  </h3>
                  <ArrowUpRight size={16} className="mt-2 shrink-0 text-silver transition group-hover:text-brass" />
                </div>
                <p className="mt-4 text-sm leading-7 text-silver">
                  {relatedService.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, Layers3 } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { getServicesSchema } from "@/lib/json-ld/json-ld";
import { services, siteConfig } from "@/lib/site-data";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design, landing pages, MVP development, and WordPress website development services by Edwin Promise.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Edwin Promise",
    description:
      "Explore practical web development services for business websites, landing pages, MVPs, and WordPress builds.",
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
      "Website design, landing pages, MVP development, and WordPress services.",
    images: ["/images/homepage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = getServicesSchema();

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
        <section className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <div className="rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Services</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl text-balance md:text-6xl">
              Services for websites, landing pages, MVPs, and WordPress builds.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
              Practical web development support for businesses and founders who need a clearer offer, a stronger online presence, or a first product that is ready for real users.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href={siteConfig.contactHref}
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
          </div>

          <aside className="section-card rounded-[2.4rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow text-xs text-brass">How this helps</p>
              <Layers3 size={18} className="text-brass" />
            </div>
            <div className="mt-6 space-y-4">
              {[
                "Clearer offers and page structure",
                "Responsive build quality",
                "SEO and performance foundations",
                "Launch support without overbuilding",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brass" />
                  <p className="text-sm leading-6 text-silver">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-xs text-brass">What I build</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl text-balance md:text-5xl">
                Choose the service that matches the stage of the work.
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.slug}
                className="group rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 transition hover:border-brass/50 hover:bg-white/[0.045] md:p-7"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-4xl text-brass">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-5 font-display text-3xl text-balance md:text-4xl">
                      {service.title}
                    </h3>
                  </div>
                  <ArrowUpRight size={18} className="mt-2 shrink-0 text-silver transition group-hover:text-brass" />
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
                  {service.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.relatedSkills.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver">
                      {skill}
                    </span>
                  ))}
                </div>

                <TrackedLink
                  href={`/services/${service.slug}`}
                  tracking={{ type: "external_link_click", location: "services_card", label: service.title, url: `/services/${service.slug}` }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass px-4 py-2 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5 hover:bg-cream focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
                >
                  View service
                  <ArrowUpRight size={14} />
                </TrackedLink>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

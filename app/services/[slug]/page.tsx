import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, Target } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { getServiceSchema } from "@/lib/json-ld/json-ld";
import { getServiceBySlug, services, siteConfig } from "@/lib/site-data";

export const revalidate = 86400;

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

  if (!service) {
    return {
      title: "Service not found",
    };
  }

  return {
    title: service.title,
    description: service.summary,
    keywords: service.seoKeywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Edwin Promise`,
      description: service.summary,
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
      description: service.summary,
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

  if (!service) {
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
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-silver transition hover:text-brass"
        >
          <ArrowLeft size={15} />
          Back to services
        </Link>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.36fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-6 sm:px-6 md:p-8">
            <p className="eyebrow text-xs text-brass">{service.shortTitle}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl text-balance text-cream md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-silver md:text-base">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href={siteConfig.contactHref}
                tracking={{ type: "contact_click", location: "service_detail_hero", label: service.title }}
                className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-5 py-3 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5 hover:bg-cream focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                Start this project
                <ArrowUpRight size={15} />
              </TrackedLink>
              <TrackedLink
                href={siteConfig.whatsappHref}
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
            <p className="eyebrow text-xs text-brass">Service details</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs text-silver">
                  <Target size={15} className="text-brass" />
                  Fit
                </div>
                <p className="mt-3 text-sm leading-7 text-cream">{service.startingPoint}</p>
              </div>
              <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs text-silver">
                  <Clock3 size={15} className="text-brass" />
                  Timeline
                </div>
                <p className="mt-3 text-sm leading-7 text-cream">{service.timeline}</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.64fr_0.36fr]">
          <article className="rounded-[2.2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-6 sm:px-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Outcomes</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-balance md:text-5xl">
              What this service is designed to improve.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brass" />
                  <p className="text-sm leading-7 text-silver">{outcome}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[2.2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-6 sm:px-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Deliverables</p>
            <div className="mt-6 space-y-3">
              {service.deliverables.map((deliverable) => (
                <div key={deliverable} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-silver">
                  {deliverable}
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-xs text-brass">Process</p>
            <h2 className="mt-4 font-display text-4xl text-balance md:text-5xl">
              A simple path from unclear brief to launched work.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {service.process.map((step, index) => (
              <article key={step.title} className="section-card rounded-[1.8rem] p-5">
                <p className="text-3xl text-brass">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-5 text-base font-semibold text-cream">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-silver">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(214,161,74,0.055),rgba(255,255,255,0.032)_52%,rgba(102,169,255,0.04))] px-4 py-6 sm:px-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
          <div>
            <p className="eyebrow text-xs text-brass">Next step</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl text-balance md:text-5xl">
              Need this kind of build?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-8 text-silver md:text-base">
              Send the current stage of the project, what you want the service to achieve, and any deadline you are working toward.
            </p>
          </div>
          <TrackedLink
            href={siteConfig.contactHref}
            tracking={{ type: "email_click", location: "service_detail_cta", label: service.title }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            Email me
            <ArrowUpRight size={15} />
          </TrackedLink>
        </section>

        {relatedServices.length ? (
          <section className="mt-12">
            <p className="eyebrow text-xs text-brass">Related services</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/services/${relatedService.slug}`}
                  className="group rounded-[1.8rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 transition hover:border-brass/50 hover:bg-white/[0.045]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-3xl text-balance">{relatedService.shortTitle}</h3>
                    <ArrowUpRight size={16} className="mt-2 shrink-0 text-silver transition group-hover:text-brass" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-silver">{relatedService.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

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
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.seoKeywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle} | Edwin Promise`,
      description: service.metaDescription,
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
      title: `${service.metaTitle} | Edwin Promise`,
      description: service.metaDescription,
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
        <section className="grid gap-6 lg:grid-cols-[1fr_0.36fr]">
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
                href={CONTACT_HREF}
                tracking={{ type: "contact_click", location: "service_detail_hero", label: service.title }}
                className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-5 py-3 text-sm font-semibold text-charcoal! transition hover:-translate-y-0.5 hover:bg-cream focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                {service.ctaLabel}
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
                  {service.startingPoint}
                </p>
              </article>
              <article className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-silver">Timeline</p>
                <p className="mt-3 text-sm leading-7 text-cream">
                  {service.timeline}
                </p>
              </article>
              <article className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-silver">Investment</p>
                <p className="mt-3 text-sm leading-7 text-cream">
                  Starting from {service.investment.startingFrom}
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
            {service.outcomes.map((outcome, index) => (
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
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              Who this is for
            </h2>
            <p className="mt-4 text-sm leading-8 text-silver md:text-base">
              A clearer way to decide whether this service matches the problem you need solved.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-base font-semibold text-cream">Good fit</h3>
              <ul className="mt-5 space-y-3">
                {service.fit.good.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-silver">
                    <span aria-hidden="true" className="shrink-0">✅</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-base font-semibold text-cream">Not ideal for</h3>
              <ul className="mt-5 space-y-3">
                {service.fit.notIdeal.map((item) => {
                  const betterService = item.betterServiceSlug
                    ? getServiceBySlug(item.betterServiceSlug)
                    : null;

                  return (
                    <li key={item.text} className="flex gap-3 text-sm leading-7 text-silver">
                      <span aria-hidden="true" className="shrink-0">❌</span>
                      <span>
                        {item.text}
                        {betterService ? (
                          <>
                            {" "}
                            <Link
                              href={`/services/${betterService.slug}`}
                              className="text-brass underline-offset-4 transition hover:underline"
                            >
                              See {betterService.shortTitle}.
                            </Link>
                          </>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <p className="eyebrow text-xs text-brass">Investment</p>
          <h2 className="mt-4 font-display text-4xl text-balance md:text-5xl">
            Typical investment: Starting from {service.investment.startingFrom}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-silver md:text-base">
            Typical investment starts from {service.investment.startingFrom} depending on scope, content, integrations, and timeline. {service.investment.note}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-4xl text-balance md:text-5xl">
            Deliverables
          </h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {service.deliverables.map((deliverable) => (
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
              Timeline
            </h2>
            <p className="mt-4 text-sm leading-8 text-silver md:text-base">
              {service.timelineDetail.typical}
            </p>
          </div>
          <ol className="mt-8 grid gap-3">
            {service.timelineDetail.weeks.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-silver"
              >
                <span className="shrink-0 text-brass">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-silver">
            {service.timelineDetail.note}
          </p>
        </section>

        <section className="mt-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              Process
            </h2>
            <p className="mt-4 text-sm leading-8 text-silver md:text-base">
              A focused path matched to this service, from first decisions to launch-ready handoff.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {service.process.map((step, index) => (
              <article key={step.title} className="section-card rounded-[1.8rem] p-6">
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

        <section className="mt-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              Relevant project examples
            </h2>
            <p className="mt-4 text-sm leading-8 text-silver md:text-base">
              Contribution-focused examples without invented performance numbers.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {service.proofProjects.map((project) => (
              <article
                key={project.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-display text-3xl text-balance text-cream">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-silver">
                  {project.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              FAQs
            </h2>
            <p className="mt-4 text-sm leading-8 text-silver md:text-base">
              Quick answers before you decide whether to start this service.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {service.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="text-base font-semibold text-cream">
                  {faq.question}
                </h3>
                <p className="mt-4 text-sm leading-7 text-silver">
                  {faq.answer}
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
              {service.ctaLabel}
              <ArrowUpRight size={15} />
            </TrackedLink>
          </div>
        </section>

        {service.relatedInsights?.length ? (
          <section className="mt-12">
            <h2 className="font-display text-4xl text-balance md:text-5xl">
              Related insights
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {service.relatedInsights.map((insight) => (
                <Link
                  key={insight.href}
                  href={insight.href}
                  className="group rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-brass/50 hover:bg-white/[0.045]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-semibold text-cream">
                      {insight.title}
                    </h3>
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-silver transition group-hover:text-brass" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

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

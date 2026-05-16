import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skillGroups, siteConfig, timeline } from "@/lib/site-data";
import PillLabel from "@/components/pill-label";
import { getAboutSchema } from "@/lib/json-ld/json-ld";

export const revalidate = 60

// metadata
export const metadata: Metadata = {
  title: "About Edwin Promise | Full-Stack Web Developer",
  description:
    "Learn about Edwin Promise, a full-stack developer building fast websites, MVPs, and digital products for founders, startups, and businesses.",
  keywords: [
    "About Edwin Promise",
    "Edwin Promise",
    "full-stack developer",
    "web developer in Lagos",
    "web developer in Nigeria",
    "freelance web developer",
    "Next.js developer",
    "Laravel developer",
    "WordPress developer",
    "MVP developer",
    "business website developer",
    "SEO-ready websites",
  ],
  authors: [{ name: "Edwin Promise" }],
  creator: "Edwin Promise",
  publisher: "Edwin Promise",
  metadataBase: new URL("https://edwin-promise.vercel.app"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Edwin Promise | Full-Stack Web Developer",
    description:
      "I build fast, modern websites, MVPs, and digital products with clarity, purpose, and reliable execution.",
    url: "/about",
    siteName: "Edwin Promise",
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/images/aboutpage.jpg",
        width: 1200,
        height: 630,
        alt: "About Edwin Promise - Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Edwin Promise | Full-Stack Web Developer",
    description:
      "Full-stack developer building fast websites, MVPs, and digital products for founders, startups, and businesses.",
    images: ["/images/aboutpage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = getAboutSchema()

export default function AboutPage() {
  return (
    <>
      <script
        type="application/json+ld"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div id="about" className="section-shell py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-xs text-brass">About me</p>
            <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
              Building digital products with clarity, purpose, and reliable execution.
            </h1>
          </div>

          <div className="space-y-5 text-sm leading-8 text-silver md:text-base">
            <p>
            I’m Edwin Promise, a full-stack developer focused on helping founders, startups, and small businesses turn ideas into polished websites, MVPs, and digital products.
            </p>
            <p>
              I enjoy solving real business problems with clean interfaces, reliable backend systems, and practical product thinking. My work blends frontend development, backend architecture, SEO awareness, and launch-focused execution so businesses can move from idea to something people can actually use.
            </p>
            <p>
              Over time, I’ve worked on production-style projects, including collaborative builds that strengthened my understanding of real-world workflows, full-stack architecture, version control, and product delivery. I’m currently deepening my skills in cloud computing, and DevOps so I can build systems that are not only beautiful, but scalable and reliable.
            </p>
            <p>
              Outside code, I enjoy Asian movies, video games, and studying how digital products are designed, built, and improved. Those interests keep me creative, curious, and strategic in the way I approach problems.
            </p>
            <PillLabel href={siteConfig.contactHref} text="Reach out directly" />
          </div>
        </div>

        <section className="mt-12 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="section-card rounded-[2rem] p-6">
            <p className="text-xs text-silver">Role</p>
            <p className="mt-2 text-xl font-semibold text-cream">{siteConfig.role}</p>
            <p className="mt-6 text-xs text-silver">Base</p>
            <p className="mt-2 text-xl font-semibold text-cream">{siteConfig.location}</p>
            <p className="mt-6 text-xs text-silver">Availability</p>
            <p className="mt-2 text-xl font-semibold text-cream">{siteConfig.availability}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Approach</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Clarity first, polish always.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 p-4">
                <p className="text-sm font-semibold text-cream">Discover</p>
                <p className="mt-3 text-sm leading-7 text-silver">Understand the business goal, user flow, and key conversion point before designing or building.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 p-4">
                <p className="text-sm font-semibold text-cream">Build</p>
                <p className="mt-3 text-sm leading-7 text-silver">Ship responsive, production-ready interfaces with clean structure, reliable functionality, and purposeful motion.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 p-4">
                <p className="text-sm font-semibold text-cream">Refine</p>
                <p className="mt-3 text-sm leading-7 text-silver">Polish the details until the product feels intentional, stable, and easy to trust.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Timeline</p>
            <div className="mt-6 space-y-5">
              {timeline.map((item) => (
                <div key={item.year} className="border-l border-white/10 pl-5">
                  <p className="text-xs text-brass">{item.year}</p>
                  <h3 className="mt-2 text-lg font-semibold text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-silver">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
            <p className="eyebrow text-xs text-brass">Tools</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title} className="rounded-[1.5rem] border border-white/10 p-4">
                  <h3 className="text-lg font-semibold text-cream">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12">
          <Link href="/projects" className="inline-flex items-center gap-2 text-brass transition hover:text-cream">
            Continue to projects
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}

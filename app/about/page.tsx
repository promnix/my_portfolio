import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skillGroups, siteConfig, timeline } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div id="about" className="section-shell py-10 md:py-14">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow text-xs text-brass">About me</p>
          <h1 className="mt-4 font-display text-5xl text-balance md:text-6xl">
            A compact studio for polished product launches.
          </h1>
        </div>

        <div className="space-y-5 text-sm leading-8 text-silver md:text-base">
          <p>
            Promnix works with founders, startups, and product teams that need digital interfaces to feel clear, premium, and ready for real users.
          </p>
          <p>
            The studio is built around practical product thinking: define the flow, design the right interface, build the working surface, and refine the details that make the experience trusted.
          </p>
          <a href={siteConfig.contactHref} className="inline-flex items-center gap-2 text-brass transition hover:text-cream">
            Reach out directly
            <ArrowUpRight size={15} />
          </a>
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
              <p className="mt-3 text-sm leading-7 text-silver">Understand the flow, user goal, and conversion point before building UI.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 p-4">
              <p className="text-sm font-semibold text-cream">Build</p>
              <p className="mt-3 text-sm leading-7 text-silver">Ship responsive, production-ready interfaces with motion used to support hierarchy.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 p-4">
              <p className="text-sm font-semibold text-cream">Refine</p>
              <p className="mt-3 text-sm leading-7 text-silver">Clean the edges until the product feels intentional, stable, and trusted.</p>
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
        <Link href="/project" className="inline-flex items-center gap-2 text-brass transition hover:text-cream">
          Continue to projects
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}

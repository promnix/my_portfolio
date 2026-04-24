"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, MapPin, Sparkles } from "lucide-react";
import { blogPosts, featuredProjects, siteConfig, skillGroups, testimonials } from "@/lib/site-data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

export function PortfolioHome() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="hero-grid section-shell grid items-center gap-12 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
          <motion.div {...fadeUp} className="max-w-xl">
            <p className="eyebrow text-xs text-brass">{siteConfig.tagline}</p>
            <h1 className="mt-5 font-display text-[clamp(4.1rem,10vw,7.7rem)] leading-[0.9] text-balance">
              {siteConfig.name}
            </h1>
            <p className="mt-4 text-lg font-semibold text-cream/90 md:text-xl">
              {siteConfig.role}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-silver md:text-lg">
              {siteConfig.heroLead}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-silver/80 md:text-base">
              {siteConfig.heroBody}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contactHref}
                className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-6 py-3 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5 hover:bg-[#e2b267]"
              >
                Contact me
                <ArrowUpRight size={15} />
              </a>
              <Link
                href="/project"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel px-6 py-3 text-sm text-cream transition hover:border-brass hover:text-brass"
              >
                View projects
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-silver md:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel px-4 py-2">
                <MapPin size={14} className="text-brass" />
                {siteConfig.location}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel px-4 py-2">
                <Sparkles size={14} className="text-azure" />
                {siteConfig.availability}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
            className="relative mx-auto w-full max-w-[34rem]"
          >
            <div className="hero-orb aspect-[0.9] rounded-[2.5rem] p-6 md:p-8">
              <div className="flex h-full flex-col justify-between rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6">
                <div className="flex items-center justify-between text-xs text-silver">
                  <span className="eyebrow">Portfolio</span>
                  <span>2026 Edition</span>
                </div>

                <div className="relative mx-auto flex h-[18rem] w-[18rem] items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_25%,rgba(214,161,74,0.32),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] shadow-[0_30px_60px_rgba(0,0,0,0.3)] md:h-[22rem] md:w-[22rem]">
                  <div className="absolute inset-4 rounded-full border border-dashed border-brass/30" />
                  <div className="absolute inset-10 rounded-full border border-white/10" />
                  <div className="text-center">
                    <p className="font-display text-[clamp(4rem,12vw,7rem)] leading-none">
                      {siteConfig.shortName}
                    </p>
                    <p className="mt-2 text-xs tracking-[0.35em] text-silver uppercase">
                      Personal Brand
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-silver md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                    <p className="text-xs text-silver/70">Focus</p>
                    <p className="mt-2 text-cream">Cross-platform products with editorial polish.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
                    <p className="text-xs text-silver/70">Build style</p>
                    <p className="mt-2 text-cream">Fast delivery, clean motion, consistent finish.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section {...fadeUp} id="about" className="section-shell py-8 md:py-14">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="eyebrow text-xs text-brass">About</p>
            <h2 className="mt-4 max-w-sm font-display text-4xl text-balance md:text-5xl">
              Built with the same pacing and mood as the reference portfolio.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-8 text-silver md:text-base">
            <p>
              The structure follows the original closely: a cinematic hero, quiet support sections, a selected work list, testimonials, and a direct contact close.
            </p>
            <p>
              What changes next is the identity layer. Swap your real name, portrait, project history, and contact details, and the layout will already feel like your own.
            </p>
            <Link href="/about#about" className="inline-flex items-center gap-2 text-brass transition hover:text-cream">
              Read the full about page
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} id="skills" className="section-shell py-10 md:py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-xs text-brass">Skills</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Core tools and craft.</h2>
          </div>
          <p className="hidden max-w-md text-sm leading-7 text-silver md:block">
            The original site presents capability clearly and quickly. This version keeps that compact rhythm while grouping tools into readable lanes.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="section-card rounded-[1.75rem] p-5"
            >
              <p className="text-sm font-semibold text-cream">{group.title}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-xs text-silver"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} id="portfolio" className="section-shell py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-xs text-brass">Selected Work</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Projects with range and finish.</h2>
          </div>
          <Link href="/project" className="inline-flex items-center gap-2 text-sm text-silver transition hover:text-brass">
            Browse the full project page
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="project-row rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 md:p-7"
            >
              <div className="grid gap-5 md:grid-cols-[0.18fr_0.82fr]">
                <div className="text-sm text-silver">
                  <p>{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2">{project.year}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="eyebrow text-[0.68rem] text-brass">{project.accent}</p>
                    <span className="text-xs text-silver">{project.kind}</span>
                  </div>
                  <h3 className="mt-3 font-display text-3xl md:text-4xl">{project.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-silver md:text-base">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="section-shell py-10 md:py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-xs text-brass">What people say</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Delivery with polish.</h2>
          </div>
          <div className="hidden items-center gap-2 text-silver md:flex">
            <BriefcaseBusiness size={16} className="text-brass" />
            Trust grows in the details.
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.author}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="section-card rounded-[1.75rem] p-6"
            >
              <p className="text-sm leading-8 text-silver md:text-base">“{item.quote}”</p>
              <footer className="mt-6">
                <p className="font-semibold text-cream">{item.author}</p>
                <p className="text-sm text-silver">{item.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} id="blog" className="section-shell py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-xs text-brass">Blog</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Writing that adds context to the work.</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-silver transition hover:text-brass">
            Open the full blog page
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              className="section-card rounded-[1.85rem] transition hover:border-brass hover:bg-[rgba(255,255,255,0.05)]"
            >
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-silver">
                  <span className="eyebrow text-[0.68rem] text-brass">{post.category}</span>
                  <span>{post.publishedAt}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl text-balance">{post.title}</h3>
                <p className="mt-4 text-sm leading-7 text-silver">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.topics.slice(0, 2).map((topic) => (
                    <span key={topic} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver">
                      {topic}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeUp} id="contact" className="section-shell pb-20 pt-10 md:pb-24 md:pt-14">
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(214,161,74,0.18),rgba(255,255,255,0.04),rgba(102,169,255,0.14))] p-6 md:p-8">
          <p className="eyebrow text-xs text-brass">Final CTA</p>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="max-w-2xl font-display text-4xl text-balance text-cream md:text-6xl">
                Ready to swap in your real identity and ship this live.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-silver md:text-base">
                The main structure is already in place. Next step is replacing placeholders with your actual bio, links, projects, and portrait.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.contactHref}
                className="theme-cream-button inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5"
              >
                Email me
                <ArrowUpRight size={15} />
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-cream transition hover:border-cream hover:bg-white/5"
              >
                WhatsApp
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

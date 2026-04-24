"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, Menu, MoonStar, Search, SunMedium, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, siteConfig, socials } from "@/lib/site-data";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document === "undefined") {
      return "dark";
    }

    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {}
    setTheme(nextTheme);
  };

  return (
    <div className="site-frame grain min-h-screen bg-charcoal text-cream">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="section-shell pt-5">
          <div className="site-header-shell relative flex items-center justify-between rounded-[2rem] border border-white/10 bg-[rgba(18,18,18,0.78)] px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:rounded-full md:px-6">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(214,161,74,0.7),transparent)]" />

            <Link href="/" className="relative z-10 font-display text-2xl text-cream md:text-3xl">
              {siteConfig.name}
            </Link>

            <nav className="hidden items-center gap-7 md:flex">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel px-3 py-2 text-xs text-silver transition hover:border-brass hover:text-brass"
              >
                <Search size={14} />
                Search
              </Link>

              <div className="hidden items-center gap-7 text-sm text-silver lg:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-transparent pb-1 transition hover:border-brass/70 hover:text-brass"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <button
                type="button"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                onClick={toggleTheme}
                className="theme-toggle inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel px-3 py-2 text-xs text-silver transition hover:border-brass hover:text-brass"
              >
                {theme === "dark" ? <SunMedium size={14} /> : <MoonStar size={14} />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>

              <a
                href={siteConfig.contactHref}
                className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5 hover:bg-[#e2b267]"
              >
                <Mail size={15} />
                Contact me
              </a>
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                onClick={toggleTheme}
                className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-panel text-silver transition hover:border-brass hover:text-brass"
              >
                {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
              </button>
              <Link
                href="/search"
                aria-label="Open search"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-panel text-silver transition hover:border-brass hover:text-brass"
              >
                <Search size={16} />
              </Link>
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-panel text-cream transition hover:border-brass"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="site-mobile-overlay fixed inset-0 z-40 bg-[rgba(10,10,10,0.94)] px-6 pt-28 backdrop-blur-xl md:hidden"
          >
            <div className="section-card mx-auto max-w-lg rounded-[2rem] p-6">
              <p className="eyebrow text-xs text-silver">Portfolio</p>
              <h2 className="mt-3 font-display text-4xl">{siteConfig.name}</h2>
              <p className="mt-3 max-w-sm text-sm leading-7 text-silver">
                {siteConfig.tagline} developer helping startups and ambitious teams launch thoughtful products.
              </p>

              <div className="mt-8 grid gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="theme-toggle rounded-2xl border border-white/10 px-4 py-3 text-left transition hover:border-brass hover:text-brass"
                >
                  {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                </button>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-white/10 px-4 py-3 transition hover:border-brass hover:text-brass"
                >
                  Home
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 px-4 py-3 transition hover:border-brass hover:text-brass"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={siteConfig.contactHref}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-brass bg-brass px-4 py-3 font-semibold text-charcoal"
                >
                  Contact me
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="relative z-10 pt-24">{children}</main>

      <footer className="relative z-10 border-t border-white/10 pb-10 pt-14">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow text-xs text-brass">Elsewhere</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl text-balance md:text-5xl">
              Built to feel premium now, easy to personalize next.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-silver md:text-base">
              Replace the placeholder identity, project URLs, and social handles in one data file and the whole portfolio updates with it.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel px-4 py-2 text-sm text-silver transition hover:-translate-y-0.5 hover:border-brass hover:text-cream"
                >
                  {social.label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="section-card rounded-[2rem] p-6">
            <p className="text-xs text-silver">Based in</p>
            <p className="mt-2 text-lg font-semibold">{siteConfig.location}</p>
            <p className="mt-6 text-xs text-silver">Availability</p>
            <p className="mt-2 text-lg font-semibold">{siteConfig.availability}</p>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-brass px-5 py-2.5 text-sm text-brass transition hover:bg-brass hover:text-charcoal"
            >
              Start a project
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="section-shell mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-silver">
          <p>
            © 2026 <span className="font-semibold text-cream">{siteConfig.name}</span>. All rights reserved.
          </p>
          <p>Cloned structure, personalized branding, ready for content swap.</p>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`site-back-to-top fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(18,18,18,0.82)] text-cream shadow-[0_16px_42px_rgba(0,0,0,0.38)] backdrop-blur transition-all ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}

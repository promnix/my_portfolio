

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUpRight, ChevronDown, Mail, Menu, MoonStar, Search, SunMedium, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Easing } from "motion/react";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { SocialIcon } from "@/components/social-icon";
import { trackContactClick, trackExternalLinkClick, trackWhatsAppClick } from "@/lib/analytics";
import { navItems, services, siteConfig, socials } from "@/lib/site-data";

const MotionLink = motion.create(Link);
const siteEase: Easing = [0.22, 1, 0.36, 1];
const servicesMenuItems = [
  "business-website-design-development",
  "landing-pages-for-ads-and-campaigns",
  "wordpress-website-development",
  "mvp-development-for-founders",
]
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service): service is (typeof services)[number] => Boolean(service));

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioRoute = pathname === "/studio" || pathname.startsWith("/studio/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
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

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;

    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {}

    setTheme(nextTheme);
  };

  const handleNavClick = (href: string, event: MouseEvent<HTMLAnchorElement>, closeMenu = false) => {
    const [targetPath, hash] = href.split("#");
    const normalizedTargetPath = targetPath || "/";

    if (normalizedTargetPath !== pathname) {
      if (closeMenu) {
        setMenuOpen(false);
      }
      return;
    }

    event.preventDefault();

    if (closeMenu) {
      setMenuOpen(false);
    }

    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        window.history.pushState(null, "", href);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    window.history.pushState(null, "", normalizedTargetPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mobileMenuItemMotion = (index: number) => ({
    initial: { opacity: 0, x: -18 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
    transition: {
      duration: 0.26,
      delay: 0.08 + index * 0.055,
      ease: siteEase,
    },
  });

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <div className="site-shell grain min-h-screen bg-charcoal text-cream">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="section-shell pt-5">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, ease: siteEase }}
            className="site-header-shell relative flex items-center justify-between rounded-[2rem] border border-white/10 bg-[rgba(18,18,18,0.78)] px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl md:rounded-full md:px-6"
          >
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(214,161,74,0.7),transparent)]" />

            <Link
              href="/"
              onClick={(event) => handleNavClick("/", event)}
              className="relative z-10 font-display text-2xl text-cream"
            >
              {siteConfig.name}
            </Link>

            <nav className="hidden items-center gap-7 md:flex">
              <Link
                href="/search"
                className="micro-link micro-press inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel px-3 py-2 text-xs text-silver transition hover:border-brass hover:text-brass"
              >
                <Search size={14} />
                Search
              </Link>

              <div className="hidden items-center gap-7 text-sm text-silver lg:flex">
                {navItems.map((item) => (
                  item.href === "/services" ? (
                    <div
                      key={item.href}
                      className="relative py-2"
                      onMouseEnter={() => setDesktopServicesOpen(true)}
                      onMouseLeave={() => setDesktopServicesOpen(false)}
                      onFocus={() => setDesktopServicesOpen(true)}
                    >
                      <Link
                        href={item.href}
                        onClick={(event) => {
                          setDesktopServicesOpen(false);
                          handleNavClick(item.href, event);
                        }}
                        className={`nav-micro-link inline-flex items-center gap-1.5 border-b pb-1 transition hover:border-brass/70 hover:text-brass ${
                          desktopServicesOpen ? "border-brass/70 text-brass" : "border-transparent"
                        }`}
                        aria-haspopup="true"
                        aria-expanded={desktopServicesOpen}
                      >
                        {item.label}
                        <ArrowUpRight
                          size={12}
                          className={`transition ${desktopServicesOpen ? "-translate-y-0.5 translate-x-0.5" : ""}`}
                        />
                      </Link>

                      <div
                        className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 transition duration-200 ${
                          desktopServicesOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(18,18,18,0.94)] p-3 shadow-[0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                          <div className="px-3 py-2">
                            <p className="eyebrow text-[0.65rem] text-brass">Services</p>
                          </div>
                          <div className="grid gap-1">
                            {servicesMenuItems.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                onClick={() => setDesktopServicesOpen(false)}
                                className="rounded-[1.15rem] px-3 py-3 transition hover:bg-white/[0.05] hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                              >
                                <span className="block text-sm font-medium text-cream">{service.shortTitle}</span>
                                <span className="mt-1 block text-xs leading-5 text-silver">{service.summary}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(event) => handleNavClick(item.href, event)}
                      className="nav-micro-link border-b border-transparent pb-1 transition hover:border-brass/70 hover:text-brass"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>

              <button
                type="button"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                onClick={toggleTheme}
                className="micro-press theme-toggle inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel px-3 py-2 text-xs text-silver transition hover:border-brass hover:text-brass"
              >
                {theme === "dark" ? <SunMedium size={14} /> : <MoonStar size={14} />}
                {theme === "dark" ? "Light" : "Dark"}
              </button>

              <a
                href={siteConfig.contactHref}
                onClick={() => trackContactClick("site_header", "Contact me")}
                className="micro-link micro-press inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-5 py-2.5 text-sm font-semibold text-[#0b0b0b]! transition hover:-translate-y-0.5 hover:bg-[#e2b267]"
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
                className="micro-press theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-panel text-silver transition hover:border-brass hover:text-brass"
              >
                {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
              </button>
              <Link
                href="/search"
                aria-label="Open search"
                className="micro-press inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-panel text-silver transition hover:border-brass hover:text-brass"
              >
                <Search size={16} />
              </Link>
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => {
                  setMenuOpen((open) => {
                    if (open) {
                      setServicesMenuOpen(false);
                    }

                    return !open;
                  });
                }}
                className="micro-press inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-panel text-cream transition hover:border-brass"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="site-mobile-overlay fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[rgba(10,10,10,0.94)] px-6 pt-28 pb-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: siteEase }}
          >
            <motion.div
              className="overflow-auto max-h-[calc(100svh-7rem)]"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.985 }}
              transition={{ duration: 0.32, ease: siteEase }}
            >
              <motion.div
                className="section-card mx-auto max-w-lg rounded-[2rem] p-6"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.985 }}
                transition={{ duration: 0.32, ease: siteEase }}
              >
                <p className="eyebrow text-xs text-silver">Portfolio</p>
                <h2 className="mt-3 font-display text-4xl">{siteConfig.name}</h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-silver">
                  {siteConfig.tagline} studio helping startups and ambitious teams launch thoughtful products.
                </p>

                <div className="mt-8 grid gap-3">
                  <motion.button
                    type="button"
                    {...mobileMenuItemMotion(0)}
                    onClick={() => {
                      toggleTheme();
                      setMenuOpen(false);
                    }}
                    className="micro-press theme-toggle rounded-2xl border border-white/10 px-4 py-3 text-left transition hover:border-brass hover:text-brass"
                  >
                    {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  </motion.button>
                  <MotionLink
                    href="/"
                    {...mobileMenuItemMotion(1)}
                    onClick={(event) => {
                      setServicesMenuOpen(false);
                      handleNavClick("/", event, true);
                    }}
                    className="micro-press rounded-2xl border border-white/10 px-4 py-3 transition hover:border-brass hover:text-brass"
                  >
                    Home
                  </MotionLink>
                  {navItems.map((item, index) => (
                    item.href === "/services" ? (
                      <motion.div
                        key={item.href}
                        {...mobileMenuItemMotion(index + 2)}
                        className="rounded-2xl border border-white/10 p-3"
                      >
                        <button
                          type="button"
                          aria-expanded={servicesMenuOpen}
                          aria-controls="mobile-services-menu"
                          onClick={() => setServicesMenuOpen((open) => !open)}
                          className="micro-press flex w-full items-center justify-between gap-3 rounded-xl px-1 py-1 text-left transition hover:text-brass"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition ${servicesMenuOpen ? "rotate-180 text-brass" : "text-silver"}`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {servicesMenuOpen ? (
                            <motion.div
                              id="mobile-services-menu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: siteEase }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
                                <MotionLink
                                  href="/services"
                                  onClick={(event) => {
                                    handleNavClick("/services", event, true);
                                    setServicesMenuOpen(false);
                                  }}
                                  className="rounded-xl bg-white/[0.045] px-3 py-2 text-sm font-medium text-cream transition hover:text-brass"
                                >
                                  All services
                                </MotionLink>
                                {servicesMenuItems.map((service) => (
                                  <MotionLink
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    onClick={() => {
                                      setServicesMenuOpen(false);
                                      setMenuOpen(false);
                                    }}
                                    className="rounded-xl bg-white/[0.03] px-3 py-2 text-sm text-silver transition hover:text-brass"
                                  >
                                    {service.shortTitle}
                                  </MotionLink>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <MotionLink
                        key={item.href}
                        href={item.href}
                        {...mobileMenuItemMotion(index + 2)}
                        onClick={(event) => {
                          setServicesMenuOpen(false);
                          handleNavClick(item.href, event, true);
                        }}
                        className="micro-press rounded-2xl border border-white/10 px-4 py-3 transition hover:border-brass hover:text-brass"
                      >
                        {item.label}
                      </MotionLink>
                    )
                  ))}
                  <motion.a
                    href={siteConfig.contactHref}
                    {...mobileMenuItemMotion(navItems.length + 2)}
                    onClick={() => {
                      trackContactClick("mobile_menu", "Contact me");
                      setServicesMenuOpen(false);
                      setMenuOpen(false);
                    }}
                    className="micro-press rounded-2xl border border-brass bg-brass px-4 py-3 font-semibold text-charcoal!"
                  >
                    Contact me
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="relative z-10 pt-24">{children}</main>

      <footer className="relative z-10 border-t border-white/10 pb-10 pt-14">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow text-xs text-brass">Elsewhere</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl text-balance md:text-5xl">
              Building digital products with clarity and purpose.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-silver md:text-base">
              Follow my work across the channels where I share development updates, product thinking, project notes, and selected launches.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  onClick={() => trackExternalLinkClick(social.label, social.href, "site_footer_socials")}
                  className="micro-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-panel text-silver transition hover:-translate-y-0.5 hover:border-brass hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
                >
                  <SocialIcon label={social.label} />
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
              onClick={() => trackWhatsAppClick("site_footer_cta", "Start a project")}
              className="micro-link micro-press mt-8 inline-flex items-center gap-2 rounded-full border border-brass px-5 py-2.5 text-sm text-brass transition hover:bg-brass hover:text-charcoal"
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
          <p>Designed and built with a focus on clarity, speed, and polish.</p>
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

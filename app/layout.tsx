import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { IntroSplash } from "@/components/intro-splash";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialTheme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-theme={initialTheme}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => {
            const html = document.documentElement;
            const defaultTheme = ${JSON.stringify(initialTheme)};

            try {
              const storedTheme = window.localStorage.getItem("theme");
              const resolvedTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : defaultTheme;
              html.dataset.theme = resolvedTheme;
              window.localStorage.setItem("theme", resolvedTheme);
            } catch {
              html.dataset.theme = defaultTheme;
            }
          })();`}
        </Script>
        <Script id="intro-splash-dismiss" strategy="beforeInteractive">
          {`(() => {
            const html = document.documentElement;
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
            const minVisibleMs = reduceMotion ? 240 : isTouchDevice ? 950 : 1600;
            const exitMs = reduceMotion ? 120 : isTouchDevice ? 420 : 700;
            const startedAt = Date.now();

            const dismiss = () => {
              const remaining = Math.max(0, minVisibleMs - (Date.now() - startedAt));

              window.setTimeout(() => {
                const splash = document.getElementById("intro-splash");
                if (!splash) {
                  html.classList.remove("intro-lock");
                  return;
                }

                splash.setAttribute("data-state", "closing");

                window.setTimeout(() => {
                  splash.setAttribute("data-state", "hidden");
                  html.classList.remove("intro-lock");
                }, exitMs);
              }, remaining);
            };

            if (reduceMotion) {
              const hideSplash = () => {
                const splash = document.getElementById("intro-splash");
                if (splash) {
                  splash.setAttribute("data-state", "hidden");
                }
                html.classList.remove("intro-lock");
              };

              if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", hideSplash, { once: true });
              } else {
                hideSplash();
              }

              return;
            }

            if (!isTouchDevice) {
              html.classList.add("intro-lock");
            }

            if (document.readyState === "complete") {
              dismiss();
            } else {
              window.addEventListener("load", dismiss, { once: true });
            }
          })();`}
        </Script>
        <IntroSplash />
        <div id="app-shell" className="app-shell">
          <SiteShell>{children}</SiteShell>
        </div>
      </body>
    </html>
  );
}

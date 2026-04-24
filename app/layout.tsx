import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="intro-pending min-h-full">
        <Script id="intro-splash-dismiss" strategy="beforeInteractive">
          {`(() => {
            const html = document.documentElement;
            const body = document.body;
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const minVisibleMs = reduceMotion ? 240 : 1600;
            const exitMs = reduceMotion ? 120 : 700;
            const startedAt = Date.now();

            html.classList.add("intro-lock");

            const dismiss = () => {
              const remaining = Math.max(0, minVisibleMs - (Date.now() - startedAt));

              window.setTimeout(() => {
                const splash = document.getElementById("intro-splash");
                if (!splash) {
                  html.classList.remove("intro-lock");
                  body.classList.remove("intro-pending");
                  return;
                }

                splash.setAttribute("data-state", "closing");

                window.setTimeout(() => {
                  splash.setAttribute("data-state", "hidden");
                  html.classList.remove("intro-lock");
                  body.classList.remove("intro-pending");
                }, exitMs);
              }, remaining);
            };

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

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
      <body className="intro-pending min-h-full">
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

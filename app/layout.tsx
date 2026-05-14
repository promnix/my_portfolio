import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { AppBoot } from "@/components/app-boot";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site-data";
import "./globals.css";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const cormorantGaramond = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cormorant-garamond",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(siteConfig.url),
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
      className={`${manrope.variable} ${cormorantGaramond.variable} h-full antialiased`}
      data-theme={initialTheme}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <AppBoot initialTheme={initialTheme} />
        <div id="app-shell" className="app-shell">
          <SiteShell>{children}</SiteShell>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/privacy-policy-content";
import { getPrivacyPolicySchema } from "@/lib/json-ld/json-ld";
import { siteConfig } from "@/lib/site-data";

export const revalidate = 86400;

const LAST_UPDATED = "2026-06-18";
const LAST_UPDATED_DISPLAY = "June 18, 2026";

const metaDescription =
  "Privacy Policy for BuildWithPromise. Learn how we collect and use information from website forms, TikTok Lead Ads, Google Forms, email, WhatsApp, and analytics services.";

export const metadata: Metadata = {
  title: "Privacy Policy | BuildWithPromise",
  description: metaDescription,
  keywords: [
    "BuildWithPromise privacy policy",
    "Edwin Promise privacy policy",
    "website privacy policy",
    "TikTok lead ads privacy policy",
    "data collection policy",
    "cookie policy",
    "Google Analytics privacy",
  ],
  authors: [{ name: "Edwin Promise" }],
  creator: "Edwin Promise",
  publisher: "BuildWithPromise",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | BuildWithPromise",
    description: metaDescription,
    url: "/privacy-policy",
    siteName: "BuildWithPromise",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "BuildWithPromise Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | BuildWithPromise",
    description: metaDescription,
    images: ["/images/homepage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = getPrivacyPolicySchema(LAST_UPDATED);

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PrivacyPolicyContent lastUpdated={LAST_UPDATED_DISPLAY} />
    </>
  );
}

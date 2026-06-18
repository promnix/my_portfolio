import Link from "next/link";
import { PrivacyPolicyToc } from "@/components/privacy-policy-toc";

const PRIVACY_CONTACT = {
  businessName: "BuildWithPromise",
  contactPerson: "Edwin Promise",
  // email: "hello@buildwithpromise.com",
  whatsapp: "+2347058149298",
  whatsappHref: "https://wa.me/2347058149298",
} as const;

type PrivacyPolicyContentProps = {
  lastUpdated: string;
};

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <h2 id={`${id}-heading`} className="font-display text-3xl text-balance md:text-4xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-sm leading-8 text-silver md:text-base">{children}</div>
    </section>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brass">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function PrivacyPolicyContent({ lastUpdated }: PrivacyPolicyContentProps) {
  return (
    <div className="section-shell py-10 md:py-14">
      <header className="rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-6 md:p-8">
        <p className="eyebrow text-xs text-brass">Legal</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl text-balance md:text-6xl">Privacy Policy</h1>
        <p className="mt-5 max-w-3xl text-sm leading-8 text-silver md:text-base">
          This policy explains how {PRIVACY_CONTACT.businessName}, operated by {PRIVACY_CONTACT.contactPerson},
          collects, uses, and protects personal information when you visit our website, submit an inquiry, or interact
          with our services.
        </p>
        <p className="mt-4 text-xs text-silver">
          Last updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <PrivacyPolicyToc />
        </aside>

        <div className="space-y-12">
          <nav
            aria-label="Privacy policy sections"
            className="section-card rounded-[1.8rem] p-5 lg:hidden"
          >
            <p className="eyebrow text-[0.65rem] text-brass">Jump to section</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Introduction",
                "Information We Collect",
                "How We Use Information",
                "Lead Forms",
                "Cookies",
                "Third-Party Services",
                "Data Security",
                "User Rights",
                "Children",
                "Changes",
                "Contact",
              ].map((label, index) => {
                const ids = [
                  "introduction",
                  "information-we-collect",
                  "how-we-use-information",
                  "lead-forms-and-contact-forms",
                  "cookies-and-analytics",
                  "third-party-services",
                  "data-security",
                  "user-rights",
                  "childrens-privacy",
                  "changes-to-this-policy",
                  "contact-information",
                ];

                return (
                  <a
                    key={ids[index]}
                    href={`#${ids[index]}`}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver transition hover:border-brass/50 hover:text-brass"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </nav>

          <PolicySection id="introduction" title="Introduction">
            <p>
              {PRIVACY_CONTACT.businessName} provides web development and website design services for businesses,
              founders, and teams. We respect your privacy and are committed to handling personal information
              responsibly, transparently, and in line with applicable data protection principles.
            </p>
            <p>
              This Privacy Policy applies to information collected through the BuildWithPromise website, contact and
              lead generation forms, email communications, WhatsApp inquiries, and related business interactions. By
              using our website or submitting your information to us, you acknowledge that you have read and understood
              this policy.
            </p>
          </PolicySection>

          <PolicySection id="information-we-collect" title="Information We Collect">
            <p>
              Depending on how you interact with {PRIVACY_CONTACT.businessName}, we may collect the following types of
              personal and business-related information:
            </p>
            <PolicyList
              items={[
                "Name",
                "Email address",
                "Phone number",
                "Business information, such as company name, industry, or website details",
                "Project requirements submitted through contact forms, lead generation forms, WhatsApp, or email",
              ]}
            />
            <p>
              We may also collect limited technical information when you browse our website, such as browser type,
              device information, pages visited, and general usage data collected through cookies or analytics tools
              described later in this policy.
            </p>
          </PolicySection>

          <PolicySection id="how-we-use-information" title="How We Use Information">
            <p>We use the information we collect for legitimate business purposes, including to:</p>
            <PolicyList
              items={[
                "Respond to inquiries and follow up on project requests",
                "Provide website development, design, and related digital services",
                "Send project proposals, quotations, and service-related communications",
                "Improve website performance, usability, and user experience",
                "Maintain records of client conversations and project discussions where appropriate",
                "Comply with legal obligations and protect against misuse or fraud",
              ]}
            />
            <p>
              We do not sell your personal information. We only use your data for the purposes described in this
              policy or as otherwise communicated to you at the point of collection.
            </p>
          </PolicySection>

          <PolicySection id="lead-forms-and-contact-forms" title="Lead Forms and Contact Forms">
            <p>
              If you submit information through any of our inquiry channels, we may store and process that information
              so we can understand your needs and respond appropriately. Data may be collected through:
            </p>
            <PolicyList
              items={[
                "Website contact forms on buildwithpromise.com",
                "TikTok Lead Generation Forms connected to our advertising campaigns",
                "Google Forms used for intake, discovery, or project questionnaires",
                "Email communications sent to hello@buildwithpromise.com or related business addresses",
                "WhatsApp inquiries sent to our business number",
              ]}
            />
            <p>
              Information submitted through these channels may be reviewed by {PRIVACY_CONTACT.contactPerson} or
              authorized team members involved in sales, project scoping, or service delivery. Please only submit
              information you are comfortable sharing for the purpose of discussing a potential project or service
              request.
            </p>
          </PolicySection>

          <PolicySection id="cookies-and-analytics" title="Cookies and Analytics">
            <p>
              Our website may use cookies and similar technologies to help us understand how visitors use the site,
              measure performance, and improve the experience. These tools may collect anonymized or aggregated usage
              data such as page views, referral sources, session duration, and general interaction patterns.
            </p>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-base font-semibold text-cream">Google Analytics</h3>
              <p className="mt-3">
                We use Google Analytics to understand website traffic and visitor behavior. Google Analytics may set
                cookies and collect information such as pages visited, time on site, and general device or browser
                details. You can learn more about how Google uses data at{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brass underline decoration-brass/40 underline-offset-4 transition hover:text-cream"
                >
                  Google&apos;s partner sites policy
                </a>
                .
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-base font-semibold text-cream">Google Search Console</h3>
              <p className="mt-3">
                We use Google Search Console to monitor search performance, indexing status, and technical SEO health
                for our website. Search Console provides aggregated data about how our site appears in Google Search
                and does not give us direct access to personally identifiable visitor information from routine browsing.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-base font-semibold text-cream">Vercel Analytics</h3>
              <p className="mt-3">
                Where enabled, we may use Vercel Analytics to measure page performance, traffic trends, and site
                reliability. Vercel Analytics is designed to provide privacy-friendly, aggregated insights without
                relying on invasive tracking for core metrics.
              </p>
            </div>

            <p>
              You can control or disable cookies through your browser settings. Please note that blocking certain
              cookies may affect how some parts of the website function.
            </p>
          </PolicySection>

          <PolicySection id="third-party-services" title="Third-Party Services">
            <p>
              To operate our website and business effectively, we may rely on trusted third-party providers. These
              services may process limited data on our behalf or according to their own privacy policies. Examples
              include:
            </p>
            <PolicyList
              items={[
                "Google (Analytics, Search Console, Forms, and related workspace tools)",
                "TikTok (Lead Generation and advertising platforms)",
                "Vercel (website hosting and performance analytics)",
                "Email and communication providers used to manage business correspondence",
                "Form, CRM, or project management tools used to organize inquiries and client work",
              ]}
            />
            <p>
              We encourage you to review the privacy policies of any third-party platform you use to contact us or
              submit information. {PRIVACY_CONTACT.businessName} is responsible for how we handle information once it
              reaches our systems, but third-party platforms may process data under their own terms.
            </p>
          </PolicySection>

          <PolicySection id="data-security" title="Data Security">
            <p>
              We take reasonable technical and organizational measures to protect personal information against
              unauthorized access, loss, misuse, or disclosure. These measures may include secure hosting environments,
              access controls, and careful handling of business communications.
            </p>
            <p>
              No method of transmission over the internet or electronic storage is completely secure. While we work to
              protect your information, we cannot guarantee absolute security. Please avoid sending highly sensitive
              personal data unless it is necessary for your inquiry and you are comfortable doing so.
            </p>
          </PolicySection>

          <PolicySection id="user-rights" title="User Rights">
            <p>
              Depending on your location, you may have rights regarding your personal information. These may include
              the right to request access, correction, deletion, or restriction of certain processing activities, as
              well as the right to object to specific uses of your data where applicable law provides those rights.
            </p>
            <p>
              To make a privacy-related request, contact us using the details in the Contact Information section below.
              We may need to verify your identity before responding and will aim to address legitimate requests within
              a reasonable timeframe.
            </p>
          </PolicySection>

          <PolicySection id="childrens-privacy" title="Children's Privacy">
            <p>
              Our website and services are intended for businesses, founders, and adults seeking professional web
              development services. {PRIVACY_CONTACT.businessName} does not knowingly collect personal information
              from children under the age of 13. If you believe a child has provided us with personal information,
              please contact us and we will take appropriate steps to review and remove that information where
              required.
            </p>
          </PolicySection>

          <PolicySection id="changes-to-this-policy" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our services, legal
              requirements, or data practices. When we make material updates, we will revise the &quot;Last
              updated&quot; date at the top of this page.
            </p>
            <p>
              We encourage you to review this page periodically so you remain informed about how we handle personal
              information. Continued use of our website after an update constitutes acceptance of the revised policy,
              unless applicable law requires otherwise.
            </p>
          </PolicySection>

          <PolicySection id="contact-information" title="Contact Information">
            <p>
              If you have questions about this Privacy Policy or how we handle your information, you can contact us
              using the details below:
            </p>
            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <dl className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-xs text-silver">Business Name</dt>
                  <dd className="mt-1 font-semibold text-cream">{PRIVACY_CONTACT.businessName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-silver">Contact Person</dt>
                  <dd className="mt-1 font-semibold text-cream">{PRIVACY_CONTACT.contactPerson}</dd>
                </div>
                {/* <div>
                  <dt className="text-xs text-silver">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${PRIVACY_CONTACT.email}`}
                      className="font-semibold text-brass underline decoration-brass/40 underline-offset-4 transition hover:text-cream"
                    >
                      {PRIVACY_CONTACT.email}
                    </a>
                  </dd>
                </div> */}
                <div>
                  <dt className="text-xs text-silver">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={PRIVACY_CONTACT.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-brass underline decoration-brass/40 underline-offset-4 transition hover:text-cream"
                    >
                      {PRIVACY_CONTACT.whatsapp}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </PolicySection>

          <div className="border-t border-white/10 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-brass transition hover:text-cream"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

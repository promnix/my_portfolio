const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "lead-forms-and-contact-forms", label: "Lead Forms and Contact Forms" },
  { id: "cookies-and-analytics", label: "Cookies and Analytics" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "data-security", label: "Data Security" },
  { id: "user-rights", label: "User Rights" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "changes-to-this-policy", label: "Changes to This Policy" },
  { id: "contact-information", label: "Contact Information" },
] as const;

export function PrivacyPolicyToc() {
  return (
    <nav aria-label="Privacy policy table of contents" className="lg:sticky lg:top-28 lg:self-start">
      <div className="section-card rounded-[1.8rem] p-5 md:p-6">
        <p className="eyebrow text-[0.65rem] text-brass">On this page</p>
        <ol className="mt-4 space-y-2 text-sm">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-start gap-2 rounded-xl px-2 py-1.5 text-silver transition hover:bg-white/[0.04] hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              >
                <span className="mt-0.5 text-xs text-brass/80">{String(index + 1).padStart(2, "0")}</span>
                <span className="leading-6">{section.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

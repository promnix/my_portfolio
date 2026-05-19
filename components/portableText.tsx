import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

type ExternalLinkMark = {
  href?: string;
  openInNewTab?: boolean;
};

type InternalLinkMark = {
  slug?: string;
  type?: "blogPost" | "project";
};

type PortableImageValue = {
  asset?: unknown;
  alt?: string;
  caption?: string;
};

type CalloutValue = {
  tone?: "note" | "tip" | "warning";
  text?: string;
};

type CodeBlockValue = {
  language?: string;
  code?: string;
};

function linkClassName() {
  return "rounded-sm bg-brass/10 px-1 font-semibold text-brass underline! decoration-brass! decoration-2! underline-offset-4! transition! duration-200! hover:bg-brass! hover:text-charcoal! hover:decoration-brass! focus-visible:outline! focus-visible:outline-2! focus-visible:outline-offset-3 focus-visible:outline-brass";
}

function resolveInternalHref(value?: InternalLinkMark) {
  if (!value?.slug) return null;

  if (value.type === "project") {
    return `/projects/${value.slug}`;
  }

  return `/blog/${value.slug}`;
}

function ExternalLink({
  children,
  value,
}: {
  children?: ReactNode;
  value?: ExternalLinkMark;
}) {
  if (!value?.href) return <>{children}</>;

  const openInNewTab = value.openInNewTab ?? true;

  return (
    <a
      href={value.href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={linkClassName()}
    >
      {children}
    </a>
  );
}

function InternalLink({
  children,
  value,
}: {
  children?: ReactNode;
  value?: InternalLinkMark;
}) {
  const href = resolveInternalHref(value);

  if (!href) return <>{children}</>;

  return (
    <Link href={href} className={linkClassName()}>
      {children}
    </Link>
  );
}

const portableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="text-base leading-6 md:leading-8 text-silver md:text-lg">{children}</p>
        ),
        h2: ({ children }) => (
            <h2 className="pt-4 font-display text-3xl text-cream md:text-4xl">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="pt-2 font-display text-[1.4rem] md:text-2xl text-cream">{children}</h3>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brass pl-5 text-lg leading-8 text-cream">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="ml-5 list-disc space-y-3 text-sm leading-8 text-silver md:text-base">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="ml-5 list-decimal space-y-3 text-sm leading-8 text-silver md:text-base">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="pl-1">{children}</li>,
        number: ({ children }) => <li className="pl-1">{children}</li>,
    },
    marks: {
        externalLink: ExternalLink,
        internalLink: InternalLink,
        code: ({ children }) => (
            <code className="rounded-md border border-white/10 bg-black/30 px-1.5 py-0.5 font-mono text-[0.9em] text-cream">
                {children}
            </code>
        ),
    },
    types: {
        image: ({ value }) => {
            const image = value as PortableImageValue;

            if (!image.asset) return null;

            return (
                <figure className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
                <Image
                    src={urlFor(image).width(1200).height(760).fit("max").url()}
                    alt={image.alt || ""}
                    width={1200}
                    height={760}
                    className="h-auto w-full object-cover"
                />
                {image.caption ? (
                    <figcaption className="px-5 py-4 text-sm text-silver">
                    {image.caption}
                    </figcaption>
                ) : null}
                </figure>
            );
        },
        callout: ({ value }) => {
            const callout = value as CalloutValue;
            const toneClassName =
                callout.tone === "warning"
                ? "border-red-400/35 bg-red-400/10"
                : callout.tone === "tip"
                    ? "border-blue-300/30 bg-blue-300/10"
                    : "border-brass/35 bg-brass/10";

            return (
                <aside
                className={`rounded-3xl border p-5 text-sm leading-7 text-cream ${toneClassName}`}
                >
                {callout.text}
                </aside>
            );
        },
        codeBlock: ({ value }) => {
            const block = value as CodeBlockValue;

            if (!block.code) return null;

            return (
                <pre className="overflow-x-auto rounded-3xl border border-white/10 bg-black/40 p-5 text-sm leading-7 text-silver">
                    <code>{block.code}</code>
                </pre>
            );
        },
    },
} satisfies PortableTextComponents;

export default portableTextComponents;

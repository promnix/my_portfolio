"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Link2, MessageCircle, Send, Share2 } from "lucide-react";

type BlogShareProps = {
  title: string;
  excerpt: string;
  url: string;
};

const shareLinkClassName =
  "micro-press inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs font-medium text-silver transition hover:border-brass hover:text-brass";

export function BlogShare({ title, excerpt, url }: BlogShareProps) {
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} - ${excerpt}`);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const showCopiedState = () => {
    setCopied(true);

    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
    }

    copiedTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  const copyLink = async () => {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(url);
    showCopiedState();
  };

  const shareArticle = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: excerpt,
        url,
      });
      return;
    }

    await copyLink();
  };

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4">
      <p className="text-xs text-silver">Share article</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={shareArticle}
          className="micro-press inline-flex h-10 items-center justify-center gap-2 rounded-full border border-brass bg-brass px-4 text-xs font-semibold text-[#0b0b0b] transition hover:bg-[#e2b267]"
        >
          <Share2 size={14} />
          Share
        </button>

        <button type="button" onClick={copyLink} className={shareLinkClassName}>
          <Copy size={14} />
          {copied ? "Copied" : "Copy"}
        </button>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={shareLinkClassName}
        >
          <Link2 size={14} />
          LinkedIn
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className={shareLinkClassName}
        >
          <Send size={14} />
          X
        </a>

        <a
          href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={shareLinkClassName}
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

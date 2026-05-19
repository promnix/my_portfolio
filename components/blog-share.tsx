"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Link2, MessageCircle, Send, Share2 } from "lucide-react";

type BlogShareProps = {
  title: string;
  excerpt: string;
  url: string;
};

const shareLinkClassName =
  "micro-press inline-flex min-h-11 flex-1 basis-[8.5rem] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 text-xs font-medium text-silver transition hover:-translate-y-0.5 hover:border-brass hover:bg-white/[0.07] hover:text-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass";

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
    <div className="rounded-[1.35rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 sm:p-5">
      <p className="text-xs text-silver">Share article</p>

      <div className="mt-3 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={shareArticle}
          className="micro-press inline-flex min-h-11 flex-[1.15] basis-[8.5rem] items-center justify-center gap-2 rounded-full border border-[#f0c778] bg-[#e0ad57] px-4 text-xs font-bold text-[#090807] transition hover:-translate-y-0.5 hover:bg-[#efc36f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
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

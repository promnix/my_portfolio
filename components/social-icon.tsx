type SocialIconProps = {
  label: string;
  className?: string;
};

const iconClass = "h-5 w-5";

export function SocialIcon({ label, className = iconClass }: SocialIconProps) {
  switch (label) {
    case "LinkedIn":
      return (
        <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.36 8h4.28v15H.36V8Zm7.12 0h4.1v2.05h.06c.57-1.08 1.97-2.22 4.05-2.22 4.34 0 5.14 2.86 5.14 6.57V23h-4.28v-7.62c0-1.82-.03-4.16-2.53-4.16-2.54 0-2.93 1.98-2.93 4.03V23H7.48V8Z" />
        </svg>
      );
    case "GitHub":
      return (
        <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.11.79-.25.79-.56v-2.2c-3.22.7-3.9-1.38-3.9-1.38-.53-1.35-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.57-.29-5.28-1.29-5.28-5.73 0-1.27.45-2.3 1.2-3.11-.12-.3-.52-1.48.11-3.07 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.19-1.19 3.19-1.19.64 1.59.24 2.77.12 3.07.75.81 1.2 1.84 1.2 3.11 0 4.46-2.71 5.43-5.3 5.72.42.36.79 1.08.79 2.18v3.23c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      );
    case "X":
      return (
        <svg className={className} aria-hidden="true" viewBox="0 0 32 30" fill="currentColor">
          <path d="M25.2.5h4.91L19.39 12.78 32 29.5h-9.87l-7.74-10.14L5.54 29.5H.63l11.46-13.14L0 .5h10.13l6.98 9.27L25.2.5Zm-1.73 26.06h2.72L8.64 3.29H5.72l17.75 23.27Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
        </svg>
      );
    case "TikTok":
      return (
        <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.6 5.82a5.6 5.6 0 0 0 3.48 1.2v3.45a9 9 0 0 1-3.48-.7v5.98A6.25 6.25 0 1 1 10.35 9.5c.43 0 .86.04 1.27.13v3.62a2.8 2.8 0 1 0 1.88 2.65V1h3.1v4.82Z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2a9.8 9.8 0 0 0-8.45 14.77L2.5 22l5.36-1.04A9.77 9.77 0 1 0 12.04 2Zm0 17.74a7.7 7.7 0 0 1-3.92-1.07l-.38-.23-3.18.62.64-3.1-.25-.4a7.74 7.74 0 1 1 7.09 4.18Zm4.42-5.8c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.3 7.3 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      );
    default:
      return null;
  }
}

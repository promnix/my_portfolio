"use client";

import { useEffect, useState } from "react";

export function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        if (scrollableHeight <= 0) {
          setProgress(0);
          return;
        }

        const nextProgress = Math.min(
          1,
          Math.max(0, window.scrollY / scrollableHeight),
        );

        setProgress(nextProgress);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-0.5 bg-white/[0.04]"
    >
      <div
        className="h-full origin-left bg-brass transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

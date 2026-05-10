"use client";

import { useEffect } from "react";

type AppBootProps = {
  initialTheme: "dark" | "light";
};

export function AppBoot({ initialTheme }: AppBootProps) {
  useEffect(() => {
    const html = document.documentElement;

    try {
      const storedTheme = window.localStorage.getItem("theme");
      const resolvedTheme =
        storedTheme === "light" || storedTheme === "dark" ? storedTheme : initialTheme;

      html.dataset.theme = resolvedTheme;
      window.localStorage.setItem("theme", resolvedTheme);
    } catch {
      html.dataset.theme = initialTheme;
    }
  }, [initialTheme]);

  useEffect(() => {
    const html = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const minVisibleMs = reduceMotion ? 240 : isTouchDevice ? 950 : 1600;
    const exitMs = reduceMotion ? 120 : isTouchDevice ? 420 : 700;
    const startedAt = Date.now();

    const hideSplash = () => {
      const splash = document.getElementById("intro-splash");

      if (splash) {
        splash.setAttribute("data-state", "hidden");
      }

      html.classList.remove("intro-lock");
    };

    if (reduceMotion) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", hideSplash, { once: true });
        return () => document.removeEventListener("DOMContentLoaded", hideSplash);
      }

      hideSplash();
      return;
    }

    if (!isTouchDevice) {
      html.classList.add("intro-lock");
    }

    const dismiss = () => {
      const remaining = Math.max(0, minVisibleMs - (Date.now() - startedAt));

      window.setTimeout(() => {
        const splash = document.getElementById("intro-splash");

        if (!splash) {
          html.classList.remove("intro-lock");
          return;
        }

        splash.setAttribute("data-state", "closing");

        window.setTimeout(() => {
          splash.setAttribute("data-state", "hidden");
          html.classList.remove("intro-lock");
        }, exitMs);
      }, remaining);
    };

    if (document.readyState === "complete") {
      dismiss();
      return;
    }

    window.addEventListener("load", dismiss, { once: true });
    return () => window.removeEventListener("load", dismiss);
  }, []);

  return null;
}

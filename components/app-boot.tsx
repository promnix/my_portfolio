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

  return null;
}

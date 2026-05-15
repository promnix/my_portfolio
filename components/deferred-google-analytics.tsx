"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

type DeferredGoogleAnalyticsProps = {
  gaId: string;
};

export function DeferredGoogleAnalytics({ gaId }: DeferredGoogleAnalyticsProps) {
  const [canLoadAnalytics, setCanLoadAnalytics] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleCallbackId = window.requestIdleCallback(() => {
        setCanLoadAnalytics(true);
      });

      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = globalThis.setTimeout(() => {
      setCanLoadAnalytics(true);
    }, 2500);

    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!canLoadAnalytics) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}

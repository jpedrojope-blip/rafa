"use client";

import { useEffect } from "react";

type TrackableWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function Analytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;
      if (!target) return;

      const trackedWindow = window as TrackableWindow;
      trackedWindow.dataLayer = trackedWindow.dataLayer ?? [];
      trackedWindow.dataLayer.push({
        event: "lead_click",
        channel: target.dataset.track,
        label: target.dataset.trackLabel ?? target.textContent?.trim() ?? "",
        href: target instanceof HTMLAnchorElement ? target.href : undefined,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

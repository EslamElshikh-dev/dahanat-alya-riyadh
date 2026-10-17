"use client";

import { useEffect } from "react";
import { googleAdsId, isLiveContactPage, trackContactActivation } from "@/lib/contact-tracking";

type GoogleTag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GoogleTag;
  }
}

export function GoogleAdsTracking() {
  useEffect(() => {
    if (!isLiveContactPage(window.location.hostname, window.location.pathname)) return;

    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params -- Preserve Google's documented gtag command queue format.
    window.gtag = window.gtag || function gtag() { window.dataLayer!.push(arguments); };

    if (!document.getElementById("alya-google-ads")) {
      window.gtag("js", new Date());
      window.gtag("config", googleAdsId);
      const script = document.createElement("script");
      script.id = "alya-google-ads";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`;
      document.head.appendChild(script);
    }

    const onClick = (event: MouseEvent) => {
      if (!isLiveContactPage(window.location.hostname, window.location.pathname)) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      trackContactActivation({ href: anchor.href, button: event.button, defaultPrevented: event.defaultPrevented },
        parameters => window.gtag?.("event", "conversion", parameters));
    };

    // One delegated listener covers header, footer, product and floating buttons.
    // Do not preventDefault, replace phone numbers or wait before opening a link.
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

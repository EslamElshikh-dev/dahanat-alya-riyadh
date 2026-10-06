"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One observer per page. No scroll handlers, timers, or animation library.
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion.matches || connection?.saveData || !("IntersectionObserver" in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".section-heading, .product-card, .studio-visual, .studio-copy, .service-card, .faq-layout, .contact-band > .container-shell, .footer-grid"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px 48px 0px" });

    for (const element of targets) {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) continue;
      element.classList.add("motion-ready");
      observer.observe(element);
    }
    const stop = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      targets.forEach(element => element.classList.remove("motion-ready", "is-revealed"));
    };
    reducedMotion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", stop);
      targets.forEach(element => element.classList.remove("motion-ready", "is-revealed"));
    };
  }, [pathname]);
  return null;
}

import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-09-10"),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));
  const servicePages = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified: new Date("2026-09-10"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  return [...pages, ...servicePages];
}

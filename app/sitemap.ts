import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { catalogs } from "@/data/catalogs";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-06");
  const pages = ["", "/products", "/services", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));
  const servicePages = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  const catalogPages = catalogs.map((catalog) => ({
    url: `${site.url}/products/${catalog.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  return [...pages, ...catalogPages, ...servicePages];
}

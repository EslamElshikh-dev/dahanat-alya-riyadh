import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-09-10");
  const pages = ["", "/products", "/about", "/contact", "/en", "/en/products", "/en/about", "/en/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: updated,
    changeFrequency: path === "" || path === "/en" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" || path === "/en" ? 1 : 0.8,
  }));
  const productPages = products.flatMap((product) => [
    { url: `${site.url}/products/${product.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.85 },
    { url: `${site.url}/en/products/${product.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.85 },
  ]);
  return [...pages, ...productPages];
}

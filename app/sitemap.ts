import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { site } from "@/data/site";
export default function sitemap():MetadataRoute.Sitemap {return [...["","/products","/services","/about","/contact"].map(path=>({url:`${site.url}${path}`,lastModified:new Date("2026-10-06"),changeFrequency:"monthly" as const,priority:path===""?1:0.8})),...products.map(product=>({url:`${site.url}/products/${product.slug}`,lastModified:new Date("2026-10-06"),changeFrequency:"monthly" as const,priority:0.8})),...services.map(service=>({url:`${site.url}/services/${service.slug}`,lastModified:new Date("2026-10-06"),changeFrequency:"monthly" as const,priority:0.8}))];}

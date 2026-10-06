import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { publicProducts } from "@/lib/admin/catalog";
import { site } from "@/data/site";
export const dynamic="force-dynamic";
export default async function sitemap():Promise<MetadataRoute.Sitemap> {const products=await publicProducts();return [...["","/products","/services","/about","/contact"].map(path=>({url:`${site.url}${path}`,lastModified:new Date("2026-10-06"),changeFrequency:"monthly" as const,priority:path===""?1:0.8})),...products.map(product=>({url:`${site.url}/products/${product.slug}`,lastModified:new Date(product.updatedAt),changeFrequency:"monthly" as const,priority:0.8})),...services.map(service=>({url:`${site.url}/services/${service.slug}`,lastModified:new Date("2026-10-06"),changeFrequency:"monthly" as const,priority:0.8}))];}

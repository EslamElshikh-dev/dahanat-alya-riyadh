import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page";

export const metadata: Metadata = {
  title: "Insulation & Paint Products",
  description: "Explore 17 Alya Thermal and Alya Paints products for insulation, waterproofing, primers, textures and architectural finishes.",
  alternates: { canonical: "/en/products", languages: { "ar-SA": "/products", "en-SA": "/en/products" } },
};

export default function Page() {
  return <ProductsPage locale="en" />;
}

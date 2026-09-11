import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page";

export const metadata: Metadata = {
  title: "منتجات العزل والدهانات",
  description: "استعرض 17 منتجًا من Alya Thermal وAlya Paints: عزل حراري ومائي، برايمرات، دهانات داخلية وخارجية وتكسيات معمارية.",
  alternates: { canonical: "/products", languages: { "ar-SA": "/products", "en-SA": "/en/products" } },
};

export default function Page() {
  return <ProductsPage locale="ar" />;
}

import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "عن كيميا عليا",
  description: "تعرف على كيميا عليا للصناعات المحدودة وعائلتي منتجات Alya Thermal وAlya Paints لأنظمة العزل والدهانات المعمارية.",
  alternates: { canonical: "/about", languages: { "ar-SA": "/about", "en-SA": "/en/about" } },
  openGraph: { title: "عن كيميا عليا", description: site.description, locale: "ar_SA" },
};

export default function Page() {
  return <AboutPage locale="ar" />;
}

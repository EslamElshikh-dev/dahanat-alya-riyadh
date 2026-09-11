import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "تواصل مع كيميا عليا",
  description: `تواصل مع كيميا عليا في الرياض على ${site.phoneDisplay} لطلبات المنتجات والمشاريع والتوزيع وعروض الأسعار.`,
  alternates: { canonical: "/contact", languages: { "ar-SA": "/contact", "en-SA": "/en/contact" } },
};

export default function Page() {
  return <ContactPage locale="ar" />;
}

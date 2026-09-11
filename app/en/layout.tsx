import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { default: "ALYA CHEMICAL | Advanced Coating Systems", template: "%s | ALYA CHEMICAL" },
  description: site.descriptionEn,
  alternates: { canonical: "/en", languages: { "ar-SA": "/", "en-SA": "/en" } },
  openGraph: { locale: "en_SA", title: "ALYA CHEMICAL | Advanced Coating Systems", description: site.descriptionEn },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="en" dir="ltr" className="font-en">{children}</div>;
}

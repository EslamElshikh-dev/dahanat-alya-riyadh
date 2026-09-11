import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ALYA CHEMICAL For Industry Ltd. and the Alya Thermal and Alya Paints product families.",
  alternates: { canonical: "/en/about", languages: { "ar-SA": "/about", "en-SA": "/en/about" } },
};

export default function Page() {
  return <AboutPage locale="en" />;
}

import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ALYA CHEMICAL in Riyadh on ${site.phoneDisplay} for product, project, distribution and quotation enquiries.`,
  alternates: { canonical: "/en/contact", languages: { "ar-SA": "/contact", "en-SA": "/en/contact" } },
};

export default function Page() {
  return <ContactPage locale="en" />;
}

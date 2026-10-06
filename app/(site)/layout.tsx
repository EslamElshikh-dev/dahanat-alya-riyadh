import { FloatingContact } from "@/components/floating-contact";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
export default function WebsiteLayout({children}:{children:React.ReactNode}) {
  return <><StructuredData/><SiteHeader/><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter/><FloatingContact/><ScrollReveal/></>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ChevronLeft, ArrowUpLeft } from "lucide-react";
import { BusinessLocation } from "@/components/business-location";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { businessLocation, site, whatsappUrl, defaultWhatsAppMessage } from "@/data/site";

const description = `تواصل مع ${site.name} في ${businessLocation.district} بالرياض على ${site.phoneRaw}. الموقع على خرائط Google وساعات العمل يوميًا من 9 صباحًا إلى 5 مساءً.`;
export const metadata: Metadata = {
  title: "تواصل مع دهانات عليا",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "تواصل مع دهانات عليا", description, url: "/contact" },
  twitter: { title: "تواصل مع دهانات عليا", description },
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "ContactPage",
      "@id": `${site.url}/contact#page`,
      name: "تواصل مع دهانات عليا",
      description,
      url: `${site.url}/contact`,
      inLanguage: "ar-SA",
      mainEntity: { "@id": `${site.url}/#business` },
      isPartOf: { "@id": `${site.url}/#website` },
      breadcrumb: { "@id": `${site.url}/contact#breadcrumb` },
    }, {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/contact#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: site.url },
        { "@type": "ListItem", position: 2, name: "تواصل معنا", item: `${site.url}/contact` },
      ],
    }],
  };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className="page-hero"><div className="container-shell">
      <nav className="breadcrumbs contact-breadcrumbs" aria-label="مسار التنقل"><Link href="/">الرئيسية</Link><ChevronLeft size={14} /><span>تواصل معنا</span></nav>
      <span className="eyebrow">يسعدنا تواصلك</span><h1>لنختار معًا،<br />ما يليق بمكانك.</h1><p>استفسر عن منتج، أو شاركنا تفاصيل مشروعك. البداية رسالة أو اتصال.</p>
    </div></section>
    <section className="section-space contact-methods"><div className="container-shell"><div className="contact-grid">
      <article className="contact-option"><WhatsAppIcon width={32} height={32} /><h2>أرسل لنا على واتساب</h2><p>شاركنا اسم المنتج أو صورة السطح ومكان الاستخدام، ونساعدك في اختيارك وتأكيد السعر والتوفر.</p><a href={whatsappUrl(defaultWhatsAppMessage)} className="button button-primary" target="_blank" rel="noopener noreferrer">ابدأ المحادثة <ArrowUpLeft size={19} /></a></article>
      <article className="contact-option"><Phone size={32} strokeWidth={1.5} /><h2>نتحدث مباشرة</h2><p>للاستفسار عن مجموعة المنتجات أو مناقشة الدهانات والتشطيبات وخدمات التنفيذ في الرياض.</p><a href={`tel:${site.phoneE164}`} className="button button-outline" dir="ltr"><Phone size={18} />{site.phoneRaw}</a></article>
    </div></div></section>
    <BusinessLocation id="contact-location" />
  </main>;
}

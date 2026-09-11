import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/data/products";
import { defaultWhatsAppMessage, defaultWhatsAppMessageEn, site, whatsappUrl } from "@/data/site";

export function ContactPage({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const prefix = isEnglish ? "/en" : "";
  const Forward = isEnglish ? ArrowRight : ArrowLeft;
  const message = isEnglish ? defaultWhatsAppMessageEn : defaultWhatsAppMessage;

  return (
    <main dir={isEnglish ? "ltr" : "rtl"} className={isEnglish ? "font-en" : ""}>
      <section className="contact-hero">
        <div className="container-shell grid min-h-[610px] items-center gap-12 py-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-18">
          <div className="hero-enter">
            <span className="hero-eyebrow"><span />{isEnglish ? "Contact ALYA CHEMICAL" : "تواصل مع كيميا عليا"}</span>
            <h1 className="mt-7 text-4xl font-black leading-[1.25] tracking-[-.045em] text-white sm:text-6xl">
              {isEnglish ? "Let’s identify the right system for your project." : "لنحدد النظام الأنسب لمشروعك."}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-white/62">
              {isEnglish ? "Share the substrate, application and project area. Our team can guide your product enquiry and quotation request." : "شاركنا نوع السطح والاستخدام ومساحة المشروع؛ وسيساعدك فريقنا في استفسار المنتج وطلب عرض السعر."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="alya-button-primary"><a href={whatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle className="size-5" />{isEnglish ? "Start on WhatsApp" : "ابدأ عبر واتساب"}</a></Button>
              <Button asChild size="lg" variant="outline" className="alya-button-outline"><a href={`tel:${site.phoneE164}`}><Phone className="size-4.5" />{isEnglish ? "Call now" : "اتصل الآن"}</a></Button>
            </div>
          </div>

          <div className="contact-panel hero-visual-enter">
            <span className="contact-panel-label">{isEnglish ? "Direct channels" : "قنوات التواصل المباشر"}</span>
            <a href={`tel:${site.phoneE164}`} className="contact-row"><span><Phone className="size-5" /></span><div><small>{isEnglish ? "Phone & WhatsApp" : "الهاتف وواتساب"}</small><strong dir="ltr">+966 55 298 0261</strong></div><ArrowUpRight className="size-4 opacity-45" /></a>
            <a href={`mailto:${site.email}`} className="contact-row"><span><Mail className="size-5" /></span><div><small>{isEnglish ? "Email" : "البريد الإلكتروني"}</small><strong>{site.email}</strong></div><ArrowUpRight className="size-4 opacity-45" /></a>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="contact-row"><span><MapPin className="size-5" /></span><div><small>{isEnglish ? "Location" : "الموقع"}</small><strong>{isEnglish ? site.addressEn : site.address}</strong></div><ArrowUpRight className="size-4 opacity-45" /></a>
            <div className="contact-panel-note"><Building2 className="size-5" /><p>{isEnglish ? "For product supply, project specifications and distribution enquiries." : "لتوريد المنتجات واستفسارات المشاريع والمواصفات والتوزيع."}</p></div>
          </div>
        </div>
      </section>

      <section className="section-space soft-grid bg-[#f4fafb]">
        <div className="container-shell grid gap-6 lg:grid-cols-[1fr_.72fr]">
          <div className="contact-map-card">
            <div><span className="section-kicker">{isEnglish ? "Head office" : "المكتب الرئيسي"}</span><h2 className="mt-4 text-3xl font-black">{isEnglish ? "Al Sulay, Riyadh" : "حي السلي، الرياض"}</h2><p className="mt-4 max-w-lg leading-8 text-[#637b87]">{isEnglish ? site.addressEn : site.address}</p></div>
            <MapPin className="size-20 text-[#0b789e]/12" strokeWidth={1} />
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="text-link mt-8">{isEnglish ? "Open in Google Maps" : "فتح الموقع في خرائط Google"}<ArrowUpRight className="size-4" /></a>
          </div>
          <div className="contact-quick-card"><p>{isEnglish ? "Explore the complete portfolio before contacting our team." : "استعرض المحفظة كاملة قبل التواصل مع فريقنا."}</p><Link href={`${prefix}/products`} className="mt-7 inline-flex items-center gap-2 font-black text-[#47d1d3]">{isEnglish ? "View all products" : "عرض جميع المنتجات"}<Forward className="size-4" /></Link></div>
        </div>
      </section>
    </main>
  );
}

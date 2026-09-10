import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { defaultWhatsAppMessage, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "خدمات الدهانات والديكورات في الرياض",
  description: "تعرف على خدمات دهانات عليا: دهانات داخلية وخارجية، جبس بورد، ديكورات فوم، بديل الرخام والخشب، ورق جدران، عوازل وترميمات في الرياض.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <section className="hero-pattern relative overflow-hidden border-b border-white/8 bg-[#111914] py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-[#d0a052]/12 blur-3xl" />
        <div className="container-shell relative hero-enter">
          <span className="section-kicker !text-[#ddb770]">خدمات دهانات عليا</span>
          <h1 className="section-title mt-5 max-w-[17ch]">خدمة مناسبة لكل سطح، ومسار واضح لكل تشطيب.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/62">اختر الخدمة الأقرب لمشروعك لتعرف نطاق التنفيذ وخطواته، أو أرسل صور المكان عبر واتساب ونساعدك في تحديد البداية الصحيحة.</p>
        </div>
      </section>

      <section className="section-space bg-[#f8f7f3]">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal="up">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-[#d0a052] py-16 text-[#17201c]">
        <div className="container-shell flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-black text-[#17201c]/58">لست متأكدًا من الخدمة؟</p><h2 className="mt-2 text-3xl font-black">أرسل صور المكان وسنحدد معك نقطة البداية.</h2></div>
          <Button asChild size="lg" className="h-14 rounded-2xl bg-[#17201c] px-7 text-base font-black"><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle /> تواصل عبر واتساب</a></Button>
        </div>
      </section>
    </main>
  );
}

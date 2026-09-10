import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/service-icon";
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
      <section className="soft-grid border-b border-[#e5dbce] bg-[#f3ede3] py-20 sm:py-28">
        <div className="container-shell">
          <span className="section-kicker">خدمات دهانات عليا</span>
          <h1 className="section-title mt-5 max-w-[18ch]">دهانات وديكورات وتشطيبات مرتبة حسب حاجة المكان.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-[#695f54]">اختر الخدمة الأقرب لمشروعك لتتعرف على نطاق التنفيذ وخطواته. ويمكنك إرسال الصور عبر واتساب لتحديد نقطة البداية.</p>
        </div>
      </section>

      <section className="section-space bg-[#fbfaf7]">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className={`service-card group relative flex min-h-[300px] flex-col overflow-hidden rounded-[28px] border border-black/7 p-7 ${index % 5 === 0 ? "bg-[#23211c] text-white" : "bg-white"}`}>
              <div className={`grid size-13 place-items-center rounded-2xl ${index % 5 === 0 ? "bg-[#c0934c] text-white" : "bg-[#f1e7d7] text-[#9b6f31]"}`}><ServiceIcon name={service.icon} className="size-6" /></div>
              <p className={`mt-7 text-sm font-black ${index % 5 === 0 ? "text-[#d8bb86]" : "text-[#a3773b]"}`}>{service.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-black leading-snug">{service.shortTitle}</h2>
              <p className={`mt-3 text-[.95rem] leading-7 ${index % 5 === 0 ? "text-white/60" : "text-[#71675b]"}`}>{service.summary}</p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-black">عرض التفاصيل <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#c0934c] py-16 text-white">
        <div className="container-shell flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-black text-black/55">لست متأكدًا من الخدمة؟</p><h2 className="mt-2 text-3xl font-black">أرسل صور المكان وسنبدأ بالسؤال الصحيح.</h2></div>
          <Button asChild size="lg" className="h-14 rounded-full bg-[#171714] px-7 text-base font-black"><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle /> تواصل عبر واتساب</a></Button>
        </div>
      </section>
    </main>
  );
}

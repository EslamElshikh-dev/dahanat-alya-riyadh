import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "تواصل مع دهانات عليا",
  description: `اتصل على ${site.phoneRaw} أو تواصل عبر واتساب لطلب معاينة لخدمات الدهانات والتشطيبات في الرياض.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="soft-grid bg-[#f3ede3]">
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <span className="section-kicker">تواصل معنا</span>
            <h1 className="section-title mt-5">أرسل صور المكان، وابدأ بوصف مختصر لما تريد تغييره.</h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-[#695f54]">كلما كانت الصور والمساحة والموقع أوضح، استطعنا فهم الطلب وترتيب المعاينة بصورة أسرع.</p>
            <Button asChild size="lg" className="mt-8 h-14 rounded-full bg-[#1f8f61] px-8 text-base font-black hover:bg-[#18744f]"><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle /> افتح واتساب</a></Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={`tel:${site.phoneE164}`} className="rounded-[28px] bg-[#171714] p-7 text-white transition-transform hover:-translate-y-1"><Phone className="size-7 text-[#d5b477]" /><p className="mt-8 text-sm font-bold text-white/48">اتصال مباشر</p><p className="mt-2 text-2xl font-black" dir="ltr">{site.phoneDisplay}</p></a>
            <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" className="rounded-[28px] bg-[#1f8f61] p-7 text-white transition-transform hover:-translate-y-1"><MessageCircle className="size-7" /><p className="mt-8 text-sm font-bold text-white/65">واتساب</p><p className="mt-2 text-xl font-black">أرسل الصور والتفاصيل</p></a>
            <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="rounded-[28px] border border-black/7 bg-white p-7 transition-transform hover:-translate-y-1"><MapPin className="size-7 text-[#a57735]" /><p className="mt-8 text-sm font-bold text-[#887b6d]">نطاق الخدمة</p><p className="mt-2 text-xl font-black">{site.coverage}</p></a>
            <div className="rounded-[28px] border border-black/7 bg-white p-7"><Clock3 className="size-7 text-[#a57735]" /><p className="mt-8 text-sm font-bold text-[#887b6d]">المواعيد</p><p className="mt-2 text-xl font-black">استقبال الطلبات يوميًا</p></div>
          </div>
        </div>
      </section>
      <section className="border-t border-black/7 bg-white py-12"><div className="container-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><p className="font-black">تريد استعراض نوع محدد من الأعمال؟</p><Link href="/services" className="flex items-center gap-2 font-black text-[#8d632b]">عرض جميع الخدمات <ArrowLeft className="size-4" /></Link></div></section>
    </main>
  );
}

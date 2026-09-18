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
    <main className="soft-grid bg-[#f2f0ea]">
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="hero-enter">
            <span className="section-kicker">تواصل معنا</span>
            <h1 className="section-title mt-5">أرسل صور المكان، وابدأ بوصف مختصر لما تريد تغييره.</h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-[#626c66]">كلما كانت الصور والمساحة والموقع أوضح، استطعنا فهم الطلب وترتيب المعاينة بصورة أسرع.</p>
            <Button asChild size="lg" className="mt-8 h-14 rounded-2xl bg-[#1c805a] px-8 text-base font-black hover:bg-[#176b4b]"><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle /> افتح واتساب</a></Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-reveal="up">
            <a href={`tel:${site.phoneE164}`} className="feature-card rounded-[24px] bg-[#111914] p-7 text-white"><span className="grid size-12 place-items-center rounded-[15px] bg-white/8 text-[#ddb770]"><Phone className="size-6" /></span><p className="mt-8 text-sm font-bold text-white/45">اتصال مباشر</p><p className="mt-2 text-2xl font-black" dir="ltr">{site.phoneDisplay}</p></a>
            <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" className="feature-card rounded-[24px] bg-[#1c805a] p-7 text-white"><span className="grid size-12 place-items-center rounded-[15px] bg-white/12"><MessageCircle className="size-6" /></span><p className="mt-8 text-sm font-bold text-white/60">واتساب</p><p className="mt-2 text-xl font-black">أرسل الصور والتفاصيل</p></a>
            <div className="feature-card rounded-[24px] border border-[#17201c]/8 bg-white p-7"><span className="grid size-12 place-items-center rounded-[15px] bg-[#f3eadb] text-[#9a6928]"><MapPin className="size-6" /></span><p className="mt-8 text-sm font-bold text-[#7a837e]">نطاق الخدمة</p><p className="mt-2 text-xl font-black">{site.coverage}</p><p className="mt-3 text-sm leading-6 text-[#69736e]">{site.serviceNotice}</p></div>
            <div className="feature-card rounded-[24px] border border-[#17201c]/8 bg-white p-7"><span className="grid size-12 place-items-center rounded-[15px] bg-[#f3eadb] text-[#9a6928]"><Clock3 className="size-6" /></span><p className="mt-8 text-sm font-bold text-[#7a837e]">المواعيد</p><p className="mt-2 text-xl font-black">استقبال الطلبات يوميًا</p></div>
          </div>
        </div>
      </section>
      <section className="border-t border-black/7 bg-white py-12"><div className="container-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><p className="font-black">تريد استعراض نوع محدد من الأعمال؟</p><Link href="/services" className="flex items-center gap-2 font-black text-[#8d632b]">عرض جميع الخدمات <ArrowLeft className="size-4" /></Link></div></section>
    </main>
  );
}

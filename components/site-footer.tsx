import Link from "next/link";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { defaultWhatsAppMessage, navigation, site, whatsappUrl } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#101713] pb-24 pt-18 text-white sm:pb-8">
      <div className="container-shell grid gap-12 lg:grid-cols-[1.15fr_.65fr_1fr]">
        <div>
          <BrandMark inverse />
          <p className="mt-6 max-w-md text-[1rem] leading-8 text-white/56">
            تنفيذ دهانات وتشطيبات وديكورات للمنازل والفلل والمكاتب في الرياض، بخطوات واضحة من المعاينة حتى المراجعة النهائية.
          </p>
          <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.06] px-4 py-3 text-sm font-black text-white transition-colors hover:bg-white/10">
            <MessageCircle className="size-4 text-[#63c79d]" /> تواصل عبر واتساب
          </a>
        </div>
        <div>
          <h2 className="text-sm font-black text-[#dcb66f]">روابط الموقع</h2>
          <nav className="mt-5 grid gap-3" aria-label="روابط التذييل">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit text-white/58 transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-black text-[#dcb66f]">بيانات التواصل</h2>
          <ul className="mt-5 grid gap-4 text-white/62">
            <li className="flex items-start gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[.06] text-[#dcb66f]"><Phone className="size-4" /></span><a href={`tel:${site.phoneE164}`} dir="ltr" className="pt-1 hover:text-white">{site.phoneDisplay}</a></li>
            <li className="flex items-start gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[.06] text-[#dcb66f]"><MapPin className="size-4" /></span><span className="pt-1">{site.coverage}</span></li>
            <li className="flex items-start gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[.06] text-[#dcb66f]"><Clock3 className="size-4" /></span><span className="pt-1">استقبال طلبات المعاينة يوميًا</span></li>
          </ul>
        </div>
      </div>
      <div className="container-shell mt-14 flex flex-col gap-3 border-t border-white/8 pt-7 text-sm text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} دهانات عليا. جميع الحقوق محفوظة.</p>
        <a href={site.developerUrl} target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-white">
          {site.developerName}
        </a>
      </div>
    </footer>
  );
}

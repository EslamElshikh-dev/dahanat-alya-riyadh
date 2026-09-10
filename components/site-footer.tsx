import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { navigation, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#171714] pb-24 pt-16 text-white sm:pb-8">
      <div className="container-shell grid gap-12 lg:grid-cols-[1.1fr_.7fr_1fr]">
        <div>
          <BrandMark inverse />
          <p className="mt-5 max-w-md text-[1rem] leading-8 text-white/64">
            تنفيذ دهانات وتشطيبات وديكورات للمنازل والفلل والمكاتب في الرياض، بخطوات واضحة من المعاينة حتى المراجعة النهائية.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-black text-[#d7b77e]">روابط الموقع</h2>
          <nav className="mt-5 grid gap-3" aria-label="روابط التذييل">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit text-white/68 transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-black text-[#d7b77e]">بيانات التواصل</h2>
          <ul className="mt-5 grid gap-4 text-white/70">
            <li className="flex items-start gap-3"><Phone className="mt-1 size-4 text-[#d7b77e]" /><a href={`tel:${site.phoneE164}`} className="hover:text-white">{site.phoneDisplay}</a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-1 size-4 text-[#d7b77e]" /><span>{site.coverage}</span></li>
            <li className="flex items-start gap-3"><Clock3 className="mt-1 size-4 text-[#d7b77e]" /><span>استقبال طلبات المعاينة يوميًا</span></li>
          </ul>
        </div>
      </div>
      <div className="container-shell mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} دهانات عليا. جميع الحقوق محفوظة.</p>
        <a href={site.developerUrl} target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-white">
          {site.developerName}
        </a>
      </div>
    </footer>
  );
}

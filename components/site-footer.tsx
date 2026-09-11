"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpLeft, Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { navigationAr, navigationEn, site } from "@/data/site";

export function SiteFooter() {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const navigation = isEnglish ? navigationEn : navigationAr;
  const productsHref = isEnglish ? "/en/products" : "/products";

  return (
    <footer className="relative overflow-hidden bg-[#061725] pb-24 pt-16 text-white sm:pb-8 sm:pt-20" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="pointer-events-none absolute -left-36 top-0 size-96 rounded-full bg-[#0ea4bc]/10 blur-3xl" />
      <div className="container-shell relative grid gap-12 lg:grid-cols-[1.15fr_.65fr_.8fr]">
        <div>
          <BrandMark inverse href={isEnglish ? "/en" : "/"} />
          <p className="mt-6 max-w-md text-[1rem] leading-8 text-white/58">
            {isEnglish
              ? "Advanced thermal insulation, waterproofing and architectural coating systems engineered for resilient buildings."
              : "أنظمة متطورة للعزل الحراري والمائي والدهانات المعمارية، صُممت لحماية المباني ورفع كفاءة الأسطح والواجهات."}
          </p>
          <div className="mt-6 flex gap-2">
            <a href={site.social.instagram} target="_blank" rel="noreferrer" className="social-link text-[.68rem] font-black" aria-label="Instagram">IG</a>
            <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="social-link text-[.68rem] font-black" aria-label="LinkedIn">in</a>
            <a href={site.social.tiktok} target="_blank" rel="noreferrer" className="social-link px-3 text-xs font-black" aria-label="TikTok">TikTok</a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black text-[#57d0d4]">{isEnglish ? "Explore" : "روابط الموقع"}</h2>
          <nav className="mt-5 grid gap-3" aria-label={isEnglish ? "Footer links" : "روابط التذييل"}>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">{item.label}</Link>
            ))}
            <Link href={`${productsHref}#thermal`} className="footer-link">{isEnglish ? "Alya Thermal" : "عليا ثيرمال"}</Link>
            <Link href={`${productsHref}#paint`} className="footer-link">{isEnglish ? "Alya Paints" : "عليا للدهانات"}</Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-black text-[#57d0d4]">{isEnglish ? "Contact" : "بيانات التواصل"}</h2>
          <ul className="mt-5 grid gap-4 text-white/62">
            <li className="footer-contact"><Phone className="size-4.5" /><a href={`tel:${site.phoneE164}`} dir="ltr">{site.phoneDisplay}</a></li>
            <li className="footer-contact"><Mail className="size-4.5" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="footer-contact items-start"><MapPin className="mt-1 size-4.5 shrink-0" /><a href={site.mapsUrl} target="_blank" rel="noreferrer">{isEnglish ? site.addressEn : site.address}<ArrowUpLeft className="ms-1 inline size-3.5" /></a></li>
          </ul>
        </div>
      </div>

      <div className="container-shell relative mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-sm text-white/38 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {isEnglish ? site.englishName : site.name}. {isEnglish ? "All rights reserved." : "جميع الحقوق محفوظة."}</p>
        <a href={site.developerUrl} target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-white">{site.developerName}</a>
      </div>
    </footer>
  );
}

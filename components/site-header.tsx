"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ChevronDown, Globe2, Menu, Phone, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import {
  defaultWhatsAppMessage,
  defaultWhatsAppMessageEn,
  navigationAr,
  navigationEn,
  site,
  whatsappUrl,
} from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const navigation = isEnglish ? navigationEn : navigationAr;
  const homeHref = isEnglish ? "/en" : "/";
  const productsHref = isEnglish ? "/en/products" : "/products";
  const languageHref = isEnglish ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : `/en${pathname === "/" ? "" : pathname}`;
  const quoteMessage = isEnglish ? defaultWhatsAppMessageEn : defaultWhatsAppMessage;

  const isActive = (href: string) => {
    if (href === "/" || href === "/en") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => menuRef.current?.removeAttribute("open");

  return (
    <header className="site-header sticky top-0 z-50 border-b border-[#0d789e]/10 bg-white/92 shadow-[0_10px_35px_rgba(7,31,47,.06)] backdrop-blur-2xl">
      <div className="hidden bg-[#071828] text-white md:block">
        <div className="container-shell flex h-8 items-center justify-between text-[.72rem] font-bold tracking-wide text-white/66" dir={isEnglish ? "ltr" : "rtl"}>
          <span>{isEnglish ? "Advanced coatings for more resilient buildings" : "حلول طلاء متطورة لمبانٍ أكثر حماية واستدامة"}</span>
          <span className="flex items-center gap-4">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">{site.email}</a>
            <a href={`tel:${site.phoneE164}`} dir="ltr" className="transition-colors hover:text-white">{site.phoneDisplay}</a>
          </span>
        </div>
      </div>

      <div className="container-shell flex h-[76px] items-center justify-between gap-3 sm:h-[84px]" dir={isEnglish ? "ltr" : "rtl"}>
        <BrandMark href={homeHref} />

        <nav className="hidden items-center gap-1 rounded-2xl border border-[#0c789d]/10 bg-[#f1f8fa] p-1.5 lg:flex" aria-label={isEnglish ? "Primary navigation" : "التنقل الرئيسي"}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link rounded-xl px-4 py-2.5 ${isActive(item.href) ? "nav-link-active" : ""}`}
            >
              {item.label}
              {item.href === productsHref ? <ChevronDown className="size-3.5 opacity-55" aria-hidden="true" /> : null}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link href={languageHref} className="header-action header-language" aria-label={isEnglish ? "عرض الموقع بالعربية" : "View website in English"}>
            <Globe2 className="size-[17px]" />
            <span className="hidden sm:inline">{isEnglish ? "العربية" : "EN"}</span>
          </Link>
          <a href={`tel:${site.phoneE164}`} aria-label={isEnglish ? `Call ${site.phoneDisplay}` : `اتصل على ${site.phoneDisplay}`} className="header-action header-call">
            <Phone className="size-[17px]" strokeWidth={2.1} />
          </a>
          <a
            href={whatsappUrl(quoteMessage)}
            target="_blank"
            rel="noreferrer"
            className="header-action header-quote hidden sm:inline-flex"
          >
            <WhatsAppIcon className="size-[18px]" />
            <span>{isEnglish ? "Request a quote" : "اطلب عرض سعر"}</span>
          </a>

          <details ref={menuRef} className="mobile-menu relative lg:hidden">
            <summary className="menu-trigger grid size-11 cursor-pointer list-none place-items-center rounded-full border border-[#0c789d]/14 bg-[#f1f8fa] text-[#0c6f93]" aria-label={isEnglish ? "Open menu" : "فتح قائمة الموقع"}>
              <Menu className="menu-open-icon size-5" aria-hidden="true" />
              <X className="menu-close-icon hidden size-5" aria-hidden="true" />
            </summary>
            <div className={`absolute top-[calc(100%+14px)] w-[min(92vw,380px)] rounded-[26px] border border-[#0a789f]/12 bg-white/98 p-3 shadow-[0_28px_80px_rgba(7,31,47,.2)] ${isEnglish ? "right-0" : "left-0"}`}>
              <div className="mb-2 flex items-center justify-between rounded-2xl bg-[#edf8fa] px-4 py-3">
                <span className="text-xs font-black text-[#0d7194]">{isEnglish ? "Explore ALYA" : "اكتشف كيميا عليا"}</span>
                <span className="size-2 rounded-full bg-[#21b4bc] shadow-[0_0_0_5px_rgba(33,180,188,.12)]" />
              </div>
              <nav className="grid gap-1" aria-label={isEnglish ? "Mobile navigation" : "قائمة الجوال"}>
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenu} className={`mobile-nav-link rounded-xl px-4 py-3.5 font-extrabold ${isActive(item.href) ? "bg-[#edf8fa] text-[#08799f]" : "text-[#263d49]"}`}>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#0d789e]/10 pt-3">
                <a href={`tel:${site.phoneE164}`} className="mobile-menu-cta mobile-menu-call"><Phone className="size-4" /> {isEnglish ? "Call" : "اتصال"}</a>
                <a href={whatsappUrl(quoteMessage)} target="_blank" rel="noreferrer" className="mobile-menu-cta mobile-menu-whatsapp"><WhatsAppIcon className="size-4" /> {isEnglish ? "WhatsApp" : "واتساب"}</a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

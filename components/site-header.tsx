import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { navigation, site, whatsappUrl } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-[#17201c]/7 bg-[#f8f7f3]/90 shadow-[0_8px_36px_rgba(18,29,24,.055)] backdrop-blur-2xl">
      <div className="container-shell flex h-[78px] items-center justify-between gap-3 sm:h-[84px] sm:gap-5">
        <BrandMark />
        <nav className="header-nav hidden items-center gap-1 rounded-2xl border border-[#17201c]/7 bg-white/72 p-1.5 shadow-[0_8px_24px_rgba(23,32,28,.045)] xl:flex" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link rounded-xl px-4 py-2.5">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a href={`tel:${site.phoneE164}`} aria-label={`اتصل على ${site.phoneDisplay}`} className="header-action header-call">
            <span className="header-action-icon"><Phone className="size-[18px]" strokeWidth={2.2} /></span>
            <span className="hidden font-black md:inline">اتصل الآن</span>
          </a>
          <a href={whatsappUrl("السلام عليكم، أرغب في الاستفسار عن خدمات دهانات عليا.")} target="_blank" rel="noreferrer" aria-label="تواصل مع دهانات عليا عبر واتساب" className="header-action header-whatsapp">
            <span className="header-action-icon"><WhatsAppIcon className="size-[19px]" /></span>
            <span className="hidden font-black sm:inline">واتساب</span>
          </a>
          <details className="mobile-menu relative xl:hidden">
            <summary className="menu-trigger grid size-11 cursor-pointer list-none place-items-center rounded-full border border-[#17201c]/10 bg-white text-[#17201c] shadow-[0_8px_24px_rgba(23,32,28,.08)]" aria-label="فتح قائمة الموقع">
              <Menu aria-hidden="true" className="size-5" />
            </summary>
            <div className="absolute left-0 top-[calc(100%+13px)] w-[min(91vw,360px)] rounded-[24px] border border-[#17201c]/8 bg-white/96 p-3 shadow-[0_28px_80px_rgba(20,31,26,.2)] backdrop-blur-xl">
              <div className="mb-2 flex items-center justify-between rounded-2xl bg-[#f4f1ea] px-4 py-3">
                <span className="text-xs font-bold text-[#786b5b]">القائمة الرئيسية</span>
                <span className="size-2 rounded-full bg-[#c99543]" aria-hidden="true" />
              </div>
              <nav className="grid gap-1" aria-label="قائمة الجوال">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="mobile-nav-link rounded-xl px-4 py-3.5 font-extrabold text-[#27312c]">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#17201c]/7 pt-3">
                <a href={`tel:${site.phoneE164}`} className="mobile-menu-cta mobile-menu-call"><Phone className="size-4" /> اتصال</a>
                <a href={whatsappUrl("السلام عليكم، أرغب في الاستفسار عن خدمات دهانات عليا.")} target="_blank" rel="noreferrer" className="mobile-menu-cta mobile-menu-whatsapp"><WhatsAppIcon className="size-4" /> واتساب</a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

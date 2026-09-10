import Link from "next/link";
import { Menu, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand-mark";
import { navigation, site, whatsappUrl } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#17201c]/7 bg-[#f8f7f3]/88 shadow-[0_1px_0_rgba(23,32,28,.03)] backdrop-blur-2xl">
      <div className="container-shell flex h-[78px] items-center justify-between gap-5">
        <BrandMark />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="outline" size="lg" className="h-11 rounded-xl border-[#d9d6cd] bg-white px-4 text-[#17201c] shadow-none hover:border-[#c7a565] hover:bg-[#f4efe4]">
            <a href={`tel:${site.phoneE164}`} aria-label={`اتصل على ${site.phoneDisplay}`}>
              <Phone className="size-4" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
          </Button>
          <Button asChild size="lg" className="h-11 rounded-xl bg-[#1c7352] px-5 text-white shadow-[0_10px_26px_rgba(28,115,82,.16)] hover:bg-[#165d42]">
            <a href={whatsappUrl("السلام عليكم، أرغب في الاستفسار عن خدمات دهانات عليا.")} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              واتساب
            </a>
          </Button>
        </div>
        <details className="mobile-menu relative lg:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-[14px] border border-[#17201c]/10 bg-white text-[#17201c] shadow-sm" aria-label="فتح قائمة الموقع">
            <Menu aria-hidden="true" className="size-5" />
          </summary>
          <div className="absolute left-0 top-[calc(100%+12px)] w-[min(88vw,340px)] rounded-[22px] border border-[#17201c]/8 bg-white p-3 shadow-[0_28px_80px_rgba(20,31,26,.18)]">
            <nav className="grid gap-1" aria-label="قائمة الجوال">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3.5 font-bold text-[#27312c] hover:bg-[#f2efe7]">
                  {item.label}
                </Link>
              ))}
              <a href={`tel:${site.phoneE164}`} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#17201c] px-4 py-3.5 font-black text-white">
                <Phone className="size-4" /> اتصل الآن
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Menu, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand-mark";
import { navigation, site, whatsappUrl } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fbfaf7]/92 backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between gap-5">
        <BrandMark />
        <nav className="hidden items-center gap-7 xl:flex" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="outline" size="lg" className="h-11 rounded-full border-[#d8c6aa] bg-white px-5 text-[#2b261f] hover:bg-[#f4ede2]">
            <a href={`tel:${site.phoneE164}`} aria-label={`اتصل على ${site.phoneDisplay}`}>
              <Phone className="size-4" />
              {site.phoneDisplay}
            </a>
          </Button>
          <Button asChild size="lg" className="h-11 rounded-full bg-[#1f6f50] px-5 text-white hover:bg-[#185b41]">
            <a href={whatsappUrl("السلام عليكم، أرغب في الاستفسار عن خدمات دهانات عليا.")} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              واتساب
            </a>
          </Button>
        </div>
        <details className="mobile-menu relative xl:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-black/10 bg-white text-[#221f1a] shadow-sm" aria-label="فتح قائمة الموقع">
            <Menu aria-hidden="true" className="size-5" />
          </summary>
          <div className="absolute left-0 top-[calc(100%+12px)] w-[min(84vw,320px)] rounded-[22px] border border-black/8 bg-white p-3 shadow-[0_24px_70px_rgba(27,23,17,.16)]">
            <nav className="grid gap-1" aria-label="قائمة الجوال">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 font-bold text-[#2c271f] hover:bg-[#f4eee4]">
                  {item.label}
                </Link>
              ))}
              <a href={`tel:${site.phoneE164}`} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#b78a45] px-4 py-3 font-black text-white">
                <Phone className="size-4" /> اتصل الآن
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}

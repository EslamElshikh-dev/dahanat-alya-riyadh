"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowUpLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { defaultWhatsAppMessage, navigation, site, whatsappUrl } from "@/data/site";
export function SiteHeader() {
  const menu = useRef<HTMLDetailsElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const closeMenu = () => menu.current?.removeAttribute("open");
  useEffect(() => { menu.current?.removeAttribute("open"); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) menu.current?.removeAttribute("open");
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      menu.current?.removeAttribute("open");
      menu.current?.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", outside, { passive: true });
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [menuOpen]);
  return <header className="site-header">
    <a href="#main-content" className="skip-link">انتقل إلى المحتوى</a>
    <div className="container-shell header-inner">
      <BrandMark />
      <nav className="desktop-nav" aria-label="التنقل الرئيسي">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav>
      <div className="header-actions">
        <a href={`tel:${site.phoneE164}`} className="header-phone" aria-label={`اتصل على ${site.phoneRaw}`}>
          <span className="header-contact-icon"><Phone size={18} /></span><span className="header-phone-copy"><small>يسعدنا تواصلك</small><strong dir="ltr">{site.phoneRaw}</strong></span><ArrowUpLeft className="header-phone-arrow" size={16} />
        </a>
        <details className="mobile-menu" ref={menu} onToggle={() => setMenuOpen(Boolean(menu.current?.open))}>
          <summary aria-label={menuOpen ? "إغلاق قائمة الموقع" : "فتح قائمة الموقع"} aria-controls="mobile-navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</summary>
          <div className="mobile-menu-panel" id="mobile-navigation">
            <div className="mobile-menu-heading"><span>اكتشف عالم عليا</span><small dir="ltr">COLOUR YOUR SPACE</small></div>
            <nav aria-label="قائمة الجوال">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} onClick={closeMenu}><span>{item.label}</span><ArrowUpLeft size={17} /></Link>)}</nav>
            <a className="mobile-menu-contact" href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" onClick={closeMenu}><WhatsAppIcon width={19} height={19} /><span>نساعدك تختار اللون والمنتج</span><ArrowUpLeft size={16} /></a>
          </div>
        </details>
      </div>
    </div><span className="reading-progress" aria-hidden="true" />
  </header>;
}

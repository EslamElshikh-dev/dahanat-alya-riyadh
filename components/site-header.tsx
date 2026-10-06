"use client";
import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, ArrowUpLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { navigation, site } from "@/data/site";
export function SiteHeader() {
  const menu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return <header className="site-header"><div className="container-shell header-inner"><BrandMark/><nav className="desktop-nav" aria-label="التنقل الرئيسي">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav><div className="header-actions"><a href={`tel:${site.phoneE164}`} className="header-phone" aria-label={`اتصل على ${site.phoneRaw}`}><Phone size={17}/><span dir="ltr">{site.phoneRaw}</span><ArrowUpLeft size={15}/></a><details className="mobile-menu" ref={menu}><summary aria-label="فتح قائمة الموقع"><Menu size={23}/></summary><nav aria-label="قائمة الجوال">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined} onClick={() => menu.current?.removeAttribute("open")}>{item.label}</Link>)}</nav></details></div></div></header>;
}

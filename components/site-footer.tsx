import Link from "next/link";
import { MapPin, Phone, ArrowUpLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { defaultWhatsAppMessage, navigation, site, whatsappUrl } from "@/data/site";
export function SiteFooter() {
 return <footer className="site-footer"><div className="container-shell"><div className="footer-grid"><div><BrandMark inverse/><p className="footer-about">ألوان تعكس ذوقك ودهانات تكمل تفاصيل مكانك. متجر دهانات عليا في الرياض للدهانات والتأسيس والطلاءات، مع خدمات التنفيذ والتشطيب.</p></div><div><h2>اكتشف عليا</h2><nav className="footer-nav" aria-label="روابط التذييل">{navigation.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div><div><h2>يسعدنا تواصلك</h2><div className="footer-contact"><a href={`tel:${site.phoneE164}`} dir="ltr">{site.phoneRaw}<Phone size={19}/></a><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer">تحدث معنا على واتساب <ArrowUpLeft size={18}/></a><span><MapPin size={19}/>الرياض، المملكة العربية السعودية</span></div></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} دهانات عليا. جميع الحقوق محفوظة.</p><a href={site.developerUrl} target="_blank" rel="noreferrer">تصميم وتطوير · {site.developerName}</a></div></div></footer>;
}

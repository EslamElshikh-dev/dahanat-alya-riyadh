import Link from "next/link";
import { MapPin, Phone, ArrowUpLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { DeveloperSignature } from "@/components/developer-signature";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { defaultWhatsAppMessage, navigation, site, whatsappUrl } from "@/data/site";
export function SiteFooter() {
 return <footer className="site-footer">
  <div className="footer-colour-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
  <div className="container-shell">
   <div className="footer-intro"><div><span className="footer-eyebrow">ألوان تعكس ذوقك</span><h2>لمستك تبدأ <span>بلون.</span></h2></div><a className="footer-start-link" href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><span>خلّنا نختار لونك</span><span className="footer-start-icon" aria-hidden="true"><ArrowUpLeft size={21} /></span></a></div>
   <div className="footer-grid">
   <div className="footer-brand"><BrandMark inverse /><p className="footer-about">ألوان تعكس ذوقك ودهانات تكمل تفاصيل مكانك. متجر دهانات عليا في الرياض للدهانات والتأسيس والطلاءات، مع خدمات التنفيذ والتشطيب.</p><div className="footer-colour-story"><span className="footer-colour-dots" aria-hidden="true">{["#72A1B3", "#DB684E", "#F2C978", "#A4B7A0", "#E8DDC8"].map(color => <i key={color} style={{ backgroundColor: color }} />)}</span><span>كل لون، حكاية جديدة.</span></div></div>
   <div className="footer-explore"><h2>اكتشف عليا</h2><nav className="footer-nav" aria-label="روابط التذييل">{navigation.map(item => <Link key={item.href} href={item.href}><span>{item.label}</span><span className="footer-link-arrow" aria-hidden="true"><ArrowUpLeft size={15} /></span></Link>)}</nav></div>
   <div className="footer-contact-card"><h2>خلّنا نكمل تفاصيل لونك</h2><div className="footer-contact">
    <a href={`tel:${site.phoneE164}`} className="footer-phone-link"><span className="footer-contact-icon"><Phone size={19} /></span><span><small>اتصل بنا</small><strong dir="ltr">{site.phoneRaw}</strong></span><ArrowUpLeft size={17} /></a>
    <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><span className="footer-contact-icon"><WhatsAppIcon width={19} height={19} /></span><span>تحدث معنا على واتساب</span><ArrowUpLeft size={17} /></a>
    <span className="footer-location"><MapPin size={17} />الرياض، المملكة العربية السعودية</span>
   </div></div>
  </div><div className="footer-bottom"><p className="footer-copyright">© {new Date().getFullYear()} دهانات عليا. جميع الحقوق محفوظة.</p><DeveloperSignature /></div></div>
 </footer>;
}

import { ArrowUpLeft, Phone } from "lucide-react";
import { defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";
export function ContactBand() {
  return <section className="contact-band"><div className="container-shell"><div><span className="eyebrow">لنبدأ بلونك</span><h2>مساحتك تستحق<br/>اختيارًا جميلًا.</h2><p>أرسل لنا نوع السطح أو صورة المكان، ونساعدك في اختيار المنتج المناسب.</p></div><div className="contact-band-actions"><a className="button button-coral" href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer">تحدث معنا على واتساب <ArrowUpLeft size={20}/></a><a href={`tel:${site.phoneE164}`} className="contact-number" dir="ltr"><Phone size={19}/>{site.phoneRaw}</a></div></div></section>;
}

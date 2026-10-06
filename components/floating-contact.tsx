import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";
export function FloatingContact() {
  return <div className="floating-contact-stack" aria-label="تواصل سريع">
    <a href={`tel:${site.phoneE164}`} aria-label={`اتصال مباشر على ${site.phoneRaw}`} className="floating-contact floating-contact-call"><Phone className="size-[22px]" strokeWidth={1.8}/><span className="floating-contact-label">اتصال مباشر</span></a>
    <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" aria-label="تواصل سريع عبر واتساب" className="floating-contact floating-contact-whatsapp"><WhatsAppIcon className="size-6"/><span className="floating-contact-label">واتساب</span></a>
  </div>;
}

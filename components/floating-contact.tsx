import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";

export function FloatingContact() {
  return (
    <div className="floating-dock fixed left-3 z-50 flex flex-col gap-3 sm:left-6" aria-label="تواصل سريع">
      <a href={`tel:${site.phoneE164}`} aria-label={`اتصل على ${site.phoneDisplay}`} className="contact-float contact-float-call">
        <Phone className="contact-float-icon size-[22px]" strokeWidth={2.25} />
        <span className="contact-float-label">اتصال مباشر</span>
      </a>
      <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب" className="contact-float contact-float-whatsapp">
        <WhatsAppIcon className="contact-float-icon size-6" />
        <span className="contact-float-label">واتساب</span>
      </a>
    </div>
  );
}

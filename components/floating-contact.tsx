"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { defaultWhatsAppMessage, defaultWhatsAppMessageEn, site, whatsappUrl } from "@/data/site";

export function FloatingContact() {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const message = isEnglish ? defaultWhatsAppMessageEn : defaultWhatsAppMessage;

  return (
    <div className="floating-dock fixed left-3 z-50 flex flex-col gap-2.5 sm:left-6" aria-label={isEnglish ? "Quick contact" : "تواصل سريع"} dir={isEnglish ? "ltr" : "rtl"}>
      <a href={`tel:${site.phoneE164}`} aria-label={isEnglish ? `Call ${site.phoneDisplay}` : `اتصل على ${site.phoneDisplay}`} className="contact-float contact-float-call">
        <span className="contact-float-ring" aria-hidden="true" />
        <Phone className="contact-float-icon size-[21px]" strokeWidth={2.2} />
        <span className="contact-float-label">{isEnglish ? "Call us" : "اتصال مباشر"}</span>
      </a>
      <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" aria-label={isEnglish ? "Contact on WhatsApp" : "تواصل عبر واتساب"} className="contact-float contact-float-whatsapp">
        <span className="contact-float-ring" aria-hidden="true" />
        <WhatsAppIcon className="contact-float-icon size-[23px]" />
        <span className="contact-float-status" aria-hidden="true" />
        <span className="contact-float-label">{isEnglish ? "WhatsApp" : "واتساب"}</span>
      </a>
    </div>
  );
}

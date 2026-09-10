import { MessageCircle, Phone } from "lucide-react";
import { defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 left-4 z-50 flex items-center gap-2 sm:bottom-7 sm:left-7" aria-label="تواصل سريع">
      <a href={`tel:${site.phoneE164}`} aria-label={`اتصل على ${site.phoneDisplay}`} className="contact-float bg-[#b78a45] hover:bg-[#9b7136]">
        <Phone className="size-5" />
      </a>
      <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب" className="contact-float contact-pulse bg-[#1f8f61] hover:bg-[#18754f]">
        <MessageCircle className="size-5" />
      </a>
    </div>
  );
}

import { MessageCircle, Phone } from "lucide-react";
import { defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";

export function FloatingContact() {
  return (
    <div className="floating-dock fixed left-3 z-50 flex flex-col gap-2 rounded-[22px] border border-white/80 bg-white/76 p-2 shadow-[0_18px_55px_rgba(18,29,24,.2)] backdrop-blur-xl sm:left-6" aria-label="تواصل سريع">
      <a href={`tel:${site.phoneE164}`} aria-label={`اتصل على ${site.phoneDisplay}`} className="contact-float bg-[#d2a052] text-[#17201c] hover:bg-[#bc8635]">
        <Phone className="size-5" />
      </a>
      <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب" className="contact-float contact-pulse bg-[#1c8b61] text-white hover:bg-[#166e4d]">
        <MessageCircle className="size-5" />
      </a>
    </div>
  );
}

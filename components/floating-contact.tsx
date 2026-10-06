import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { defaultWhatsAppMessage, whatsappUrl } from "@/data/site";
export function FloatingContact() { return <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer" aria-label="تواصل سريع عبر واتساب" className="floating-contact"><WhatsAppIcon className="size-6"/></a>; }

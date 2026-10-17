"use client";

import { useId, useState } from "react";
import { Phone, ArrowUpLeft } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { site, whatsappUrl } from "@/data/site";

export function ProductInquiry({ title, name }: { title: string; name: string }) {
  const id = useId();
  const [quantity, setQuantity] = useState("");
  const [surface, setSurface] = useState("");
  const [district, setDistrict] = useState("");
  const message = [
    `السلام عليكم، أطلب السعر والتوفر والعبوات المتاحة لمنتج ${title} (${name}).`,
    `الكمية أو المساحة: ${quantity.trim() || "أحتاج مساعدة في تحديدها"}`,
    `نوع السطح أو الاستخدام: ${surface.trim() || "أحتاج تأكيد المنتج المناسب"}`,
    `الحي في الرياض: ${district.trim() || "سأحدده عند التواصل"}`,
  ].join("\n");

  return <section className="product-inquiry" aria-labelledby={`${id}-title`}>
    <h2 id={`${id}-title`}>اطلب السعر والتوفر</h2>
    <div className="product-inquiry-actions">
      <a href={`tel:${site.phoneE164}`} className="button button-primary"><Phone size={19} />اتصل لطلب السعر</a>
      <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="button button-outline"><WhatsAppIcon width={20} height={20} />اطلب السعر عبر واتساب<ArrowUpLeft size={17} /></a>
    </div>
    <details className="product-inquiry-details">
      <summary>أضف تفاصيل طلبك لرسالة واتساب (اختياري)</summary>
      <div className="product-inquiry-fields">
        <label htmlFor={`${id}-quantity`}>الكمية أو المساحة<input id={`${id}-quantity`} value={quantity} onChange={event => setQuantity(event.target.value)} maxLength={80} placeholder="مثال: ٣ عبوات أو ١٢٠ م²" /></label>
        <label htmlFor={`${id}-surface`}>نوع السطح أو الاستخدام<input id={`${id}-surface`} value={surface} onChange={event => setSurface(event.target.value)} maxLength={80} placeholder="مثال: جدار داخلي أو سطح خرساني" /></label>
        <label htmlFor={`${id}-district`}>الحي في الرياض<input id={`${id}-district`} value={district} onChange={event => setDistrict(event.target.value)} maxLength={80} autoComplete="address-level3" placeholder="اكتب اسم الحي" /></label>
      </div>
    </details>
    <p className="product-note">نؤكد لك السعر والتوفر وحجم العبوة المناسب عند التواصل.</p>
  </section>;
}

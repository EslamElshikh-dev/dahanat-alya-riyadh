import { ArrowUpLeft, Clock3, MapPin } from "lucide-react";
import { businessLocation, defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";

export function BusinessLocation({ id = "location" }: { id?: string }) {
  return <section className="business-location section-space" id={id} aria-labelledby={`${id}-title`}>
    <div className="container-shell location-layout">
      <div className="location-copy">
        <span className="eyebrow">الرياض · {businessLocation.district}</span>
        <h2 className="section-title" id={`${id}-title`}>قريبون منك،<br /><span>لنكمّل تفاصيل لونك.</span></h2>
        <p className="location-intro">تعرّف على موقع دهانات عليا في حي السلي، وتواصل معنا لاختيار المنتج أو مناقشة أعمال الدهانات والتشطيبات داخل الرياض.</p>
        <div className="location-categories"><span>متجر دهانات</span><span>خدمات دهان وتشطيبات</span></div>
        <div className="location-facts">
          <div className="location-fact"><span className="location-fact-icon"><MapPin size={21} strokeWidth={1.5} /></span><div><h3>عنواننا</h3><address>{businessLocation.address}</address></div></div>
          <div className="location-fact"><span className="location-fact-icon"><Clock3 size={21} strokeWidth={1.5} /></span><div><h3>ساعات العمل · يوميًا</h3><p>{businessLocation.hours.display}</p></div></div>
        </div>
        <div className="location-actions"><a className="button button-primary" href={businessLocation.mapsUrl} target="_blank" rel="noopener noreferrer">افتح الموقع في Google <ArrowUpLeft size={18} /></a><a className="location-contact-link" href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer">تواصل قبل الزيارة <ArrowUpLeft size={16} /></a></div>
        <p className="location-note">يسعدنا تواصلك لتأكيد توفر المنتج أو ترتيب معاينة خدمة التنفيذ.</p>
      </div>
      <div className="location-map-card">
        <div className="location-map-heading"><span className="location-map-pin"><MapPin size={20} strokeWidth={1.5} /></span><div><strong>{site.shortName}</strong><span>ملفنا على خرائط Google</span></div><span className="location-map-colours" aria-hidden="true"><i /><i /><i /></span></div>
        <iframe src={businessLocation.embedUrl} title={`خريطة ${site.name} في ${businessLocation.district} بالرياض`} width="640" height="420" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        <div className="location-map-footer"><span>{businessLocation.district} · {site.city}</span><a href={businessLocation.mapsUrl} target="_blank" rel="noopener noreferrer">عرض الخريطة كاملة <ArrowUpLeft size={15} /></a></div>
      </div>
    </div>
  </section>;
}

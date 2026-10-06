import type { Metadata } from "next";
import { ServiceCard } from "@/components/service-card";
import { ContactBand } from "@/components/contact-band";
import { services } from "@/data/services";
export const metadata:Metadata={title:"خدمات الدهانات والتشطيبات في الرياض",description:"اكتشف خدمات دهانات عليا للدهانات الداخلية والخارجية والتشطيبات والديكورات في الرياض.",alternates:{canonical:"/services"}};
export default function ServicesPage(){return <main><section className="page-hero"><div className="container-shell"><span className="eyebrow">نكمل معك التفاصيل</span><h1>فكرة جميلة،<br/>وتنفيذ يكمّلها.</h1><p>خدمات دهانات وتشطيبات وديكورات في الرياض. نبدأ بمعرفة المكان والمواد والتفاصيل، ثم نحدد نطاق العمل.</p></div></section><section className="section-space"><div className="container-shell services-grid">{services.map((service,index)=><ServiceCard key={service.slug} service={service} index={index}/>)}</div></section><ContactBand/></main>;}

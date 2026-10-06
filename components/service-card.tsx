import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import type { Service } from "@/data/services";
export function ServiceCard({ service, index }: { service: Service; index?: number; compact?: boolean }) {
 return <Link href={`/services/${service.slug}`} className="service-card" aria-label={`عرض تفاصيل ${service.shortTitle}`}><div className="service-card-media"><Image src={service.image} alt={service.shortTitle} fill sizes="(max-width: 680px) 100vw, 33vw" className="service-card-image"/>{typeof index==="number"&&<span className="service-card-number">{String(index+1).padStart(2,"0")}</span>}</div><div className="service-card-content"><span>{service.eyebrow}</span><h3>{service.shortTitle}</h3><p>{service.summary}</p><span className="service-card-action">اكتشف الخدمة <ArrowUpLeft size={18}/></span></div></Link>;
}

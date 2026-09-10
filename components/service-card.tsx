import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ServiceIcon } from "@/components/service-icon";
import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  index?: number;
  compact?: boolean;
};

export function ServiceCard({ service, index, compact = false }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`service-card group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#17201c]/9 bg-white ${compact ? "service-card-compact" : ""}`}
      aria-label={`عرض تفاصيل خدمة ${service.shortTitle}`}
    >
      <div className="service-card-media relative aspect-[16/10] overflow-hidden bg-[#dcd8ce]">
        <Image
          src={service.image}
          alt={`${service.shortTitle} من دهانات عليا في الرياض`}
          fill
          sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className="service-card-image object-cover"
        />
        <div className="service-card-shade absolute inset-0" aria-hidden="true" />
        {typeof index === "number" && (
          <span className="service-card-number absolute left-4 top-4 grid min-w-10 place-items-center rounded-full border border-white/20 bg-[#111914]/72 px-3 py-2 text-xs font-black tracking-[.12em] text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="service-card-icon absolute bottom-4 right-4 grid size-12 place-items-center rounded-2xl border border-white/35 bg-white/92 text-[#8b5d21] shadow-[0_12px_30px_rgba(15,24,19,.22)] backdrop-blur-md">
          <ServiceIcon name={service.icon} className="size-6" />
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center px-5 pb-5 pt-6 text-center sm:px-6 sm:pb-6">
        <p className="service-card-eyebrow text-[.78rem] font-black text-[#9a6a29]">{service.eyebrow}</p>
        <h3 className="mt-2 text-xl font-black leading-snug tracking-[-.02em] text-[#17201c] sm:text-[1.38rem]">{service.shortTitle}</h3>
        <p className="mt-3 line-clamp-3 text-[.94rem] leading-7 text-[#66706a]">{service.summary}</p>
        <span className="service-card-action mt-6 inline-flex items-center gap-2 rounded-full border border-[#17201c]/8 bg-[#f3f0e9] px-4 py-2.5 text-sm font-black text-[#17201c]">
          عرض التفاصيل
          <span className="service-card-arrow grid size-6 place-items-center rounded-full bg-[#17201c] text-white" aria-hidden="true">
            <ArrowLeft className="size-3.5" strokeWidth={2.4} />
          </span>
        </span>
      </div>
    </Link>
  );
}

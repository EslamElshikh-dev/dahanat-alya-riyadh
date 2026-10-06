import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CatalogCard } from "@/components/catalog-card";
import { catalogs } from "@/data/catalogs";

export function CatalogSection() {
  return (
    <section className="section-space bg-[#ecefe6]" id="products">
      <div className="container-shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><span className="section-kicker">منتجات دهانات عليا</span><h2 className="section-title mt-4">كل سطح له دهانه.<br />وكل اختيار يبدأ بمعرفة.</h2></div>
          <div className="max-w-lg"><p className="leading-8 text-[#647068]">تصفح مجموعات الدهانات والطلاءات، وشاهد مواصفات المنتجات واستخداماتها في الكتالوجات الأصلية.</p><Link href="/products" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#946a2c]">اكتشف المنتجات والكتالوجات<ArrowLeft className="size-4" aria-hidden="true" /></Link></div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">{catalogs.map((catalog) => <CatalogCard key={catalog.slug} catalog={catalog} />)}</div>
      </div>
    </section>
  );
}

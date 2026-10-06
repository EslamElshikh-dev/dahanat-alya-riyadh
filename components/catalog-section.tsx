import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { CatalogProducts } from "@/components/catalog-products";
import { catalogs } from "@/data/catalogs";

export function CatalogSection() {
  return (
    <section className="section-space bg-[#f8f7f3]" id="products">
      <div className="container-shell">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><span className="section-kicker">منتجات دهانات عليا</span><h2 className="section-title mt-4">لكل سطح، منتج يناسبه.</h2></div>
          <div className="max-w-lg"><p className="leading-8 text-[#647068]">دهانات داخلية وخارجية، مواد تأسيس وطلاءات حماية. تعرّف على المنتجات، واستفسر عن السعر والتوفر.</p><Link href="/products" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#946a2c]">تصفح جميع المنتجات<ArrowLeft className="size-4" aria-hidden="true" /></Link></div>
        </div>
        <div className="mt-10 grid gap-12">{catalogs.map((catalog) => <div key={catalog.slug}><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-black text-[#17201c]">{catalog.englishTitle}<span className="mr-3 text-xs font-medium text-[#68736b]">{catalog.label}</span></h2><a href={catalog.file} download className="inline-flex min-h-10 items-center gap-2 text-xs font-black text-[#946a2c]"><Download className="size-4" aria-hidden="true" />تحميل الكتالوج</a></div><CatalogProducts catalog={catalog} /></div>)}</div>
      </div>
    </section>
  );
}

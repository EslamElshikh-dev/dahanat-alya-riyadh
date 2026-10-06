import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Download, FileText } from "lucide-react";
import type { Catalog } from "@/data/catalogs";

export function CatalogCard({ catalog }: { catalog: Catalog }) {
  return (
    <article className="catalog-card overflow-hidden rounded-[28px] border border-[#17201c]/10 bg-white">
      <Link href={`/products/${catalog.slug}`} className="catalog-cover block relative aspect-[1.42] overflow-hidden bg-[#edf0e8]" aria-label={`استعرض ${catalog.title}`}>
        <Image src={catalog.cover} alt={`الغلاف الأصلي لـ${catalog.title}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-3 sm:p-5" />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[#111914] px-3 py-2 text-xs font-bold text-[#e5c58d]"><FileText className="size-3.5" aria-hidden="true" />{catalog.pages.toLocaleString("ar-SA")} صفحة · PDF</span>
      </Link>
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3"><span className="text-xs font-black text-[#946a2c]">{catalog.label}</span><span dir="ltr" className="text-xs font-bold tracking-wide text-[#758077]">{catalog.englishTitle}</span></div>
        <h3 className="mt-3 text-2xl font-black text-[#17201c]"><Link href={`/products/${catalog.slug}`} className="hover:text-[#946a2c]">{catalog.title}</Link></h3>
        <p className="mt-4 text-sm leading-7 text-[#647068]">{catalog.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{catalog.topics.map((topic) => <span key={topic} className="rounded-full bg-[#f4f2eb] px-3 py-1.5 text-xs font-bold text-[#6c665c]">{topic}</span>)}</div>
        <div className="mt-7 grid grid-cols-[1fr_auto] gap-2 border-t border-[#17201c]/8 pt-5">
          <Link href={`/products/${catalog.slug}`} className="catalog-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#17201c] px-4 text-sm font-black text-white hover:bg-[#2b3b30]"><BookOpen className="size-4" aria-hidden="true" />استعرض الكتالوج<ArrowLeft className="size-4" aria-hidden="true" /></Link>
          <a href={catalog.file} download className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#17201c]/12 px-4 text-sm font-black text-[#17201c] hover:bg-[#f4f2eb]" aria-label={`تحميل ${catalog.title}، ${catalog.sizeLabel}`}><Download className="size-4" aria-hidden="true" /><span>تحميل</span></a>
        </div>
      </div>
    </article>
  );
}

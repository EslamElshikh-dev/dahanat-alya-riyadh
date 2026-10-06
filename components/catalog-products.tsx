import Image from "next/image";
import { ArrowUpLeft, MessageCircle } from "lucide-react";
import type { Catalog } from "@/data/catalogs";
import { whatsappUrl } from "@/data/site";

export function CatalogProducts({ catalog }: { catalog: Catalog }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {catalog.products.map((product) => (
        <article key={product.name} className="product-catalog-card overflow-hidden rounded-[22px] border border-[#17201c]/9 bg-white">
          <a href={`${catalog.file}#page=${product.page}`} target="_blank" rel="noopener noreferrer" className="relative block aspect-[4/3] bg-[#f4f3ed]" aria-label={`شاهد مواصفات ${product.title} في الكتالوج`}>
            <Image src={product.image} alt={`عبوة ${product.title} من الكتالوج الأصلي`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain" />
          </a>
          <div className="p-5">
            <span dir="ltr" className="block text-left text-[10px] font-bold tracking-wider text-[#879086]">{product.name}</span>
            <h3 className="mt-2 text-lg font-black text-[#17201c]">{product.title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-[#68736b]">{product.use}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#17201c]/8 pt-4">
              <a href={`${catalog.file}#page=${product.page}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 text-xs font-black text-[#946a2c]">المواصفات<ArrowUpLeft className="size-3.5" aria-hidden="true" /></a>
              <a href={whatsappUrl(`السلام عليكم، أرغب في الاستفسار عن منتج ${product.title} (${product.name}) وسعره وتوفره.`)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#edf5ef] px-3 text-xs font-black text-[#1c7955]"><MessageCircle className="size-3.5" aria-hidden="true" />استفسر</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

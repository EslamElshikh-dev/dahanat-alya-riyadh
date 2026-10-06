import { ArrowUpLeft, MessageCircle } from "lucide-react";
import type { Catalog } from "@/data/catalogs";
import { productAnchor, productDisplay } from "@/data/product-display";
import { whatsappUrl } from "@/data/site";

export function CatalogProducts({ catalog }: { catalog: Catalog }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {catalog.products.map((product) => {
        const anchor = productAnchor(product.name);
        const display = productDisplay[product.name];
        const clipId = `package-${anchor}`;
        return (
        <article id={anchor} key={product.name} className="product-catalog-card product-studio-card overflow-hidden rounded-[24px] border border-[#17201c]/9 bg-white">
          <a href={`${catalog.file}#page=${product.page}`} target="_blank" rel="noopener noreferrer" className="product-studio" aria-label={`شاهد مواصفات ${product.title} في الكتالوج`}>
            <span className="product-studio-brand" aria-hidden="true">ALYA</span>
            <span className="product-studio-category">{catalog.label}</span>
            <span className="product-studio-orbit" aria-hidden="true" />
            <svg className="product-packshot" viewBox={display.viewBox} role="img" aria-label={`عبوة ${product.title}`}>
              <defs><clipPath id={clipId}><path d={display.outline} /></clipPath></defs>
              <image href={product.image} x="0" y="0" width="480" height="360" clipPath={`url(#${clipId})`} />
            </svg>
            <div className="product-studio-name"><span dir="ltr">{product.name}</span><h3>{product.title}</h3></div>
          </a>
          <div className="p-5">
            <p className="min-h-12 text-sm leading-6 text-[#68736b]">{product.use}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#17201c]/8 pt-4">
              <a href={`${catalog.file}#page=${product.page}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 text-xs font-black text-[#946a2c]">المواصفات<ArrowUpLeft className="size-3.5" aria-hidden="true" /></a>
              <a href={whatsappUrl(`السلام عليكم، أرغب في الاستفسار عن منتج ${product.title} (${product.name}) وسعره وتوفره.`)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#edf5ef] px-3 text-xs font-black text-[#1c7955]"><MessageCircle className="size-3.5" aria-hidden="true" />استفسر</a>
            </div>
          </div>
        </article>
      );})}
    </div>
  );
}

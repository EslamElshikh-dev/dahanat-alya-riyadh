import Image from "next/image";
import type { CatalogProduct } from "@/data/catalogs";
import { productAnchor, productDisplay } from "@/data/product-display";
export function ProductPackshot({ product, suffix = "", className = "" }: { product: CatalogProduct; suffix?: string; className?: string }) {
  const display = productDisplay[product.packshotKey || product.name];
  if (!display || product.customImage) return <span className={`product-packshot custom-packshot ${className}`}><Image src={product.image} alt={`عبوة ${product.title}`} width={560} height={620} sizes="(max-width: 680px) 75vw, (max-width: 1100px) 40vw, 300px" style={{objectFit:"contain",width:"100%",height:"100%"}} /></span>;
  const id = `pack-${productAnchor(product.name)}-${suffix}`;
  return <svg className={`product-packshot ${className}`} viewBox={display.viewBox} role="img" aria-label={`عبوة ${product.title}`}><defs><clipPath id={id}><path d={display.outline}/></clipPath></defs><image href={product.image} x="0" y="0" width="480" height="360" clipPath={`url(#${id})`}/></svg>;
}

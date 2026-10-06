import type { CatalogProduct } from "@/data/catalogs";
import { productAnchor, productDisplay } from "@/data/product-display";
export function ProductPackshot({ product, suffix = "", className = "" }: { product: CatalogProduct; suffix?: string; className?: string }) {
  const display = productDisplay[product.name];
  const id = `pack-${productAnchor(product.name)}-${suffix}`;
  return <svg className={`product-packshot ${className}`} viewBox={display.viewBox} role="img" aria-label={`عبوة ${product.title}`}><defs><clipPath id={id}><path d={display.outline}/></clipPath></defs><image href={product.image} x="0" y="0" width="480" height="360" clipPath={`url(#${id})`}/></svg>;
}

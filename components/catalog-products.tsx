import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpLeft, Plus } from "lucide-react";
import type { Catalog, CatalogProduct } from "@/data/catalogs";
import { ProductPackshot } from "@/components/product-packshot";
import { ProductBackdrop } from "@/components/product-backdrop";
import { productAnchor } from "@/data/product-display";
import { getProductTheme } from "@/data/products";
import { whatsappUrl } from "@/data/site";
export function ProductCard({ product, index = 0 }: { product: CatalogProduct; index?: number }) {
  const slug = product.slug || productAnchor(product.name);
  const theme = {tone:product.tone||getProductTheme(product.name).tone,accent:product.accent||getProductTheme(product.name).accent};
  return <article className="product-card" id={slug}><Link href={`/products/${slug}`} className="product-stage" style={{backgroundColor:theme.tone,"--stage-accent":theme.accent} as CSSProperties} aria-label={`تفاصيل ${product.title}`}><span className="stage-label" aria-hidden="true" dir="ltr">ALYA / {String(index+1).padStart(2,"0")}</span><span className="stage-detail" aria-hidden="true"><ArrowUpLeft size={20}/></span><ProductBackdrop/><span className="product-packshot-motion"><ProductPackshot product={product} suffix="card"/></span><span className="stage-name" aria-hidden="true" dir="ltr">{product.name.replace("ALYA ","")}</span></Link><div className="product-info"><span className="product-english" dir="ltr">{product.name}</span><Link href={`/products/${slug}`}><h3>{product.title}</h3></Link><span className="product-use">{product.use}</span><p className="product-description">{product.description}</p>{product.price!=null&&<p className="public-product-price">{new Intl.NumberFormat("ar-SA",{style:"currency",currency:"SAR"}).format(product.price)}</p>}<div className="product-actions"><Link href={`/products/${slug}`}>اكتشف المنتج <ArrowUpLeft size={16}/></Link><a href={whatsappUrl(`السلام عليكم، أرغب في الاستفسار عن ${product.title} (${product.name}) وسعره وتوفره.`)} target="_blank" rel="noreferrer" aria-label={`استفسر عن ${product.title}`}><Plus size={18}/></a></div></div></article>;
}
export function CatalogProducts({ catalog }: { catalog: Catalog }) {
  return <div className="product-grid">{catalog.products.map((product,index)=><ProductCard key={product.name} product={product} index={index}/>)}</div>;
}

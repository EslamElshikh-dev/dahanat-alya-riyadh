import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/catalog-products";
import { publicProducts } from "@/lib/admin/catalog";
export async function CatalogSection() {
  const products=await publicProducts(); const pinned=products.filter(p=>p.featured);
  const featured = (pinned.length?pinned:products).slice(0,4);
  return <section className="section-space products-home" id="products"><div className="container-shell"><div className="section-heading"><div><span className="eyebrow">مجموعة عليا</span><h2 className="section-title">لكل سطح،<br/>اختيار يصنع الفرق.</h2></div><div><p>من أول طبقة تأسيس إلى اللمسة الأخيرة.<br/>اكتشف الدهانات والطلاءات المناسبة لمساحتك.</p><Link href="/products" className="text-link">كل المنتجات <ArrowLeft size={18}/></Link></div></div><div className="product-grid">{featured.map((product,index)=><ProductCard key={product.name} product={product} index={index}/>)}</div></div></section>;
}

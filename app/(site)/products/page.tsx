import type { Metadata } from "next";
import { publicProducts } from "@/lib/admin/catalog";
import { ProductBrowser } from "@/components/product-browser";
import { ContactBand } from "@/components/contact-band";
import { site } from "@/data/site";
export const metadata: Metadata={title:"منتجات دهانات عليا",description:"اكتشف منتجات دهانات عليا للتأسيس والدهانات الداخلية والخارجية وطلاءات الحماية، بأسماء المنتجات وصورها واستخداماتها.",alternates:{canonical:"/products"}};
export const revalidate=60;
export default async function ProductsPage() {
 const products=await publicProducts();
 const schema={"@context":"https://schema.org","@graph":[{"@type":"CollectionPage",name:"منتجات دهانات عليا",url:`${site.url}/products`,inLanguage:"ar-SA",mainEntity:{"@id":`${site.url}/products#list`}},{"@type":"ItemList","@id":`${site.url}/products#list`,numberOfItems:products.length,itemListElement:products.map((p,i)=>({"@type":"ListItem",position:i+1,url:`${site.url}/products/${p.slug}`,name:p.title}))}]};
 return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><section className="page-hero"><div className="container-shell page-hero-row"><div><span className="eyebrow">منتجات عليا</span><h1>اختيارات جميلة.<br/>لكل سطح ومكان.</h1><p>تعرّف على مجموعات الدهانات والتأسيس والطلاءات، وابحث عن المنتج المناسب لاستخدامك.</p></div><div className="page-hero-swatch" aria-hidden="true">{["#235d71","#db684e","#f2c978","#a4b7a0"].map(color=><span key={color} style={{backgroundColor:color}}/>)}</div></div></section><ProductBrowser products={products}/><ContactBand/></main>;
}

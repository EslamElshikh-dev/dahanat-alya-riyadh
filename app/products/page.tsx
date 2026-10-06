import type { Metadata } from "next";
import { CatalogCard } from "@/components/catalog-card";
import { CatalogProducts } from "@/components/catalog-products";
import { catalogs } from "@/data/catalogs";
import { productAnchor } from "@/data/product-display";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "منتجات دهانات عليا والكتالوجات",
  description: "اكتشف منتجات دهانات عليا ومجموعة Alya Thermal: دهانات داخلية وخارجية، مواد تأسيس وطلاءات حماية، مع المواصفات والاستفسار عن السعر والتوفر.",
  alternates: { canonical: "/products" },
  openGraph: { title: "منتجات دهانات عليا", description: "دهانات وتأسيس وطلاءات حماية لكل سطح.", url: "/products", images: [{ url: "/catalog-previews/paint-cover.webp", alt: "منتجات دهانات عليا" }] },
};

export default function ProductsPage() {
  const products = catalogs.flatMap((catalog) => catalog.products.map((product) => ({
    "@type": "Product", "@id": `${site.url}/products#${productAnchor(product.name)}`,
    name: product.title, alternateName: product.name, description: product.use,
    image: `${site.url}${product.image}`, url: `${site.url}/products#${productAnchor(product.name)}`,
    category: catalog.label, brand: { "@type": "Brand", name: catalog.englishTitle },
  })));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${site.url}/products#page`, url: `${site.url}/products`, name: "منتجات دهانات عليا", inLanguage: "ar-SA", isPartOf: { "@id": `${site.url}/#website` }, mainEntity: { "@id": `${site.url}/products#list` } },
      { "@type": "ItemList", "@id": `${site.url}/products#list`, numberOfItems: products.length, itemListElement: products.map((product, i) => ({ "@type": "ListItem", position: i + 1, item: { "@id": product["@id"] } })) },
      ...products,
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "الرئيسية", item: site.url }, { "@type": "ListItem", position: 2, name: "المنتجات", item: `${site.url}/products` }] },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="hero-pattern bg-[#111914] py-10 text-white sm:py-14"><div className="container-shell"><span className="section-kicker !text-[#dcb66f]">الألوان تبدأ من هنا</span><h1 className="section-title mt-4">منتجات دهانات عليا</h1><p className="mt-4 max-w-2xl text-sm leading-8 text-white/65 sm:text-base">دهانات وتأسيس وحلول حماية، لكل سطح احتياجه. تعرّف على المنتج، واستفسر عن السعر والتوفر مباشرة.</p><nav className="mt-6 flex flex-wrap gap-2" aria-label="مجموعات المنتجات">{catalogs.map((catalog) => <a key={catalog.slug} href={`#${catalog.slug}`} className="rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-[#e2c48d] hover:bg-white/10">{catalog.englishTitle}</a>)}<a href="#catalogs" className="rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white/75 hover:bg-white/10">الكتالوجات والمواصفات</a></nav></div></section>
      <section className="bg-[#f8f7f3] py-10 sm:py-14"><div className="container-shell grid gap-12">{catalogs.map((catalog) => <section key={catalog.slug} id={catalog.slug} className="scroll-mt-28"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-black text-[#17201c]">{catalog.englishTitle}<span className="mr-3 text-sm font-medium text-[#68736b]">{catalog.label}</span></h2><span className="text-xs font-bold text-[#946a2c]">{catalog.products.length.toLocaleString("ar-SA")} منتجات</span></div><CatalogProducts catalog={catalog} /></section>)}</div></section>
      <section className="section-space bg-[#ecefe6]" id="catalogs"><div className="container-shell"><div className="mb-9"><span className="section-kicker">مواصفات وطريقة التطبيق</span><h2 className="section-title mt-4">الكتالوجات الكاملة</h2><p className="mt-4 leading-8 text-[#68736b]">تصفح التفاصيل الفنية أو حمّل الكتالوج المناسب لمنتجك.</p></div><div className="grid gap-6 md:grid-cols-2">{catalogs.map((catalog) => <CatalogCard key={catalog.slug} catalog={catalog} />)}</div></div></section>
    </main>
  );
}

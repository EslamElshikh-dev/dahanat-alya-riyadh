import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers3, Palette } from "lucide-react";
import { CatalogCard } from "@/components/catalog-card";
import { CatalogProducts } from "@/components/catalog-products";
import { catalogs } from "@/data/catalogs";
import { site, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "منتجات دهانات عليا والكتالوجات",
  description: "تصفح منتجات دهانات عليا ومجموعة Alya Thermal. صور المنتجات وكتالوجات PDF للعرض والتحميل، مع استفسار مباشر عن السعر والتوفر.",
  alternates: { canonical: "/products" },
  openGraph: { title: "منتجات دهانات عليا والكتالوجات", description: "اكتشف الدهانات ومواد التأسيس والطلاءات والحماية من كتالوجات عليا الأصلية.", url: "/products", images: [{ url: "/catalog-previews/paint-cover.webp", alt: "كتالوج منتجات دهانات عليا" }] },
};

export default function ProductsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${site.url}/products#page`, url: `${site.url}/products`, name: "منتجات دهانات عليا والكتالوجات", inLanguage: "ar-SA", isPartOf: { "@id": `${site.url}/#website` }, mainEntity: { "@id": `${site.url}/products#catalogs` } },
      { "@type": "ItemList", "@id": `${site.url}/products#catalogs`, itemListElement: catalogs.map((catalog, i) => ({ "@type": "ListItem", position: i + 1, name: catalog.title, url: `${site.url}/products/${catalog.slug}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "الرئيسية", item: site.url }, { "@type": "ListItem", position: 2, name: "المنتجات والكتالوجات", item: `${site.url}/products` }] },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="hero-pattern relative overflow-hidden bg-[#111914] py-16 text-white sm:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="hero-enter"><span className="section-kicker !text-[#dcb66f]">المنتجات والكتالوجات</span><h1 className="section-title mt-5 max-w-[18ch]">ابدأ بالمنتج المناسب.<br /><span className="text-[#d8a95c]">وأكمل بلون يليق بك.</span></h1><p className="mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">تعرف على مجموعات دهانات عليا، من تجهيز الأسطح ودهانات الجدران إلى الطلاء الخارجي والحماية. الكتالوجات الأصلية بين يديك، والتواصل معنا خطوة واحدة.</p><a href={whatsappUrl("السلام عليكم، أريد المساعدة في اختيار منتج من دهانات عليا ومعرفة السعر والتوفر.")} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#d0a052] px-6 text-sm font-black text-[#111914] hover:bg-[#e0b66e]">ساعدني في اختيار المنتج<ArrowLeft className="size-4" aria-hidden="true" /></a></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { icon: BookOpen, value: "كتالوجان", label: "للعرض والتحميل" },
              { icon: Palette, value: "دهانات عليا", label: "تأسيس • داخلي • خارجي" },
              { icon: Layers3, value: "عليا ثيرمال", label: "طلاءات وحلول حماية" },
            ].map(({ icon: Icon, value, label }, i) => <div key={value} className={`rounded-[22px] border border-white/10 bg-white/[.045] p-5 sm:p-6 ${i === 0 ? "col-span-2" : ""}`}><Icon className="size-6 text-[#d8b16c]" aria-hidden="true" /><p className="mt-5 text-xl font-black">{value}</p><p className="mt-2 text-xs leading-6 text-white/55">{label}</p></div>)}
          </div>
        </div>
      </section>
      <section className="section-space bg-[#ecefe6]" id="catalogs"><div className="container-shell"><div className="mb-9"><span className="section-kicker">دليلك للاختيار</span><h2 className="section-title mt-4">اختر المجموعة، واستكشف التفاصيل.</h2></div><div className="grid gap-6 md:grid-cols-2">{catalogs.map((catalog) => <CatalogCard key={catalog.slug} catalog={catalog} />)}</div></div></section>
      <section className="section-space bg-[#f8f7f3]"><div className="container-shell"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><span className="section-kicker">تصفح المنتجات</span><h2 className="section-title mt-4">تعرف على العبوة واستخدامها.</h2></div><nav className="flex flex-wrap gap-2" aria-label="مجموعات المنتجات">{catalogs.map((catalog) => <a key={catalog.slug} href={`#${catalog.slug}`} className="rounded-full border border-[#17201c]/15 px-4 py-2.5 text-sm font-bold text-[#17201c] hover:bg-white">{catalog.englishTitle}</a>)}</nav></div><p className="mt-5 max-w-2xl leading-8 text-[#68736b]">المواصفات التفصيلية وطريقة التطبيق موضحة في الكتالوج. تواصل معنا لتأكيد السعر والتوفر وتحديد المنتج المناسب لسطح مشروعك.</p><div className="mt-10 grid gap-14">{catalogs.map((catalog) => <section key={catalog.slug} id={catalog.slug} className="scroll-mt-28"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-black text-[#17201c]">{catalog.englishTitle}<span className="mr-3 text-sm font-medium text-[#68736b]">{catalog.label}</span></h2><Link href={`/products/${catalog.slug}`} className="inline-flex min-h-10 items-center gap-2 text-sm font-black text-[#946a2c]">الكتالوج الكامل<ArrowLeft className="size-4" aria-hidden="true" /></Link></div><CatalogProducts catalog={catalog} /></section>)}</div></div></section>
    </main>
  );
}

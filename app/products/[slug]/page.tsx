import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, Download, ExternalLink, FileText, MessageCircle } from "lucide-react";
import { CatalogProducts } from "@/components/catalog-products";
import { CatalogViewer } from "@/components/catalog-viewer";
import { catalogs, getCatalog } from "@/data/catalogs";
import { site, whatsappUrl } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return catalogs.map((catalog) => ({ slug: catalog.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getCatalog(slug);
  if (!catalog) return {};
  return { title: catalog.title, description: catalog.description, alternates: { canonical: `/products/${catalog.slug}` }, openGraph: { title: catalog.title, description: catalog.description, url: `/products/${catalog.slug}`, images: [{ url: catalog.cover, alt: catalog.title }] } };
}

export default async function CatalogPage({ params }: Props) {
  const { slug } = await params;
  const catalog = getCatalog(slug);
  if (!catalog) notFound();
  const other = catalogs.find((item) => item.slug !== slug)!;
  const url = `${site.url}/products/${catalog.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#page`, url, name: catalog.title, inLanguage: "ar-SA", isPartOf: { "@id": `${site.url}/#website` }, mainEntity: { "@id": `${url}#catalog` } },
      { "@type": "DigitalDocument", "@id": `${url}#catalog`, name: catalog.title, alternateName: catalog.englishTitle, description: catalog.description, url, image: `${site.url}${catalog.cover}`, inLanguage: ["ar", "en"], isAccessibleForFree: true, encoding: { "@type": "MediaObject", contentUrl: `${site.url}${catalog.file}`, encodingFormat: "application/pdf", contentSize: `${catalog.bytes} bytes` } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "الرئيسية", item: site.url }, { "@type": "ListItem", position: 2, name: "المنتجات والكتالوجات", item: `${site.url}/products` }, { "@type": "ListItem", position: 3, name: catalog.title, item: url }] },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="hero-pattern overflow-hidden bg-[#111914] py-12 text-white sm:py-18">
        <div className="container-shell"><nav aria-label="مسار التنقل" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-white/55"><Link href="/" className="hover:text-white">الرئيسية</Link><ChevronLeft className="size-3.5" aria-hidden="true" /><Link href="/products" className="hover:text-white">المنتجات</Link><ChevronLeft className="size-3.5" aria-hidden="true" /><span className="text-[#d8b16c]">{catalog.title}</span></nav><div className="grid gap-9 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><span className="section-kicker !text-[#dcb66f]">{catalog.label}</span><h1 className="section-title mt-4">{catalog.title}</h1><p className="mt-4 text-sm font-bold tracking-wide text-[#d8b16c]" dir="ltr">{catalog.englishTitle}</p><p className="mt-6 text-base leading-8 text-white/65">{catalog.description}</p><div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/55"><span className="inline-flex items-center gap-2"><FileText className="size-4" aria-hidden="true" />{catalog.pages.toLocaleString("ar-SA")} صفحة</span><span aria-hidden="true">·</span><span dir="ltr">PDF · {catalog.sizeLabel}</span></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={catalog.file} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#d0a052] px-6 text-sm font-black text-[#111914]"><ExternalLink className="size-4" aria-hidden="true" />فتح الكتالوج</a><a href={catalog.file} download className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-black text-white hover:bg-white/10"><Download className="size-4" aria-hidden="true" />تحميل PDF</a></div></div><div className="relative aspect-[1.42] overflow-hidden rounded-[24px] border border-white/15 bg-[#edf0e8] shadow-[0_24px_70px_rgba(0,0,0,.25)]"><Image src={catalog.cover} alt={`غلاف ${catalog.title}`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-3 sm:p-5" /></div></div></div>
      </section>
      <section className="section-space bg-[#f8f7f3]"><div className="container-shell"><div className="mb-8"><span className="section-kicker">من داخل الكتالوج</span><h2 className="section-title mt-4">المنتجات في هذه المجموعة</h2><p className="mt-4 leading-8 text-[#68736b]">اختر منتجًا لفتح صفحته في الكتالوج، أو استفسر عن سعره وتوفره عبر واتساب.</p></div><CatalogProducts catalog={catalog} /></div></section>
      <section className="section-space bg-[#ecefe6]" id="preview"><div className="container-shell"><div className="mb-8"><span className="section-kicker">مواصفات وتفاصيل</span><h2 className="section-title mt-4">اقرأ الكتالوج كاملًا</h2></div><CatalogViewer file={catalog.file} title={catalog.title} /></div></section>
      <section className="bg-[#d0a052] py-12 sm:py-16"><div className="container-shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-2xl font-black text-[#17201c]">تحتاج مساعدة في الاختيار؟</h2><p className="mt-3 leading-7 text-[#17201c]/70">أرسل اسم المنتج وصورة السطح، ونتواصل معك بخصوص التفاصيل والسعر والتوفر.</p></div><a href={whatsappUrl(`السلام عليكم، استعرضت ${catalog.title} وأريد المساعدة في اختيار المنتج ومعرفة السعر والتوفر.`)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#17201c] px-6 text-sm font-black text-white"><MessageCircle className="size-5" aria-hidden="true" />استفسر عبر واتساب</a></div></section>
      <div className="bg-white py-8"><div className="container-shell"><Link href={`/products/${other.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-black text-[#946a2c]">استكشف {other.title}<ArrowLeft className="size-4" aria-hidden="true" /></Link></div></div>
    </main>
  );
}

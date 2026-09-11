import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { localize, productGroups, products, type Locale, type Product } from "@/data/products";
import { site, whatsappUrl } from "@/data/site";

export function ProductDetail({ product, locale }: { product: Product; locale: Locale }) {
  const isEnglish = locale === "en";
  const prefix = isEnglish ? "/en" : "";
  const group = productGroups[product.category];
  const Chevron = isEnglish ? ChevronRight : ChevronLeft;
  const Forward = isEnglish ? ArrowRight : ArrowLeft;
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const message = isEnglish
    ? `Hello, I would like technical information and a quotation for ${product.code}.`
    : `السلام عليكم، أرغب في معلومات فنية وعرض سعر لمنتج ${product.code}.`;
  const pageUrl = `${site.url}${prefix}/products/${product.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: localize(product.name, locale),
        alternateName: product.code,
        description: localize(product.description, locale),
        image: `${site.url}${product.image}`,
        url: pageUrl,
        brand: { "@type": "Brand", name: product.category === "thermal" ? "Alya Thermal" : "Alya Paints" },
        manufacturer: { "@id": `${site.url}/#organization` },
        additionalProperty: product.specs.map((item) => ({
          "@type": "PropertyValue",
          name: localize(item.label, locale),
          value: localize(item.value, locale),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isEnglish ? "Home" : "الرئيسية", item: `${site.url}${prefix || "/"}` },
          { "@type": "ListItem", position: 2, name: isEnglish ? "Products" : "المنتجات", item: `${site.url}${prefix}/products` },
          { "@type": "ListItem", position: 3, name: product.code, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main dir={isEnglish ? "ltr" : "rtl"} className={isEnglish ? "font-en" : ""}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="product-hero">
        <div className="container-shell relative z-10 py-9 lg:py-16">
          <nav className="product-breadcrumb" aria-label={isEnglish ? "Breadcrumb" : "مسار التنقل"}>
            <Link href={prefix || "/"}>{isEnglish ? "Home" : "الرئيسية"}</Link><Chevron className="size-3.5" />
            <Link href={`${prefix}/products`}>{isEnglish ? "Products" : "المنتجات"}</Link><Chevron className="size-3.5" />
            <span>{product.code}</span>
          </nav>

          <div className="grid items-center gap-9 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div className="hero-enter py-5">
              <div className="flex items-center gap-3">
                <Image src={group.logo} alt={localize(group.name, locale)} width={170} height={54} className="h-11 w-auto rounded-lg bg-white object-contain px-2" />
                <span className="product-hero-code" dir="ltr">{product.code}</span>
              </div>
              <h1 className="mt-7 text-4xl font-black leading-[1.2] tracking-[-.04em] text-white sm:text-5xl lg:text-6xl">{localize(product.name, locale)}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-white/66">{localize(product.description, locale)}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="alya-button-primary"><a href={whatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle className="size-5" />{isEnglish ? "Request product quote" : "اطلب عرض سعر للمنتج"}</a></Button>
                <Button asChild size="lg" variant="outline" className="alya-button-outline"><a href={`tel:${site.phoneE164}`}><Phone className="size-4.5" />{isEnglish ? "Call us" : "تحدث معنا"}</a></Button>
              </div>
            </div>

            <div className="product-hero-stage hero-visual-enter" style={{ "--product-accent": product.accent } as React.CSSProperties}>
              <span className="product-hero-stage-code" dir="ltr">{product.code}</span>
              <div className="product-hero-ring" />
              <Image src={product.image} alt={localize(product.name, locale)} width={700} height={700} priority sizes="(max-width: 1024px) 90vw, 50vw" className="relative z-10 mx-auto h-auto max-h-[480px] w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#0d789d]/10 bg-white py-8">
        <div className="container-shell grid gap-3 md:grid-cols-3">
          {product.benefits.map((benefit) => (
            <div key={benefit.en} className="product-benefit"><span><Check className="size-4" /></span><p>{localize(benefit, locale)}</p></div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[#f4fafb]">
        <div className="container-shell grid items-start gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <span className="section-kicker">{isEnglish ? "Recommended use" : "الاستخدام الموصى به"}</span>
            <h2 className="section-title mt-4">{isEnglish ? "Compatible substrates" : "الأسطح المناسبة"}</h2>
            <p className="mt-5 leading-8 text-[#617784]">{isEnglish ? "Substrate assessment and correct preparation remain essential before application." : "يبقى فحص السطح وتجهيزه بصورة صحيحة خطوة أساسية قبل التطبيق."}</p>
            <ul className="mt-7 grid gap-3">
              {product.surfaces.map((surface) => <li key={surface.en} className="surface-item"><ShieldCheck className="size-5" />{localize(surface, locale)}</li>)}
            </ul>
          </div>
          <div>
            <div className="product-panel product-panel-dark">
              <span className="section-kicker section-kicker-light">{isEnglish ? "Application overview" : "ملخص التطبيق"}</span>
              <h2 className="mt-4 text-3xl font-black">{isEnglish ? "A clear application sequence" : "تسلسل تطبيق واضح"}</h2>
              <ol className="mt-8 grid gap-4">
                {product.application.map((step, index) => (
                  <li key={step.en} className="application-step"><span>{String(index + 1).padStart(2, "0")}</span><p>{localize(step, locale)}</p></li>
                ))}
              </ol>
            </div>
            <div className="product-panel mt-5 bg-white">
              <span className="section-kicker">{isEnglish ? "Technical snapshot" : "بيانات فنية مختصرة"}</span>
              <dl className="spec-grid mt-7">
                {product.specs.map((item) => (
                  <div key={item.label.en}><dt>{localize(item.label, locale)}</dt><dd dir="auto">{localize(item.value, locale)}</dd></div>
                ))}
              </dl>
              <p className="mt-6 border-t border-[#0d789c]/10 pt-5 text-xs leading-6 text-[#78909b]">
                {isEnglish ? "Values are a practical summary. Review the latest technical data sheet and conduct a site trial before specification or application." : "القيم المعروضة ملخص عملي. يُنصح بمراجعة أحدث نشرة فنية وإجراء تجربة موقعية قبل الاعتماد أو التطبيق."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><span className="section-kicker">{isEnglish ? "Complete the system" : "استكمل النظام"}</span><h2 className="mt-4 text-3xl font-black tracking-[-.03em]">{isEnglish ? "Related products" : "منتجات مرتبطة"}</h2></div>
            <Link href={`${prefix}/products`} className="text-link">{isEnglish ? "All products" : "كل المنتجات"}<Forward className="size-4" /></Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item.slug} product={item} locale={locale} />)}</div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import { Beaker, Layers3, ShieldCheck } from "lucide-react";
import { ProductExplorer } from "@/components/product-explorer";
import { products, type Locale } from "@/data/products";

export function ProductsPage({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";

  return (
    <main dir={isEnglish ? "ltr" : "rtl"} className={isEnglish ? "font-en" : ""}>
      <section className="catalog-hero">
        <div className="container-shell relative z-10 grid items-center gap-10 py-16 lg:grid-cols-[1fr_.82fr] lg:py-24">
          <div className="hero-enter">
            <span className="hero-eyebrow"><span />{isEnglish ? "ALYA product catalogue" : "كتالوج منتجات كيميا عليا"}</span>
            <h1 className="section-title mt-6 max-w-[15ch] text-white">
              {isEnglish ? "Specialised systems. Clear product choices." : "أنظمة متخصصة. واختيار أوضح لكل تطبيق."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-white/62">
              {isEnglish
                ? "Explore the full Alya Thermal and Alya Paints portfolio, including insulation, waterproofing, primers, textures and architectural finishes."
                : "استعرض مجموعة عليا ثيرمال وعليا للدهانات كاملة: العزل الحراري والمائي، الأساسات، التكسيات، والدهانات المعمارية."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="catalog-stat"><strong>{products.length}</strong>{isEnglish ? "products" : "منتجًا"}</span>
              <span className="catalog-stat"><strong>02</strong>{isEnglish ? "product families" : "عائلتا منتجات"}</span>
            </div>
          </div>
          <div className="catalog-hero-visual hero-visual-enter">
            <Image src="/products/alya-wall-dtc.webp" alt="ALYA WALL-DTC" width={420} height={420} priority className="catalog-hero-bucket catalog-hero-bucket-one" />
            <Image src="/products/alya-lux-ex.webp" alt="ALYA LUX EX" width={410} height={410} priority className="catalog-hero-bucket catalog-hero-bucket-two" />
            <div className="catalog-hero-ring"><ShieldCheck className="size-9" /></div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#0a789c]/10 bg-white py-7">
        <div className="container-shell grid gap-3 sm:grid-cols-3">
          {[
            { icon: Beaker, ar: "تركيبات متخصصة", en: "Specialised formulations" },
            { icon: Layers3, ar: "أنظمة مترابطة", en: "Connected systems" },
            { icon: ShieldCheck, ar: "حماية للمباني", en: "Building protection" },
          ].map(({ icon: Icon, ar, en }) => (
            <div key={en} className="catalog-promise"><Icon className="size-5" /><span>{isEnglish ? en : ar}</span></div>
          ))}
        </div>
      </section>

      <section className="section-space bg-[#f4fafb]">
        <div className="container-shell">
          <ProductExplorer locale={locale} />
        </div>
      </section>
    </main>
  );
}

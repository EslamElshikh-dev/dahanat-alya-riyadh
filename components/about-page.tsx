import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Beaker, CheckCircle2, Factory, Layers3, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/data/products";

export function AboutPage({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const prefix = isEnglish ? "/en" : "";
  const Forward = isEnglish ? ArrowRight : ArrowLeft;
  const values = [
    { icon: Beaker, ar: "تطوير المنتج", en: "Product development", arText: "تركيبات تخدم وظيفة واضحة وتتكامل داخل نظام التطبيق.", enText: "Formulations built around a clear function within the application system." },
    { icon: ShieldCheck, ar: "أداء الحماية", en: "Protective performance", arText: "حلول للعزل والأسطح والواجهات والطلاءات الداخلية.", enText: "Solutions for insulation, roofs, façades and interior coatings." },
    { icon: Layers3, ar: "وضوح النظام", en: "System clarity", arText: "تحضير وطبقة وظيفية وتشطيب نهائي بخطوات مترابطة.", enText: "Preparation, functional coat and final finish in a connected workflow." },
  ];
  const commitments = isEnglish
    ? ["Match the system to the substrate and application", "Provide clear product and application information", "Develop complementary product families", "Support project and distribution enquiries"]
    : ["ملاءمة النظام مع السطح والاستخدام", "عرض معلومات المنتج والتطبيق بوضوح", "تطوير عائلات منتجات متكاملة", "خدمة استفسارات المشاريع والموزعين"];

  return (
    <main dir={isEnglish ? "ltr" : "rtl"} className={isEnglish ? "font-en" : ""}>
      <section className="about-hero">
        <Image src="/brand/alya-hero.webp" alt={isEnglish ? "ALYA CHEMICAL building solutions" : "حلول كيميا عليا للمباني"} fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="about-hero-overlay" />
        <div className="container-shell relative z-10 flex min-h-[590px] items-center py-20">
          <div className="hero-enter max-w-3xl">
            <span className="hero-eyebrow"><span />{isEnglish ? "About ALYA CHEMICAL" : "عن كيميا عليا"}</span>
            <h1 className="mt-7 text-4xl font-black leading-[1.25] tracking-[-.045em] text-white sm:text-6xl">
              {isEnglish ? "Saudi industrial thinking for better protected buildings." : "فكر صناعي سعودي لمبانٍ أكثر حماية وكفاءة."}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-white/66">
              {isEnglish
                ? "ALYA CHEMICAL For Industry Ltd. develops thermal, waterproofing and architectural coating solutions through the Alya Thermal and Alya Paints families."
                : "تطوّر كيميا عليا للصناعات المحدودة حلول العزل والدهانات المعمارية من خلال عائلتي عليا ثيرمال وعليا للدهانات."}
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f4fafb]">
        <div className="container-shell grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-18">
          <div>
            <span className="section-kicker">{isEnglish ? "Our focus" : "تركيزنا"}</span>
            <h2 className="section-title mt-4">{isEnglish ? "Chemistry translated into practical building systems." : "نحوّل الكيمياء إلى أنظمة عملية للمباني."}</h2>
          </div>
          <div>
            <p className="text-lg leading-9 text-[#526d7a]">
              {isEnglish
                ? "Our portfolio connects substrate preparation, functional protection and architectural finishing. This system-led approach makes product selection clearer and supports more consistent application across projects."
                : "تربط محفظتنا بين تجهيز السطح والحماية الوظيفية والتشطيب المعماري. هذا النهج القائم على الأنظمة يجعل اختيار المنتج أوضح ويدعم تطبيقًا أكثر اتساقًا في المشاريع."}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="about-stat"><strong>17</strong><span>{isEnglish ? "specialised products" : "منتجًا متخصصًا"}</span></div>
              <div className="about-stat"><strong>02</strong><span>{isEnglish ? "integrated product families" : "عائلتا منتجات متكاملتان"}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><span className="section-kicker justify-center">{isEnglish ? "How we think" : "كيف نفكر"}</span><h2 className="section-title mx-auto mt-4">{isEnglish ? "Function first, then finish." : "الوظيفة أولًا، ثم جودة التشطيب."}</h2></div>
          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, ar, en, arText, enText }, index) => (
              <article key={en} className="about-value"><span className="about-value-number">0{index + 1}</span><Icon className="size-7 text-[#0b789e]" /><h3>{isEnglish ? en : ar}</h3><p>{isEnglish ? enText : arText}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#071828] text-white">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[#0b2538]">
            <div className="about-visual-grid" />
            <Factory className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 text-[#51d4d6]/18" strokeWidth={.8} />
            <Image src="/products/alya-roof-twp.webp" alt="ALYA ROOF-TWP" width={500} height={500} className="absolute bottom-[-8%] left-1/2 w-[72%] -translate-x-1/2 object-contain drop-shadow-[0_32px_35px_rgba(0,0,0,.3)]" />
          </div>
          <div>
            <span className="section-kicker section-kicker-light">{isEnglish ? "Our commitment" : "التزامنا"}</span>
            <h2 className="section-title mt-4">{isEnglish ? "A clearer path from enquiry to specification." : "مسار أوضح من الاستفسار حتى اختيار النظام."}</h2>
            <ul className="mt-8 grid gap-4">
              {commitments.map((item) => <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/9 bg-white/[.04] p-4 font-bold text-white/76"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#4dd5d6]" />{item}</li>)}
            </ul>
            <Button asChild size="lg" className="alya-button-primary mt-8"><Link href={`${prefix}/products`}>{isEnglish ? "Explore our products" : "استكشف منتجاتنا"}<Forward className="size-4.5" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="border-b border-[#0c789d]/10 bg-[#27b7bb] py-12 text-[#061725]">
        <div className="container-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><Target className="size-8" /><p className="text-xl font-black">{isEnglish ? "Need help identifying the right system?" : "تحتاج مساعدة في تحديد النظام المناسب؟"}</p></div><Link href={`${prefix}/contact`} className="inline-flex items-center gap-2 font-black">{isEnglish ? "Contact us" : "تواصل معنا"}<Forward className="size-4" /></Link></div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Layers3,
  MessageCircle,
  Paintbrush2,
  ShieldCheck,
  Sparkles,
  ThermometerSun,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { featuredProducts, localize, productGroups, type Locale } from "@/data/products";
import { defaultWhatsAppMessage, defaultWhatsAppMessageEn, whatsappUrl } from "@/data/site";

const copy = {
  ar: {
    eyebrow: "صناعة سعودية • حلول متطورة للمباني",
    titleBefore: "كيمياء الحماية.",
    titleAccent: "هندسة الأداء.",
    lead: "نطوّر أنظمة العزل الحراري والمائي والدهانات المعمارية لتعمل معًا كمنظومة واحدة تحمي المبنى وترفع كفاءة أسطحه وواجهاته.",
    products: "استكشف المنتجات",
    quote: "اطلب عرض سعر",
    metricProducts: "منتجًا متخصصًا",
    metricSystems: "عائلتان متكاملتان",
    metricLocation: "مصنّعة في الرياض",
    systemsKicker: "منظومة منتجات متكاملة",
    systemsTitle: "حل مناسب لكل طبقة من طبقات المبنى.",
    systemsLead: "من تحضير السطح إلى الحماية النهائية؛ صُممت منتجات عليا لتكمّل بعضها وتمنح كل تطبيق المسار الفني المناسب.",
    viewSystem: "استعرض المجموعة",
    featuredKicker: "منتجات مختارة",
    featuredTitle: "أداء واضح يبدأ من اختيار النظام الصحيح.",
    allProducts: "كل المنتجات",
    whyKicker: "لماذا كيميا عليا؟",
    whyTitle: "تطوير صناعي يربط الأداء بسهولة التطبيق.",
    whyLead: "نركز على تركيبات عملية تناسب الأسطح المختلفة والظروف المناخية، مع نظام واضح للتحضير والطلاء والحماية.",
    stepsKicker: "من السطح إلى الحماية",
    stepsTitle: "ثلاثة أدوار. نظام واحد مترابط.",
    ctaKicker: "للمشاريع والموزعين",
    ctaTitle: "شاركنا متطلبات مشروعك ونرشح لك النظام المناسب.",
    ctaLead: "أرسل نوع السطح، مساحة المشروع، وطبيعة الاستخدام للحصول على توجيه أولي وعرض سعر.",
    contact: "تحدث مع فريق عليا",
  },
  en: {
    eyebrow: "Saudi-made • Advanced building solutions",
    titleBefore: "Protection chemistry.",
    titleAccent: "Performance engineered.",
    lead: "We develop thermal insulation, waterproofing and architectural coating systems that work together to protect buildings and improve the performance of roofs and façades.",
    products: "Explore products",
    quote: "Request a quote",
    metricProducts: "specialised products",
    metricSystems: "integrated families",
    metricLocation: "manufactured in Riyadh",
    systemsKicker: "One integrated portfolio",
    systemsTitle: "The right solution for every layer of the building.",
    systemsLead: "From substrate preparation to final protection, ALYA products are developed to complement each other and provide a clear system for every application.",
    viewSystem: "Explore range",
    featuredKicker: "Selected products",
    featuredTitle: "Clear performance starts with the right system.",
    allProducts: "All products",
    whyKicker: "Why ALYA CHEMICAL",
    whyTitle: "Industrial development that balances performance and application.",
    whyLead: "We focus on practical formulations for varied substrates and climates, with a clear preparation, coating and protection workflow.",
    stepsKicker: "From substrate to protection",
    stepsTitle: "Three roles. One connected system.",
    ctaKicker: "For projects and distributors",
    ctaTitle: "Share your project requirements and we will help identify the right system.",
    ctaLead: "Send the substrate type, project area and intended use for an initial recommendation and quotation.",
    contact: "Talk to ALYA",
  },
} as const;

export function HomePage({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const t = copy[locale];
  const prefix = isEnglish ? "/en" : "";
  const Forward = isEnglish ? ArrowRight : ArrowLeft;
  const Corner = isEnglish ? ArrowUpRight : ArrowUpLeft;
  const quoteMessage = isEnglish ? defaultWhatsAppMessageEn : defaultWhatsAppMessage;
  const systems = [
    {
      key: "thermal" as const,
      icon: ThermometerSun,
      features: isEnglish ? ["Thermal insulation", "Waterproofing", "Surface protection"] : ["عزل حراري", "عزل مائي", "حماية الأسطح"],
      products: ["alya-roof-twp", "alya-wall-dtc"],
    },
    {
      key: "paint" as const,
      icon: Paintbrush2,
      features: isEnglish ? ["Interior paints", "Façade coatings", "Primers & textures"] : ["دهانات داخلية", "طلاءات واجهات", "أساسات وتكسيات"],
      products: ["alya-lux-ex", "alya-lux"],
    },
  ];
  const strengths = [
    { icon: FlaskConical, ar: "تركيبات مائية متطورة", en: "Advanced water-based formulas", arText: "حلول عملية مصممة لرفع كفاءة الأسطح وتقليل تعقيد التطبيق.", enText: "Practical solutions designed to improve substrate performance and simplify application." },
    { icon: Layers3, ar: "منتجات تعمل كنظام", en: "Products built as systems", arText: "أساسات وطبقات وظيفية وتشطيبات نهائية مترابطة لكل استخدام.", enText: "Primers, functional coats and finishes developed to work together." },
    { icon: ShieldCheck, ar: "حماية متعددة الوظائف", en: "Multi-function protection", arText: "خيارات للعزل والمقاومة الجوية والواجهات والمساحات الداخلية.", enText: "Options for insulation, weather resistance, façades and interiors." },
    { icon: Building2, ar: "حلول للمباني والمشاريع", en: "Built for buildings and projects", arText: "مجموعة واضحة تخدم المقاولين والمكاتب الهندسية والموزعين.", enText: "A clear portfolio for contractors, specifiers and distributors." },
  ];
  const steps = [
    { number: "01", icon: Sparkles, ar: "تحضير السطح", en: "Prepare", arText: "تنظيف ومعالجة واختيار البرايمر المتوافق.", enText: "Clean, repair and select the compatible primer." },
    { number: "02", icon: Droplets, ar: "تطبيق الطبقة الوظيفية", en: "Apply", arText: "عزل أو دهان أو تكسية وفق متطلبات السطح.", enText: "Apply insulation, paint or texture for the substrate." },
    { number: "03", icon: ShieldCheck, ar: "تعزيز الحماية", en: "Protect", arText: "استكمال النظام بطبقة نهائية عند الحاجة.", enText: "Complete the system with a protective finish where required." },
  ];

  return (
    <main dir={isEnglish ? "ltr" : "rtl"} className={isEnglish ? "font-en" : ""}>
      <section className="alya-hero">
        <div className="alya-hero-glow alya-hero-glow-one" />
        <div className="alya-hero-glow alya-hero-glow-two" />
        <div className="container-shell grid min-h-[690px] items-center gap-10 py-16 lg:grid-cols-[.92fr_1.08fr] lg:gap-14 lg:py-20">
          <div className="hero-enter relative z-10">
            <span className="hero-eyebrow"><span />{t.eyebrow}</span>
            <h1 className="alya-display mt-7">{t.titleBefore}<br /><span>{t.titleAccent}</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg sm:leading-9">{t.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="alya-button-primary">
                <Link href={`${prefix}/products`}>{t.products}<Forward className="size-4.5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="alya-button-outline">
                <a href={whatsappUrl(quoteMessage)} target="_blank" rel="noreferrer"><MessageCircle className="size-4.5" />{t.quote}</a>
              </Button>
            </div>
            <div className="hero-metrics">
              <div><strong dir="ltr">17</strong><span>{t.metricProducts}</span></div>
              <div><strong dir="ltr">02</strong><span>{t.metricSystems}</span></div>
              <div><strong className="!text-[1rem]">ALYA</strong><span>{t.metricLocation}</span></div>
            </div>
          </div>

          <div className="hero-product-stage hero-visual-enter" aria-label={isEnglish ? "ALYA product range" : "مجموعة منتجات عليا"}>
            <div className="hero-stage-orbit" />
            <div className="hero-stage-copy" dir="ltr"><span>BUILDING</span><strong>PROTECTION</strong><span>SYSTEMS</span></div>
            <div className="hero-bucket hero-bucket-back">
              <Image src="/products/alya-wall-dtc.webp" alt="ALYA WALL-DTC" width={520} height={520} priority className="object-contain" />
            </div>
            <div className="hero-bucket hero-bucket-main">
              <Image src="/products/alya-roof-twp.webp" alt="ALYA ROOF-TWP" width={620} height={620} priority className="object-contain" />
            </div>
            <div className="hero-bucket hero-bucket-front">
              <Image src="/products/alya-lux-ex.webp" alt="ALYA LUX EX" width={450} height={450} priority className="object-contain" />
            </div>
            <div className="hero-stage-badge"><ShieldCheck className="size-5" /><span>{isEnglish ? "Integrated systems" : "أنظمة متكاملة"}</span></div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f4fafb]" id="systems">
        <div className="container-shell">
          <div className="section-heading-row">
            <div><span className="section-kicker">{t.systemsKicker}</span><h2 className="section-title mt-4">{t.systemsTitle}</h2></div>
            <p>{t.systemsLead}</p>
          </div>
          <div className="mt-11 grid gap-5 lg:grid-cols-2">
            {systems.map((system) => {
              const group = productGroups[system.key];
              return (
                <article key={system.key} id={system.key} className={`system-card system-card-${system.key}`}>
                  <div className="relative z-10 max-w-sm">
                    <Image src={group.logo} alt={localize(group.name, locale)} width={210} height={70} className="h-14 w-auto object-contain object-start" />
                    <h3 className="mt-7 text-3xl font-black tracking-[-.03em]">{localize(group.title, locale)}</h3>
                    <p className="mt-4 leading-8 text-white/63">{localize(group.description, locale)}</p>
                    <ul className="mt-6 grid gap-2.5 text-sm font-bold text-white/78">
                      {system.features.map((feature) => <li key={feature} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#5ce0df]" />{feature}</li>)}
                    </ul>
                    <Link href={`${prefix}/products#${system.key}`} className="system-link">{t.viewSystem}<Corner className="size-4" /></Link>
                  </div>
                  <system.icon className="system-watermark" strokeWidth={1} />
                  <div className="system-products" aria-hidden="true">
                    {system.products.map((slug, index) => (
                      <Image key={slug} src={`/products/${slug}.webp`} alt="" width={360} height={360} className={index ? "system-product-secondary" : "system-product-primary"} />
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <div className="section-heading-row items-end">
            <div><span className="section-kicker">{t.featuredKicker}</span><h2 className="section-title mt-4">{t.featuredTitle}</h2></div>
            <Link href={`${prefix}/products`} className="text-link">{t.allProducts}<Forward className="size-4" /></Link>
          </div>
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 8).map((product, index) => <ProductCard key={product.slug} product={product} locale={locale} priority={index < 4} />)}
          </div>
        </div>
      </section>

      <section className="section-space overflow-hidden bg-[#071828] text-white">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-20">
          <div>
            <span className="section-kicker section-kicker-light">{t.whyKicker}</span>
            <h2 className="section-title mt-4">{t.whyTitle}</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/58 sm:text-lg">{t.whyLead}</p>
            <div className="brand-signature mt-9"><Image src="/brand/alya-chemical.webp" alt="ALYA CHEMICAL" width={456} height={129} className="h-auto w-[210px]" /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map(({ icon: Icon, ar, en, arText, enText }, index) => (
              <article key={en} className="strength-card">
                <span className="strength-number">0{index + 1}</span>
                <Icon className="size-6 text-[#49d3d3]" strokeWidth={1.8} />
                <h3>{isEnglish ? en : ar}</h3>
                <p>{isEnglish ? enText : arText}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space soft-grid bg-[#eef8fa]">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><span className="section-kicker justify-center">{t.stepsKicker}</span><h2 className="section-title mx-auto mt-4">{t.stepsTitle}</h2></div>
          <ol className="system-steps mt-11">
            {steps.map(({ number, icon: Icon, ar, en, arText, enText }) => (
              <li key={number} className="system-step">
                <span className="system-step-number">{number}</span>
                <span className="system-step-icon"><Icon className="size-6" /></span>
                <h3>{isEnglish ? en : ar}</h3>
                <p>{isEnglish ? enText : arText}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="alya-cta">
        <div className="container-shell relative z-10 flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div><span className="text-xs font-black uppercase tracking-[.16em] text-[#96eef0]">{t.ctaKicker}</span><h2 className="mt-3 max-w-3xl text-3xl font-black leading-[1.35] tracking-[-.035em] text-white sm:text-4xl">{t.ctaTitle}</h2><p className="mt-4 max-w-2xl leading-8 text-white/60">{t.ctaLead}</p></div>
          <Button asChild size="lg" className="alya-button-primary shrink-0"><a href={whatsappUrl(quoteMessage)} target="_blank" rel="noreferrer"><MessageCircle className="size-5" />{t.contact}</a></Button>
        </div>
      </section>
    </main>
  );
}

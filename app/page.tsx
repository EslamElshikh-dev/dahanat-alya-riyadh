import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Layers3,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Ruler,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/service-icon";
import { services } from "@/data/services";
import { defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";

const faq = [
  { question: "هل تقدمون المعاينة داخل جميع أحياء الرياض؟", answer: "نستقبل طلبات المعاينة والتنفيذ في مختلف أحياء مدينة الرياض، ويتم تأكيد الموعد حسب موقع المشروع وحجم الأعمال المطلوبة." },
  { question: "هل توفرون المواد أم التنفيذ فقط؟", answer: "يمكن ترتيب العرض على التنفيذ فقط أو التنفيذ مع المواد بحسب رغبتك. نوضح نوع المواد وكمياتها وبنود العمل قبل اعتماد السعر." },
  { question: "متى أعرف المدة المتوقعة للمشروع؟", answer: "بعد المعاينة وتحديد المساحات وحالة الجدران والتفاصيل الديكورية، نحدد مدة واقعية ومراحل واضحة للتنفيذ." },
  { question: "هل تعالجون الشقوق والتقشر قبل الدهان؟", answer: "يتم فحص الأسطح أولًا، ثم إدراج أعمال المعالجة المطلوبة ضمن نطاق العرض قبل التأسيس والدهان." },
  { question: "كيف أختار اللون واللمعة المناسبة؟", answer: "نربط الاختيار بإضاءة المكان ومساحته وطبيعة الاستخدام، ثم نقترح الدرجة والتشطيب الأنسب قبل التنفيذ." },
];

const process = [
  { number: "01", title: "معاينة دقيقة", text: "نفحص المساحات والأسطح ونفهم النتيجة التي تريد الوصول إليها." },
  { number: "02", title: "خطة وعرض واضح", text: "نرتب المواد والمراحل والمدة المتوقعة قبل بدء التنفيذ." },
  { number: "03", title: "تنفيذ منظم", text: "نحمي المكان وننفذ التجهيز والطبقات والتفاصيل بتسلسل فني." },
  { number: "04", title: "مراجعة وتسليم", text: "نفحص اللون والحواف والفواصل وننهي الملاحظات المتفق عليها." },
];

const features = [
  { icon: Palette, title: "اختيار أذكى للألوان", text: "وفق الإضاءة والخامة وطبيعة استخدام المساحة." },
  { icon: Ruler, title: "مقاسات ومحاور دقيقة", text: "حتى تستقيم الفواصل والعناصر الديكورية بصريًا." },
  { icon: Layers3, title: "ترتيب صحيح للطبقات", text: "تجهيز وتأسيس وتشطيب بالترتيب المناسب للسطح." },
  { icon: Sparkles, title: "تسليم نظيف", text: "مراجعة نهائية للحواف والزوايا وتجانس اللون." },
];

const featuredServices = services.slice(0, 6);

export default function Home() {
  return (
    <main>
      <section className="hero-pattern relative overflow-hidden bg-[#111914] text-white">
        <div className="pointer-events-none absolute -right-24 top-16 size-80 rounded-full bg-[#c99543]/10 blur-3xl" />
        <div className="container-shell grid min-h-[690px] items-center gap-12 py-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:py-20">
          <div className="hero-enter relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.055] px-4 py-2 text-sm font-bold text-[#e4c58c] backdrop-blur-md">
              <MapPin className="size-4" aria-hidden="true" /> دهانات وتشطيبات في الرياض
            </p>
            <h1 className="display-title mt-7">
              تشطيب يرفع قيمة <span className="text-[#d8a95c]">المكان</span> ويعيش بتفاصيله.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg sm:leading-9">
              ننفذ الدهانات والديكورات والترميمات للمنازل والفلل بخطوات واضحة، من تجهيز السطح واختيار الخامات حتى المراجعة النهائية.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-14 rounded-2xl bg-[#d1a052] px-7 text-base font-black text-[#142019] shadow-[0_15px_36px_rgba(205,156,78,.2)] hover:bg-[#e0b66e]">
                <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-5" /> اطلب معاينة عبر واتساب
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-2xl border-white/18 bg-white/[.055] px-7 text-base font-black text-white backdrop-blur-md hover:bg-white hover:text-[#17201c]">
                <a href={`tel:${site.phoneE164}`}><Phone className="size-5" /> اتصل الآن</a>
              </Button>
            </div>
            <div className="mt-9 grid max-w-xl grid-cols-3 gap-2 border-t border-white/10 pt-6">
              {[
                ["كل الرياض", "نطاق الخدمة"],
                ["خطة واضحة", "قبل التنفيذ"],
                ["اتصال مباشر", "بدون وسيط"],
              ].map(([title, label]) => (
                <div key={title} className="rounded-xl border border-white/[.07] bg-white/[.035] px-3 py-3">
                  <strong className="block text-sm font-extrabold text-white sm:text-base">{title}</strong>
                  <span className="mt-1 block text-xs text-white/42">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual-enter relative pb-5 lg:pb-0">
            <div className="hero-photo relative min-h-[430px] overflow-hidden rounded-[30px] border border-white/10 shadow-[0_35px_100px_rgba(0,0,0,.34)] sm:min-h-[540px]">
              <Image src="/hero-interior.webp" alt="تنفيذ دهانات داخلية احترافية في فيلا حديثة بالرياض" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-[58%_center]" />
              <div className="absolute inset-x-5 bottom-5 z-10 flex items-center justify-between gap-4 rounded-[20px] border border-white/15 bg-[#111914]/78 p-4 backdrop-blur-xl sm:inset-x-7 sm:bottom-7 sm:p-5">
                <div>
                  <p className="text-xs font-bold text-[#d8b06a]">دهان • ديكور • ترميم</p>
                  <p className="mt-1 text-sm font-extrabold text-white sm:text-base">تفاصيل مرتبة من أول طبقة</p>
                </div>
                <div className="flex shrink-0 gap-1.5" aria-label="درجات ألوان تشطيب مقترحة">
                  {["#d4a657", "#ede5d5", "#6c756f", "#ffffff"].map((color) => <span key={color} className="size-5 rounded-full border-2 border-white/40" style={{ backgroundColor: color }} />)}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 z-20 hidden items-center gap-3 rounded-2xl border border-[#d2a052]/25 bg-white px-4 py-3 text-[#17201c] shadow-[0_18px_50px_rgba(0,0,0,.22)] sm:flex lg:-right-6">
              <span className="grid size-10 place-items-center rounded-xl bg-[#edf5f0] text-[#1c7955]"><BadgeCheck className="size-5" /></span>
              <div><strong className="block text-sm font-black">تنفيذ بخطوات واضحة</strong><span className="text-xs text-[#69736e]">من المعاينة حتى التسليم</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f8f7f3]" id="services">
        <div className="container-shell">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between" data-reveal="up">
            <div>
              <span className="section-kicker">خدماتنا الرئيسية</span>
              <h2 className="section-title mt-4">حلول متكاملة، وكل خدمة لها خطواتها الصحيحة.</h2>
            </div>
            <div className="max-w-lg">
              <p className="text-base leading-8 text-[#66706a]">نحدد الخدمة والخامة بحسب حالة المكان والاستخدام والنتيجة المطلوبة، بدل تطبيق حل واحد على كل مشروع.</p>
              <Link href="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#946a2c]">استعرض جميع الخدمات <ArrowLeft className="size-4" /></Link>
            </div>
          </div>

          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal="up">
            {featuredServices.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="service-card group relative flex min-h-[248px] flex-col overflow-hidden rounded-[24px] border border-[#17201c]/8 bg-white p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="service-icon-wrap grid size-13 place-items-center rounded-[16px] bg-[#f3eadb] text-[#9c6b27]">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </div>
                  <span className="text-xs font-black tracking-[.12em] text-[#17201c]/22">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-black tracking-[-.02em] text-[#17201c]">{service.shortTitle}</h3>
                <p className="mt-3 text-[.95rem] leading-7 text-[#69726d]">{service.summary}</p>
                <span className="service-arrow mt-auto grid size-10 place-items-center self-end rounded-xl bg-[#f1efe9] text-[#17201c]" aria-hidden="true"><ArrowLeft className="size-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space overflow-hidden bg-[#ece9e1]">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-18">
          <div className="relative" data-reveal="scale">
            <div className="relative min-h-[450px] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(25,37,31,.14)] sm:min-h-[580px]">
              <Image src="/decor-finish.webp" alt="تشطيبات دهانات وبديل الخشب والرخام داخل مجلس عصري" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
            </div>
            <div className="absolute inset-x-4 -bottom-7 rounded-[20px] border border-white/70 bg-white/88 p-5 shadow-[0_18px_55px_rgba(24,35,29,.12)] backdrop-blur-xl sm:inset-x-auto sm:bottom-7 sm:left-7 sm:max-w-sm">
              <p className="text-sm font-black text-[#966a2b]">التناسق قبل التنفيذ</p>
              <p className="mt-2 text-sm leading-7 text-[#5e6963]">نراجع اللون والخامة والإضاءة معًا حتى تبقى النتيجة هادئة ومتوازنة.</p>
            </div>
          </div>
          <div className="pt-5 lg:pt-0" data-reveal="up">
            <span className="section-kicker">جودة تُرى في التفاصيل</span>
            <h2 className="section-title mt-4">لا نتعامل مع كل عنصر بمعزل عن بقية المكان.</h2>
            <p className="mt-6 text-base leading-8 text-[#606a64] sm:text-lg">عندما يجتمع الدهان مع الجبس بورد وبديل الخشب أو الرخام، تصبح نقاط الالتقاء والمقاسات وتوزيع الألوان هي الفارق الحقيقي.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map(({ icon: FeatureIcon, title, text }) => (
                <div key={title} className="feature-card rounded-[20px] border border-white/90 bg-white/72 p-5">
                  <span className="grid size-10 place-items-center rounded-xl bg-[#17201c] text-[#e1b66e]"><FeatureIcon className="size-5" strokeWidth={1.9} /></span>
                  <h3 className="mt-4 font-black text-[#17201c]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#66706b]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111914] py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute inset-0 hero-pattern opacity-60" />
        <div className="container-shell relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" data-reveal="up">
            <div><span className="section-kicker !text-[#d8b16c]">طريقة العمل</span><h2 className="section-title mt-4">أربع مراحل. مسار واحد واضح.</h2></div>
            <p className="max-w-md leading-8 text-white/54">وضوح المراحل يقلل التعديلات المفاجئة ويحافظ على ترتيب الموقع وجودة النتيجة.</p>
          </div>
          <ol className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal="up">
            {process.map((step) => (
              <li key={step.number} className="process-card relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[.045] p-6">
                <span className="text-4xl font-black text-[#d5a557]/28">{step.number}</span>
                <h3 className="mt-7 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{step.text}</p>
                <span className="absolute -bottom-8 -left-8 size-20 rounded-full border border-[#d5a557]/15" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-18">
          <div data-reveal="up">
            <span className="section-kicker">دهانات الواجهات</span>
            <h2 className="section-title mt-4">الواجهة الجيدة تُجهّز للمناخ قبل اختيار اللون.</h2>
            <p className="mt-6 text-base leading-8 text-[#65706a] sm:text-lg">نعالج التقشر والتفاوت والشقوق السطحية، ثم نختار نظام التأسيس والدهان وفق حالة المبنى وتعرضه للشمس والغبار.</p>
            <ul className="mt-7 grid gap-3">
              {["فحص حالة السطح ومناطق الضعف", "اختيار مواد مناسبة للاستخدام الخارجي", "حماية الفتحات والأرضيات القريبة", "مراجعة التغطية والتجانس عند التسليم"].map((item) => (
                <li key={item} className="flex items-start gap-3 font-bold text-[#334039]"><CheckCircle2 className="mt-1 size-5 shrink-0 text-[#a97830]" />{item}</li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 h-13 rounded-2xl bg-[#17201c] px-6 text-white hover:bg-[#2a3730]"><Link href="/services/exterior-painting">تفاصيل دهانات الواجهات <ArrowLeft /></Link></Button>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#e6e2d9] lg:min-h-[560px]" data-reveal="scale">
            <Image src="/exterior-villa.webp" alt="دهانات خارجية لواجهة فيلا حديثة في الرياض" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute bottom-5 right-5 rounded-2xl border border-white/50 bg-white/84 px-4 py-3 text-sm font-black text-[#17201c] shadow-lg backdrop-blur-md"><MapPin className="ml-2 inline size-4 text-[#a97830]" /> تنفيذ داخل مدينة الرياض</div>
          </div>
        </div>
      </section>

      <section className="section-space soft-grid border-y border-[#dedbd3] bg-[#f2f0ea]">
        <div className="container-shell grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div data-reveal="up">
            <span className="section-kicker">قبل أن تبدأ</span>
            <h2 className="section-title mt-4">إجابات واضحة على أكثر الأسئلة تكرارًا.</h2>
            <div className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#5f6963] shadow-sm"><Clock3 className="size-5 text-[#9e702e]" /> استقبال طلبات المعاينة يوميًا</div>
          </div>
          <Accordion type="single" collapsible dir="rtl" className="overflow-hidden rounded-[24px] border border-[#17201c]/8 bg-white px-5 shadow-[0_18px_55px_rgba(24,35,29,.06)] sm:px-7" data-reveal="up">
            {faq.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-[#e6e3dc]">
                <AccordionTrigger className="py-6 text-right text-base font-black text-[#25302a] hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[.98rem] leading-8 text-[#66706a]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#d0a052] py-16 text-[#142019] sm:py-20">
        <div className="container-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between" data-reveal="up">
          <div><p className="text-sm font-black text-[#142019]/60">ابدأ بخطوة بسيطة</p><h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-.03em] sm:text-5xl">أرسل صور المكان وموقعك، ونرتب معك المعاينة.</h2></div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-14 rounded-2xl bg-[#17201c] px-7 text-base font-black text-white hover:bg-[#2b3831]"><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle /> واتساب</a></Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-2xl border-[#17201c]/20 bg-white/30 px-7 text-base font-black text-[#17201c] hover:bg-white"><a href={`tel:${site.phoneE164}`}><Phone /> <span dir="ltr">{site.phoneDisplay}</span></a></Button>
          </div>
        </div>
      </section>
    </main>
  );
}

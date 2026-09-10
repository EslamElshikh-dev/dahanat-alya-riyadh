import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Clock3,
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
  { question: "كيف أختار اللون واللمعة المناسبة؟", answer: "نربط الاختيار بإضاءة المكان ومساحته وطبيعة الاستخدام. الغرف كثيرة الحركة قد تحتاج تشطيبًا عمليًا قابلًا للتنظيف، بينما المساحات الهادئة تناسبها خيارات أخرى." },
];

const process = [
  { number: "01", title: "معاينة وفهم المطلوب", text: "نراجع المساحات وحالة الأسطح ونحدد الأولويات قبل التسعير." },
  { number: "02", title: "عرض واضح", text: "نوضح نطاق العمل والمواد والمراحل والمدة المتوقعة بصورة قابلة للمراجعة." },
  { number: "03", title: "تنفيذ منظم", text: "نحمي المكان وننفذ التجهيز والطبقات والتفاصيل وفق ترتيب فني واضح." },
  { number: "04", title: "مراجعة وتسليم", text: "نفحص اللون والحواف والفواصل وننهي الملاحظات المتفق عليها قبل التسليم." },
];

const features = [
  { icon: Palette, title: "اختيار اللون", text: "وفق الإضاءة والخامة والاستخدام" },
  { icon: Ruler, title: "ضبط المقاسات", text: "حتى تستقيم الفواصل والمحاور" },
  { icon: Sparkles, title: "تنظيف التفاصيل", text: "حواف وزوايا بلا تشويش بصري" },
  { icon: BadgeCheck, title: "مراجعة التسليم", text: "جولة نهائية على نطاق العمل" },
];

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-[#171714] text-white">
        <Image src="/hero-interior.webp" alt="تنفيذ دهانات داخلية احترافية في فيلا حديثة بالرياض" fill priority sizes="100vw" className="object-cover object-[62%_center] opacity-68" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,18,15,.96)_0%,rgba(19,18,15,.72)_42%,rgba(19,18,15,.18)_75%)] max-md:bg-[linear-gradient(180deg,rgba(19,18,15,.55)_0%,rgba(19,18,15,.94)_68%)]" />
        <div className="container-shell relative z-10 flex min-h-[calc(100svh-76px)] items-end pb-10 pt-20 md:items-center md:py-24">
          <div className="max-w-2xl md:ml-auto">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/20 px-4 py-2 text-sm font-bold text-[#ead5ad] backdrop-blur-md">
              <MapPin className="size-4" /> دهانات وتشطيبات في الرياض
            </p>
            <h1 className="display-title">الجدار ليس لونًا فقط. هو دقة تبدأ قبل أول طبقة.</h1>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-white/74 sm:text-lg">
              دهانات عليا تنفذ الدهانات الداخلية والخارجية والديكورات والترميمات بخطوات مرتبة، من فحص السطح واختيار الخامة حتى مراجعة التفاصيل عند التسليم.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-14 rounded-full bg-[#c0934c] px-7 text-base font-black text-white hover:bg-[#a97938]">
                <a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle className="size-5" /> اطلب معاينة عبر واتساب</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/24 bg-white/8 px-7 text-base font-black text-white backdrop-blur-md hover:bg-white hover:text-[#171714]">
                <a href={`tel:${site.phoneE164}`}><Phone className="size-5" /> اتصل الآن</a>
              </Button>
            </div>
            <div className="mt-9 grid max-w-xl grid-cols-3 divide-x-reverse divide-x divide-white/14 border-t border-white/14 pt-6 text-center sm:text-right">
              <div className="px-2 first:pr-0"><strong className="block text-sm text-white sm:text-base">تغطية الرياض</strong><span className="mt-1 block text-xs text-white/52">نطاق خدمة واسع</span></div>
              <div className="px-2 sm:px-5"><strong className="block text-sm text-white sm:text-base">خطة واضحة</strong><span className="mt-1 block text-xs text-white/52">قبل بداية التنفيذ</span></div>
              <div className="px-2 sm:px-5"><strong className="block text-sm text-white sm:text-base">تواصل مباشر</strong><span className="mt-1 block text-xs text-white/52">اتصال وواتساب</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#fbfaf7]" id="services">
        <div className="container-shell">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="section-kicker">خدمات متكاملة</span>
              <h2 className="section-title mt-4">كل تشطيب له خامته، ترتيبه، وتفاصيله الصحيحة.</h2>
            </div>
            <p className="max-w-lg text-base leading-8 text-[#6c6256]">بدل الحل الواحد لكل الجدران، نحدد الخدمة وفق حالة السطح واستخدام المساحة والنتيجة المطلوبة.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className={`service-card group relative min-h-[255px] overflow-hidden rounded-[26px] border border-black/7 p-6 ${index === 0 || index === 9 ? "bg-[#24221d] text-white" : "bg-white"}`}>
                <div className={`grid size-12 place-items-center rounded-2xl ${index === 0 || index === 9 ? "bg-[#c0934c] text-white" : "bg-[#f0e5d3] text-[#9c6f2f]"}`}>
                  <ServiceIcon name={service.icon} className="size-6" />
                </div>
                <h3 className="mt-7 text-xl font-black">{service.shortTitle}</h3>
                <p className={`mt-3 text-[.95rem] leading-7 ${index === 0 || index === 9 ? "text-white/62" : "text-[#766c60]"}`}>{service.summary}</p>
                <span className={`absolute bottom-5 left-5 grid size-10 place-items-center rounded-full transition-transform duration-300 group-hover:-translate-x-1 ${index === 0 || index === 9 ? "bg-white/10" : "bg-[#f6f1e9]"}`} aria-hidden="true"><ArrowLeft className="size-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space overflow-hidden bg-[#eee5d8]">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative min-h-[440px] overflow-hidden rounded-[34px] shadow-[0_30px_80px_rgba(47,37,24,.16)] sm:min-h-[560px]">
            <Image src="/decor-finish.webp" alt="تشطيبات دهانات وبديل الخشب والرخام داخل مجلس عصري" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-x-5 bottom-5 rounded-[22px] border border-white/20 bg-[#171714]/84 p-5 text-white backdrop-blur-xl sm:inset-x-auto sm:bottom-7 sm:left-7 sm:max-w-sm">
              <p className="text-sm font-bold text-[#dec18f]">قرار واحد يغيّر النتيجة</p>
              <p className="mt-2 leading-7 text-white/74">تنسيق اللون والخامة والإضاءة قبل التنفيذ يمنع ازدحام التفاصيل ويجعل المكان أكثر اتزانًا.</p>
            </div>
          </div>
          <div>
            <span className="section-kicker">تشطيب متناسق</span>
            <h2 className="section-title mt-4">نرتب العناصر كمنظومة واحدة، لا كأعمال منفصلة.</h2>
            <p className="mt-6 text-[1.04rem] leading-8 text-[#665b4d]">عندما يجتمع الدهان مع الجبس بورد وبديل الخشب أو الرخام، تصبح نقاط الالتقاء أهم من كل عنصر منفرد. لذلك نراجع المقاسات والمحاور والألوان قبل التنفيذ.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map(({ icon: FeatureIcon, title, text }) => (
                <div key={title} className="rounded-[20px] bg-white/68 p-5"><FeatureIcon className="size-5 text-[#a47635]" /><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#74695d]">{text}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#171714] text-white">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <span className="section-kicker !text-[#d4b274]">طريقة العمل</span>
              <h2 className="section-title mt-4">أربع مراحل تجعل القرار والتنفيذ أوضح.</h2>
              <p className="mt-5 max-w-md leading-8 text-white/58">وضوح المراحل يقلل التغييرات المفاجئة ويحافظ على ترتيب الموقع وجودة النتيجة.</p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-[28px] bg-white/10 sm:grid-cols-2">
              {process.map((step) => (
                <li key={step.number} className="bg-[#201f1a] p-7 sm:p-8">
                  <span className="text-sm font-black text-[#cda85f]">{step.number}</span>
                  <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                  <p className="mt-3 leading-7 text-white/58">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="lg:order-2">
            <span className="section-kicker">دهانات خارجية</span>
            <h2 className="section-title mt-4">الواجهة الجيدة تقاوم قبل أن تتجمّل.</h2>
            <p className="mt-6 leading-8 text-[#6d6357]">التقشر والتفاوت والشقوق السطحية تحتاج تشخيصًا وتجهيزًا مناسبًا قبل اللون. ننظم أعمال الواجهات وفق حالة المبنى والخامة والتعرض للشمس والغبار.</p>
            <ul className="mt-7 grid gap-3">
              {["فحص حالة السطح ومناطق الضعف", "اختيار مواد تأسيس ودهان مناسبة", "حماية الفتحات والأرضيات القريبة", "مراجعة التغطية والتجانس عند التسليم"].map((item) => <li key={item} className="flex items-start gap-3 font-bold text-[#3d372e]"><CheckCircle2 className="mt-1 size-5 shrink-0 text-[#a87a39]" />{item}</li>)}
            </ul>
            <Button asChild size="lg" className="mt-8 h-12 rounded-full bg-[#171714] px-6 text-white hover:bg-[#34312a]"><Link href="/services/exterior-painting">تفاصيل دهانات الواجهات <ArrowLeft /></Link></Button>
          </div>
          <div className="relative min-h-[410px] overflow-hidden rounded-[32px] lg:order-1 lg:min-h-[540px]">
            <Image src="/exterior-villa.webp" alt="دهانات خارجية لواجهة فيلا حديثة في الرياض" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section-space soft-grid border-y border-[#e8dfd3] bg-[#f8f4ed]">
        <div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="section-kicker">أسئلة قبل البدء</span>
            <h2 className="section-title mt-4">إجابات مختصرة تساعدك على اتخاذ قرار أوضح.</h2>
            <div className="mt-7 flex items-center gap-3 text-sm font-bold text-[#6e6254]"><Clock3 className="size-5 text-[#a87836]" /> استقبال طلبات المعاينة يوميًا</div>
          </div>
          <Accordion type="single" collapsible dir="rtl" className="overflow-hidden rounded-[26px] border border-black/7 bg-white px-5 sm:px-7">
            {faq.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-[#e9e1d6]">
                <AccordionTrigger className="py-6 text-right text-base font-black hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="pb-6 text-[.98rem] leading-8 text-[#6d6357]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#c0934c] py-16 text-white sm:py-20">
        <div className="container-shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="text-sm font-black text-[#2c241a]/70">ابدأ بصورة واضحة عن مشروعك</p><h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">أرسل صور المساحة وموقعك، ونرتب معك الخطوة التالية.</h2></div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-14 rounded-full bg-[#171714] px-7 text-base font-black text-white hover:bg-[#2e2b25]"><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle /> واتساب</a></Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/40 bg-white/10 px-7 text-base font-black text-white hover:bg-white hover:text-[#171714]"><a href={`tel:${site.phoneE164}`}><Phone /> {site.phoneDisplay}</a></Button>
          </div>
        </div>
      </section>
    </main>
  );
}

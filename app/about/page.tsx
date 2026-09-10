import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Eye, Layers3, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "عن دهانات عليا",
  description: "تعرف على طريقة عمل دهانات عليا في تنفيذ الدهانات والتشطيبات والديكورات داخل مدينة الرياض.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Eye, title: "وضوح قبل التنفيذ", text: "نحدد ما يحتاج معالجة وما يدخل في نطاق العمل قبل بدء الخطوات الميدانية." },
  { icon: Layers3, title: "ترتيب فني للمراحل", text: "التجهيز والتأسيس والطبقات والتفاصيل تُنفذ بتسلسل يحافظ على النتيجة." },
  { icon: ShieldCheck, title: "حماية المكان", text: "نراعي تغطية الأرضيات والعناصر القريبة وتنظيم مساحة العمل بحسب المشروع." },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-[#171714] py-20 text-white sm:py-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <span className="section-kicker !text-[#d3b174]">عن دهانات عليا</span>
            <h1 className="section-title mt-5 max-w-[15ch]">ننظر إلى التشطيب من زاوية الاستخدام، لا اللون وحده.</h1>
            <p className="mt-6 text-lg leading-9 text-white/66">نقدم خدمات دهان وتشطيب وديكور للمنازل والفلل والمكاتب في الرياض. تبدأ طريقتنا بفهم حالة الموقع والنتيجة المطلوبة، ثم ترتيب المواد والمراحل والتفاصيل بما يناسب المساحة.</p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] sm:min-h-[560px]"><Image src="/hero-interior.webp" alt="فني دهانات ينفذ تشطيب جدار داخلي بعناية" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div>
        </div>
      </section>

      <section className="section-space bg-[#fbfaf7]">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-[26px] border border-black/7 bg-white p-7"><div className="grid size-12 place-items-center rounded-2xl bg-[#f0e5d3] text-[#9b6e2e]"><Icon className="size-6" /></div><h2 className="mt-6 text-xl font-black">{title}</h2><p className="mt-3 leading-8 text-[#6e6458]">{text}</p></article>
          ))}
        </div>
      </section>

      <section className="section-space bg-[#eee5d8]">
        <div className="container-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div><span className="section-kicker">معيارنا العملي</span><h2 className="section-title mt-4">كل تفصيل يجب أن يخدم جودة التسليم.</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["فحص السطح قبل اختيار النظام", "شرح بنود العرض بصورة واضحة", "مراعاة الإضاءة وطبيعة الاستخدام", "مراجعة الحواف والفواصل والتجانس"].map((item) => <div key={item} className="flex items-start gap-3 rounded-[20px] bg-white/65 p-5 font-black leading-7"><CheckCircle2 className="mt-1 size-5 shrink-0 text-[#a77735]" />{item}</div>)}
          </div>
        </div>
      </section>
    </main>
  );
}

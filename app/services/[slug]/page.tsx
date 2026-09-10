import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronLeft, MessageCircle, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/service-icon";
import { getService, services } from "@/data/services";
import { defaultWhatsAppMessage, site, whatsappUrl } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.summary} اطلب معاينة من دهانات عليا لخدمة ${service.shortTitle} داخل مدينة الرياض.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((item) => item.slug !== slug).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${site.url}/services/${service.slug}#service`,
        name: service.shortTitle,
        description: service.description,
        url: `${site.url}/services/${service.slug}`,
        areaServed: { "@type": "City", name: site.city },
        provider: { "@id": `${site.url}/#business` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: site.url },
          { "@type": "ListItem", position: 2, name: "الخدمات", item: `${site.url}/services` },
          { "@type": "ListItem", position: 3, name: service.shortTitle, item: `${site.url}/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="relative min-h-[620px] overflow-hidden bg-[#171714] text-white">
        <Image src={service.image} alt={`${service.shortTitle} من دهانات عليا في الرياض`} fill priority sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,19,16,.93),rgba(20,19,16,.7)_48%,rgba(20,19,16,.28))]" />
        <div className="container-shell relative z-10 flex min-h-[620px] flex-col justify-center py-20">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/58" aria-label="مسار التنقل">
            <Link href="/" className="hover:text-white">الرئيسية</Link><ChevronLeft className="size-4" />
            <Link href="/services" className="hover:text-white">الخدمات</Link><ChevronLeft className="size-4" />
            <span className="text-[#e4c58f]">{service.shortTitle}</span>
          </nav>
          <div className="grid size-14 place-items-center rounded-2xl bg-[#c0934c]"><ServiceIcon name={service.icon} className="size-7" /></div>
          <p className="mt-6 text-sm font-black text-[#e4c58f]">{service.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-.035em] sm:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/70">{service.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-14 rounded-full bg-[#c0934c] px-7 text-base font-black hover:bg-[#a87a3b]"><a href={whatsappUrl(`السلام عليكم، أرغب في الاستفسار عن خدمة ${service.shortTitle}.`)} target="_blank" rel="noreferrer"><MessageCircle /> اطلب معاينة</a></Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/25 bg-white/8 px-7 text-base font-black text-white hover:bg-white hover:text-[#171714]"><a href={`tel:${site.phoneE164}`}><Phone /> اتصل الآن</a></Button>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#fbfaf7]">
        <div className="container-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <span className="section-kicker">لماذا هذه الخدمة؟</span>
            <h2 className="section-title mt-4">النتيجة تعتمد على ما يحدث قبل التشطيب النهائي.</h2>
            <p className="mt-6 text-lg leading-9 text-[#6b6155]">نحدد خطوات التنفيذ وفق حالة الموقع والخامة، ثم نوثق البنود المتفق عليها لتبقى المراحل واضحة أثناء العمل.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit, index) => (
              <div key={benefit} className="rounded-[24px] border border-black/7 bg-white p-6">
                <span className="text-sm font-black text-[#ad803f]">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-black leading-7">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#eee5d8]">
        <div className="container-shell grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-[30px] lg:sticky lg:top-28 lg:min-h-[560px]">
            <Image src={service.image} alt={`تفاصيل تنفيذ ${service.shortTitle} في الرياض`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="rounded-[30px] bg-[#1c1b17] p-7 text-white sm:p-10">
            <span className="section-kicker !text-[#d2ae6d]">نطاق التنفيذ</span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">ماذا تتضمن الخطوات؟</h2>
            <ol className="mt-8 grid gap-4">
              {service.includes.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-[20px] border border-white/9 bg-white/[.04] p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#c0934c] text-sm font-black">{index + 1}</span>
                  <div><h3 className="font-black">{item}</h3><p className="mt-1 text-sm leading-6 text-white/54">تُحدد التفاصيل النهائية بعد معاينة الموقع واعتماد نطاق العمل.</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><span className="section-kicker">أسئلة شائعة</span><h2 className="section-title mt-4">قبل طلب {service.shortTitle}</h2></div>
          <Accordion type="single" collapsible dir="rtl" className="rounded-[26px] border border-black/7 px-6">
            {service.faq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-6 text-right text-base font-black hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-8 text-[#6c6256]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-[#e9e0d4] bg-[#f8f4ed] py-16">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-6"><div><span className="section-kicker">خدمات مرتبطة</span><h2 className="mt-4 text-3xl font-black">قد تحتاج أيضًا</h2></div><Link href="/services" className="hidden items-center gap-2 font-black text-[#8f642d] sm:flex">كل الخدمات <ArrowLeft className="size-4" /></Link></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="service-card rounded-[24px] border border-black/7 bg-white p-6">
                <ServiceIcon name={item.icon} className="size-6 text-[#a77835]" /><h3 className="mt-5 text-xl font-black">{item.shortTitle}</h3><p className="mt-3 text-sm leading-7 text-[#70665b]">{item.summary}</p>
              </Link>
            ))}
          </div>
          <Button asChild size="lg" className="mt-10 h-14 rounded-full bg-[#171714] px-8 text-base font-black"><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle /> ابدأ طلبك الآن</a></Button>
        </div>
      </section>
    </main>
  );
}

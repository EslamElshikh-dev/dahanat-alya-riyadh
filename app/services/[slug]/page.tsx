import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, MessageCircle, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
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
    openGraph: {
      title: service.title,
      description: service.summary,
      url: `/services/${service.slug}`,
      images: [{ url: service.image, alt: `${service.shortTitle} من دهانات عليا في الرياض` }],
    },
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
      <section className="hero-pattern relative min-h-[590px] overflow-hidden bg-[#111914] text-white">
        <Image src={service.image} alt={`${service.shortTitle} من دهانات عليا في الرياض`} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(17,25,20,.98),rgba(17,25,20,.78)_52%,rgba(17,25,20,.3))]" />
        <div className="container-shell relative z-10 flex min-h-[590px] flex-col justify-center py-24" data-reveal="up">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/58" aria-label="مسار التنقل">
            <Link href="/" className="hover:text-white">الرئيسية</Link><ChevronLeft className="size-4" />
            <Link href="/services" className="hover:text-white">الخدمات</Link><ChevronLeft className="size-4" />
            <span className="text-[#e4c58f]">{service.shortTitle}</span>
          </nav>
          <div className="service-icon-wrap grid size-14 place-items-center rounded-2xl bg-[#d0a052] text-[#111914]"><ServiceIcon name={service.icon} className="size-7" /></div>
          <p className="mt-6 text-sm font-black text-[#e2bb78]">{service.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.2] tracking-[-.035em] sm:text-5xl lg:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/68">{service.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-14 rounded-2xl bg-[#d0a052] px-7 text-base font-black text-[#111914] hover:bg-[#e0b86f]"><a href={whatsappUrl(`السلام عليكم، أرغب في الاستفسار عن خدمة ${service.shortTitle}.`)} target="_blank" rel="noreferrer"><MessageCircle /> اطلب معاينة</a></Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-2xl border-white/20 bg-white/8 px-7 text-base font-black text-white hover:bg-white hover:text-[#111914]"><a href={`tel:${site.phoneE164}`}><Phone /> اتصل الآن</a></Button>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#f8f7f3]">
        <div className="container-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div data-reveal="up">
            <span className="section-kicker">لماذا هذه الخدمة؟</span>
            <h2 className="section-title mt-4">النتيجة تعتمد على ما يحدث قبل التشطيب النهائي.</h2>
            <p className="mt-6 text-lg leading-9 text-[#6b6155]">نحدد خطوات التنفيذ وفق حالة الموقع والخامة، ثم نوثق البنود المتفق عليها لتبقى المراحل واضحة أثناء العمل.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-reveal="up">
            {service.benefits.map((benefit, index) => (
              <div key={benefit} className="feature-card rounded-[22px] border border-black/6 bg-white p-6">
                <span className="text-sm font-black text-[#a87832]">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-black leading-7">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[#ece9e1]">
        <div className="container-shell grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] shadow-[0_28px_70px_rgba(17,25,20,.14)] lg:sticky lg:top-28 lg:min-h-[560px]" data-reveal="scale">
            <Image src={service.image} alt={`تفاصيل تنفيذ ${service.shortTitle} في الرياض`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,rgba(17,25,20,.28))]" />
          </div>
          <div className="rounded-[28px] bg-[#111914] p-7 text-white sm:p-10" data-reveal="up">
            <span className="section-kicker !text-[#d2ae6d]">نطاق التنفيذ</span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">ماذا تتضمن الخطوات؟</h2>
            <ol className="mt-8 grid gap-4">
              {service.includes.map((item, index) => (
                <li key={item} className="flex gap-4 rounded-[18px] border border-white/9 bg-white/[.04] p-5 transition-colors hover:bg-white/[.07]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#d0a052] text-sm font-black text-[#111914]">{index + 1}</span>
                  <div><h3 className="font-black">{item}</h3><p className="mt-1 text-sm leading-6 text-white/54">تُحدد التفاصيل النهائية بعد معاينة الموقع واعتماد نطاق العمل.</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]" data-reveal="up">
          <div><span className="section-kicker">أسئلة شائعة</span><h2 className="section-title mt-4">قبل طلب {service.shortTitle}</h2></div>
          <Accordion type="single" collapsible dir="rtl" className="rounded-[24px] border border-black/7 px-6 shadow-[0_16px_44px_rgba(17,25,20,.05)]">
            {service.faq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-6 text-right text-base font-black hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-8 text-[#6c6256]">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-[#dedbd2] bg-[#f1efe9] py-16">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-6"><div><span className="section-kicker">خدمات مرتبطة</span><h2 className="mt-4 text-3xl font-black">قد تحتاج أيضًا</h2></div><Link href="/services" className="hidden items-center gap-2 font-black text-[#8f642d] sm:flex">كل الخدمات <ArrowLeft className="size-4" /></Link></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <div key={item.slug} data-reveal="up">
                <ServiceCard service={item} compact />
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-10 h-14 rounded-2xl bg-[#111914] px-8 text-base font-black"><a href={whatsappUrl(defaultWhatsAppMessage)} target="_blank" rel="noreferrer"><MessageCircle /> ابدأ طلبك الآن</a></Button>
        </div>
      </section>
    </main>
  );
}

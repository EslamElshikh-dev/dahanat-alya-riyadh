export const site = {
  name: "دهانات عليا Alya Paints",
  shortName: "دهانات عليا",
  englishName: "Alya Paints",
  category: "دهّان",
  schemaType: "HousePainter",
  // Keep the primary number aligned with the Google Business Profile.
  phoneDisplay: "055 768 2484",
  phoneRaw: "0557682484",
  phoneE164: "+966557682484",
  whatsapp: "966557682484",
  alternatePhoneDisplay: "055 298 0261",
  alternatePhoneRaw: "0552980261",
  alternatePhoneE164: "+966552980261",
  city: "الرياض",
  region: "منطقة الرياض",
  country: "المملكة العربية السعودية",
  coverage: "جميع أحياء مدينة الرياض",
  serviceNotice: "نشاط بنطاق خدمة داخل الرياض ولا يستقبل العملاء في مقر ثابت.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dahanat-alya-riyadh.vercel.app").replace(/\/$/, ""),
  description:
    "دهانات عليا Alya Paints لتنفيذ الدهانات الداخلية والخارجية وتشطيبات المنازل والفلل والديكورات في الرياض، من تجهيز الأسطح واختيار الألوان حتى التسليم المنظم.",
  developerName: "المهندس إسلام الشيخ",
  developerUrl: "https://eslam-elshikh.com",
} as const;

export const navigation = [
  { label: "الرئيسية", href: "/" },
  { label: "خدماتنا", href: "/services" },
  { label: "عن دهانات عليا", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
] as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const defaultWhatsAppMessage =
  "السلام عليكم، أرغب في طلب معاينة والاستفسار عن خدمات دهانات عليا Alya Paints في الرياض.";

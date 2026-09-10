export const site = {
  name: "دهانات عليا",
  englishName: "Alya Paints",
  category: "دهان",
  schemaType: "HousePainter",
  phoneDisplay: "055 298 0261",
  phoneRaw: "0552980261",
  phoneE164: "+966552980261",
  whatsapp: "966552980261",
  city: "الرياض",
  region: "منطقة الرياض",
  country: "المملكة العربية السعودية",
  coverage: "جميع أحياء مدينة الرياض",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dahanat-alya-riyadh.vercel.app").replace(/\/$/, ""),
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=%D8%AF%D9%87%D8%A7%D9%86%D8%A7%D8%AA+%D8%B9%D9%84%D9%8A%D8%A7+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6",
  description:
    "دهانات عليا لتنفيذ الدهانات الداخلية والخارجية وتشطيبات المنازل والفلل والديكورات في الرياض، من تجهيز الأسطح واختيار الألوان حتى التسليم المنظم.",
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
  "السلام عليكم، أرغب في طلب معاينة والاستفسار عن خدمات دهانات عليا في الرياض.";

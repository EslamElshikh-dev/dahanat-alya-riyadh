export const site = {
  name: "دهانات عليا Alya Paints",
  shortName: "دهانات عليا",
  englishName: "Alya Paints",
  category: "متجر دهانات",
  schemaType: "Store",
  // Use one primary contact number consistently across visible links and structured data.
  phoneDisplay: "055 298 0261",
  phoneRaw: "0552980261",
  phoneE164: "+966552980261",
  whatsapp: "966552980261",
  city: "الرياض",
  region: "منطقة الرياض",
  country: "المملكة العربية السعودية",
  coverage: "جميع أحياء مدينة الرياض",
  serviceNotice: "تواصل معنا لتأكيد توفر الدهانات والمنتجات أو لترتيب موعد معاينة خدمة التنفيذ في الرياض.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dahanat-alya-riyadh.vercel.app").replace(/\/$/, ""),
  description:
    "دهانات عليا Alya Paints متجر دهانات في الرياض للدهانات الداخلية والخارجية وحلول الألوان، مع خدمات تنفيذ الدهانات والتشطيبات والديكورات للمنازل والفلل.",
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
  "السلام عليكم، أرغب في الاستفسار عن دهانات عليا Alya Paints والمنتجات أو خدمات التنفيذ في الرياض.";

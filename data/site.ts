export const site = {
  name: "دهانات عليا Alya Paints",
  shortName: "دهانات عليا",
  englishName: "Alya Paints",
  category: "متجر دهانات",
  schemaType: ["Store", "HousePainter"],
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
    "دهانات عليا Alya Paints في حي السلي بالرياض، متجر دهانات وخدمات دهان وتشطيبات. دهانات داخلية وخارجية وتجهيز أسطح وطلاءات حماية وديكورات للمنازل والفلل.",
  developerName: "المهندس إسلام الشيخ",
  developerUrl: "https://eslam-elshikh.com",
} as const;

// Verified against this business's public Google profile and Maps embed on 2026-10-06.
export const businessLocation = {
  streetAddress: "3873 احمد الكاتب، السلي، 8345",
  postalCode: "14322",
  district: "حي السلي",
  address: "3873 احمد الكاتب، السلي، 8345، الرياض 14322، المملكة العربية السعودية",
  latitude: 24.6379283,
  longitude: 46.8445982,
  mapsUrl: "https://www.google.com/maps/place/%D8%AF%D9%87%D8%A7%D9%86%D8%A7%D8%AA+%D8%B9%D9%84%D9%8A%D8%A7+Alya+Paints%E2%80%AD/@24.6379283,46.8445982,17z/data=!3m1!4b1!4m6!3m5!1s0x244d59d78e93571d:0x5deabcfe94d89f37!8m2!3d24.6379283!4d46.8445982!16s%2Fg%2F11nw30j31l?hl=ar&entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
  embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.586628595676!2d46.84459819999999!3d24.6379283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x244d59d78e93571d%3A0x5deabcfe94d89f37!2z2K_Zh9in2YbYp9iqINi52YTZitinIEFseWEgUGFpbnRz!5e0!3m2!1sar!2suk!4v1791274633468!5m2!1sar!2suk",
  hours: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "17:00",
    display: "٩:٠٠ صباحًا — ٥:٠٠ مساءً",
    shortDisplay: "يوميًا، ٩ صباحًا — ٥ مساءً",
  },
} as const;

export const navigation = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "خدماتنا", href: "/services" },
  { label: "عن دهانات عليا", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
] as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const defaultWhatsAppMessage =
  "السلام عليكم، أرغب في الاستفسار عن دهانات عليا Alya Paints والمنتجات أو خدمات التنفيذ في الرياض.";

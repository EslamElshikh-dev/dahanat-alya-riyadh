export const site = {
  name: "كيميا عليا للصناعات المحدودة",
  shortName: "عليا كيميكال",
  englishName: "ALYA CHEMICAL For Industry Ltd.",
  brandName: "ALYA CHEMICAL",
  phoneDisplay: "055 298 0261",
  phoneRaw: "0552980261",
  phoneE164: "+966552980261",
  whatsapp: "966552980261",
  email: "info@alyachemical.com",
  city: "الرياض",
  region: "منطقة الرياض",
  country: "المملكة العربية السعودية",
  address: "حي السلي، شارع أحمد الكاتب، الرياض",
  addressEn: "Al Sulay District, Ahmad Al Kateb Street, Riyadh",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dahanat-alya-riyadh.vercel.app").replace(/\/$/, ""),
  mapsUrl: "https://maps.app.goo.gl/nyeBuoXLvbfRuqiL7?g_st=iw",
  description:
    "كيميا عليا للصناعات المحدودة تقدم أنظمة العزل الحراري والمائي ودهانات وتكسيات معمارية متطورة للمشاريع والمباني في المملكة العربية السعودية.",
  descriptionEn:
    "ALYA CHEMICAL develops thermal and waterproofing systems, architectural paints and advanced protective coatings for buildings and projects in Saudi Arabia.",
  social: {
    linkedin: "https://sa.linkedin.com/company/alya-chemical",
    instagram: "https://www.instagram.com/alyachemical/",
    tiktok: "https://www.tiktok.com/@alyachemical",
    pinterest: "https://www.pinterest.com/AlyaChemical/",
  },
  developerName: "المهندس إسلام الشيخ",
  developerUrl: "https://eslam-elshikh.com",
} as const;

export const navigationAr = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "عن الشركة", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
] as const;

export const navigationEn = [
  { label: "Home", href: "/en" },
  { label: "Products", href: "/en/products" },
  { label: "About", href: "/en/about" },
  { label: "Contact", href: "/en/contact" },
] as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const defaultWhatsAppMessage =
  "السلام عليكم، أرغب في الاستفسار عن منتجات وأنظمة كيميا عليا وطلب عرض سعر.";

export const defaultWhatsAppMessageEn =
  "Hello, I would like to enquire about ALYA CHEMICAL products and request a quotation.";

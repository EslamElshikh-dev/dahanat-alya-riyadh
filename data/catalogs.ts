export type CatalogProduct = {
  name: string;
  title: string;
  use: string;
  image: string;
  page: number;
};

export type Catalog = {
  slug: string;
  title: string;
  englishTitle: string;
  label: string;
  description: string;
  cover: string;
  file: string;
  pages: number;
  bytes: number;
  sizeLabel: string;
  topics: string[];
  products: CatalogProduct[];
};

export const catalogs: Catalog[] = [
  {
    slug: "alya-paints",
    title: "كتالوج دهانات عليا",
    englishTitle: "Alya Paints",
    label: "الدهانات والتأسيس",
    description: "من تجهيز السطح إلى اللون النهائي. تعرف على معجون عليا ودهانات الأساس ومجموعة الدهانات الداخلية والخارجية وتكسية الواجهات.",
    cover: "/catalog-previews/paint-cover.webp",
    file: "/catalogs/alya-paints.pdf",
    pages: 16,
    bytes: 2684310,
    sizeLabel: "2.6 MB",
    topics: ["معجون وتأسيس", "دهانات داخلية", "دهانات خارجية", "تكسية واجهات"],
    products: [
      { name: "ALYA SMOOTH", title: "عليا سموث", use: "معجون داخلي لتجهيز الأسطح", image: "/catalog-previews/smooth.webp", page: 4 },
      { name: "ALYA PRIMER", title: "عليا أساس", use: "دهان أساس للاستخدام الداخلي", image: "/catalog-previews/primer.webp", page: 5 },
      { name: "ALYA PRIMER COLORED", title: "عليا أساس ملون", use: "تأسيس داخلي وخارجي", image: "/catalog-previews/primer-colored.webp", page: 6 },
      { name: "ALYA ECO", title: "عليا إيكو", use: "دهان داخلي اقتصادي للجدران والأسقف", image: "/catalog-previews/eco.webp", page: 8 },
      { name: "ALYA LUX", title: "عليا لوكس", use: "دهان داخلي للجدران والأسقف", image: "/catalog-previews/lux.webp", page: 9 },
      { name: "ALYA CRYL", title: "عليا كريل", use: "دهان خارجي للواجهات", image: "/product-originals/cryl.webp", page: 11 },
      { name: "ALYA TX", title: "عليا تي إكس", use: "تكسية دهان خارجي", image: "/product-originals/tx.webp", page: 13 },
    ],
  },
  {
    slug: "alya-thermal",
    title: "كتالوج عليا ثيرمال",
    englishTitle: "Alya Thermal",
    label: "الطلاءات والحماية",
    description: "استكشف مجموعة عليا ثيرمال ومواد التأسيس والحماية، مع المنتجات المخصصة للجدران والأسطح والأنابيب والحجر وطريقة استخدامها الواردة في الكتالوج.",
    cover: "/catalog-previews/thermal-cover.webp",
    file: "/catalogs/alya-thermal.pdf",
    pages: 13,
    bytes: 1716287,
    sizeLabel: "1.6 MB",
    topics: ["تأسيس وحماية", "جدران وأسـطح", "طلاء الأنابيب", "حماية الحجر"],
    products: [
      { name: "ALYA PRIMER-T", title: "عليا برايمر تي", use: "دهان أساس ضمن مجموعة ثيرمال", image: "/catalog-previews/primer-t.webp", page: 5 },
      { name: "ALYA PROTECT-T", title: "عليا بروتكت تي", use: "طبقة حماية شفافة", image: "/catalog-previews/protect-t.webp", page: 5 },
      { name: "ALYA WALL", title: "عليا وول", use: "طلاء للجدران ضمن مجموعة ثيرمال", image: "/product-originals/wall.webp", page: 8 },
      { name: "ALYA ROOF", title: "عليا روف", use: "طلاء للأسطح ضمن مجموعة ثيرمال", image: "/product-originals/roof.webp", page: 9 },
      { name: "ALYA PIPE", title: "عليا بايب", use: "طلاء للأنابيب", image: "/catalog-previews/pipe.webp", page: 10 },
      { name: "ALYA STONE", title: "عليا ستون", use: "طلاء شفاف لحماية الحجر", image: "/catalog-previews/stone.webp", page: 11 },
    ],
  },
];

export const getCatalog = (slug: string) => catalogs.find((catalog) => catalog.slug === slug);

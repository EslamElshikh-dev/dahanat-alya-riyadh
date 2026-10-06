export type CatalogProduct = {
  name: string;
  title: string;
  use: string;
  description: string;
  image: string;
  page: number;
  slug?: string;
  price?: number | null;
  availability?: "unspecified" | "in-stock" | "out-of-stock" | "preorder";
  packshotKey?: string;
  customImage?: boolean;
  tone?: string;
  accent?: string;
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
      { name: "ALYA SMOOTH", title: "عليا سموث", use: "معجون داخلي لتجهيز الأسطح", description: "معجون مخصص للأسطح الداخلية، يأتي في مرحلة تجهيز الجدران قبل الدهان. اختيار مناسب لبدء أعمال التأسيس وتحضير السطح للطبقات التالية.", image: "/catalog-previews/smooth.webp", page: 4 },
      { name: "ALYA PRIMER", title: "عليا أساس", use: "دهان أساس للاستخدام الداخلي", description: "طبقة البداية في نظام الدهانات الداخلية، تُطبّق على السطح المُجهّز قبل طبقات اللون النهائية. مخصص لأعمال التأسيس داخل المكان.", image: "/catalog-previews/primer.webp", page: 5 },
      { name: "ALYA PRIMER COLORED", title: "عليا أساس ملون", use: "تأسيس داخلي وخارجي", description: "أساس أكريليك مائي ملون بلمسة مطفية، للاستخدام الداخلي والخارجي. يناسب اللياسة والأسطح الإسمنتية والجبسية، ويهيئها قبل الانتقال إلى الدهان النهائي.", image: "/catalog-previews/primer-colored.webp", page: 6 },
      { name: "ALYA ECO", title: "عليا إيكو", use: "دهان داخلي اقتصادي للجدران والأسقف", description: "دهان داخلي اقتصادي بأساس مائي ومظهر مطفي، للجدران والأسقف. يناسب الأسطح المجهزة بالمعجون أو اللياسة الناعمة وألواح الجبس بورد.", image: "/catalog-previews/eco.webp", page: 8 },
      { name: "ALYA LUX", title: "عليا لوكس", use: "دهان داخلي للجدران والأسقف", description: "دهان داخلي للجدران والأسقف، لاختيار التشطيب الأقرب إلى ذوقك وطبيعة المكان. تتضمن مجموعة لوكس خيارات للمظهر المطفي ونصف اللامع واللامع.", image: "/catalog-previews/lux.webp", page: 9 },
      { name: "ALYA CRYL", title: "عليا كريل", use: "دهان خارجي للواجهات", description: "دهان مخصص للواجهات والجدران الخارجية ضمن مجموعة عليا. اختيار لتجديد مظهر المبنى واستكمال مراحل التأسيس واللون في مشاريع الدهان الخارجي.", image: "/product-originals/cryl.webp", page: 11 },
      { name: "ALYA TX", title: "عليا تي إكس", use: "تكسية دهان خارجي", description: "تكسية مخصصة للجدران الخارجية، تضيف حضورًا مختلفًا إلى مظهر الواجهة. تأتي ضمن مجموعة عليا للمشاريع التي تعتمد التكسية في تشطيب المبنى.", image: "/product-originals/tx.webp", page: 13 },
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
      { name: "ALYA PRIMER-T", title: "عليا برايمر تي", use: "دهان أساس ضمن مجموعة ثيرمال", description: "أساس مائي من مجموعة ثيرمال للاستخدام الداخلي والخارجي. يجهز السطح قبل طلاءات العزل والحماية، ويساعد على الحد من امتصاصه وتعزيز تماسك الطبقات.", image: "/catalog-previews/primer-t.webp", page: 5 },
      { name: "ALYA PROTECT-T", title: "عليا بروتكت تي", use: "طبقة حماية شفافة", description: "طبقة حماية شفافة بلمسة لامعة، تُستخدم فوق طلاءات عليا وول وعليا روف. تدعم حماية السطح من الماء والعوامل الجوية مع إبقاء الطبقة الأساسية ظاهرة.", image: "/catalog-previews/protect-t.webp", page: 5 },
      { name: "ALYA WALL", title: "عليا وول", use: "طلاء للجدران ضمن مجموعة ثيرمال", description: "تكسية مائية للجدران ضمن مجموعة ثيرمال، تجمع التشطيب مع خصائص العزل الحراري والمائي. تُستخدم على اللياسة والخرسانة والجدران الداخلية والخارجية بعد تجهيزها.", image: "/product-originals/wall.webp", page: 8 },
      { name: "ALYA ROOF", title: "عليا روف", use: "طلاء للأسطح ضمن مجموعة ثيرمال", description: "طلاء مائي للأسطح والتراسات، مخصص للعزل الحراري والمائي ضمن مجموعة ثيرمال. يناسب الأسطح الخرسانية والمعدنية والخشبية بحسب تجهيز السطح ومتطلبات التطبيق.", image: "/product-originals/roof.webp", page: 9 },
      { name: "ALYA PIPE", title: "عليا بايب", use: "طلاء للأنابيب", description: "طلاء مائي مخصص للعزل الحراري للأنابيب، ضمن مجموعة ثيرمال. يُستخدم على أنابيب نقل السوائل الساخنة والباردة في التطبيقات الصناعية، بما يشمل الأنابيب المعدنية والبلاستيكية والخرسانية.", image: "/catalog-previews/pipe.webp", page: 10 },
      { name: "ALYA STONE", title: "عليا ستون", use: "طلاء شفاف لحماية الحجر", description: "طلاء أكريليك شفاف بلمسة لامعة، لحماية الحجر والأسطح الحجرية من الرطوبة. يناسب الحجر الطبيعي والخرسانة والإنترلوك، مع إبقاء تفاصيل السطح ظاهرة.", image: "/catalog-previews/stone.webp", page: 11 },
    ],
  },
];

export const getCatalog = (slug: string) => catalogs.find((catalog) => catalog.slug === slug);

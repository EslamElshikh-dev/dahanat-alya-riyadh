export type Locale = "ar" | "en";

export type LocalizedText = {
  ar: string;
  en: string;
};

export type ProductSpec = {
  label: LocalizedText;
  value: LocalizedText;
};

export type Product = {
  slug: string;
  code: string;
  name: LocalizedText;
  category: "thermal" | "paint";
  image: string;
  accent: string;
  summary: LocalizedText;
  description: LocalizedText;
  benefits: LocalizedText[];
  surfaces: LocalizedText[];
  application: LocalizedText[];
  specs: ProductSpec[];
  featured?: boolean;
};

const text = (ar: string, en: string): LocalizedText => ({ ar, en });
const spec = (labelAr: string, labelEn: string, valueAr: string, valueEn = valueAr): ProductSpec => ({
  label: text(labelAr, labelEn),
  value: text(valueAr, valueEn),
});

export const productGroups = {
  thermal: {
    name: text("عليا ثيرمال", "Alya Thermal"),
    title: text("أنظمة العزل والحماية", "Insulation & protection systems"),
    description: text(
      "حلول مائية متكاملة للأسطح والجدران والأنابيب والحجر، صُممت لتجمع الحماية والأداء وسهولة التطبيق.",
      "Integrated water-based solutions for roofs, walls, pipes and stone, designed around protection, performance and practical application."
    ),
    logo: "/brand/alya-thermal.svg",
  },
  paint: {
    name: text("عليا للدهانات", "Alya Paints"),
    title: text("دهانات وتكسيات معمارية", "Architectural paints & textures"),
    description: text(
      "دهانات داخلية وخارجية، برايمرات وتكسيات أكريليكية بخيارات تناسب الأسطح والاستخدامات المختلفة.",
      "Interior and exterior paints, primers and acrylic textures developed for varied surfaces and applications."
    ),
    logo: "/brand/alya-paints.svg",
  },
} as const;

export const products: Product[] = [
  {
    slug: "alya-pipe-rtw",
    code: "ALYA PIPE – RTW",
    name: text("عليا بايب – RTW", "ALYA PIPE – RTW"),
    category: "thermal",
    image: "/products/alya-pipe-rtw.webp",
    accent: "#202a45",
    summary: text("طلاء سائل للعزل الحراري وحماية الأنابيب من الصدأ.", "Liquid thermal-insulation and rust-protection coating for pipes."),
    description: text(
      "طلاء مائي مرن قائم على راتنج أكريليكي معدل ويحتوي على كريات سيليكا طبيعية مفرغة، مخصص لتقليل انتقال الحرارة عبر الأنابيب في المنشآت الصناعية والبترولية.",
      "A water-based modified acrylic elastomeric coating with natural vacuumed silica beads, developed to reduce heat transfer through piping in industrial and petroleum facilities."
    ),
    benefits: [text("عزل حراري موفر للطاقة", "Energy-saving thermal insulation"), text("حماية للأنابيب المعدنية من الصدأ", "Rust protection for metal pipes"), text("مادة مائية ومقاومة للحريق", "Water-based and fire resistant")],
    surfaces: [text("الأنابيب المعدنية", "Metal pipes"), text("الأنابيب البلاستيكية", "Plastic pipes"), text("الأنابيب الخرسانية", "Concrete pipes")],
    application: [text("تنظيف السطح وإزالة الزيوت والطبقات الضعيفة.", "Clean the surface and remove oils and loose coatings."), text("تطبيق ALYA PRIMER قبل طبقة العزل.", "Apply ALYA PRIMER before the insulation coat."), text("تنفيذ طبقتين على الأقل مع مراعاة زمن إعادة الطلاء.", "Apply at least two coats while observing the recoating time.")],
    specs: [spec("اللمعان", "Finish", "مطفي", "Matt"), spec("المادة الصلبة", "Solid content", "70±2% بالوزن", "70±2% by weight"), spec("الكثافة", "Density", "0.80 غ/سم³", "0.80 g/cm³"), spec("الاستهلاك التقريبي", "Approx. consumption", "1–1.5 كجم/م²", "1–1.5 kg/m²"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours")],
    featured: true,
  },
  {
    slug: "alya-roof-twp",
    code: "ALYA ROOF – TWP",
    name: text("عليا رووف – TWP", "ALYA ROOF – TWP"),
    category: "thermal",
    image: "/products/alya-roof-twp.webp",
    accent: "#33b9ca",
    summary: text("نظام سائل للعزل المائي والحراري للأسطح والتراسات.", "Liquid waterproofing and thermal-insulation system for roofs and terraces."),
    description: text(
      "طلاء مائي قائم على السيليكون المعدل والراتنج المرن، يوفر طبقة متصلة للأسطح الخرسانية والمعدنية والخشبية مع خصائص عزل متعددة.",
      "A water-based modified silicone elastomeric coating that creates a continuous protective layer across concrete, metal and timber roofs."
    ),
    benefits: [text("عزل مائي وحراري", "Waterproofing and thermal insulation"), text("يساعد على عزل الصوت", "Helps reduce sound transmission"), text("مقاومة للحريق والعوامل الجوية", "Fire and weather resistance")],
    surfaces: [text("الأسطح الخرسانية", "Concrete roofs"), text("الأسطح المعدنية", "Metal roofs"), text("الأسطح الخشبية", "Timber roofs")],
    application: [text("إصلاح الشروخ والفواصل ومصادر التسرب أولًا.", "Repair cracks, joints and leakage points first."), text("تطبيق طبقة ALYA PRIMER ثم طبقتين ALYA ROOF.", "Apply one ALYA PRIMER coat followed by two ALYA ROOF coats."), text("إنهاء النظام بطبقة ALYA PROTECT بعد الجفاف.", "Finish the system with ALYA PROTECT after drying.")],
    specs: [spec("اللمعان", "Finish", "مطفي", "Matt"), spec("المادة الصلبة", "Solid content", "70±2% بالوزن", "70±2% by weight"), spec("سمك الطبقة الجافة", "Dry film thickness", "1.5–2 مم", "1.5–2 mm"), spec("الاستهلاك التقريبي", "Approx. consumption", "1.2–1.3 كجم/م²", "1.2–1.3 kg/m²"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours")],
    featured: true,
  },
  {
    slug: "alya-protect-t",
    code: "ALYA PROTECT-T",
    name: text("عليا بروتكت‑T", "ALYA PROTECT-T"),
    category: "thermal",
    image: "/products/alya-protect-t.webp",
    accent: "#cbd300",
    summary: text("طبقة حماية شفافة نهائية لأنظمة العزل الحراري.", "Clear protective finish for Alya thermal coating systems."),
    description: text("طبقة شفافة لامعة قائمة على مستحلب السيليكون المعدل، تعزز مقاومة الماء والعوامل الجوية وتحسن المظهر النهائي.", "A clear glossy modified-silicone emulsion finish that improves water and weather resistance while refining the final appearance."),
    benefits: [text("حماية شفافة لا تحجب اللون", "Clear protection without hiding colour"), text("تعزيز مقاومة الماء والعوامل الجوية", "Improved water and weather resistance"), text("لمعة نهائية متجانسة", "Consistent final sheen")],
    surfaces: [text("فوق ALYA WALL", "Over ALYA WALL"), text("فوق ALYA ROOF", "Over ALYA ROOF")],
    application: [text("يطبق بعد مرور 6 ساعات على الأقل من طبقة العزل.", "Apply at least six hours after the insulation coat."), text("يطبق بالفرشاة أو الرولة على سطح جاف ونظيف.", "Apply by brush or roller over a clean, dry surface.")],
    specs: [spec("اللون", "Colour", "شفاف", "Clear"), spec("اللمعان", "Finish", "لامع", "Gloss"), spec("المادة الصلبة", "Solid content", "30±2% بالوزن", "30±2% by weight"), spec("معدل التغطية", "Coverage", "5–7 م²/لتر", "5–7 m²/L")],
  },
  {
    slug: "alya-primer-t",
    code: "ALYA PRIMER-T",
    name: text("عليا برايمر‑T", "ALYA PRIMER-T"),
    category: "thermal",
    image: "/products/alya-primer-t.webp",
    accent: "#595754",
    summary: text("أساس شفاف عالي الاختراق لأنظمة Alya Thermal.", "High-penetration clear primer for Alya Thermal systems."),
    description: text("برايمر مائي قائم على مستحلب أكريليك ستايرين للاستخدام الداخلي والخارجي، يهيئ السطح ويحسن ترابط طبقة العزل به.", "A water-based styrene-acrylic primer for interior and exterior use that prepares the substrate and improves coating adhesion."),
    benefits: [text("تقليل امتصاص السطح", "Reduces surface absorption"), text("تحسين الالتصاق بين النظام والسطح", "Improves system-to-substrate adhesion"), text("المساعدة على ضبط استهلاك المادة", "Helps control material consumption")],
    surfaces: [text("الخرسانة والخرسانة الخلوية", "Concrete and aerated concrete"), text("اللياسة والجبس", "Plaster and gypsum"), text("الدهانات المائية القديمة المتماسكة", "Sound existing water-based coatings")],
    application: [text("يجب أن يكون السطح جافًا ونظيفًا وخاليًا من الأملاح.", "The substrate must be dry, clean and free from salt contamination."), text("يخلط جيدًا ويطبق بالرولة أو الفرشاة.", "Mix thoroughly and apply by roller or brush.")],
    specs: [spec("اللون", "Colour", "شفاف", "Clear"), spec("المادة الصلبة", "Solid content", "25±2% بالوزن", "25±2% by weight"), spec("الكثافة", "Density", "1.01 غ/سم³", "1.01 g/cm³"), spec("أداة التطبيق", "Application", "رولة أو فرشاة", "Roller or brush")],
  },
  {
    slug: "alya-wall-dtc",
    code: "ALYA WALL-DTC",
    name: text("عليا وول – DTC", "ALYA WALL-DTC"),
    category: "thermal",
    image: "/products/alya-wall-dtc.webp",
    accent: "#f5b51b",
    summary: text("تكسية جدارية ديكورية بخصائص عزل حراري ومائي وصوتي.", "Decorative wall coating with thermal, water and sound-insulation properties."),
    description: text("تكسية مائية مرنة ذات ملمس زخرفي، تحتوي على حبيبات طبيعية مفرغة ومخصصة للجدران الداخلية والخارجية والأسطح المتنوعة.", "A flexible water-based textured coating with natural vacuumed beads, developed for a broad range of interior and exterior wall substrates."),
    benefits: [text("عزل حراري ومائي وصوتي", "Thermal, water and sound insulation"), text("خاصية تنفس عالية", "High breathability"), text("ألوان متعددة وتشطيب زخرفي", "Multiple colours and decorative texture")],
    surfaces: [text("اللياسة والخرسانة المكشوفة", "Plaster and fair-face concrete"), text("الجدران الداخلية والخارجية", "Interior and exterior walls"), text("المعدن والخشب بعد التجهيز", "Prepared metal and timber")],
    application: [text("تطبيق طبقة ALYA PRIMER على السطح المجهز.", "Prime the prepared surface with ALYA PRIMER."), text("تطبيق طبقتين من ALYA WALL بالرولة الساتان أو الرش.", "Apply two ALYA WALL coats by satin roller or airless spray."), text("إضافة ALYA PROTECT كطبقة حماية نهائية.", "Add ALYA PROTECT as the final protective coat.")],
    specs: [spec("اللمعان", "Finish", "مطفي محبب", "Textured matt"), spec("الألوان", "Colours", "قابل للتلوين", "Tintable"), spec("المادة الصلبة", "Solid content", "70±2% بالوزن", "70±2% by weight"), spec("الاستهلاك التقريبي", "Approx. consumption", "1.2–1.3 كجم/م²", "1.2–1.3 kg/m²")],
    featured: true,
  },
  {
    slug: "alya-stone-spt",
    code: "ALYA STONE-SPT",
    name: text("عليا ستون – SPT", "ALYA STONE-SPT"),
    category: "thermal",
    image: "/products/alya-stone-spt.webp",
    accent: "#138e8b",
    summary: text("عازل شفاف لامع للحجر والخرسانة ومقاومة البقع والرطوبة.", "Clear glossy sealer for stone and concrete with moisture and stain resistance."),
    description: text("ورنيش أكريليكي شفاف أحادي المكون وعالي القوة، يمنح الأسطح الحجرية لمعانًا طبيعيًا وحماية طويلة الأمد.", "A one-component high-strength clear acrylic varnish that gives mineral surfaces a natural gloss and durable protection."),
    benefits: [text("مقاومة للرطوبة والبقع", "Moisture and stain resistance"), text("إظهار جمال الحجر الطبيعي", "Enhances natural stone appearance"), text("تطبيق مباشر بالفرشاة أو الرولة", "Straightforward brush or roller application")],
    surfaces: [text("الحجر الطبيعي", "Natural stone"), text("الخرسانة والإنترلوك", "Concrete and paving"), text("الطوب والبلدورات", "Brick and kerbstones")],
    application: [text("تنظيف السطح وتجفيفه بالكامل.", "Clean and fully dry the surface."), text("التطبيق في الظل وبين 15 و35°م.", "Apply in shade between 15 and 35°C."), text("تجنب التطبيق أثناء الأمطار أو الحرارة الشديدة.", "Avoid application during rain or extreme heat.")],
    specs: [spec("اللون", "Colour", "شفاف", "Clear"), spec("اللمعان", "Finish", "لامع", "Gloss"), spec("معدل التغطية", "Coverage", "5–7 م²/لتر", "5–7 m²/L"), spec("أداة التطبيق", "Application", "رولة أو فرشاة", "Roller or brush")],
  },
  {
    slug: "alya-awp-300",
    code: "ALYA AWP 300",
    name: text("عليا AWP 300", "ALYA AWP 300"),
    category: "paint",
    image: "/products/alya-awp-300.webp",
    accent: "#234966",
    summary: text("غشاء أكريليكي سائل عالي المرونة للعزل المائي.", "Highly elastic liquid acrylic membrane for waterproofing."),
    description: text("طلاء بلاستيكي سائل عالي الجودة قائم على مستحلب أكريليكي مرن، يتكيف مع تغيرات الحرارة ويقاوم الأشعة فوق البنفسجية والمواد الكيميائية.", "A high-quality liquid plastic coating based on an elastomeric acrylic emulsion, engineered to remain flexible and resist UV and chemical exposure."),
    benefits: [text("مرونة تصل إلى 200%", "Up to 200% elasticity"), text("مقاومة للأشعة فوق البنفسجية", "UV resistance"), text("يسمح بخروج رطوبة السطح", "Allows substrate moisture to escape")],
    surfaces: [text("الخرسانة واللياسة والطوب", "Concrete, plaster and brick"), text("الخشب", "Timber"), text("مواد الأسقف المموجة وغير المموجة", "Corrugated and flat roofing materials")],
    application: [text("تنظيف السطح ومعالجة الثقوب والشقوق.", "Clean the surface and repair holes and cracks."), text("تخفيف الطبقة الأولى 40% بالماء كأساس.", "Dilute the first coat with 40% water as a primer."), text("تطبيق طبقتين أو ثلاث طبقات متعاكسة الاتجاه.", "Apply two or three undiluted coats in alternating directions.")],
    specs: [spec("زمن إعادة الطلاء", "Recoating time", "6 ساعات", "6 hours"), spec("اكتمال العزل المائي", "Waterproofing development", "7 أيام", "7 days"), spec("الوصول للقوة النهائية", "Full strength", "14 يومًا", "14 days"), spec("التخزين", "Shelf life", "سنتان للعبوة المغلقة", "2 years unopened")],
    featured: true,
  },
  {
    slug: "alya-tx-600",
    code: "ALYA TX 600",
    name: text("عليا TX 600", "ALYA TX 600"),
    category: "paint",
    image: "/products/alya-tx-600.webp",
    accent: "#7c306b",
    summary: text("تكسية أكريليكية خارجية مطفية بنسيج زخرفي.", "Textured matt acrylic exterior finish."),
    description: text("طلاء نهائي قائم على رابط أكريليكي ستايرين، يكتسب صلابة السطح بتأثير الأشعة فوق البنفسجية ويحافظ على مرونته ضمن نطاق حراري واسع.", "A styrene-acrylic topcoat that develops surface hardness under UV exposure while retaining flexibility across a wide temperature range."),
    benefits: [text("مقاومة عالية للشمس والرطوبة", "High sun and moisture resistance"), text("يغطي الشقوق الشعرية السطحية", "Bridges minor capillary cracks"), text("ملمس زخرفي متعدد التأثيرات", "Multi-effect decorative texture")],
    surfaces: [text("الخرسانة الظاهرة", "Fair-face concrete"), text("الطوب واللياسة", "Brick and plaster"), text("الأسطح المعدنية المجهزة", "Prepared metal")],
    application: [text("تأسيس السطح باستخدام ALYA PRIMER.", "Prime with ALYA PRIMER."), text("تطبيق طبقتين بالرولة مع تخفيف لا يتجاوز 15%.", "Apply two roller coats with no more than 15% dilution."), text("تشكيل النقشة بالرولة المرجانية أثناء بقاء المادة رطبة.", "Create the pattern with a coral roller while the coating is wet.")],
    specs: [spec("نطاق المرونة", "Flexibility range", "من ‎-40 إلى ‎+60°م", "-40 to +60°C"), spec("جفاف اللمس", "Touch dry", "3–4 ساعات", "3–4 hours"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours"), spec("التغطية التقريبية", "Approx. coverage", "0.8–1 م²/كجم/طبقة", "0.8–1 m²/kg/coat")],
  },
  {
    slug: "alya-tx-300",
    code: "ALYA TX 300",
    name: text("عليا TX 300", "ALYA TX 300"),
    category: "paint",
    image: "/products/alya-tx-300.webp",
    accent: "#2d829b",
    summary: text("تكسية أكريليكية مرنة للواجهات بملمس متوسط.", "Flexible medium-texture acrylic coating for façades."),
    description: text("طبقة نهائية محببة للاستخدام الخارجي والداخلي، تقاوم القلوية والأمطار والرطوبة وتحافظ على المرونة في الأجواء المتغيرة.", "A textured topcoat for exterior and interior use with resistance to alkali, precipitation and moisture in changing climates."),
    benefits: [text("مقاومة للعوامل الجوية", "Weather resistance"), text("مرونة تساعد على تغطية الشقوق الشعرية", "Flexibility that helps bridge hairline cracks"), text("تشطيب زخرفي مطفي", "Decorative matt finish")],
    surfaces: [text("الخرسانة", "Concrete"), text("الطوب", "Brick"), text("اللياسة والمعادن المجهزة", "Plaster and prepared metal")],
    application: [text("تجهيز السطح وتطبيق ALYA PRIMER.", "Prepare and prime the substrate with ALYA PRIMER."), text("تطبيق طبقتين مع انتظار 6–12 ساعة بعد البرايمر.", "Apply two coats after allowing 6–12 hours for the primer."), text("ضبط النقشة بالرولة أثناء رطوبة الطبقة.", "Pattern the coating with a roller while wet.")],
    specs: [spec("نطاق المرونة", "Flexibility range", "من ‎-40 إلى ‎+60°م", "-40 to +60°C"), spec("جفاف اللمس", "Touch dry", "3–4 ساعات", "3–4 hours"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours"), spec("التغطية التقريبية", "Approx. coverage", "1–1.2 م²/كجم/طبقة", "1–1.2 m²/kg/coat")],
  },
  {
    slug: "alya-tx-200",
    code: "ALYA TX 200",
    name: text("عليا TX 200", "ALYA TX 200"),
    category: "paint",
    image: "/products/alya-tx-200.webp",
    accent: "#8e6c42",
    summary: text("تكسية أكريليكية زخرفية كثيفة للواجهات.", "Heavy decorative acrylic texture for façades."),
    description: text("تكسية ملونة مطفية قائمة على رابط أكريليكي ستايرين، مخصصة لإنتاج ملمس بارز مع مقاومة الشمس والرطوبة والقلوية.", "A coloured matt styrene-acrylic texture designed for a pronounced finish with resistance to sun, moisture and alkali."),
    benefits: [text("ملمس زخرفي بارز", "Pronounced decorative texture"), text("مقاومة للشمس والأمطار", "Sun and rain resistance"), text("يساعد على تغطية العيوب الشعرية", "Helps cover minor surface imperfections")],
    surfaces: [text("الخرسانة", "Concrete"), text("الطوب واللياسة", "Brick and plaster"), text("المعادن المجهزة", "Prepared metal")],
    application: [text("تطبيق ALYA PRIMER على سطح قوي وجاف.", "Apply ALYA PRIMER to a sound, dry surface."), text("تطبيق المادة بالرولة وتشكيلها من أعلى إلى أسفل.", "Roll on and pattern from top to bottom."), text("توحيد نسبة التخفيف في المساحات الكبيرة.", "Keep dilution consistent across large areas.")],
    specs: [spec("نطاق المرونة", "Flexibility range", "من ‎-40 إلى ‎+60°م", "-40 to +60°C"), spec("جفاف اللمس", "Touch dry", "2–3 ساعات", "2–3 hours"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours"), spec("التغطية التقريبية", "Approx. coverage", "0.5–0.7 م²/كجم/طبقة", "0.5–0.7 m²/kg/coat")],
  },
  {
    slug: "alya-lux-ex",
    code: "ALYA LUX EX",
    name: text("عليا لوكس EX", "ALYA LUX EX"),
    category: "paint",
    image: "/products/alya-lux-ex.webp",
    accent: "#2973b8",
    summary: text("دهان خارجي فاخر قائم على مستحلب الأكريليك النقي.", "Premium pure-acrylic exterior emulsion paint."),
    description: text("طبقة نهائية ملونة للواجهات تجمع قوة الالتصاق ومقاومة الشمس والرطوبة مع حماية الخرسانة من الكربنة ومقاومة الطحالب والفطريات.", "A coloured exterior topcoat combining strong adhesion and weather resistance with concrete carbonation protection and resistance to algae and fungi."),
    benefits: [text("مقاومة للشمس والرطوبة", "Sun and moisture resistance"), text("مقاومة للطحالب والفطريات", "Algae and fungus resistance"), text("نفاذية لبخار الماء", "Water-vapour permeability")],
    surfaces: [text("الخرسانة والبلوك", "Concrete and blockwork"), text("اللياسة والأسطح الإسمنتية", "Plaster and cement render"), text("ألواح الجبس والدهانات المائية القديمة", "Gypsum board and existing emulsion coatings")],
    application: [text("تجهيز السطح وتطبيق ALYA PRIMER.", "Prepare the surface and apply ALYA PRIMER."), text("تطبيق طبقتين مع توحيد نسبة التخفيف.", "Apply two coats with consistent dilution."), text("تجنب الرياح والشمس المباشرة أثناء التطبيق.", "Avoid wind and direct sunlight during application.")],
    specs: [spec("جفاف اللمس", "Touch dry", "ساعة واحدة", "1 hour"), spec("زمن إعادة الطلاء", "Recoating time", "4 ساعات", "4 hours"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours"), spec("التخفيف", "Dilution", "حتى 15% ماء نظيف", "Up to 15% clean water")],
    featured: true,
  },
  {
    slug: "alya-cryl",
    code: "ALYA CRYL",
    name: text("دهان عليا كريل", "ALYA CRYL"),
    category: "paint",
    image: "/products/alya-cryl.webp",
    accent: "#d43b45",
    summary: text("دهان ديكوري أكريليكي نقي للواجهات الخارجية.", "Pure-acrylic decorative paint for exterior façades."),
    description: text("دهان خارجي ملون عالي الجودة، يوفر التصاقًا قويًا ومقاومة لأشعة الشمس ويساعد على حماية الخرسانة مع السماح بانتقال بخار الماء.", "A high-quality coloured exterior paint with strong adhesion, sunlight resistance and vapour permeability for durable façade protection."),
    benefits: [text("مقاومة للشمس والطحالب والفطريات", "Sun, algae and fungus resistance"), text("سهولة الفرد وتغطية جيدة", "Easy application and good coverage"), text("حماية ديكورية للواجهات", "Decorative façade protection")],
    surfaces: [text("الخرسانة الظاهرة والبلوك", "Fair-face concrete and blockwork"), text("اللياسة الأسمنتية", "Cement plaster"), text("الجبس والأسطح المدهونة سابقًا", "Gypsum and existing emulsion coatings")],
    application: [text("تطبيق ALYA PRIMER بعد تجهيز السطح.", "Apply ALYA PRIMER after substrate preparation."), text("تنفيذ طبقتين مع انتظار 6–8 ساعات بينهما.", "Apply two coats with 6–8 hours between coats."), text("حماية السطح من الصقيع قبل التطبيق وبعده.", "Protect the surface from frost before and after application.")],
    specs: [spec("جفاف اللمس", "Touch dry", "1–2 ساعة", "1–2 hours"), spec("زمن إعادة الطلاء", "Recoating time", "8 ساعات", "8 hours"), spec("التغطية التقريبية", "Approx. coverage", "6–10 م²/لتر/طبقة", "6–10 m²/L/coat"), spec("التخفيف", "Dilution", "حتى 15% ماء نظيف", "Up to 15% clean water")],
    featured: true,
  },
  {
    slug: "alya-primer-colored",
    code: "ALYA PRIMER COLORED",
    name: text("عليا أساس ملون", "ALYA PRIMER COLORED"),
    category: "paint",
    image: "/products/alya-primer-colored.webp",
    accent: "#cc433f",
    summary: text("أساس أكريليكي مائي ملون للاستخدام الداخلي والخارجي.", "Coloured water-based acrylic primer for interior and exterior use."),
    description: text("برايمر مطفي ملون يخترق السطح ويقلل امتصاصه، ويحسن تماسك طبقات الدهان اللاحقة خصوصًا عند تغيير الألوان.", "A coloured matt primer that penetrates and regulates the substrate while improving topcoat adhesion, especially during colour changes."),
    benefits: [text("توحيد لون السطح", "Helps unify substrate colour"), text("تقليل امتصاص اللياسة", "Reduces plaster absorption"), text("تحسين التصاق الطبقة النهائية", "Improves topcoat adhesion")],
    surfaces: [text("الخرسانة واللياسة", "Concrete and plaster"), text("الجبس والجير", "Gypsum and lime"), text("الدهانات البلاستيكية القديمة المتماسكة", "Sound existing emulsion paints")],
    application: [text("صنفرة السطح وملء الشقوق وإزالة الغبار.", "Sand, fill cracks and remove dust."), text("يطبق بالفرشاة أو الرولة دون تخفيف.", "Apply by brush or roller without dilution."), text("يمكن إضافة حتى 10% ماء عند الحاجة.", "Up to 10% water may be added if required.")],
    specs: [spec("جفاف اللمس", "Touch dry", "ساعة واحدة", "1 hour"), spec("زمن إعادة الطلاء", "Recoating time", "4 ساعات", "4 hours"), spec("التغطية التقريبية", "Approx. coverage", "8–10 م²/لتر/طبقة", "8–10 m²/L/coat"), spec("التخزين", "Shelf life", "3 سنوات للعبوة المغلقة", "3 years unopened")],
  },
  {
    slug: "alya-primer",
    code: "ALYA PRIMER",
    name: text("عليا أساس", "ALYA PRIMER"),
    category: "paint",
    image: "/products/alya-primer.webp",
    accent: "#b43736",
    summary: text("برايمر شفاف لتقوية السطح وضبط الامتصاص قبل الدهان.", "Clear primer that strengthens and regulates substrates before painting."),
    description: text("أساس شفاف قائم على مستحلب أكريليك ستايرين، يربط طبقة الدهان النهائية بالسطح ويقلل استهلاكها في التطبيقات الداخلية والخارجية.", "A transparent styrene-acrylic emulsion primer that connects the topcoat to the substrate and helps reduce paint consumption."),
    benefits: [text("اختراق جيد للأسطح المسامية", "Good penetration into porous substrates"), text("تقليل امتصاص الماء", "Reduces water absorption"), text("رفع أداء الالتصاق", "Improves adhesion performance")],
    surfaces: [text("الخرسانة والخرسانة الخلوية", "Concrete and aerated concrete"), text("اللياسة والجبس", "Plaster and gypsum"), text("الأسطح المدهونة بمواد مائية", "Existing water-based coatings")],
    application: [text("تنظيف وصنفرة السطح وإزالة الغبار.", "Clean, sand and dust off the substrate."), text("يطبق بالرولة أو الفرشاة.", "Apply by roller or brush."), text("تبدأ طبقة الدهان بعد 3 ساعات على الأقل.", "Apply the topcoat after at least three hours.")],
    specs: [spec("جفاف اللمس", "Touch dry", "ساعة واحدة", "1 hour"), spec("زمن إعادة الطلاء", "Recoating time", "3–6 ساعات", "3–6 hours"), spec("التغطية التقريبية", "Approx. coverage", "6–8 م²/لتر/طبقة", "6–8 m²/L/coat"), spec("التخفيف", "Dilution", "جاهز؛ حتى 10% ماء عند الحاجة", "Ready to use; up to 10% water if required")],
  },
  {
    slug: "alya-tx",
    code: "ALYA TX",
    name: text("تكسية عليا TX أكريليك", "ALYA TX"),
    category: "paint",
    image: "/products/alya-tx.webp",
    accent: "#d33d48",
    summary: text("تكسية أكريليكية مطفية للواجهات بملمس زخرفي.", "Matt acrylic texture coating for decorative façades."),
    description: text("طلاء نهائي مرن قائم على أكريليك ستايرين، يقاوم القلوية والشمس والرطوبة ويمنح الواجهات نقشًا متجانسًا.", "A flexible styrene-acrylic topcoat with resistance to alkali, sunlight and moisture, creating a consistent textured finish."),
    benefits: [text("مقاومة قوية للعوامل الجوية", "Strong weather resistance"), text("تغطية للشقوق الشعرية", "Bridges hairline cracks"), text("خيارات نقش متعددة", "Multiple texture options")],
    surfaces: [text("الخرسانة", "Concrete"), text("الطوب واللياسة", "Brick and plaster"), text("المعدن بعد الحماية من الصدأ", "Metal after anti-corrosion preparation")],
    application: [text("تجهيز السطح وتطبيق ALYA PRIMER.", "Prepare and prime with ALYA PRIMER."), text("خلط المادة حتى التجانس ثم تطبيقها بالرولة.", "Mix until homogeneous, then apply by roller."), text("تنفيذ النقشة من أعلى إلى أسفل قبل جفاف الطبقة.", "Form the pattern top-to-bottom before the coat dries.")],
    specs: [spec("نطاق المرونة", "Flexibility range", "من ‎-40 إلى ‎+60°م", "-40 to +60°C"), spec("جفاف اللمس", "Touch dry", "3–4 ساعات", "3–4 hours"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours"), spec("التخفيف", "Dilution", "حتى 15% ماء نظيف", "Up to 15% clean water")],
  },
  {
    slug: "alya-lux",
    code: "ALYA LUX",
    name: text("دهان عليا لوكس", "ALYA LUX"),
    category: "paint",
    image: "/products/alya-lux.webp",
    accent: "#8f335b",
    summary: text("دهان داخلي أكريليكي فاخر بلمسة مطفية.", "Premium acrylic interior paint with a matt finish."),
    description: text("دهان مائي ديكوري للجدران الداخلية يوفر تغطية جيدة والتصاقًا قويًا مع نفاذية للبخار تساعد على الحد من الانتفاخ والتقشر في البيئات الرطبة.", "A decorative water-based interior paint offering good hiding power, strong adhesion and vapour permeability that helps resist blistering and peeling."),
    benefits: [text("تغطية جيدة وتشطيب مطفي", "Good hiding power and matt finish"), text("قابلية سهلة للتطبيق", "Easy application"), text("خاصية تنفس وطرد للماء", "Breathable and water-repellent")],
    surfaces: [text("الجدران المليسة أو المدهونة", "New or previously painted walls"), text("الجبس والمعجون", "Gypsum and putty"), text("الخرسانة وورق الجدران القابل للدهان", "Concrete and paintable wallpaper")],
    application: [text("تجهيز السطح ثم تطبيق طبقة ALYA PRIMER.", "Prepare the surface and apply one ALYA PRIMER coat."), text("تطبيق طبقتين بالرولة المناسبة لطبيعة السطح.", "Apply two coats with a roller suited to the substrate."), text("توحيد الدفعة ونسبة التخفيف لأعمال الرتوش.", "Keep batch and dilution consistent for future touch-ups.")],
    specs: [spec("جفاف اللمس", "Touch dry", "30 دقيقة", "30 minutes"), spec("زمن إعادة الطلاء", "Recoating time", "6 ساعات", "6 hours"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours"), spec("التخفيف", "Dilution", "15–20% ماء نظيف", "15–20% clean water")],
    featured: true,
  },
  {
    slug: "alya-eco",
    code: "ALYA ECO",
    name: text("دهان عليا إيكو", "ALYA ECO"),
    category: "paint",
    image: "/products/alya-eco.webp",
    accent: "#32924a",
    summary: text("دهان داخلي مطفي منخفض الرائحة وصديق للبيئة.", "Low-odour, environmentally conscious matt interior paint."),
    description: text("دهان أكريليكي مائي للجدران الداخلية يجمع سهولة التطبيق والتغطية الجيدة مع تشطيب مطفي دون رائحة غير مرغوبة.", "A water-based acrylic interior wall paint combining easy application and good coverage with a matt, low-odour finish."),
    benefits: [text("منخفض الرائحة", "Low odour"), text("صديق للبيئة وقابل للتنفس", "Environmentally conscious and breathable"), text("مقاومة للانتفاخ والتقشر", "Helps resist blistering and peeling")],
    surfaces: [text("الجدران الداخلية الجديدة أو المدهونة", "New or previously painted interior walls"), text("الجبس والأسطح الممعجنة", "Gypsum and puttied surfaces"), text("ألواح الأسمنت والألياف الزجاجية", "Cement and fibreglass panels")],
    application: [text("تنظيف وتجهيز السطح حتى يصبح قويًا وجافًا.", "Prepare the substrate until it is sound, clean and dry."), text("تطبيق طبقة ALYA PRIMER قبل الدهان.", "Apply one ALYA PRIMER coat before painting."), text("تنفيذ طبقتين بالرولة أو الفرشاة أو الرش.", "Apply two coats by roller, brush or spray.")],
    specs: [spec("جفاف اللمس", "Touch dry", "30 دقيقة", "30 minutes"), spec("زمن إعادة الطلاء", "Recoating time", "6 ساعات", "6 hours"), spec("الجفاف الكامل", "Full drying", "24 ساعة", "24 hours"), spec("التخزين", "Shelf life", "سنتان للعبوة المغلقة", "2 years unopened")],
    featured: true,
  },
];

export const featuredProducts = products.filter((product) => product.featured);
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getProductsByCategory = (category: Product["category"]) => products.filter((product) => product.category === category);
export const localize = (value: LocalizedText, locale: Locale) => value[locale];

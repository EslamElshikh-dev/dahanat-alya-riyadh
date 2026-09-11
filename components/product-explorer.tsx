"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products, type Locale, type Product } from "@/data/products";

type Filter = "all" | Product["category"];

export function ProductExplorer({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return products.filter((product) => {
      const matchesCategory = filter === "all" || product.category === filter;
      const haystack = `${product.code} ${product.name.ar} ${product.name.en} ${product.summary.ar} ${product.summary.en}`.toLocaleLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [filter, query]);

  const filters: { key: Filter; ar: string; en: string }[] = [
    { key: "all", ar: "كل المنتجات", en: "All products" },
    { key: "thermal", ar: "عليا ثيرمال", en: "Alya Thermal" },
    { key: "paint", ar: "عليا للدهانات", en: "Alya Paints" },
  ];

  return (
    <div>
      <div className="catalog-toolbar">
        <div className="catalog-filters" aria-label={isEnglish ? "Filter products" : "تصفية المنتجات"}>
          <SlidersHorizontal className="hidden size-4 text-[#0b789e] sm:block" aria-hidden="true" />
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`catalog-filter ${filter === item.key ? "catalog-filter-active" : ""}`}
              aria-pressed={filter === item.key}
            >
              {item[locale]}
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <Search className="size-4.5" aria-hidden="true" />
          <span className="sr-only">{isEnglish ? "Search products" : "البحث في المنتجات"}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={isEnglish ? "Search by name or code" : "ابحث بالاسم أو الكود"}
          />
        </label>
      </div>

      <p className="mt-5 text-sm font-bold text-[#67808d]">
        {isEnglish ? `${filtered.length} products` : `${filtered.length} منتجًا`}
      </p>

      {filtered.length ? (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <ProductCard key={product.slug} product={product} locale={locale} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <Search className="size-7" />
          <p>{isEnglish ? "No products match your search." : "لا توجد منتجات مطابقة لبحثك."}</p>
        </div>
      )}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { localize, productGroups, type Locale, type Product } from "@/data/products";

export function ProductCard({ product, locale, priority = false }: { product: Product; locale: Locale; priority?: boolean }) {
  const isEnglish = locale === "en";
  const href = `${isEnglish ? "/en" : ""}/products/${product.slug}`;
  const group = productGroups[product.category];
  const Arrow = isEnglish ? ArrowUpRight : ArrowUpLeft;

  return (
    <article className="product-card group" style={{ "--product-accent": product.accent } as React.CSSProperties}>
      <Link href={href} className="block h-full" aria-label={`${isEnglish ? "View" : "عرض"} ${localize(product.name, locale)}`}>
        <div className="product-card-media">
          <span className="product-card-family">{localize(group.name, locale)}</span>
          <span className="product-card-code" dir="ltr">{product.code}</span>
          <Image
            src={product.image}
            alt={localize(product.name, locale)}
            width={520}
            height={520}
            priority={priority}
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 43vw, 29vw"
            className="product-card-image"
          />
        </div>
        <div className="product-card-body">
          <h3>{localize(product.name, locale)}</h3>
          <p>{localize(product.summary, locale)}</p>
          <span className="product-card-link">
            {isEnglish ? "View product" : "تفاصيل المنتج"}
            <Arrow className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

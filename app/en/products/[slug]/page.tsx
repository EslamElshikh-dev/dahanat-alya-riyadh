import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getProduct, products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name.en,
    description: product.summary.en,
    alternates: { canonical: `/en/products/${slug}`, languages: { "ar-SA": `/products/${slug}`, "en-SA": `/en/products/${slug}` } },
    openGraph: { title: product.name.en, description: product.summary.en, images: [product.image], locale: "en_SA" },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} locale="en" />;
}

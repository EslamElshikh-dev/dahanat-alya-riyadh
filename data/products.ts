import { catalogs } from "@/data/catalogs";
import { productAnchor } from "@/data/product-display";
export const products = catalogs.flatMap(collection => collection.products.map(product => ({ ...product, slug: productAnchor(product.name), collection: collection.englishTitle, category: collection.label })));
export const getProduct = (slug: string) => products.find(product => product.slug === slug);
export const productTones = ["#DCE9EE", "#F8E2D6", "#DCE7D7", "#F3E3BD", "#E6E0F0", "#DCEBE5", "#E9E2D8"];
export const productAccents = ["#5C94AD", "#D68567", "#89A274", "#CDA951", "#9B84B7", "#6E9B87", "#B09473"];
export function getProductTheme(name: string) {
  const index = Math.max(0, products.findIndex(product => product.name === name)) % productTones.length;
  return { tone: productTones[index], accent: productAccents[index] };
}

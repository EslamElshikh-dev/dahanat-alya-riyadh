import { catalogs } from "@/data/catalogs";
import { productAnchor } from "@/data/product-display";
export const products = catalogs.flatMap(collection => collection.products.map(product => ({ ...product, slug: productAnchor(product.name), collection: collection.englishTitle, category: collection.label })));
export const getProduct = (slug: string) => products.find(product => product.slug === slug);
export const productTones = ["#F3E9D5", "#E0EADF", "#F9DFD1", "#F4E7B8", "#F7DDD2", "#D8E9ED", "#E6DDF0", "#D8EAE3", "#F1DEE4", "#DFE9D5", "#F4E4BA", "#DDE6F2", "#EDE1D5"];
export const productAccents = ["#B49561", "#87A68C", "#CE896C", "#C4A44C", "#C98067", "#6A98A8", "#9E83B5", "#80A99A", "#B78397", "#8DA474", "#CDAA5C", "#809CBD", "#B49477"];
export function getProductTheme(name: string) {
  const index = Math.max(0, products.findIndex(product => product.name === name)) % productTones.length;
  return { tone: productTones[index], accent: productAccents[index] };
}

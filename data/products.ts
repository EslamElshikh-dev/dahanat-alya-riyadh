import { catalogs } from "@/data/catalogs";
import { productAnchor } from "@/data/product-display";
export const products = catalogs.flatMap(collection => collection.products.map(product => ({ ...product, slug: productAnchor(product.name), collection: collection.englishTitle, category: collection.label })));
export const getProduct = (slug: string) => products.find(product => product.slug === slug);
export const productTones = ["#EBE5DB", "#DDE8EB", "#F1DED3", "#E5E9D8", "#E5E1ED", "#DAE6E8", "#EFE2CF"];

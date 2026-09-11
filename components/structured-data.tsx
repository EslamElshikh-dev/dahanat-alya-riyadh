import { products } from "@/data/products";
import { site } from "@/data/site";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        alternateName: site.englishName,
        url: site.url,
        logo: `${site.url}/brand/alya-chemical.webp`,
        telephone: site.phoneE164,
        email: site.email,
        description: site.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: "حي السلي، شارع أحمد الكاتب",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "SA",
        },
        sameAs: Object.values(site.social),
        brand: [
          { "@type": "Brand", name: "Alya Thermal" },
          { "@type": "Brand", name: "Alya Paints" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "منتجات كيميا عليا",
          itemListElement: products.map((product, position) => ({
            "@type": "ListItem",
            position: position + 1,
            item: {
              "@type": "Product",
              name: product.name.ar,
              alternateName: product.code,
              image: `${site.url}${product.image}`,
              url: `${site.url}/products/${product.slug}`,
              brand: { "@type": "Brand", name: product.category === "thermal" ? "Alya Thermal" : "Alya Paints" },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "ar-SA",
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

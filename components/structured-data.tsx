import { services } from "@/data/services";
import { site } from "@/data/site";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HousePainter",
        "@id": `${site.url}/#business`,
        name: site.name,
        alternateName: site.englishName,
        url: site.url,
        image: `${site.url}/hero-interior.webp`,
        logo: `${site.url}/favicon.svg`,
        telephone: site.phoneE164,
        description: site.description,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phoneE164,
          contactType: "customer service",
          areaServed: "SA",
          availableLanguage: ["ar"],
        },
        areaServed: {
          "@type": "City",
          name: site.city,
          containedInPlace: { "@type": "AdministrativeArea", name: site.region },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "SA",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "خدمات دهانات عليا",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.shortTitle,
              url: `${site.url}/services/${service.slug}`,
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
        publisher: { "@id": `${site.url}/#business` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

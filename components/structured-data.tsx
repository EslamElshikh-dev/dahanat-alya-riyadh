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
        telephone: site.phoneE164,
        description: site.description,
        priceRange: "$$",
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
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        ],
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

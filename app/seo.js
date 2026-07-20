export const siteName = "Instalyd";
export const siteUrl = "https://instalyd.no";

export const defaultDescription =
  "Profesjonell lydinstallasjon i bil, montering av bilstereo, CarPlay, høyttalere, subwoofer, forsterker, DSP og lyddemping i Akershus og Buskerud.";

export const priorityServiceKeywords = [
  "bilstereo montering Akershus",
  "bilstereo montering Buskerud",
  "montering av bilstereo Akershus",
  "montering av bilstereo Buskerud",
  "CarPlay montering Akershus",
  "CarPlay montering Buskerud",
  "subwoofer montering bil Akershus",
  "subwoofer montering bil Buskerud",
  "lydinstallasjon i bil Akershus",
  "lydinstallasjon i bil Buskerud",
  "høyttaleroppgradering bil Akershus",
  "høyttaleroppgradering bil Buskerud",
  "bilstereo Asker",
  "bilstereo Bærum",
  "bilstereo Drammen",
  "bilstereo Lillestrøm",
  "CarPlay Asker",
  "CarPlay Bærum",
  "CarPlay Drammen",
  "CarPlay Lillestrøm",
];

export const defaultKeywords = [
  ...priorityServiceKeywords,
  "lydinstallasjon",
  "lydinstallasjon i bil",
  "installasjon av lyd i bil",
  "montering av bilstereo",
  "bilstereo montering",
  "bilstereo",
  "CarPlay montering",
  "CarPlay installasjon",
  "subwoofer montering",
  "forsterker montering",
  "høyttaler montering bil",
  "lyddemping bil",
  "Akershus",
  "Buskerud",
  "Asker",
  "Bærum",
  "Drammen",
  "Lillestrøm",
  "Nordre Follo",
  "Ullensaker",
  "Ringerike",
  "Kongsberg",
  "Lier",
  "Øvre Eiker",
  "Modum",
  "Nesodden",
];

export function withSiteName(title) {
  return title.endsWith(`| ${siteName}`) ? title : `${title} | ${siteName}`;
}

export function createPageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  keywords = [],
}) {
  return {
    title,
    description,
    keywords: [...new Set([...defaultKeywords, ...keywords])],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: withSiteName(title),
      description,
      url: path,
      siteName,
      locale: "nb_NO",
      type: "website",
    },
  };
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#nettside`,
  name: siteName,
  alternateName: "Instalyd bilstereo og CarPlay montering",
  url: siteUrl,
  inLanguage: "nb-NO",
  description: defaultDescription,
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${siteUrl}/#virksomhet`,
  name: siteName,
  url: siteUrl,
  email: "hjelp@instalyd.no",
  image: `${siteUrl}/icon.png`,
  description: defaultDescription,
  areaServed: [
    "Akershus",
    "Buskerud",
    "Asker",
    "Bærum",
    "Drammen",
    "Lillestrøm",
    "Nordre Follo",
    "Ullensaker",
    "Ringerike",
    "Kongsberg",
    "Lier",
    "Øvre Eiker",
    "Modum",
    "Nesodden",
    "Rælingen",
    "Ås",
    "Enebakk",
    "Gjerdrum",
    "Nannestad",
    "Nittedal",
    "Aurskog-Høland",
    "Hole",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NO",
  },
  availableLanguage: ["nb-NO", "no"],
  priceRange: "850 kr/time",
  knowsAbout: [
    "Bilstereo montering",
    "CarPlay montering",
    "Subwoofer montering",
    "Forsterker montering",
    "Høyttaleroppgradering i bil",
    "Lyddemping bil",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Lydinstallasjon og bilstereotjenester",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lydinstallasjon i bil",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Montering av bilstereo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Montering av CarPlay",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Montering av subwoofer og forsterker",
        },
      },
    ],
  },
};

export const siteName = "Instalyd";
export const siteUrl = "https://instalyd.no";

export const defaultDescription =
  "Instalyd hjelper deg med lydinstallasjon i bil, montering av bilstereo, høyttalere, subwoofer, forsterker, DSP og CarPlay i Akershus og Buskerud.";

export const defaultKeywords = [
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
  telephone: "+4790254100",
  image: `${siteUrl}/icon.png`,
  description: defaultDescription,
  areaServed: ["Akershus", "Buskerud"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NO",
  },
  availableLanguage: ["nb-NO", "no"],
  priceRange: "650 kr/time",
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

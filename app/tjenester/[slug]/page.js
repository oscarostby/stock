import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import afterRadioImage from "../../../etterradio.png";
import beforeRadioImage from "../../../førradio.png";
import subInstallImageOne from "../../../monteringavsub1.png";
import subInstallImageTwo from "../../../monteringavsub2.png";
import speakerUpgradeImage from "../../../standarhøytaler.png";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { contact } from "../../data";
import { createPageMetadata, siteName, siteUrl } from "../../seo";
import {
  getServiceLandingPageBySlug,
  serviceLandingPages,
} from "../../service-pages";
import { SiteEffects } from "../../site-effects";

const imageMap = {
  afterRadio: afterRadioImage,
  beforeRadio: beforeRadioImage,
  speakerUpgrade: speakerUpgradeImage,
  subInstallOne: subInstallImageOne,
  subInstallTwo: subInstallImageTwo,
};

export function generateStaticParams() {
  return serviceLandingPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }) {
  const page = getServiceLandingPageBySlug(params.slug);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/tjenester/${page.slug}`,
    keywords: page.keywords,
  });
}

export default function ServiceLandingPage({ params }) {
  const page = getServiceLandingPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const pageImage = imageMap[page.imageKey];
  const relatedPages = serviceLandingPages.filter((item) => item.slug !== page.slug).slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tjenester",
        item: `${siteUrl}/tjenester`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: `${siteUrl}/tjenester/${page.slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${page.title} hos ${siteName}`,
    description: page.description,
    provider: {
      "@type": "AutoRepair",
      name: siteName,
      telephone: contact.phoneHref,
      email: contact.email,
      areaServed: contact.area,
    },
    areaServed: contact.area,
    serviceType: page.title,
    url: `${siteUrl}/tjenester/${page.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteEffects />
      <Header />

      <main>
        <section className="section">
          <div className="page-hero">
            <div data-reveal="">
              <p className="eyebrow">{page.eyebrow}</p>
              <h1>{page.heroTitle}</h1>
              <p className="lead">{page.lead}</p>
            </div>

            <aside className="page-hero__side" data-reveal="">
              <p className="mini-title">Vanlige temaer</p>
              <div className="page-hero__meta">
                {page.tags.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--tight">
          <div className="detail-grid">
            <article className="page-hero__media" data-reveal="">
              <Image
                src={pageImage}
                alt={page.imageAlt}
                sizes="(max-width: 1100px) 100vw, 58vw"
              />
            </article>

            <article className="detail-card" data-reveal="">
              <p className="mini-title">Kort forklart</p>
              <h3>{page.summary}</h3>
              <ul className="info-list">
                <li>Vi jobber med biler i {contact.area}.</li>
                <li>Du får en vurdering av hva som passer bilen og utstyret ditt.</li>
                <li>Ryddig oppkobling og tydelig dialog er en del av jobben.</li>
              </ul>
              <Link className="button button--secondary" href="/kontakt">
                Be om vurdering
              </Link>
            </article>
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Hva vi gjør</p>
            <h2>Det viktigste i denne typen jobb.</h2>
          </div>

          <div className="values-grid">
            {page.highlights.map((item) => (
              <article className="detail-card" data-reveal="" key={item.title}>
                <p className="mini-title">{item.title}</p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Prosess</p>
            <h2>Slik går jobben vanligvis.</h2>
          </div>

          <div className="service-rail">
            {page.steps.map((step) => (
              <article className="service-row" data-reveal="" key={step.label}>
                <span className="service-row__number">{step.label}</span>
                <div className="service-row__body">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <p className="service-row__meta">{step.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading section-heading--split" data-reveal="">
            <div>
              <p className="eyebrow">Spørsmål</p>
              <h2>Vanlige spørsmål om {page.title.toLowerCase()}.</h2>
            </div>
            <p className="lead">
              Hvis du er usikker på om dette passer bilen din, er det enklest å sende
              bilmodell, årsmodell og hva du vil få gjort.
            </p>
          </div>

          <div className="faq-list">
            {page.faqs.map((item) => (
              <details className="faq-item" data-reveal="" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section section--last">
          <div className="section-heading section-heading--split" data-reveal="">
            <div>
              <p className="eyebrow">Relaterte sider</p>
              <h2>Les mer om andre jobber vi gjør.</h2>
            </div>
            <p className="lead">
              Flere egne sider gjør det lettere å finne riktig type jobb, både for deg og
              for Google.
            </p>
          </div>

          <div className="content-link-grid">
            {relatedPages.map((item) => (
              <Link className="content-link-card" data-reveal="" href={`/tjenester/${item.slug}`} key={item.slug}>
                <p className="mini-title">{item.eyebrow}</p>
                <strong>{item.cardTitle}</strong>
                <p>{item.lead}</p>
                <span className="content-link-card__meta">Les mer om {item.title.toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import speakerUpgradeImage from "../../standarhøytaler.png";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { commonJobs, faqItems, services } from "../data";
import { createPageMetadata } from "../seo";
import { featuredServiceLandingPages } from "../service-pages";
import { SiteEffects } from "../site-effects";

export const metadata = createPageMetadata({
  title: "Tjenester for lydinstallasjon i bil",
  description:
    "Tjenester for lydinstallasjon i bil: montering av bilstereo, høyttalere, subwoofer, forsterker, DSP, lyddemping og CarPlay i Akershus og Buskerud.",
  path: "/tjenester",
  keywords: [
    "tjenester lydinstallasjon",
    "subwoofer montering bil",
    "forsterker installasjon bil",
    "CarPlay montering bil",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
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
              <p className="eyebrow">Tjenester</p>
              <h1>Montering og oppgradering av lyd i bil.</h1>
              <p className="lead">
                Vi jobber med lydinstallasjon i bil, fra høyttalere og subwoofer til
                forsterker, DSP, skjerm og CarPlay.
              </p>
            </div>

            <aside className="page-hero__side" data-reveal="">
              <p className="mini-title">Vanlige jobber</p>
              <div className="page-hero__meta">
                {commonJobs.map((job) => (
                  <span key={job}>{job}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--tight">
          <div className="detail-grid">
            <article className="page-hero__media" data-reveal="">
              <Image
                src={speakerUpgradeImage}
                alt="Oppgradering av høyttaler i bil"
                sizes="(max-width: 1100px) 100vw, 58vw"
              />
            </article>

            <article className="detail-card" data-reveal="">
              <p className="mini-title">Hva vi hjelper med</p>
              <h3>Fra enkel høyttalerjobb til større oppgraderinger.</h3>
              <ul className="info-list">
                <li>Bytte av høyttalere og oppgradering av original lyd</li>
                <li>Subwoofer, forsterker og nytt strømopplegg</li>
                <li>Skjerm, CarPlay og tilpasning til dashbord</li>
                <li>Lyddemping, opprydding og justering av eldre anlegg</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section section--spread">
          <div className="service-rail">
            {services.map((service) => (
              <article className="service-row" data-reveal="" key={service.title}>
                <span className="service-row__number">{service.label}</span>
                <div className="service-row__body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <p className="service-row__meta">{service.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading section-heading--split" data-reveal="">
            <div>
              <p className="eyebrow">Fordypning</p>
              <h2>Egne sider for de mest søkte jobbene.</h2>
            </div>
            <p className="lead">
              Disse sidene er laget for deg som vil lese mer om akkurat den typen
              lydjobb du vurderer i bilen.
            </p>
          </div>

          <div className="content-link-grid">
            {featuredServiceLandingPages.map((item) => (
              <Link
                className="content-link-card"
                data-reveal=""
                href={`/tjenester/${item.slug}`}
                key={item.slug}
              >
                <p className="mini-title">{item.eyebrow}</p>
                <strong>{item.cardTitle}</strong>
                <p>{item.summary}</p>
                <span className="content-link-card__meta">Gå til side</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section section--spread section--last">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Vanlige spørsmål</p>
            <h2>Spørsmål vi ofte får.</h2>
          </div>

          <div className="faq-list">
            {faqItems.map((item) => (
              <details className="faq-item" data-reveal="" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

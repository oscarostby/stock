import Image from "next/image";
import subInstallImageOne from "../../monteringavsub1.png";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { steps, trustSignals } from "../data";
import { createPageMetadata } from "../seo";
import { SiteEffects } from "../site-effects";

export const metadata = createPageMetadata({
  title: "Arbeidsmåte for bilstereo og lydinstallasjon",
  description:
    "Instalyd legger vekt på ryddig montering, riktig oppkobling og tydelig dialog når vi jobber med lydinstallasjon i bil og CarPlay.",
  path: "/hvorfor",
  keywords: [
    "ryddig lydinstallasjon",
    "arbeidsmåte bilstereo",
    "montering CarPlay",
  ],
});

export default function WhyPage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main>
        <section className="section">
          <div className="page-hero">
            <div data-reveal="">
              <p className="eyebrow">Arbeidsmåte</p>
              <h1>Ryddig montering og tydelig dialog hele veien.</h1>
              <p className="lead">
                Målet er et oppsett som fungerer i bilen, ser ordentlig ut og ikke gir
                overraskelser underveis.
              </p>
            </div>

            <aside className="page-hero__side" data-reveal="">
              <p className="mini-title">Det viktigste for oss</p>
              <div className="page-hero__meta">
                <span>Ryddig finish</span>
                <span>Riktig oppkobling</span>
                <span>Tydelig dialog</span>
                <span>Løsning som passer bilen</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--tight">
          <div className="detail-grid">
            <article className="page-hero__media" data-reveal="">
              <Image
                src={subInstallImageOne}
                alt="Montering av lydanlegg i bil"
                sizes="(max-width: 1100px) 100vw, 58vw"
              />
            </article>

            <article className="detail-card" data-reveal="">
              <p className="mini-title">Hva dette betyr i praksis</p>
              <h3>Vi prøver å gjøre jobben skikkelig, ikke bare få utstyret på plass.</h3>
              <ul className="info-list">
                <li>Kabling og plassering vurderes før noe bygges inn</li>
                <li>Du får beskjed om hva som er lurt å gjøre først</li>
                <li>Vi sier fra hvis bilen eller delene gir begrensninger</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Hva vi legger vekt på</p>
            <h2>Det du merker når jobben er ferdig.</h2>
          </div>

          <div className="values-grid">
            {trustSignals.map((signal) => (
              <article className="detail-card" data-reveal="" key={signal.title}>
                <p className="mini-title">{signal.title}</p>
                <p>{signal.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--spread section--last">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Prosess</p>
            <h2>Slik jobber vi.</h2>
          </div>

          <div className="timeline">
            {steps.map((step) => (
              <article className="timeline__item" data-reveal="" key={step.number}>
                <span className="service-row__number">{step.number}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

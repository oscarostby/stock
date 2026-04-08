import Link from "next/link";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { faqItems } from "./data";
import { SiteEffects } from "./site-effects";

export default function HomePage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main>
        <section className="section hero">
          <div className="hero__shell">
            <div className="hero__ambient" aria-hidden="true">
              <div className="hero__glow" />
              <div className="hero__wave hero__wave--one" />
              <div className="hero__wave hero__wave--two" />
              <div className="hero__wave hero__wave--three" />
            </div>

            <div className="hero__content" data-reveal="">
              <p className="eyebrow">Instalyd</p>
              <h1>Billyd som er enkel å bruke, hver dag.</h1>
              <p className="lead">
                Vi gjør det ryddig, forståelig og profesjonelt — for både nye og erfarne
                bilentusiaster. Du får tydelige råd, trygg montering og lyd som faktisk
                passer bilen din.
              </p>

              <div className="hero__actions">
                <Link className="button" href="/tjenester">
                  Se tjenester
                </Link>
                <Link className="button button--secondary" href="/kontakt">
                  Kontakt oss
                </Link>
              </div>

              <div className="hero__facts" aria-label="Kort informasjon">
                <div className="hero__fact">650 kr/time</div>
                <div className="hero__fact">Akershus og Buskerud</div>
                <div className="hero__fact">Forklart uten teknisk rot</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Derfor er dette enkelt</p>
            <h2>En proff opplevelse som er lett å forstå</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card" data-reveal="">
              <h3>Tydelig før vi starter</h3>
              <p>Du får enkel forklaring på hva som anbefales, hvorfor og hva det vil koste.</p>
            </article>
            <article className="feature-card" data-reveal="">
              <h3>Rent og ryddig arbeid</h3>
              <p>Kabler, plassering og finish blir gjort med fokus på driftssikkerhet og kvalitet.</p>
            </article>
            <article className="feature-card" data-reveal="">
              <h3>Lett å bruke etterpå</h3>
              <p>Vi viser deg hvordan systemet fungerer, så alle i bilen kan bruke det trygt.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Vanlige spørsmål</p>
            <h2>Det folk ofte lurer på</h2>
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

        <section className="section section--last">
          <article className="cta-panel" data-reveal="">
            <div>
              <p className="eyebrow">Klar for å starte?</p>
              <h2>Send bilmodell og hva du ønsker — så svarer vi tydelig og raskt.</h2>
            </div>
            <div className="cta-panel__actions">
              <Link className="button" href="/kontakt">
                Gå til kontakt
              </Link>
              <Link className="button button--secondary" href="/pris">
                Se prisinfo
              </Link>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}

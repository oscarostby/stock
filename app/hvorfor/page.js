import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { steps, trustSignals } from "../data";
import { SiteEffects } from "../site-effects";

export default function WhyPage() {
  return (
    <>
      <SiteEffects />
      <Header />
      <main>
        <section className="section">
          <div className="page-intro" data-reveal="">
            <div className="page-intro__content">
              <p className="eyebrow">Hvorfor Instalyd</p>
              <h1>Vi bygger oppsett som ser gjennomført ut når bilen er ferdig.</h1>
              <p className="lead">
                Mange kan få lyd ut av et anlegg. Færre gjør jobben slik at bilen fortsatt
                føles ryddig, stille og enkel å leve med etterpå. Det er den delen vi tar
                på alvor.
              </p>
            </div>

            <div className="page-intro__aside">
              <p className="page-intro__label">Det vi vektlegger mest</p>
              <div className="tag-list">
                <span>Finish</span>
                <span>Kabling</span>
                <span>Dialog</span>
                <span>Tuning</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="section-heading section-heading--compact" data-reveal="">
            <p className="eyebrow">Det du merker</p>
            <h2>Hva som gjør at jobben føles mer profesjonell</h2>
          </div>

          <div className="trust-grid">
            {trustSignals.map((signal) => (
              <article className="trust-card" data-reveal="" key={signal.title}>
                <h3>{signal.title}</h3>
                <p>{signal.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--tight">
          <div className="section-heading section-heading--compact" data-reveal="">
            <p className="eyebrow">Prosess</p>
            <h2>Slik holder vi det ryddig fra første melding til ferdig bil</h2>
          </div>

          <div className="steps">
            {steps.map((step) => (
              <article className="step-card" data-reveal="" key={step.number}>
                <span className="step-card__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

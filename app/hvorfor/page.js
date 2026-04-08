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
        <section className="section section--tight">
          <div className="section-heading section-heading--compact" data-reveal="">
            <p className="eyebrow">Hvorfor Instalyd</p>
            <h2>Det skal være lett å stole på hvem som gjør jobben</h2>
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
            <p className="eyebrow">Slik fungerer det</p>
            <h2>Enkelt å forstå. Enkelt å ta kontakt.</h2>
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

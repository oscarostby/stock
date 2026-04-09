import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { commonJobs, pricingFactors, pricingIncludes } from "../data";
import { SiteEffects } from "../site-effects";

export default function PricingPage() {
  return (
    <>
      <SiteEffects />
      <Header />
      <main>
        <section className="section">
          <div className="page-intro" data-reveal="">
            <div className="page-intro__content">
              <p className="eyebrow">Pris</p>
              <h1>Timepris som er tydelig, og vurdering som er ærlig.</h1>
              <p className="lead">
                Vi holder det enkelt: 650 kr per time. Endelig pris avhenger av bilen,
                utstyret og hvor mye som må bygges, trekkes eller justeres for at
                installasjonen skal bli riktig.
              </p>
            </div>

            <div className="page-intro__aside">
              <p className="page-intro__label">Det viktigste</p>
              <div className="tag-list">
                <span>650 kr/time</span>
                <span>Tydelig vurdering</span>
                <span>Ingen butikkpakker</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="pricing-layout">
            <article className="pricing-panel pricing-panel--rate" data-reveal="">
              <p className="card-kicker">Timepris</p>
              <h2>650 kr/time</h2>
              <p>
                Du får beskjed hvis bilen, utstyret eller ønsket løsning gjør jobben mer
                omfattende enn først antatt. Målet er at du skal forstå hvorfor jobben tar
                den tiden den tar.
              </p>
            </article>

            <div className="pricing-layout__stack">
              <article className="pricing-panel" data-reveal="">
                <p className="card-kicker">Hva som påvirker tid</p>
                <h3>Prisen styres mest av dette</h3>
                <ul className="plain-list">
                  {pricingFactors.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="pricing-panel pricing-panel--note" data-reveal="">
                <p className="card-kicker">Inkludert</p>
                <h3>Det du kan forvente fra oss</h3>
                <ul className="plain-list">
                  {pricingIncludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="pricing-panel pricing-panel--wide" data-reveal="">
              <p className="card-kicker">Typiske jobber</p>
              <h3>Oppdrag vi ofte gir pris på</h3>
              <ul className="plain-list">
                {commonJobs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

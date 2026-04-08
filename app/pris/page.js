import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { commonJobs, pricingFactors } from "../data";
import { SiteEffects } from "../site-effects";

export default function PricingPage() {
  return (
    <>
      <SiteEffects />
      <Header />
      <main>
        <section className="section">
          <div className="pricing-layout">
            <article className="pricing-panel pricing-panel--rate" data-reveal="">
              <p className="eyebrow">Pris</p>
              <h2>650 kr/time</h2>
              <p>
                Endelig pris kommer an på bilen, utstyret og hvor stor jobben er.
                Vi gir en ærlig vurdering før vi går i gang.
              </p>
            </article>

            <article className="pricing-panel" data-reveal="">
              <h3>Pris påvirkes av</h3>
              <ul className="plain-list">
                {pricingFactors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="pricing-panel" data-reveal="">
              <h3>Vanlige jobber</h3>
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

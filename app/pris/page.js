import Image from "next/image";
import Link from "next/link";
import afterRadioImage from "../../etterradio.png";
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
          <div className="page-hero">
            <div data-reveal="">
              <p className="eyebrow">Pris</p>
              <h1>Pris vurderes ut fra bil, utstyr og arbeid.</h1>
              <p className="lead">
                Timepris er 650 kr. Endelig pris avhenger av hva som skal monteres og hvor
                krevende bilen er å jobbe i.
              </p>
            </div>

            <aside className="page-hero__side" data-reveal="">
              <p className="mini-title">Kort fortalt</p>
              <div className="page-hero__meta">
                <span>650 kr/time</span>
                <span>Vurderes før start</span>
                <span>Pris etter omfang</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--tight">
          <div className="pricing-grid">
            <article className="pricing-rate" data-reveal="">
              <p className="mini-title">Timepris</p>
              <div className="pricing-rate__value">650 kr/time</div>
              <p>
                Vi sier fra dersom bilen eller oppsettet gjør jobben større enn det som
                først ser ut til å være nødvendig.
              </p>
              <Link className="button button--secondary" href="/kontakt">
                Be om vurdering
              </Link>
            </article>

            <div className="pricing-grid__stack">
              <article className="pricing-card" data-reveal="">
                <p className="mini-title">Dette påvirker prisen</p>
                <ul className="plain-list">
                  {pricingFactors.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="pricing-card" data-reveal="">
                <p className="mini-title">Dette kan du forvente</p>
                <ul className="plain-list">
                  {pricingIncludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--spread section--last">
          <div className="detail-grid">
            <article className="page-hero__media" data-reveal="">
              <Image
                src={afterRadioImage}
                alt="CarPlay-skjerm montert i bil"
                sizes="(max-width: 1100px) 100vw, 58vw"
              />
            </article>

            <article className="detail-card" data-reveal="">
              <p className="mini-title">Vanlige jobber</p>
              <h3>Typiske ting vi får spørsmål om.</h3>
              <ul className="info-list">
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

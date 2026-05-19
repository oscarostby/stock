import Image from "next/image";
import Link from "next/link";
import afterRadioImage from "../assets/images/work/radio-after.png";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { commonJobs, pricingFactors, pricingIncludes } from "../data";
import { createPageMetadata } from "../seo";
import { SiteEffects } from "../site-effects";

export const metadata = createPageMetadata({
  title: "Pris på bilstereo montering og lydinstallasjon",
  description:
    "Se pris og hvordan Instalyd vurderer bilstereo montering, CarPlay, subwoofer, forsterker og lydinstallasjon i bil. Timepris er 650 kr.",
  path: "/pris",
  keywords: [
    "pris lydinstallasjon",
    "pris bilstereo montering",
    "timepris bilstereo",
    "CarPlay montering pris",
    "subwoofer montering pris",
  ],
});

const priceHighlights = [
  { label: "Timepris", value: "650 kr", note: "per time" },
  { label: "Vurdering", value: "Før start", note: "bil, utstyr og omfang" },
  { label: "Utstyr", value: "Dine deler", note: "vi monterer det du har" },
];

const exampleJobs = [
  {
    title: "CarPlay / skjerm",
    description: "Montering, ramme, overgangskabler og enkel funksjonstest.",
    price: "650 kr/time",
    detail: "Omfang avhenger av bilmodell og dashbord.",
  },
  {
    title: "Subwoofer + forsterker",
    description: "Strømkabel, sikring, jordpunkt, signal og plassering i bagasjerom.",
    price: "650 kr/time",
    detail: "Send bilde av utstyr og bagasjerom først.",
  },
  {
    title: "Høyttalere i dører",
    description: "Bytte av originalhøyttalere, adaptere og eventuell demping.",
    price: "650 kr/time",
    detail: "Dørpanel og biltype avgjør tidsbruk.",
  },
  {
    title: "Feilsøking / opprydding",
    description: "Finne feil, rydde kabler, dårlig jord eller eldre halvferdig anlegg.",
    price: "Etter vurdering",
    detail: "Forklar problemet kort når du tar kontakt.",
  },
];

const quoteSteps = [
  {
    number: "01",
    title: "Send bil og jobb",
    text: "Skriv bilmodell, årsmodell, hva du vil montere og hvilke deler du har.",
  },
  {
    number: "02",
    title: "Vi vurderer omfang",
    text: "Du får en ærlig vurdering av hva som må gjøres før jobben starter.",
  },
  {
    number: "03",
    title: "Pris følger jobben",
    text: "Timepris er fast, men totalen avhenger av tid, bil og oppsett.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main className="price-page">
        <section className="price-hero">
          <div className="shop-container price-hero__grid">
            <div className="price-hero__copy" data-reveal="">
              <p className="shop-eyebrow">Pris</p>
              <h1>Enkel timepris. Tydelig vurdering før montering.</h1>
              <p>
                Instalyd tar 650 kr/time for bilstereo, CarPlay, subwoofer, forsterker,
                høyttalere og annen lydinstallasjon i bil. Du får vurdering basert på bil,
                utstyr og omfang før jobben avtales.
              </p>
              <div className="price-hero__actions">
                <Link className="shop-btn shop-btn--red" href="/kontakt">Be om prisvurdering</Link>
                <Link className="shop-btn shop-btn--dark" href="/tjenester">Se tjenester</Link>
              </div>
            </div>

            <aside className="price-rate-card" data-reveal="">
              <span>Timepris</span>
              <strong>650 kr</strong>
              <small>per time</small>
              <p>Endelig totalpris avhenger av bilmodell, demontering, kabling og hvor mye utstyr som skal monteres.</p>
            </aside>
          </div>
        </section>

        <section className="shop-container price-highlights" aria-label="Kort om pris">
          {priceHighlights.map((item) => (
            <article key={item.label} data-reveal="">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </section>

        <section className="shop-container price-section">
          <div className="shop-section-title">
            <p className="shop-eyebrow">Eksempler</p>
            <h2>Vanlige jobber og hvordan pris vurderes.</h2>
            <p>Dette er ikke fastpakker. Det er en ryddig oversikt over typiske jobber og hva som påvirker tiden.</p>
          </div>

          <div className="price-job-grid">
            {exampleJobs.map((job) => (
              <article className="price-job-card" key={job.title} data-reveal="">
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                </div>
                <strong>{job.price}</strong>
                <small>{job.detail}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="price-breakdown">
          <div className="shop-container price-breakdown__grid">
            <article className="price-info-card" data-reveal="">
              <p className="shop-eyebrow">Dette påvirker totalen</p>
              <h2>Hvorfor prisen varierer.</h2>
              <ul>
                {pricingFactors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="price-info-card price-info-card--dark" data-reveal="">
              <p className="shop-eyebrow">Dette får du</p>
              <h2>Hva som er inkludert i vurderingen.</h2>
              <ul>
                {pricingIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="shop-container price-process">
          <div className="shop-section-title shop-section-title--center">
            <p className="shop-eyebrow">Slik får du riktig pris</p>
            <h2>Send riktig info først, så blir vurderingen bedre.</h2>
          </div>

          <div className="price-process__grid">
            {quoteSteps.map((step) => (
              <article key={step.number} data-reveal="">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-container price-final section--last">
          <div className="price-final__image" data-reveal="">
            <Image
              src={afterRadioImage}
              alt="CarPlay og bilstereo montert ryddig i bil"
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>

          <article className="price-final__copy" data-reveal="">
            <p className="shop-eyebrow">Klar for vurdering?</p>
            <h2>Send bilmodell, år og hva du vil montere.</h2>
            <p>
              Ta gjerne med bilder av dashbord, bagasjerom, eksisterende anlegg og delene du har kjøpt.
              Da er det enklere å gi et realistisk svar før du setter av tid.
            </p>
            <ul>
              {commonJobs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link className="shop-btn shop-btn--red" href="/kontakt">Send forespørsel</Link>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}

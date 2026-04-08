import { SiteEffects } from "./site-effects";

const steps = [
  {
    number: "01",
    title: "Du tar kontakt",
    description: "Send hva du vil ha gjort, hvilken bil du har og gjerne hvilke deler du vil bruke.",
  },
  {
    number: "02",
    title: "Vi vurderer jobben",
    description: "Vi sier hva som passer bilen, hva som trengs og hva du kan forvente av pris og tidsbruk.",
  },
  {
    number: "03",
    title: "Vi monterer riktig",
    description: "Vi gjør jobben ryddig, sikkert og riktig koblet, så anlegget fungerer som det skal.",
  },
];

const services = [
  {
    title: "Høyttalere",
    description: "Vi monterer nye høyttalere og oppgraderer fabrikklyd som spiller flatt eller svakt.",
  },
  {
    title: "Sub og bass",
    description: "Vi kobler sub og forsterker så bassen spiller riktig, uten rotete oppsett.",
  },
  {
    title: "Forsterker og DSP",
    description: "Vi monterer forsterker og DSP og stiller inn lyden så systemet blir balansert.",
  },
  {
    title: "Lyddemping",
    description: "Vi demper støy i dører og paneler for bedre lyd og et roligere inntrykk i bilen.",
  },
  {
    title: "Kabling og ohm",
    description: "Vi ordner trygg kabling, riktig kobling og fornuftig oppsett på hele anlegget.",
  },
  {
    title: "Skjerm",
    description: "Vi kan også hjelpe med skjerm og CarPlay, men hovedjobben vår er lydinstallering.",
  },
];

const trustSignals = [
  {
    title: "Kun montering",
    description: "Vi er ikke en butikk. Du kommer med delene, og vi monterer dem på en ryddig måte.",
  },
  {
    title: "Tydelig pris",
    description: "Du ser timeprisen med en gang, og vi forklarer hva som påvirker jobben før vi starter.",
  },
  {
    title: "Ryddig og trygt",
    description: "Vi tenker kabling, ohm og plassering, så anlegget ikke bare spiller bra, men også er satt opp riktig.",
  },
  {
    title: "Direkte kontakt",
    description: "Du når oss på telefon, SMS eller e-post uten å gå gjennom en butikk eller et stort kundesenter.",
  },
];

const pricingFactors = [
  "Hvor lett bilen er å demontere og montere igjen",
  "Hvor mye utstyr som skal inn",
  "Om det trengs ny kabling eller lyddemping",
  "Om anlegget også skal stilles inn etter montering",
];

const commonJobs = [
  "Montering av høyttalere i dører",
  "Sub og forsterker i bagasjerom",
  "DSP og tuning av lyd",
  "Lyddemping og oppgradering av fabrikklyd",
];

const faqItems = [
  {
    question: "Selger dere deler?",
    answer: "Nei. Vi selger ikke deler. Du kommer med det du vil ha montert, og vi gjør selve installasjonen.",
  },
  {
    question: "Får jeg vite pris før jobben starter?",
    answer: "Ja. Vi gir en ærlig vurdering ut fra bil, utstyr og jobbens størrelse før vi setter i gang.",
  },
  {
    question: "Monterer dere bare lyd?",
    answer: "Lyd er hovedfokuset vårt. Vi kan også hjelpe med skjerm og CarPlay når det er ønskelig.",
  },
  {
    question: "Hva bør jeg sende når jeg tar kontakt?",
    answer: "Send navn, bilmodell, hva du vil ha gjort og gjerne hvilke deler du har eller vurderer å bruke.",
  },
];

const mobileNavItems = [
  { href: "#top", label: "Hjem" },
  { href: "#hvorfor", label: "Hvorfor" },
  { href: "#tjenester", label: "Tjenester" },
  { href: "#kontakt", label: "Kontakt" },
];

const contact = {
  phoneDisplay: "902 54 100",
  phoneHref: "+4790254100",
  email: "hjelp@instalyd.no",
};

export default function HomePage() {
  return (
    <>
      <SiteEffects />

      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand__mark" />
          <span className="brand__text">Instalyd</span>
        </a>

        <nav className="topbar__nav" aria-label="Hovednavigasjon">
          <a href="#hvorfor">Hvorfor oss</a>
          <a href="#tjenester">Tjenester</a>
          <a href="#pris">Pris</a>
          <a href="#kontakt">Kontakt</a>
        </nav>

        <a className="button button--ghost" href="#kontakt">
          Kontakt
        </a>
      </header>

      <main id="top">
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
              <h1>Vi monterer billyd.</h1>
              <p className="lead">
                Høyttalere, sub, forsterker, DSP, lyddemping og kabling. Vi kan
                også hjelpe med skjerm. Vi selger ikke deler. Du kommer med det
                du vil ha montert, og vi monterer det riktig. Vi tar oppdrag i
                Akershus og Buskerud.
              </p>

              <div className="hero__actions">
                <a className="button" href="#kontakt">
                  Få et estimat
                </a>
                <a className="button button--secondary" href="#pris">
                  Se timepris
                </a>
              </div>

              <div className="hero__facts" aria-label="Kort informasjon">
                <div className="hero__fact">650 kr/time</div>
                <div className="hero__fact">Akershus og Buskerud</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tight" id="hvorfor">
          <div className="section-heading section-heading--compact" data-reveal="">
            <p className="eyebrow">Hvorfor Instalyd</p>
            <h2>Det skal være lett å stole på hvem som gjør jobben</h2>
            <p>
              Derfor er vi tydelige på hva vi gjør, hva vi ikke gjør og hvordan
              vi jobber.
            </p>
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

        <section className="section" id="tjenester">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Tjenester</p>
            <h2>Dette gjør vi mest</h2>
            <p>
              Mesteparten av jobben vår er lyd. Skjerm kan vi også hjelpe med,
              men hovedfokuset er montering av billyd.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" data-reveal="" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="pris">
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

            <article className="pricing-panel pricing-panel--note" data-reveal="">
              <h3>Det du kan forvente</h3>
              <ul className="plain-list">
                <li>Ryddig og trygg montering</li>
                <li>Tydelig beskjed om hva som passer bilen</li>
                <li>Ingen butikksalg eller unødvendig ekstraarbeid</li>
                <li>Fokus på at lyden skal fungere godt i praksis</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Vanlige spørsmål</p>
            <h2>Det folk ofte lurer på før de tar kontakt</h2>
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

        <section className="section" id="kontakt">
          <div className="contact-layout">
            <div className="contact-copy" data-reveal="">
              <p className="eyebrow">Kontakt</p>
              <h2>Fortell oss hva du vil ha gjort</h2>
              <p>
                Send navn, bil og hva du ønsker hjelp med. Da kan vi svare
                raskere og gi et bedre estimat. Vi tar oppdrag i Akershus og
                Buskerud.
              </p>

              <div className="contact-panel">
                <a className="contact-row" href={`tel:${contact.phoneHref}`}>
                  <span className="contact-row__label">Ring</span>
                  <span className="contact-row__content">
                    <strong>{contact.phoneDisplay}</strong>
                    <span>Direkte kontakt</span>
                  </span>
                </a>

                <a
                  className="contact-row"
                  href={`sms:${contact.phoneHref}?body=Hei!%20Jeg%20vil%20ha%20pris%20p%C3%A5%20billyd.`}
                >
                  <span className="contact-row__label">SMS</span>
                  <span className="contact-row__content">
                    <strong>Send melding</strong>
                    <span>Rask og enkel forespørsel</span>
                  </span>
                </a>

                <a className="contact-row" href={`mailto:${contact.email}`}>
                  <span className="contact-row__label">E-post</span>
                  <span className="contact-row__content">
                    <strong>{contact.email}</strong>
                    <span>For mer detaljerte forespørsler</span>
                  </span>
                </a>
              </div>
            </div>

            <form
              className="contact-form"
              data-contact-form=""
              data-recipient={contact.email}
            >
              <label>
                <span>Navn</span>
                <input type="text" name="name" placeholder="Ditt navn" required />
              </label>

              <label>
                <span>Bil</span>
                <input
                  type="text"
                  name="car"
                  placeholder="For eksempel Golf 7 2018"
                  required
                />
              </label>

              <label>
                <span>Telefon</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="902 54 100"
                  required
                />
              </label>

              <label>
                <span>Hva gjelder det</span>
                <input
                  type="text"
                  name="service"
                  placeholder="Høyttalere, sub, DSP, skjerm ..."
                  required
                />
              </label>

              <label className="contact-form__full">
                <span>Beskrivelse</span>
                <textarea
                  name="details"
                  rows="6"
                  placeholder="Skriv kort hva du vil ha gjort."
                  required
                />
              </label>

              <button className="button" type="submit">
                Send forespørsel
              </button>
              <p className="form-note">
                Skjemaet åpner e-post med ferdig utfylt tekst.
              </p>
            </form>
          </div>
        </section>
      </main>

      <nav className="bottom-nav" aria-label="Mobilnavigasjon">
        {mobileNavItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <footer className="footer">
        <p>Instalyd</p>
        <p>Montering av billyd</p>
        <p>Akershus og Buskerud</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

import Link from "next/link";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { contact } from "../data";
import { createPageMetadata } from "../seo";
import { SiteEffects } from "../site-effects";

const updatedAt = "19. mai 2026";

const summaryCards = [
  {
    label: "Hva lagres",
    value: "Kontaktinfo + bilinfo",
    text: "Vi lagrer det du sender inn for å kunne svare, vurdere jobben og følge opp saken.",
  },
  {
    label: "Hvor brukes det",
    value: "E-post og kontorsystem",
    text: "Forespørsler sendes via EmailJS og lagres i vårt MongoDB-baserte kontorsystem.",
  },
  {
    label: "Cookies",
    value: "Ingen markedsføring",
    text: "Vi bruker ikke egne analyse- eller markedsføringscookies per i dag.",
  },
];

const quickLinks = [
  { href: "#hva-vi-samler", label: "Hva vi samler inn" },
  { href: "#hvorfor", label: "Hvorfor vi bruker det" },
  { href: "#deling", label: "Deling og systemer" },
  { href: "#lagring", label: "Lagringstid" },
  { href: "#rettigheter", label: "Dine rettigheter" },
  { href: "#kontakt-personvern", label: "Kontakt" },
];

const collectedData = [
  "Navn",
  "E-postadresse",
  "Telefonnummer",
  "Bilmodell, årsmodell og annen bilinformasjon du oppgir",
  "Hva du ønsker hjelp med, for eksempel CarPlay, bilstereo, subwoofer eller feilsøking",
  "Meldingsinnhold, bilder/opplysninger du selv velger å sende og informasjon om deler du har kjøpt",
  "Teknisk kilde for henvendelsen, for eksempel at den kom fra nettsiden",
];

const officeData = [
  "Status på forespørselen, for eksempel ny, planlagt eller arkivert",
  "Planlagt tidspunkt og interne bookingnotater dersom du avtaler jobb",
  "Arbeidssammendrag, pris, betalingsmåte og kvitteringsinformasjon dersom jobben gjennomføres",
];

const purposes = [
  "svare på forespørselen din og gi praktisk informasjon",
  "vurdere jobb, pris, deler, bilmodell og mulig gjennomføring",
  "følge opp dialog før, under og etter en eventuell jobb",
  "administrere booking, dokumentasjon, kundeservice og kontorarbeid",
  "oppfylle lovpålagte plikter, for eksempel bokføring dersom det blir et betalt oppdrag",
];

const legalBases = [
  {
    title: "Avtale eller tiltak før avtale",
    text: "Personvernforordningen artikkel 6 nr. 1 bokstav b når du ber oss om pris, vurdering eller utførelse av en jobb.",
  },
  {
    title: "Berettiget interesse",
    text: "Artikkel 6 nr. 1 bokstav f når vi må følge opp henvendelser, dokumentere dialog og drive virksomheten på en ryddig måte.",
  },
  {
    title: "Rettslig plikt",
    text: "Artikkel 6 nr. 1 bokstav c når vi må lagre opplysninger for å oppfylle lovkrav, for eksempel bokføringsreglene.",
  },
];

const processors = [
  {
    title: "EmailJS",
    text: "Brukes for å sende innholdet i kontaktskjemaet til oss på e-post. EmailJS kan behandle data utenfor Norge/EØS og opplyser at de bruker lovlige overføringsmekanismer der det er nødvendig.",
  },
  {
    title: "MongoDB",
    text: "Brukes til å lagre kontakthenvendelser og videre oppfølging i vårt interne kontorsystem.",
  },
  {
    title: "E-postleverandør",
    text: "Opplysningene kan behandles i e-postkontoen vi bruker for å motta og besvare henvendelser.",
  },
  {
    title: "Regnskap/offentlige myndigheter",
    text: "Dersom henvendelsen blir til et oppdrag, kan relevante opplysninger deles med regnskapsfører eller myndigheter når lov krever det.",
  },
];

const retentionRules = [
  "Henvendelser lagres så lenge det er nødvendig for å svare på og følge opp saken.",
  "Henvendelser som ikke fører til videre dialog eller oppdrag slettes eller arkiveres når de ikke lenger er relevante.",
  "Opplysninger knyttet til tilbud, avtale, kvittering, betaling eller annen bokføringspliktig dokumentasjon kan lagres i fem år etter regnskapsårets slutt.",
];

const rights = [
  "be om innsyn i hvilke opplysninger vi har om deg",
  "be om retting av feil eller ufullstendige opplysninger",
  "be om sletting når vi ikke lenger trenger opplysningene",
  "be om begrensning av behandlingen i enkelte tilfeller",
  "protestere mot behandling som bygger på berettiget interesse",
  "be om dataportabilitet når behandlingen bygger på avtale og skjer automatisk",
  "klage til Datatilsynet hvis du mener behandlingen er i strid med regelverket",
];

export const metadata = createPageMetadata({
  title: "Personvern og behandling av personopplysninger",
  description:
    "Les hvordan Instalyd behandler personopplysninger fra kontaktskjema, e-post, telefon og kontorsystem på instalyd.no.",
  path: "/personvern",
  keywords: [
    "personvern",
    "personvernerklæring",
    "kontaktskjema",
    "MongoDB",
    "EmailJS",
    "cookies",
  ],
});

export default function PrivacyPage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main className="privacy-page">
        <section className="section">
          <div className="page-hero privacy-hero">
            <div data-reveal="">
              <p className="eyebrow">Personvern</p>
              <h1>Ryddig behandling av opplysningene dine.</h1>
              <p className="lead">
                Denne siden forklarer hva Instalyd samler inn, hvorfor vi gjør det,
                hvilke systemer som brukes og hvilke rettigheter du har når du kontakter
                oss via instalyd.no, e-post eller telefon.
              </p>
            </div>

            <aside className="page-hero__side privacy-hero__side" data-reveal="">
              <p className="mini-title">Kort fortalt</p>
              <div className="page-hero__meta">
                <span>Sist oppdatert: {updatedAt}</span>
                <span>Behandlingsansvarlig: Instalyd</span>
                <span>Gjelder: nettside, skjema, e-post og telefon</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--tight">
          <div className="privacy-summary">
            {summaryCards.map((item) => (
              <article key={item.label} data-reveal="">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--tight">
          <div className="privacy-intro-grid">
            <article className="detail-card privacy-controller" data-reveal="">
              <p className="mini-title">Behandlingsansvarlig</p>
              <h2>Instalyd har ansvar for opplysningene.</h2>
              <p>
                Instalyd er behandlingsansvarlig for opplysningene som beskrives i
                denne erklæringen. Det betyr at vi bestemmer formålet med behandlingen
                og hvordan opplysningene brukes.
              </p>
              <div className="site-footer__links">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
              </div>
            </article>

            <nav className="privacy-toc" aria-label="Innhold på personvernsiden" data-reveal="">
              <p className="mini-title">På denne siden</p>
              {quickLinks.map((link) => (
                <a href={link.href} key={link.href}>{link.label}</a>
              ))}
            </nav>
          </div>
        </section>

        <section className="section section--spread section--last">
          <div className="policy-stack">
            <article className="detail-card policy-card" id="hva-vi-samler" data-reveal="">
              <p className="mini-title">1. Hvilke opplysninger vi samler inn</p>
              <h2>Når du bruker kontaktskjemaet eller kontakter oss direkte.</h2>
              <p>
                Vi ber bare om informasjon som er relevant for å forstå bilen, ønsket jobb
                og hvordan vi kan kontakte deg tilbake.
              </p>
              <ul className="plain-list">
                {collectedData.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="policy-note">
                Ikke send sensitive personopplysninger, kortinformasjon, passord eller
                annen informasjon som ikke er nødvendig for å vurdere lyd- eller
                monteringsjobben.
              </div>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">2. Oppfølging og kontorsystem</p>
              <h2>Hvis henvendelsen blir fulgt opp videre.</h2>
              <p>
                Når en forespørsel skal følges opp, kan vi legge til praktiske opplysninger
                i vårt interne kontorsystem for å holde orden på booking, arbeid og
                dokumentasjon.
              </p>
              <ul className="plain-list">
                {officeData.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="detail-card policy-card" id="hvorfor" data-reveal="">
              <p className="mini-title">3. Formål</p>
              <h2>Hvorfor vi bruker opplysningene.</h2>
              <ul className="plain-list">
                {purposes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">4. Rettslig grunnlag</p>
              <h2>Grunnlaget for behandlingen.</h2>
              <div className="legal-basis-grid">
                {legalBases.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </section>
                ))}
              </div>
            </article>

            <article className="detail-card policy-card" id="deling" data-reveal="">
              <p className="mini-title">5. Deling og databehandlere</p>
              <h2>Opplysninger deles bare når det er nødvendig.</h2>
              <div className="processor-grid">
                {processors.map((item) => (
                  <section key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </section>
                ))}
              </div>
              <p>
                Vi selger ikke personopplysninger og bruker dem ikke til tredjeparts
                markedsføring.
              </p>
            </article>

            <article className="detail-card policy-card" id="lagring" data-reveal="">
              <p className="mini-title">6. Lagringstid</p>
              <h2>Hvor lenge vi beholder opplysningene.</h2>
              <ul className="plain-list">
                {retentionRules.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">7. Cookies og sporing</p>
              <h2>Ingen egne markedsføringscookies per i dag.</h2>
              <p>
                Instalyd bruker per i dag ikke egne analyse- eller markedsføringscookies.
                Nettsiden kan likevel bruke teknisk nødvendige funksjoner for at siden,
                kontaktskjemaet og sikker drift skal fungere.
              </p>
              <p>
                Hvis vi senere tar i bruk analyse, annonsering eller andre
                sporingsteknologier, oppdaterer vi denne siden med tydelig informasjon.
              </p>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">8. Sikkerhet</p>
              <h2>Vi begrenser tilgang og ber bare om nødvendig info.</h2>
              <p>
                Vi forsøker å beskytte opplysningene ved å begrense tilgang, bruke
                oppdaterte tjenester og bare samle inn informasjon som er nødvendig for
                formålet. Ingen digital løsning er helt risikofri, så unngå å sende
                sensitive opplysninger i skjemaet.
              </p>
            </article>

            <article className="detail-card policy-card" id="rettigheter" data-reveal="">
              <p className="mini-title">9. Dine rettigheter</p>
              <h2>Dette kan du be oss om.</h2>
              <ul className="plain-list">
                {rights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Vil du bruke rettighetene dine, kontakt oss på{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>. Du kan også
                lese mer eller klage til Datatilsynet hvis du mener behandlingen er i
                strid med regelverket.
              </p>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">10. Endringer</p>
              <h2>Når erklæringen oppdateres.</h2>
              <p>
                Vi kan oppdatere denne personvernerklæringen dersom vi endrer nettsiden,
                kontaktskjemaet, kontorsystemet eller måten vi behandler
                personopplysninger på. Nyeste dato står øverst på siden.
              </p>
            </article>

            <article className="privacy-contact-card" id="kontakt-personvern" data-reveal="">
              <div>
                <p className="shop-eyebrow">Spørsmål?</p>
                <h2>Kontakt oss om personvern.</h2>
                <p>
                  Har du spørsmål om personvern eller ønsker å bruke rettighetene dine,
                  kan du sende e-post eller ringe oss.
                </p>
              </div>
              <div className="privacy-contact-card__actions">
                <a className="shop-btn shop-btn--red" href={`mailto:${contact.email}`}>Send e-post</a>
                <a className="shop-btn shop-btn--dark" href={`tel:${contact.phoneHref}`}>Ring oss</a>
                <Link className="shop-btn shop-btn--ghost" href="/kontakt">Til kontakt-siden</Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

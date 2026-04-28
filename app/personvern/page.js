import Link from "next/link";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { contact } from "../data";
import { createPageMetadata } from "../seo";
import { SiteEffects } from "../site-effects";

const updatedAt = "28. april 2026";

const collectedData = [
  "Navn",
  "E-postadresse",
  "Telefonnummer",
  "Bilmodell, årsmodell og annen bilinformasjon du oppgir",
  "Hva du ønsker hjelp med",
  "Beskrivelse av jobben, meldingsinnhold og opplysninger om deler du allerede har kjøpt",
];

const rights = [
  "be om informasjon om hvordan vi behandler opplysningene dine",
  "be om innsyn i hvilke opplysninger vi har om deg",
  "be om retting av feil eller ufullstendige opplysninger",
  "be om sletting når vi ikke lenger trenger opplysningene",
  "be om begrensning av behandlingen i enkelte tilfeller",
  "protestere mot behandling som bygger på berettiget interesse",
  "be om dataportabilitet når behandlingen bygger på avtale og skjer automatisk",
  "klage til Datatilsynet hvis du mener behandlingen er i strid med regelverket",
];

export const metadata = createPageMetadata({
  title: "Personvern",
  description:
    "Les hvordan Instalyd behandler personopplysninger ved bruk av kontaktskjema og e-post på instalyd.no.",
  path: "/personvern",
  keywords: ["personvern", "personvernerklæring", "cookies", "EmailJS"],
});

export default function PrivacyPage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main>
        <section className="section">
          <div className="page-hero">
            <div data-reveal="">
              <p className="eyebrow">Personvern</p>
              <h1>Hvordan vi behandler personopplysninger.</h1>
              <p className="lead">
                Denne erklæringen gjelder for bruk av instalyd.no og når du kontakter
                oss via skjema, e-post eller telefon.
              </p>
            </div>

            <aside className="page-hero__side" data-reveal="">
              <p className="mini-title">Sist oppdatert</p>
              <div className="page-hero__meta">
                <span>{updatedAt}</span>
                <span>instalyd.no</span>
                <span>EmailJS i kontaktskjema</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--tight">
          <div className="values-grid">
            <article className="detail-card" data-reveal="">
              <p className="mini-title">Behandlingsansvarlig</p>
              <p>
                Instalyd er behandlingsansvarlig for personopplysningene som beskrives
                i denne erklæringen.
              </p>
              <div className="site-footer__links">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
              </div>
            </article>

            <article className="detail-card" data-reveal="">
              <p className="mini-title">Viktig å vite</p>
              <p>
                Vi ber bare om opplysninger som er relevante for å svare på
                forespørselen din eller gjennomføre en jobb for deg. Ikke send
                sensitive personopplysninger i skjemaet.
              </p>
            </article>
          </div>
        </section>

        <section className="section section--spread section--last">
          <div className="policy-stack">
            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Hvilke opplysninger vi samler inn</p>
              <h2>Når du bruker kontaktskjemaet eller kontakter oss direkte.</h2>
              <ul className="plain-list">
                {collectedData.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Dersom du sender mer informasjon i fritekstfeltet, behandler vi også
                det du selv velger å skrive inn.
              </p>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Formål</p>
              <h2>Hvorfor vi bruker opplysningene.</h2>
              <ul className="plain-list">
                <li>for å svare på forespørselen din</li>
                <li>for å vurdere jobb, pris og gjennomføring</li>
                <li>for å følge opp dialog før og etter eventuell jobb</li>
                <li>for administrasjon, dokumentasjon og kundeservice</li>
                <li>for regnskap og lovpålagte plikter hvis forespørselen fører til oppdrag</li>
              </ul>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Rettslig grunnlag</p>
              <h2>Grunnlaget for behandlingen.</h2>
              <ul className="plain-list">
                <li>
                  Personvernforordningen artikkel 6 nr. 1 bokstav b når du ber oss om
                  å ta steg før en avtale eller gi deg et tilbud.
                </li>
                <li>
                  Personvernforordningen artikkel 6 nr. 1 bokstav f når vi behandler
                  opplysninger for nødvendig oppfølging, dokumentasjon og forsvarlig
                  drift av virksomheten.
                </li>
                <li>
                  Personvernforordningen artikkel 6 nr. 1 bokstav c når vi må lagre
                  opplysninger for å oppfylle rettslige plikter, for eksempel etter
                  bokføringsreglene.
                </li>
              </ul>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Hvem vi deler opplysninger med</p>
              <h2>Deling skjer bare når det er nødvendig.</h2>
              <ul className="plain-list">
                <li>
                  EmailJS brukes til å sende innholdet i kontaktskjemaet fra nettsiden
                  til oss.
                </li>
                <li>
                  Opplysningene kan også behandles i e-postløsningen vi bruker for å
                  motta og besvare henvendelser.
                </li>
                <li>
                  Dersom en forespørsel blir til et oppdrag, kan relevante opplysninger
                  deles med regnskapsfører eller offentlige myndigheter når lov krever
                  det.
                </li>
              </ul>
              <p>
                EmailJS opplyser i sin personvernerklæring at tjenesten kan behandle
                data i USA og benytte lovlige overføringsmekanismer for slike
                overføringer.
              </p>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Lagringstid</p>
              <h2>Hvor lenge vi beholder opplysningene.</h2>
              <ul className="plain-list">
                <li>
                  Henvendelser lagres så lenge det er nødvendig for å svare på og følge
                  opp saken.
                </li>
                <li>
                  Dersom henvendelsen ikke fører til videre dialog eller oppdrag,
                  sletter vi opplysningene når de ikke lenger er relevante.
                </li>
                <li>
                  Dersom henvendelsen fører til oppdrag, tilbud, faktura eller annen
                  bokføringspliktig dokumentasjon, kan relevante opplysninger lagres i
                  fem år etter regnskapsårets slutt.
                </li>
              </ul>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Dine rettigheter</p>
              <h2>Dette kan du be oss om.</h2>
              <ul className="plain-list">
                {rights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Hvis du vil bruke rettighetene dine, kan du kontakte oss på{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>. Du kan også
                klage til Datatilsynet dersom du mener behandlingen er ulovlig.
              </p>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Cookies</p>
              <h2>Bruk av informasjonskapsler.</h2>
              <p>
                Vi bruker per i dag ikke egne analyse- eller markedsføringscookies på
                instalyd.no. Nettsiden kan likevel bruke teknisk nødvendige funksjoner
                for at siden skal lastes og skjemaet skal fungere.
              </p>
              <p>
                Dersom vi senere tar i bruk andre cookies eller sporingsteknologier,
                oppdaterer vi denne siden.
              </p>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Sikkerhet</p>
              <h2>Hvordan vi prøver å beskytte opplysningene.</h2>
              <p>
                Vi forsøker å begrense tilgang til personopplysninger, bruke oppdaterte
                tjenester og bare be om informasjon som er nødvendig for formålet.
                Ingen løsning er likevel helt risikofri, og du bør derfor ikke sende
                sensitive opplysninger i kontaktskjemaet.
              </p>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Endringer</p>
              <h2>Når erklæringen oppdateres.</h2>
              <p>
                Vi kan oppdatere denne personvernerklæringen dersom vi endrer nettsiden,
                kontaktskjemaet eller måten vi behandler personopplysninger på. Nyeste
                dato står øverst på siden.
              </p>
            </article>

            <article className="detail-card policy-card" data-reveal="">
              <p className="mini-title">Kontakt</p>
              <h2>Spørsmål om personvern.</h2>
              <p>
                Har du spørsmål om personvern eller ønsker å bruke rettighetene dine,
                kan du kontakte oss på <a href={`mailto:${contact.email}`}>{contact.email}</a>{" "}
                eller ringe <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>.
              </p>
              <p>
                Tilbake til <Link href="/kontakt">kontakt-siden</Link>.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

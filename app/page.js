import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Star } from "lucide-react";
import afterRadioImage from "./assets/images/work/radio-after.png";
import doorPanelWiringImage from "./assets/images/work/door-panel-wiring.png";
import panelSoundTreatmentImage from "./assets/images/work/panel-sound-treatment.png";
import speakerUpgradeImage from "./assets/images/work/factory-speaker.png";
import subInstallImage from "./assets/images/work/subwoofer-install-1.png";
import subwooferYellowImage from "./assets/images/work/subwoofer-yellow-install.png";
import wiringModulesImage from "./assets/images/work/wiring-modules.png";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { contact, customerReviews, majorServiceMunicipalities } from "./data";
import { createPageMetadata } from "./seo";

export const metadata = createPageMetadata({
  title: "Bilstereo montering i Akershus og Buskerud",
  description:
    "Instalyd monterer bilstereo, CarPlay, høyttalere, subwoofer, forsterker og lyddemping i Akershus og Buskerud. Send bilmodell og få vurdering.",
  keywords: [
    "bilstereo montering Akershus",
    "bilstereo montering Buskerud",
    "CarPlay montering Akershus",
    "subwoofer montering bil",
    "lydinstallasjon i bil",
  ],
  path: "/",
});

const categoryLinks = [
  { title: "CarPlay", text: "Skjerm og adaptere", image: afterRadioImage },
  { title: "Høyttalere", text: "Dører og frontsystem", image: doorPanelWiringImage },
  { title: "Subwoofer", text: "Basskasse og kabler", image: subwooferYellowImage },
  { title: "Forsterker", text: "Strøm, jord og signal", image: wiringModulesImage },
  { title: "Lyddemping", text: "Dører og paneler", image: panelSoundTreatmentImage },
  { title: "Feilsøking", text: "Rydd opp i gammelt anlegg", image: subInstallImage },
];

const servicePackages = [
  {
    badge: "Populær",
    title: "CarPlay / skjerm",
    text: "Montering av skjerm, ramme, overgangskabler og enkel funksjonstest.",
    price: "Fra 650 kr/time",
    status: "Vurderes etter bilmodell",
    image: afterRadioImage,
  },
  {
    badge: "Mest spurt om",
    title: "Subwoofer + forsterker",
    text: "Strømkabel, sikring, jordpunkt, signal og plassering i bil/bagasjerom.",
    price: "Fra 650 kr/time",
    status: "Send bilde av utstyr",
    image: subwooferYellowImage,
  },
  {
    badge: "God oppgradering",
    title: "Høyttalere i dører",
    text: "Bytte av originalhøyttalere med adaptere, demping og ryddig montering.",
    price: "Fra 650 kr/time",
    status: "Bil og dørpanel avgjør tid",
    image: speakerUpgradeImage,
  },
  {
    badge: "Rydding",
    title: "Sjekk av gammelt anlegg",
    text: "Feilsøking, løse kabler, dårlig jording og anlegg som ikke spiller riktig.",
    price: "Etter avtale",
    status: "Forklar problemet kort",
    image: wiringModulesImage,
  },
];

const helpCards = [
  {
    title: "Montering",
    text: "Du har utstyret, vi monterer det ryddig i bilen og sier fra hvis noe ikke passer.",
  },
  {
    title: "Råd før kjøp",
    text: "Usikker på ramme, adapter, høyttalerstørrelse eller kabelsett? Send bilmodell før du kjøper.",
  },
  {
    title: "Gratis vurdering på melding",
    text: "Send bil, årsmodell, bilder og ønsket jobb. Da får du en mer ærlig vurdering av omfanget.",
  },
];

const trustBand = ["Ryddig kabling", "650 kr/time", "Akershus og Buskerud", "Test før levering"];

export default function HomePage() {
  const featuredReviews = customerReviews.slice(0, 6);

  return (
    <>
      <Header />
      <main className="shop-site">
        <section className="shop-hero">
          <div className="shop-container shop-hero__grid">
            <div className="shop-hero__copy">
              <p className="shop-eyebrow">Bilstereo • CarPlay • Subwoofer • Høyttalere</p>
              <h1>Bilstereo montering i Akershus og Buskerud.</h1>
              <p>
                Instalyd hjelper med montering av bilstereo, CarPlay, høyttalere, subwoofer og forsterker.
                Praktisk, bilspesifikk og uten unødvendig salg.
              </p>
              <div className="shop-hero__buttons">
                <Link href="/kontakt" className="shop-btn shop-btn--red">Send bilmodell</Link>
                <a href={`tel:${contact.phoneHref}`} className="shop-btn shop-btn--dark">Ring {contact.phoneDisplay}</a>
              </div>
            </div>
            <div className="shop-hero__image">
              <Image src={afterRadioImage} alt="Skjerm og bilstereo montert i bil" priority sizes="(max-width: 900px) 100vw, 48vw" />
              <div className="shop-hero__deal">
                <strong>Montering</strong>
                <span>650 kr/time</span>
              </div>
            </div>
          </div>
        </section>

        <section className="shop-benefits" aria-label="Fordeler">
          <div className="shop-container shop-benefits__grid">
            {trustBand.map((item) => (
              <div key={item}><CheckCircle2 className="size-5" /> {item}</div>
            ))}
          </div>
        </section>

        <section className="shop-container shop-categories" aria-label="Kategorier">
          <div className="shop-section-title">
            <h2>Populære monteringer</h2>
            <Link href="/tjenester">Se alle tjenester</Link>
          </div>
          <div className="shop-category-grid">
            {categoryLinks.map((category) => (
              <Link href="/#kontakt" className="shop-category" key={category.title}>
                <span className="shop-category__image"><Image src={category.image} alt="" sizes="9rem" /></span>
                <strong>{category.title}</strong>
                <small>{category.text}</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="shop-offer">
          <div className="shop-container shop-offer__grid">
            <article>
              <Image src={subwooferYellowImage} alt="Subwoofer og forsterker montert i bil" sizes="(max-width: 900px) 100vw, 50vw" />
              <div>
                <span>Pakkejobb</span>
                <h2>Subwoofer, forsterker og kabelsett</h2>
                <p>Vi ser på strøm, jordpunkt og sikring før noe bygges inn.</p>
                <Link href="#kontakt">Be om vurdering</Link>
              </div>
            </article>
            <article>
              <Image src={speakerUpgradeImage} alt="Høyttaleroppgradering i bildør" sizes="(max-width: 900px) 100vw, 50vw" />
              <div>
                <span>Oppgradering</span>
                <h2>Høyttalere og demping i dører</h2>
                <p>Bedre lyd uten at bilen må se ombygd ut.</p>
                <Link href="#kontakt">Send bilmodell</Link>
              </div>
            </article>
          </div>
        </section>

        <section className="shop-container shop-products" aria-label="Monteringspakker">
          <div className="shop-section-title">
            <h2>Vanlige jobber</h2>
            <p>Ikke webshop-priser. Dette er typiske monteringer vi vurderer etter bil og utstyr.</p>
          </div>
          <div className="shop-product-grid">
            {servicePackages.map((item) => (
              <article className="shop-product-card" key={item.title}>
                <span className="shop-badge">{item.badge}</span>
                <Image src={item.image} alt="" sizes="(max-width: 700px) 100vw, 25vw" />
                <div className="shop-product-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <small className="shop-stock">● {item.status}</small>
                  <strong>{item.price}</strong>
                  <Link href="#kontakt">Send forespørsel</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-container shop-help" aria-label="Hvordan vi hjelper">
          <div className="shop-section-title shop-section-title--center">
            <h2>Hvordan kan vi hjelpe deg?</h2>
            <p>Samme logikk som en bilradio-spesialist: først bil og utstyr, så løsning.</p>
          </div>
          <div className="shop-help__grid">
            {helpCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-reviews">
          <div className="shop-container">
            <div className="shop-section-title">
              <h2>Hva kunder spør etter</h2>
              <p>Kort, praktisk og lokalt - slik en bilstereo-side bør føles.</p>
            </div>
            <div className="shop-review-row">
              {featuredReviews.map((review) => (
                <article key={`${review.name}-${review.place}`}>
                  <div className="shop-stars" aria-label={`${review.rating} av 5 stjerner`}>
                    {Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="size-4" fill="currentColor" />)}
                  </div>
                  <p>“{review.text}”</p>
                  <strong>{review.name}, {review.place}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="shop-container shop-local">
          <div>
            <p className="shop-eyebrow">Besøk / kontakt</p>
            <h2>Montering i {contact.area}</h2>
            <p>Dekker blant annet {majorServiceMunicipalities.slice(0, 8).join(", ")}. Send sted og bil, så sier vi fra om jobben kan avtales.</p>
            <div className="shop-local__links">
              <a href={`tel:${contact.phoneHref}`}><Phone className="size-4" /> {contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`}><Mail className="size-4" /> {contact.email}</a>
              <span><Clock className="size-4" /> Avtale etter forespørsel</span>
              <span><MapPin className="size-4" /> {contact.area}</span>
            </div>
          </div>
          <div className="shop-map-card">
            <strong>Dekningsområde</strong>
            <p>Akershus / Buskerud</p>
            <Link href="/omrader">Se områder</Link>
          </div>
        </section>

        <section className="shop-container shop-contact" id="kontakt">
          <div>
            <p className="shop-eyebrow">Kontakt</p>
            <h2>Send forespørsel</h2>
            <p>Legg ved bilmodell, årsmodell, hva du har kjøpt og hva du vil få montert. Bilder av delene gjør vurderingen bedre.</p>
          </div>
          <form className="shop-contact__form" data-contact-form="" data-recipient={contact.email} data-request-source="Forside bilradio-inspirert kontaktskjema">
            <label>Navn<input type="text" name="name" required /></label>
            <label>Bil<input type="text" name="car" placeholder="Eks: Audi A4 2013" required /></label>
            <label>E-post<input type="email" name="email" required /></label>
            <label>Telefon<input type="tel" name="phone" required /></label>
            <label className="full">Hva gjelder det?<input type="text" name="service" placeholder="CarPlay, subwoofer, høyttalere, forsterker..." required /></label>
            <label className="full">Beskrivelse<textarea name="details" rows="6" placeholder="Skriv hva du vil gjøre, hvilke deler du har, og om noe allerede er montert." required /></label>
            <button className="full" type="submit">Send forespørsel</button>
            <p className="form-status full" data-form-status="" hidden />
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

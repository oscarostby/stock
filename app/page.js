import Image from "next/image";
import afterRadioImage from "../etterradio.png";
import beforeRadioImage from "../førradio.png";
import subInstallImageOne from "../monteringavsub1.png";
import subInstallImageTwo from "../monteringavsub2.png";
import speakerUpgradeImage from "../standarhøytaler.png";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { contact, heroStats } from "./data";
import { SiteEffects } from "./site-effects";

const homeServices = [
  {
    title: "Høyttalere og frontsystem",
    description: "Oppgradering av original lyd og montering av nye høyttalere.",
  },
  {
    title: "Subwoofer og forsterker",
    description: "Ryddig oppkobling, strømopplegg og plassering i bilen.",
  },
  {
    title: "CarPlay og skjerm",
    description: "Bytte fra original radio til en løsning som passer bilen bedre.",
  },
];

const projectImages = [
  {
    image: subInstallImageOne,
    alt: "Kundeoppdrag med subwoofer og forsterker",
  },
  {
    image: subInstallImageTwo,
    alt: "Kundeoppdrag med diskret oppsett",
  },
  {
    image: speakerUpgradeImage,
    alt: "Kundeoppdrag med høyttaleroppgradering",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main>
        <section className="section hero">
          <div className="hero__shell">
            <div className="hero__grid">
              <div className="hero__content" data-reveal="">
                <p className="eyebrow">Bilstereo og lydmontering</p>
                <h1>Montering av bilstereo, subwoofer og CarPlay.</h1>
                <p className="lead">
                  Ring, send e-post eller bruk skjemaet under hvis du vil ha pris på et
                  oppsett til bilen din.
                </p>

                <div className="hero__actions">
                  <a className="button" href={`tel:${contact.phoneHref}`}>
                    Ring oss
                  </a>
                  <a className="button button--secondary" href="#bestill">
                    Bestill via skjema
                  </a>
                </div>

                <div className="hero__facts" aria-label="Kort informasjon">
                  {heroStats.map((stat) => (
                    <div className="hero__fact" key={stat.label}>
                      <span className="hero__stat-label">{stat.label}</span>
                      <span className="hero__fact-value">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="hero__aside" data-reveal="">
                <p className="card-kicker">Kort vei inn</p>

                <a className="hero__quicklink" href={`tel:${contact.phoneHref}`}>
                  <span className="hero__quicklink-label">Ring</span>
                  <strong>{contact.phoneDisplay}</strong>
                </a>

                <a className="hero__quicklink" href={`mailto:${contact.email}`}>
                  <span className="hero__quicklink-label">E-post</span>
                  <strong>{contact.email}</strong>
                </a>

                <a className="hero__quicklink" href="#bestill">
                  <span className="hero__quicklink-label">Skjema</span>
                  <strong>Send bestilling</strong>
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="section section--compact">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Vanlige oppdrag</p>
            <h2>Dette monterer vi oftest</h2>
          </div>

          <div className="service-grid service-grid--home">
            {homeServices.map((service) => (
              <article className="service-card" data-reveal="" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Før og etter</p>
            <h2>Fra original radio til CarPlay</h2>
          </div>

          <div className="before-after">
            <article className="image-card" data-reveal="">
              <div className="image-card__frame">
                <Image
                  src={beforeRadioImage}
                  alt="Original radio før oppgradering"
                  className="image-card__image"
                  sizes="(max-width: 860px) 100vw, 50vw"
                />
              </div>
              <div className="image-card__body">
                <p className="card-kicker">Før</p>
                <h3>Original radio</h3>
              </div>
            </article>

            <article className="image-card" data-reveal="">
              <div className="image-card__frame">
                <Image
                  src={afterRadioImage}
                  alt="Ettermontert CarPlay i dashbord"
                  className="image-card__image"
                  sizes="(max-width: 860px) 100vw, 50vw"
                />
              </div>
              <div className="image-card__body">
                <p className="card-kicker">Etter</p>
                <h3>CarPlay montert</h3>
              </div>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Tidligere jobber</p>
            <h2>Bilder fra kundeoppdrag</h2>
          </div>

          <div className="project-grid">
            {projectImages.map((project) => (
              <article className="project-card" data-reveal="" key={project.alt}>
                <div className="project-card__frame">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    className="project-card__image"
                    sizes="(max-width: 860px) 100vw, 33vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--last" id="bestill">
          <div className="booking-shell">
            <div className="booking-copy" data-reveal="">
              <p className="eyebrow">Ta en hyggelig prat</p>
              <h2>Ring, send e-post eller bruk bestillingsskjemaet.</h2>
              <p className="lead">
                Send gjerne bilmodell og hva du ønsker, så blir det lettere å svare raskt.
              </p>

              <div className="contact-panel">
                <a className="contact-row" href={`tel:${contact.phoneHref}`}>
                  <span className="contact-row__label">Ring</span>
                  <span className="contact-row__content">
                    <strong>{contact.phoneDisplay}</strong>
                    <span>Direkte kontakt</span>
                  </span>
                </a>

                <a className="contact-row" href={`mailto:${contact.email}`}>
                  <span className="contact-row__label">E-post</span>
                  <span className="contact-row__content">
                    <strong>{contact.email}</strong>
                    <span>Send beskrivelse og bilder</span>
                  </span>
                </a>

                <a
                  className="contact-row"
                  href={`sms:${contact.phoneHref}?body=Hei!%20Jeg%20vil%20ha%20pris%20p%C3%A5%20bilstereo.`}
                >
                  <span className="contact-row__label">SMS</span>
                  <span className="contact-row__content">
                    <strong>Send melding</strong>
                    <span>Rask forespørsel</span>
                  </span>
                </a>
              </div>
            </div>

            <form
              className="contact-form"
              data-contact-form=""
              data-recipient={contact.email}
              data-reveal=""
            >
              <p className="form-intro">
                Skjemaet åpner e-post med ferdig utfylt tekst.
              </p>

              <label>
                <span>Navn</span>
                <input type="text" name="name" placeholder="Ditt navn" required />
              </label>

              <label>
                <span>Bil</span>
                <input type="text" name="car" placeholder="For eksempel Golf 7 2018" required />
              </label>

              <label>
                <span>Telefon</span>
                <input type="tel" name="phone" placeholder="902 54 100" required />
              </label>

              <label>
                <span>Hva gjelder det</span>
                <input type="text" name="service" placeholder="Sub, høyttalere, CarPlay ..." required />
              </label>

              <label className="contact-form__full">
                <span>Beskrivelse</span>
                <textarea
                  name="details"
                  rows="5"
                  placeholder="Skriv kort hva du vil ha gjort."
                  required
                />
              </label>

              <button className="button" type="submit">
                Send forespørsel
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

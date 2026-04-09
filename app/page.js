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

const signalTags = ["Frontstage", "Bass", "DSP", "OEM", "CarPlay", "Lyddemping"];

const workshopRows = [
  {
    label: "Montering",
    value: "Høyttalere, subwoofer og forsterker",
  },
  {
    label: "Integrasjon",
    value: "OEM-radio, skjerm og CarPlay",
  },
  {
    label: "Oppsett",
    value: "Strøm, demping, kabling og tuning",
  },
];

const homeServices = [
  {
    label: "Frontstage",
    title: "Høyttalere og demping",
    description: "Oppgradering av frontlyd med bedre kontroll og mindre resonans.",
  },
  {
    label: "Bass",
    title: "Subwoofer og strøm",
    description: "Sub, forsterker og strømopplegg montert ryddig og riktig.",
  },
  {
    label: "DSP",
    title: "Prosessering og tuning",
    description: "Når oppsettet krever det, justeres nivåer, deling og balanse.",
  },
  {
    label: "OEM",
    title: "Skjerm og CarPlay",
    description: "Bytte fra originalradio til en løsning som fungerer bedre i bilen.",
  },
];

const projectImages = [
  {
    image: subInstallImageTwo,
    alt: "Kundeoppdrag med subwooferinstallasjon",
  },
  {
    image: subInstallImageOne,
    alt: "Kundeoppdrag med forsterker og subwoofer",
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
                <p className="eyebrow">Bilstereoverksted</p>
                <h1>Frontstage, bass, DSP og CarPlay.</h1>
                <p className="lead">
                  Instalyd monterer lydutstyr og integrasjon for biler som trenger mer enn
                  fabrikklyd.
                </p>

                <div className="hero__actions">
                  <a className="button" href={`tel:${contact.phoneHref}`}>
                    Ring verkstedet
                  </a>
                  <a className="button button--secondary" href="#bestill">
                    Send bestilling
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

              <aside className="hero__rack" data-reveal="">
                <p className="card-kicker">Verkstedet bygger mest</p>

                <div className="hero__rack-list">
                  {workshopRows.map((row) => (
                    <div className="hero__rack-row" key={row.label}>
                      <span>{row.label}</span>
                      <strong>{row.value}</strong>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="signal-strip" data-reveal="">
              {signalTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--compact">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Hva vi bygger</p>
            <h2>Montering med tydelig audio-fokus</h2>
          </div>

          <div className="audio-grid">
            {homeServices.map((service) => (
              <article className="audio-card" data-reveal="" key={service.title}>
                <p className="card-kicker">{service.label}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Skjerm og integrasjon</p>
            <h2>Fra originalradio til CarPlay</h2>
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
            <p className="eyebrow">Fra verkstedet</p>
            <h2>Kundeoppdrag</h2>
          </div>

          <div className="project-grid project-grid--audio">
            {projectImages.map((project) => (
              <article className="project-card" data-reveal="" key={project.alt}>
                <div className="project-card__frame">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    className="project-card__image"
                    sizes="(max-width: 860px) 100vw, 50vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--last" id="bestill">
          <div className="booking-shell booking-shell--audio">
            <div className="booking-copy" data-reveal="">
              <p className="eyebrow">Kontakt verkstedet</p>
              <h2>Ring, send e-post eller bestill vurdering.</h2>
              <p className="lead">
                Send bilmodell og hva du vil bygge, så blir det enklere å gi en konkret
                vurdering.
              </p>

              <div className="contact-panel">
                <a className="contact-row" href={`tel:${contact.phoneHref}`}>
                  <span className="contact-row__label">Ring</span>
                  <span className="contact-row__content">
                    <strong>{contact.phoneDisplay}</strong>
                    <span>Direkte kontakt med verkstedet</span>
                  </span>
                </a>

                <a className="contact-row" href={`mailto:${contact.email}`}>
                  <span className="contact-row__label">E-post</span>
                  <span className="contact-row__content">
                    <strong>{contact.email}</strong>
                    <span>Send beskrivelse og bilder av bilen</span>
                  </span>
                </a>

                <a
                  className="contact-row"
                  href={`sms:${contact.phoneHref}?body=Hei!%20Jeg%20vil%20ha%20pris%20p%C3%A5%20bilstereo.`}
                >
                  <span className="contact-row__label">SMS</span>
                  <span className="contact-row__content">
                    <strong>Send melding</strong>
                    <span>Rask forespørsel om pris eller oppsett</span>
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
              <p className="form-intro">Bestill vurdering via skjema.</p>

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
                <input
                  type="text"
                  name="service"
                  placeholder="Frontstage, sub, DSP, CarPlay ..."
                  required
                />
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

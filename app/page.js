import Image from "next/image";
import Link from "next/link";
import afterRadioImage from "../etterradio.png";
import beforeRadioImage from "../førradio.png";
import subInstallImageOne from "../monteringavsub1.png";
import subInstallImageTwo from "../monteringavsub2.png";
import speakerUpgradeImage from "../standarhøytaler.png";
import { CinematicStage } from "./components/cinematic-stage";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import {
  commonJobs,
  contact,
  contactChecklist,
  heroStats,
  services,
  trustSignals,
} from "./data";
import { SiteEffects } from "./site-effects";

const featuredServices = services.slice(0, 4);

const projectImages = [
  {
    image: speakerUpgradeImage,
    alt: "Oppgradering av høyttaler i dør",
    className: "project-wall__item project-wall__item--main",
  },
  {
    image: subInstallImageOne,
    alt: "Subwoofer og forsterker montert i bil",
    className: "project-wall__item project-wall__item--tall",
  },
  {
    image: subInstallImageTwo,
    alt: "Skjult montering av subwoofer i bagasjerom",
    className: "project-wall__item project-wall__item--wide",
  },
];

const contactLinks = [
  {
    label: "Ring",
    title: contact.phoneDisplay,
    description: "Direkte kontakt",
    href: `tel:${contact.phoneHref}`,
  },
  {
    label: "E-post",
    title: contact.email,
    description: "Send bil og bilder",
    href: `mailto:${contact.email}`,
  },
  {
    label: "SMS",
    title: "Send melding",
    description: "Kort forespørsel",
    href: `sms:${contact.phoneHref}?body=Hei!%20Jeg%20vil%20ha%20pris%20p%C3%A5%20montering.`,
  },
];

export default function HomePage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main>
        <section className="section hero">
          <CinematicStage />

          <div className="hero__intro">
            <div data-reveal="">
              <p className="eyebrow">Bilstereo og CarPlay</p>
              <h1>Montering som ser ryddig ut og fungerer i bilen.</h1>
            </div>

            <div className="hero__summary" data-reveal="">
              <p className="lead">
                Vi monterer høyttalere, subwoofer, forsterker, DSP og skjermløsninger
                for biler i {contact.area}.
              </p>

              <div className="hero__actions">
                <a className="button" href={`tel:${contact.phoneHref}`}>
                  Ring oss
                </a>
                <Link className="button button--secondary" href="/tjenester">
                  Se tjenester
                </Link>
              </div>
            </div>
          </div>

          <div className="hero__layout hero__layout--no-shot">
            <div className="hero__aside">
              <div className="hero__stats" data-reveal="">
                {heroStats.map((stat) => (
                  <div className="stat-card" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>

              <div className="hero__service-list" data-reveal="">
                {featuredServices.map((service) => (
                  <article className="hero__service-item" key={service.title}>
                    <span className="mini-title">{service.label}</span>
                    <strong>{service.title}</strong>
                    <p>{service.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="detail-card hero__detail" data-reveal="">
              <p className="mini-title">Kort fortalt</p>
              <h3>Vanlige jobber, tydelig kontakt og vurdering før vi setter i gang.</h3>
              <ul className="plain-list">
                <li>Høyttalere, subwoofer, forsterker og DSP</li>
                <li>Bytte fra originalradio til skjerm og CarPlay</li>
                <li>Ryddig montering tilpasset bilen du har</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading section-heading--split" data-reveal="">
            <div>
              <p className="eyebrow">Før og etter</p>
              <h2>Fra originalradio til skjerm og CarPlay.</h2>
            </div>
            <p className="lead">
              En del biler trenger tilpasning for at ny skjerm skal se riktig ut og
              fungere med bilen. Det vurderer vi før jobben starter.
            </p>
          </div>

          <div className="story-grid">
            <article className="story-shot" data-reveal="">
              <Image
                src={beforeRadioImage}
                alt="Original radio før oppgradering"
                sizes="(max-width: 1100px) 100vw, 33vw"
              />
              <div className="story-shot__caption">
                <span className="story-shot__tag">Før</span>
                <strong>Original radio</strong>
              </div>
            </article>

            <article className="story-shot" data-reveal="">
              <Image
                src={afterRadioImage}
                alt="CarPlay montert etter oppgradering"
                sizes="(max-width: 1100px) 100vw, 33vw"
              />
              <div className="story-shot__caption">
                <span className="story-shot__tag">Etter</span>
                <strong>Skjerm med CarPlay</strong>
              </div>
            </article>

            <article className="detail-card" data-reveal="">
              <p className="mini-title">Hva som vanligvis inngår</p>
              <h3>Tilpasning til bilen, skjerm, ramme og oppkobling.</h3>
              <ul className="plain-list">
                <li>Vurdering av hva som passer bilen før bestilling</li>
                <li>Montering som ser riktig ut i dashbordet</li>
                <li>Oppsett som fungerer i daglig bruk</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section section--spread">
          <div className="service-section">
            <div>
              <div className="section-heading" data-reveal="">
                <p className="eyebrow">Tjenester</p>
                <h2>Vanlige jobber vi gjør.</h2>
              </div>

              <div className="service-rail">
                {services.map((service) => (
                  <article className="service-row" data-reveal="" key={service.title}>
                    <span className="service-row__number">{service.label}</span>
                    <div className="service-row__body">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <p className="service-row__meta">{service.meta}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="service-panel" data-reveal="">
              <div className="service-panel__block">
                <p className="mini-title">Typiske jobber</p>
                <ul className="plain-list">
                  {commonJobs.map((job) => (
                    <li key={job}>{job}</li>
                  ))}
                </ul>
              </div>

              <div className="service-panel__block">
                <p className="mini-title">Det vi legger vekt på</p>
                <ul className="plain-list">
                  {trustSignals.map((signal) => (
                    <li key={signal.title}>{signal.title}</li>
                  ))}
                </ul>
              </div>

              <Link className="button button--secondary" href="/pris">
                Se pris og vurdering
              </Link>
            </aside>
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Kundeoppdrag</p>
            <h2>Noen jobber vi har gjort.</h2>
          </div>

          <div className="project-wall">
            <article className={projectImages[0].className} data-reveal="">
              <Image
                src={projectImages[0].image}
                alt={projectImages[0].alt}
                sizes="(max-width: 1100px) 100vw, 55vw"
              />
            </article>

            <div className="project-wall__column">
              {projectImages.slice(1).map((project) => (
                <article className={project.className} data-reveal="" key={project.alt}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    sizes="(max-width: 1100px) 100vw, 45vw"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--last" id="kontakt">
          <div className="contact-stage">
            <div className="contact-stage__copy" data-reveal="">
              <div>
                <p className="eyebrow">Prat eller bestilling</p>
                <h2>Ring, send e-post eller bruk skjemaet.</h2>
              </div>

              <p className="lead">
                Send gjerne bilmodell, hva du vil gjøre og hvilke deler du allerede har.
              </p>

              <div className="contact-links">
                {contactLinks.map((item) => (
                  <a className="contact-link" href={item.href} key={item.label}>
                    <span className="contact-link__label">{item.label}</span>
                    <span>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </span>
                  </a>
                ))}
              </div>

              <article className="contact-note">
                <p className="mini-title">Fint om du sender</p>
                <ul className="plain-list">
                  {contactChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <form className="contact-form" data-contact-form="" data-recipient={contact.email} data-reveal="">
              <p className="form-intro">Skjemaet åpner e-post med ferdig utfylt tekst.</p>

              <div className="contact-form__grid">
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
                    placeholder="Høyttalere, subwoofer, CarPlay ..."
                    required
                  />
                </label>

                <label className="contact-form__full">
                  <span>Beskrivelse</span>
                  <textarea
                    name="details"
                    rows="6"
                    placeholder="Skriv kort hva du vil ha gjort, og gjerne hva du allerede har av utstyr."
                    required
                  />
                </label>
              </div>

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

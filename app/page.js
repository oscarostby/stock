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
  contact,
  heroStats,
  services,
} from "./data";
import { createPageMetadata } from "./seo";
import { featuredServiceLandingPages } from "./service-pages";
import { SiteEffects } from "./site-effects";

const featuredServices = services.slice(0, 4);

export const metadata = createPageMetadata({
  title: "Lydinstallasjon, bilstereo og CarPlay i Akershus og Buskerud",
  description:
    "Instalyd hjelper deg med lydinstallasjon i bil, montering av bilstereo, høyttalere, subwoofer, forsterker, DSP og CarPlay i Akershus og Buskerud.",
  path: "/",
  keywords: [
    "montering av lyd i bil",
    "oppgradering av bilstereo",
    "bilstereo installasjon",
  ],
});

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

          <div className="hero__intro hero__intro--compact">
            <div data-reveal="">
              <p className="eyebrow">Lydinstallasjon, bilstereo og CarPlay</p>
              <h1>Lydinstallasjon i bil med ryddig montering.</h1>
            </div>

            <div className="hero__summary" data-reveal="">
              <p className="lead">
                Vi hjelper kunder i {contact.area} med montering av bilstereo, CarPlay,
                høyttalere, subwoofer, forsterker og DSP.
              </p>
              <p>
                Trenger du installasjon av lyd i bil eller vil rydde opp i et eldre
                anlegg, bygger vi en løsning som passer bilen og utstyret ditt.
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

          <div className="hero__stats hero__stats--home" data-reveal="">
            {heroStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Tjenester</p>
            <h2>Vanlige jobber.</h2>
          </div>

          <div className="service-strip">
            {featuredServices.map((service) => (
              <article className="service-tile" data-reveal="" key={service.title}>
                <span className="service-row__number">{service.label}</span>
                <h3>{service.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading section-heading--split" data-reveal="">
            <div>
              <p className="eyebrow">Det folk søker etter</p>
              <h2>Egne sider for de vanligste jobbene.</h2>
            </div>
            <p className="lead">
              Hvis du leter etter lydinstallasjon i bil, montering av bilstereo,
              CarPlay eller subwoofer, har vi egne sider som forklarer hva jobben
              innebærer.
            </p>
          </div>

          <div className="content-link-grid">
            {featuredServiceLandingPages.map((item) => (
              <Link
                className="content-link-card"
                data-reveal=""
                href={`/tjenester/${item.slug}`}
                key={item.slug}
              >
                <p className="mini-title">{item.eyebrow}</p>
                <strong>{item.cardTitle}</strong>
                <p>{item.lead}</p>
                <span className="content-link-card__meta">Les mer</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section section--spread">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Før og etter</p>
            <h2>Fra originalradio til CarPlay.</h2>
          </div>

          <div className="story-grid story-grid--duo">
            <article className="story-shot" data-reveal="">
              <Image
                src={beforeRadioImage}
                alt="Original radio før oppgradering"
                sizes="(max-width: 1100px) 100vw, 50vw"
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
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <div className="story-shot__caption">
                <span className="story-shot__tag">Etter</span>
                <strong>CarPlay montert</strong>
              </div>
            </article>
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
            </div>

            <form className="contact-form" data-contact-form="" data-recipient={contact.email} data-reveal="">
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
              <p className="form-status" data-form-status="" hidden />
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

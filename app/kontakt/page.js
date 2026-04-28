import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { contact, contactChecklist } from "../data";
import { createPageMetadata } from "../seo";
import { SiteEffects } from "../site-effects";

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

export const metadata = createPageMetadata({
  title: "Kontakt oss for lydinstallasjon i bil",
  description:
    "Ta kontakt med Instalyd for pris på lydinstallasjon i bil, bilstereo, subwoofer, forsterker eller CarPlay i Akershus og Buskerud.",
  path: "/kontakt",
  keywords: [
    "kontakt lydinstallasjon",
    "bestille bilstereo montering",
    "kontakt CarPlay montering",
  ],
});

export default function ContactPage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main>
        <section className="section">
          <div className="page-hero">
            <div data-reveal="">
              <p className="eyebrow">Kontakt</p>
              <h1>Send bil og hva du vil ha gjort, så ser vi på det.</h1>
              <p className="lead">
                Ring hvis du vil ta en rask prat, eller bruk skjemaet hvis du vil sende en
                mer komplett forespørsel.
              </p>
            </div>

            <aside className="page-hero__side" data-reveal="">
              <p className="mini-title">Raskest måte å ta kontakt på</p>
              <div className="page-hero__meta">
                <span>Ring</span>
                <span>E-post</span>
                <span>SMS</span>
                <span>Skjema</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--tight section--last">
          <div className="contact-stage">
            <div className="contact-stage__copy" data-reveal="">
              <div>
                <p className="eyebrow">Direkte kontakt</p>
                <h2>Velg det som passer best for deg.</h2>
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

              <article className="contact-note">
                <p className="mini-title">Nyttig å sende med</p>
                <ul className="plain-list">
                  {contactChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
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
                  <span>E-post</span>
                  <input type="email" name="email" placeholder="navn@epost.no" required />
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

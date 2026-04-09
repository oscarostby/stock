import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { contact, contactChecklist } from "../data";
import { SiteEffects } from "../site-effects";

export default function ContactPage() {
  return (
    <>
      <SiteEffects />
      <Header />
      <main>
        <section className="section">
          <div className="contact-layout">
            <div className="contact-copy" data-reveal="">
              <p className="eyebrow">Kontakt</p>
              <h1>Send bil, utstyr og hva du vil oppnå, så svarer vi konkret.</h1>
              <p className="lead">
                Jo mer presist du beskriver prosjektet, desto lettere er det å si hva som
                er smart å gjøre først, hva som kan vente og hvor omfattende jobben blir.
              </p>

              <div className="contact-panel">
                <a className="contact-row" href={`tel:${contact.phoneHref}`}>
                  <span className="contact-row__label">Ring</span>
                  <span className="contact-row__content">
                    <strong>{contact.phoneDisplay}</strong>
                    <span>Direkte kontakt om prosjektet</span>
                  </span>
                </a>

                <a
                  className="contact-row"
                  href={`sms:${contact.phoneHref}?body=Hei!%20Jeg%20vil%20ha%20pris%20p%C3%A5%20bilstereo.`}
                >
                  <span className="contact-row__label">SMS</span>
                  <span className="contact-row__content">
                    <strong>Send melding</strong>
                    <span>Rask forespørsel med bil og ønsket jobb</span>
                  </span>
                </a>

                <a className="contact-row" href={`mailto:${contact.email}`}>
                  <span className="contact-row__label">E-post</span>
                  <span className="contact-row__content">
                    <strong>{contact.email}</strong>
                    <span>For mer detaljerte beskrivelser og bilder</span>
                  </span>
                </a>
              </div>

              <article className="contact-note">
                <p className="card-kicker">For raskere svar</p>
                <h3>Det er nyttig om du sender</h3>
                <ul className="plain-list">
                  {contactChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <form
              className="contact-form"
              data-contact-form=""
              data-recipient={contact.email}
              data-reveal=""
            >
              <p className="form-intro">
                Skjemaet åpner e-post med ferdig utfylt tekst, så du kan sende forespørselen
                direkte videre.
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
                <input type="text" name="service" placeholder="Frontsystem, sub, DSP, lyddemping ..." required />
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

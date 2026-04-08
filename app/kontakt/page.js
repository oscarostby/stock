import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { contact } from "../data";
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
              <h2>Fortell oss hva du vil ha gjort</h2>

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

            <form className="contact-form" data-contact-form="" data-recipient={contact.email}>
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
                <input type="text" name="service" placeholder="Høyttalere, sub, DSP, skjerm ..." required />
              </label>

              <label className="contact-form__full">
                <span>Beskrivelse</span>
                <textarea name="details" rows="6" placeholder="Skriv kort hva du vil ha gjort." required />
              </label>

              <button className="button" type="submit">
                Send forespørsel
              </button>
              <p className="form-note">Skjemaet åpner e-post med ferdig utfylt tekst.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

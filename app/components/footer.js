import Link from "next/link";
import { contact } from "../data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wave" aria-hidden="true" />

      <div className="footer__content">
        <div className="footer__brand">
          <p className="footer__title">Instalyd</p>
          <p>Montering av billyd i Akershus og Buskerud</p>
          <p>&copy; {new Date().getFullYear()} Instalyd</p>
        </div>

        <div className="footer__actions" aria-label="Kontaktknapper">
          <a className="footer__button" href={`tel:${contact.phoneHref}`}>
            Ring oss
          </a>
          <a className="footer__button" href={`sms:${contact.phoneHref}`}>
            Send SMS
          </a>
          <a className="footer__button" href={`mailto:${contact.email}`}>
            Send e-post
          </a>
          <Link className="footer__button footer__button--ghost" href="/kontakt">
            Kontaktskjema
          </Link>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { contact, navItems } from "../data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__wrap">
        <div className="site-footer__lead">
          <div>
            <p className="eyebrow">Kontakt</p>
            <h2>Trenger du hjelp med lyd i bilen?</h2>
          </div>

          <div className="site-footer__actions">
            <a className="button" href={`tel:${contact.phoneHref}`}>
              Ring oss
            </a>
            <Link className="button button--secondary" href="/kontakt">
              Send forespørsel
            </Link>
          </div>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__block">
            <p className="site-footer__title">Instalyd</p>
            <p>
              {contact.tagline} i {contact.area}.
            </p>
          </div>

          <div className="site-footer__block">
            <p className="mini-title">Sider</p>
            <nav className="site-footer__nav" aria-label="Sidelinker">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-footer__block">
            <p className="mini-title">Direkte kontakt</p>
            <div className="site-footer__links">
              <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <p>{contact.area}</p>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>&copy; {new Date().getFullYear()} Instalyd</p>
        </div>
      </div>
    </footer>
  );
}

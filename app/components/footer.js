import Link from "next/link";
import { contact, navItems } from "../data";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <p className="footer__title">Instalyd</p>
          <p>Montering av bilstereo og CarPlay i Akershus og Buskerud.</p>
        </div>

        <div className="footer__column">
          <p className="footer__label">Sider</p>
          <nav className="footer__nav" aria-label="Sidelinker">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer__column">
          <p className="footer__label">Kontakt</p>
          <div className="footer__links">
            <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <Link href="/kontakt">Bestillingsskjema</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Instalyd</p>
      </div>
    </footer>
  );
}

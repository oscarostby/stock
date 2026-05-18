import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { contact, navItems } from "../data";
import { featuredServiceLandingPages } from "../service-pages";

const footerTrust = ["Eksperthjelp", "Tydelig pris", "Ryddig montering", "Testet før levering"];

export function Footer() {
  return (
    <>
      <section className="shop-footer-trust" aria-label="Trygghet">
        <div className="shop-container shop-footer-trust__grid">
          {footerTrust.map((item) => <div key={item}>{item}</div>)}
        </div>
      </section>
      <footer className="shop-footer">
        <div className="shop-container shop-footer__grid">
          <div>
            <h2>Instalyd</h2>
            <p>
              Montering av bilstereo, høyttalere, subwoofer, forsterker, CarPlay/skjerm og lyddemping i {contact.area}.
            </p>
            <div className="shop-footer__contact">
              <a href={`tel:${contact.phoneHref}`}><Phone className="size-4" /> {contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`}><Mail className="size-4" /> {contact.email}</a>
            </div>
          </div>

          <div>
            <strong>Sider</strong>
            <nav>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <Link href="/omrader">Områder</Link>
              <Link href="/personvern">Personvern</Link>
            </nav>
          </div>

          <div>
            <strong>Tjenester</strong>
            <nav>
              {featuredServiceLandingPages.slice(0, 5).map((item) => (
                <Link key={item.slug} href={`/tjenester/${item.slug}`}>{item.cardTitle}</Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="shop-container shop-footer__bottom">© 2026 Instalyd. Bilstereo-montering i Akershus og Buskerud.</div>
      </footer>
    </>
  );
}

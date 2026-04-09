"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, navItems } from "../data";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  return (
    <>
      <header className={`site-header ${isOpen ? "is-menu-open" : ""}`}>
        <div className="utilitybar">
          <div className="utilitybar__inner">
            <div className="utilitybar__meta">
              <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{contact.area}</span>
            </div>
          </div>
        </div>

        <div className="site-header__inner">
          <Link className="brand" href="/">
            <span className="brand__name">Instalyd</span>
            <span className="brand__meta">{contact.tagline}</span>
          </Link>

          <div className="site-header__group">
            <nav className="site-nav" aria-label="Hovednavigasjon">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? "is-active" : ""}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link className="button button--secondary button--nav" href="/kontakt">
              Be om pris
            </Link>

            <button
              type="button"
              className={`menu-toggle ${isOpen ? "is-open" : ""}`}
              aria-label={isOpen ? "Lukk meny" : "Åpne meny"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <nav
        id="mobile-menu"
        className={`mobile-menu ${isOpen ? "is-open" : ""}`}
        aria-label="Mobilmeny"
      >
        <div className="mobile-menu__content">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}

          <Link className="button mobile-menu__button" href="/kontakt">
            Be om pris
          </Link>
        </div>
      </nav>
    </>
  );
}

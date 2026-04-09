"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "../data";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand__text">Instalyd</span>
      </Link>

      <div className="topbar__group">
        <nav className="topbar__nav" aria-label="Hovednavigasjon">
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

        <Link className="button button--nav" href="/kontakt">
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

      <nav
        id="mobile-menu"
        className={`mobile-menu ${isOpen ? "is-open" : ""}`}
        aria-label="Mobilmeny"
      >
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
      </nav>
    </header>
  );
}

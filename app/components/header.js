"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "../data";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="topbar">
      <Link className="brand" href="/" onClick={() => setIsOpen(false)}>
        <span className="brand__mark" />
        <span className="brand__text">Instalyd</span>
      </Link>

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

      <button
        type="button"
        className="menu-toggle"
        aria-label="Åpne meny"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        ☰
      </button>

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
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

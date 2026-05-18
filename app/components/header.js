"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contact, navItems } from "../data";
import { BrandMark } from "./brand-mark";

const categoryItems = [
  { href: "/", label: "Hjem" },
  { href: "/tjenester", label: "Bilstereo" },
  { href: "/tjenester/carplay-montering", label: "CarPlay" },
  { href: "/tjenester/montering-av-bilstereo", label: "Høyttalere" },
  { href: "/tjenester/lydinstallasjon-i-bil", label: "Subwoofer" },
  { href: "/subwoofer-kalkulator", label: "3D-kalkulator" },
  { href: "/pris", label: "Pris" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="shop-header-wrap">
      <div className="shop-topbar">
        <div className="shop-container shop-topbar__inner">
          <span>Montering av bilstereo i {contact.area}</span>
          <div className="shop-topbar__links">
            <Link href="/pris">Timepris 650 kr</Link>
            <Link href="/kontakt">Kontakt oss</Link>
            <a href={`tel:${contact.phoneHref}`}>Ring oss: {contact.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <div className="shop-header">
        <div className="shop-container shop-header__main">
          <Link className="shop-header__brand" href="/" aria-label="Instalyd forside">
            <BrandMark className="brand-mark--header" priority />
          </Link>

          <div className="shop-header__search" aria-hidden="true">
            <Search className="ml-3 size-5" />
            <span>Mål subwoofer og bagasjerom</span>
            <Link href="/subwoofer-kalkulator">3D-kalkulator</Link>
          </div>

          <div className="shop-header__actions">
            <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
            <Link className="shop-header__cta" href="/#kontakt">Send forespørsel</Link>
          </div>

          <button className="shop-header__menu" type="button" aria-label={open ? "Lukk meny" : "Åpne meny"} onClick={() => setOpen((value) => !value)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <nav className="shop-nav" aria-label="Kategorier">
          <div className="shop-container shop-nav__inner">
            {categoryItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {open ? (
          <div className="shop-mobile-menu">
            {[...categoryItems, ...navItems.filter((item) => !categoryItems.some((category) => category.href === item.href))].map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
            <a href={`tel:${contact.phoneHref}`}>Ring {contact.phoneDisplay}</a>
          </div>
        ) : null}
      </div>
    </header>
  );
}

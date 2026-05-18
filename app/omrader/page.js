import Link from "next/link";
import { MapPin } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { contact, majorServiceMunicipalities, serviceMunicipalities } from "../data";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Områder vi kjører til i Akershus og Buskerud",
  description:
    "Se kommuner Instalyd dekker for montering av bilstereo, CarPlay, subwoofer, forsterker og lydoppgradering i Akershus og Buskerud.",
  path: "/omrader",
  keywords: [
    "bilstereo montering Akershus kommune",
    "CarPlay montering Buskerud kommune",
    "lydinstallasjon bil Asker Bærum Drammen Lillestrøm",
  ],
});

export default function AreasPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section">
          <div className="page-hero">
            <div>
              <p className="eyebrow">Områder</p>
              <h1>Kommuner vi kjører til i Akershus og Buskerud.</h1>
              <p className="lead">
                Vi hjelper med bilstereo, CarPlay, høyttalere, subwoofer, forsterker og ryddig lydinstallasjon i store deler av {contact.area}.
              </p>
            </div>
            <aside className="page-hero__side">
              <p className="mini-title">Største kommuner</p>
              <div className="page-hero__meta">
                {majorServiceMunicipalities.slice(0, 6).map((municipality) => (
                  <span key={municipality}>{municipality}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section section--tight section--last">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Alle områder vi dekker</p>
              <h2>Liste over kommuner og områder.</h2>
            </div>
            <p className="lead">Send sted og bilmodell hvis du er usikker på om vi kan ta jobben der du er.</p>
          </div>

          <div className="area-grid">
            {serviceMunicipalities.map((municipality) => (
              <article className="area-card" key={municipality}>
                <span><MapPin className="size-5" /></span>
                <div>
                  <strong>{municipality}</strong>
                  <p>Akershus / Buskerud</p>
                </div>
              </article>
            ))}
          </div>

          <div className="area-cta">
            <strong>Finner du ikke kommunen din?</strong>
            <p>Send en forespørsel likevel, så vurderer vi bilen, jobben og hvor den kan gjøres.</p>
            <Link href="/kontakt">Send forespørsel</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

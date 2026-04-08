import Link from "next/link";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { SiteEffects } from "./site-effects";

export default function HomePage() {
  return (
    <>
      <SiteEffects />
      <Header />

      <main>
        <section className="section hero">
          <div className="hero__shell">
            <div className="hero__ambient" aria-hidden="true">
              <div className="hero__glow" />
              <div className="hero__wave hero__wave--one" />
              <div className="hero__wave hero__wave--two" />
              <div className="hero__wave hero__wave--three" />
            </div>

            <div className="hero__content" data-reveal="">
              <p className="eyebrow">Instalyd</p>
              <h1>Vi monterer billyd.</h1>
              <p className="lead">
                Nå er siden delt opp i flere undersider, så det blir enklere å finne
                informasjonen du trenger.
              </p>

              <div className="hero__actions">
                <Link className="button" href="/tjenester">
                  Se tjenester
                </Link>
                <Link className="button button--secondary" href="/kontakt">
                  Kontakt oss
                </Link>
              </div>

              <div className="hero__facts" aria-label="Kort informasjon">
                <div className="hero__fact">650 kr/time</div>
                <div className="hero__fact">Akershus og Buskerud</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

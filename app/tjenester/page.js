import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { faqItems, heroTags, services } from "../data";
import { SiteEffects } from "../site-effects";

export default function ServicesPage() {
  return (
    <>
      <SiteEffects />
      <Header />
      <main>
        <section className="section">
          <div className="page-intro" data-reveal="">
            <div className="page-intro__content">
              <p className="eyebrow">Tjenester</p>
              <h1>Bilstereo, integrasjon og montering gjort riktig.</h1>
              <p className="lead">
                Hovedjobben vår er selve installasjonen. Det betyr montering, oppkobling,
                kontroll og justering av oppsett som skal leve i bilen lenge, ikke bare se
                bra ut på leveringsdagen.
              </p>
            </div>

            <div className="page-intro__aside">
              <p className="page-intro__label">Vi jobber mest med</p>
              <div className="tag-list">
                {heroTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" data-reveal="" key={service.title}>
                <p className="card-kicker">{service.label}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p className="service-card__meta">{service.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Vanlige spørsmål</p>
            <h2>Det folk ofte lurer på før de bestemmer seg</h2>
          </div>

          <div className="faq-list">
            {faqItems.map((item) => (
              <details className="faq-item" data-reveal="" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

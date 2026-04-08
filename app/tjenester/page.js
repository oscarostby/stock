import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { faqItems, services } from "../data";
import { SiteEffects } from "../site-effects";

export default function ServicesPage() {
  return (
    <>
      <SiteEffects />
      <Header />
      <main>
        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Tjenester</p>
            <h2>Dette gjør vi mest</h2>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" data-reveal="" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-reveal="">
            <p className="eyebrow">Vanlige spørsmål</p>
            <h2>Det folk ofte lurer på</h2>
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

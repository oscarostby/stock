import { getContactRequestById } from "../../../lib/contact-requests";
import { contact } from "../../../data";
import { ReceiptActions } from "./receipt-actions";

function formatDate(value) {
  if (!value) {
    return "Ikke satt";
  }

  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "medium",
    timeZone: "Europe/Oslo",
  }).format(new Date(value));
}

export const metadata = {
  title: "Kvittering",
  description: "Printvennlig kvittering for Instalyd-kontor.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ReceiptPage({ params }) {
  const { id } = await params;
  const { data: request, error } = await getContactRequestById(id);

  if (!request || error) {
    return (
      <main className="receipt-shell">
        <section className="section">
          <article className="office-card">
            <p className="eyebrow">Kvittering</p>
            <h1>Fant ikke saken.</h1>
            <p>{error || "Kvitteringsgrunnlaget mangler."}</p>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="receipt-shell">
      <section className="section receipt-page">
        <ReceiptActions />

        <article className="receipt-sheet">
          <header className="receipt-header">
            <div className="receipt-brand">
              <img alt="Instalyd" className="receipt-logo" src="/icon.png" />
              <div>
                <p className="eyebrow">Instalyd</p>
                <h1>Kvittering</h1>
              </div>
            </div>

            <div className="receipt-meta">
              <span>Referanse</span>
              <strong>{request.receipt_reference || `INST-${request.id}`}</strong>
              <span>Dato</span>
              <strong>{formatDate(request.receipt_issued_at || request.created_at)}</strong>
            </div>
          </header>

          <div className="receipt-grid">
            <section className="receipt-card">
              <span>Kunde</span>
              <strong>{request.name}</strong>
              <p>{request.email}</p>
              <p>{request.phone}</p>
              <p>{request.car}</p>
            </section>

            <section className="receipt-card">
              <span>Leverandor</span>
              <strong>Instalyd</strong>
              <p>{contact.email}</p>
              <p>{contact.phoneDisplay}</p>
              <p>{request.receipt_location || contact.area}</p>
            </section>
          </div>

          <section className="receipt-card">
            <span>Arbeid / varelinje</span>
            <strong>{request.service}</strong>
            <p>{request.receipt_work_summary || request.details}</p>
          </section>

          <div className="receipt-grid">
            <section className="receipt-card">
              <span>Pris</span>
              <strong>{request.receipt_price || "Fyll inn pris"}</strong>
            </section>

            <section className="receipt-card">
              <span>Betalingsmate</span>
              <strong>{request.receipt_payment_method || "Fyll inn betalingsmate"}</strong>
            </section>
          </div>

          <section className="receipt-card">
            <span>Merknader</span>
            <p>{request.receipt_notes || "Ingen merknader lagt inn ennå."}</p>
          </section>

          <section className="receipt-card">
            <span>Obligatorisk innhold</span>
            <ul className="receipt-list">
              <li>Dato for utstedelse</li>
              <li>Navn på kunde og leverandor</li>
              <li>Beskrivelse av arbeid eller vare</li>
              <li>Pris eller totalbelop</li>
              <li>Sted eller leveringsinformasjon ved behov</li>
              <li>Betalingsmate eller betalingsstatus ved behov</li>
            </ul>
          </section>
        </article>
      </section>
    </main>
  );
}

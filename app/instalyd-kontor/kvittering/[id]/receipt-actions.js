"use client";

export function ReceiptActions() {
  return (
    <div className="receipt-actions">
      <button className="button" onClick={() => window.print()} type="button">
        Lagre som PDF
      </button>
      <button className="button button--secondary" onClick={() => window.close()} type="button">
        Lukk
      </button>
    </div>
  );
}

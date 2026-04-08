"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const revealed = document.querySelectorAll("[data-reveal]");
    let observer = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -40px 0px",
        },
      );

      revealed.forEach((element) => observer.observe(element));
    } else {
      revealed.forEach((element) => element.classList.add("is-visible"));
    }

    const form = document.querySelector("[data-contact-form]");

    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = (formData.get("name") || "").toString().trim();
      const car = (formData.get("car") || "").toString().trim();
      const phone = (formData.get("phone") || "").toString().trim();
      const service = (formData.get("service") || "").toString().trim();
      const details = (formData.get("details") || "").toString().trim();
      const recipient =
        form.getAttribute("data-recipient") || "kontakt@dittfirma.no";

      const subject = `Forespørsel billyd - ${car || "ny kunde"}`;
      const body = [
        "Hei,",
        "",
        "Jeg ønsker pris på følgende jobb:",
        "",
        `Navn: ${name}`,
        `Bil: ${car}`,
        `Telefon: ${phone}`,
        `Ønsket jobb: ${service}`,
        "",
        "Detaljer:",
        details,
        "",
        "Mvh",
        name,
      ].join("\n");

      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
    };

    if (form) {
      form.addEventListener("submit", handleSubmit);
    }

    return () => {
      observer?.disconnect();

      if (form) {
        form.removeEventListener("submit", handleSubmit);
      }
    };
  }, []);

  return null;
}

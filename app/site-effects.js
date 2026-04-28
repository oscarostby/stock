"use client";

import emailjs from "@emailjs/browser";
import { useEffect } from "react";

const EMAILJS_SERVICE_ID = "service_22rkcei";
const EMAILJS_TEMPLATE_ID = "template_unvus5v";
const EMAILJS_PUBLIC_KEY = "lCW2i7u25DHceNqXC";

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

    const forms = document.querySelectorAll("[data-contact-form]");

    const setFormStatus = (form, message, state = "") => {
      const status = form.querySelector("[data-form-status]");

      if (!status) {
        return;
      }

      status.textContent = message;
      status.hidden = !message;

      if (state) {
        status.setAttribute("data-state", state);
      } else {
        status.removeAttribute("data-state");
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      const submitButton = form.querySelector('button[type="submit"]');

      if (submitButton) {
        submitButton.disabled = true;
      }

      setFormStatus(form, "Sender forespørsel ...");

      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
          publicKey: EMAILJS_PUBLIC_KEY,
        });

        form.reset();
        setFormStatus(form, "Forespørselen er sendt. Vi tar kontakt så snart vi kan.", "success");
      } catch (error) {
        setFormStatus(
          form,
          "Kunne ikke sende forespørselen akkurat nå. Prøv igjen om litt eller ring oss.",
          "error",
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    };

    forms.forEach((form) => form.addEventListener("submit", handleSubmit));

    return () => {
      observer?.disconnect();

      forms.forEach((form) => form.removeEventListener("submit", handleSubmit));
    };
  }, []);

  return null;
}

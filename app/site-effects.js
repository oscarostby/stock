"use client";

import emailjs from "@emailjs/browser";
import { useEffect } from "react";

const EMAILJS_SERVICE_ID = "service_22rkcei";
const EMAILJS_TEMPLATE_ID = "template_unvus5v";
const EMAILJS_PUBLIC_KEY = "lCW2i7u25DHceNqXC";

const fieldLabels = {
  name: "Navn",
  customer: "Kunde",
  car: "Bil",
  email: "E-post",
  phone: "Telefon",
  service: "Tjeneste",
  details: "Beskrivelse",
  bookingDate: "Dato",
  timeSlot: "Tid",
  owner: "Ansvarlig",
  status: "Status",
  source: "Kilde",
};

function toLabel(fieldName) {
  if (fieldLabels[fieldName]) {
    return fieldLabels[fieldName];
  }

  return fieldName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

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
      const formData = new FormData(form);
      const entries = Array.from(formData.entries()).map(([key, value]) => [
        key,
        value.toString().trim(),
      ]);
      const values = Object.fromEntries(entries);
      const name = values.name || values.customer || "";
      const car = values.car || "";
      const email = values.email || "";
      const phone = values.phone || "";
      const service = values.service || "";
      const details = values.details || "";
      const submitButton = form.querySelector('button[type="submit"]');
      const messageIntro = form.dataset.formIntro || "Ny forespørsel fra nettsiden";
      const successMessage =
        form.dataset.successMessage || "Forespørselen er sendt. Vi tar kontakt så snart vi kan.";
      const subjectPrefix = form.dataset.subjectPrefix || "Forespørsel billyd";
      const subjectFields = (form.dataset.subjectFields || "car,name")
        .split(",")
        .map((field) => field.trim())
        .filter(Boolean);
      const subjectContext = subjectFields
        .map((field) => values[field])
        .filter(Boolean)
        .join(" - ");

      if (submitButton) {
        submitButton.disabled = true;
      }

      setFormStatus(form, "Sender forespørsel ...");

      try {
        const fieldLines = entries
          .filter(([, value]) => value)
          .map(([key, value]) => `${toLabel(key)}: ${value}`);
        const subject = subjectContext ? `${subjectPrefix} - ${subjectContext}` : subjectPrefix;
        const message = [messageIntro, "", ...fieldLines].join("\n");
        const shouldStoreRequest = form.dataset.storeRequest !== "false";
        const isCustomerInquiry = form.dataset.requestKind !== "internal";
        const saveRequestPromise =
          shouldStoreRequest && isCustomerInquiry
            ? fetch("/api/contact-requests", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  car,
                  email,
                  phone,
                  service,
                  details,
                  source: form.dataset.requestSource || window.location.pathname || "website",
                }),
              })
            : Promise.resolve(null);

        const [emailResult, saveResult] = await Promise.allSettled([
          emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              name,
              car,
              email,
              phone,
              service,
              details,
              message,
              from_name: name,
              from_email: email,
              reply_to: email,
              car_model: car,
              phone_number: phone,
              requested_service: service,
              subject,
            },
            {
              publicKey: EMAILJS_PUBLIC_KEY,
            },
          ),
          saveRequestPromise,
        ]);

        if (emailResult.status === "rejected") {
          throw new Error("email-failed");
        }

        if (
          saveResult.status === "fulfilled" &&
          saveResult.value &&
          !saveResult.value.ok
        ) {
          setFormStatus(
            form,
            "Foresporselen er sendt pa e-post, men ble ikke lagret i kontorsystemet ennå.",
            "error",
          );
          return;
        }

        if (saveResult.status === "rejected") {
          setFormStatus(
            form,
            "Foresporselen er sendt pa e-post, men ble ikke lagret i kontorsystemet ennå.",
            "error",
          );
          return;
        }

        form.reset();
        setFormStatus(form, successMessage, "success");
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

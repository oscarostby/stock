"use client";

import { useDeferredValue, useEffect, useState } from "react";

const statusLabels = {
  new: "Ny",
  contacted: "Kontaktet",
  booked: "Booket",
  done: "Ferdig",
};

const osloDateTimeFormatter = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Europe/Oslo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function formatRequestDate(value) {
  if (!value) {
    return "Ukjent tidspunkt";
  }

  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Oslo",
  }).format(new Date(value));
}

function formatCompactDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Oslo",
  }).format(new Date(value));
}

function toDateTimeInputValue(value) {
  if (!value) {
    return "";
  }

  const parts = osloDateTimeFormatter.formatToParts(new Date(value));
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const hours = parts.find((part) => part.type === "hour")?.value;
  const minutes = parts.find((part) => part.type === "minute")?.value;

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function toDateInputValue(value) {
  if (!value) {
    return "";
  }

  const parts = osloDateTimeFormatter.formatToParts(new Date(value));
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function normalizeText(value) {
  return value?.toString().trim().toLowerCase() || "";
}

function formatStatus(value) {
  return statusLabels[value] || value || "Ny";
}

function getStatusClass(value) {
  if (value === "booked") {
    return "office-pill office-pill--booked";
  }

  if (value === "contacted") {
    return "office-pill office-pill--contacted";
  }

  if (value === "done") {
    return "office-pill office-pill--done";
  }

  return "office-pill";
}

function getStartOfToday() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function getStartOfWeek() {
  const now = getStartOfToday();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  now.setDate(now.getDate() - diff);
  return now;
}

function isArchived(request) {
  return Boolean(request.archived_at);
}

function sortRequests(requests, sortBy) {
  const items = [...requests];

  if (sortBy === "scheduled") {
    return items.sort((left, right) => {
      const leftScheduled = left.scheduled_for
        ? new Date(left.scheduled_for).getTime()
        : Number.MAX_SAFE_INTEGER;
      const rightScheduled = right.scheduled_for
        ? new Date(right.scheduled_for).getTime()
        : Number.MAX_SAFE_INTEGER;

      if (leftScheduled !== rightScheduled) {
        return leftScheduled - rightScheduled;
      }

      return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
    });
  }

  return items.sort(
    (left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime(),
  );
}

function filterRequests(requests, query, status, sortBy) {
  const normalizedQuery = normalizeText(query);
  const filtered = requests.filter((request) => {
    const matchesStatus = status === "all" || !status ? true : request.status === status;

    if (!matchesStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchable = [
      request.name,
      request.car,
      request.email,
      request.phone,
      request.service,
      request.details,
      request.source,
      request.booking_notes,
      request.receipt_location,
      request.receipt_reference,
      request.receipt_work_summary,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });

  return sortRequests(filtered, sortBy);
}

function getUpcomingBookings(requests) {
  const now = Date.now();

  return requests
    .filter(
      (request) =>
        !isArchived(request) &&
        request.scheduled_for &&
        new Date(request.scheduled_for).getTime() >= now,
    )
    .sort(
      (left, right) =>
        new Date(left.scheduled_for).getTime() - new Date(right.scheduled_for).getTime(),
    )
    .slice(0, 6);
}

function getHistoryDeleteDate(archivedAt) {
  if (!archivedAt) {
    return null;
  }

  const date = new Date(archivedAt);
  date.setFullYear(date.getFullYear() + 5);
  return formatRequestDate(date.toISOString());
}

function buildReceiptMailto(request) {
  const recipient = request.email || "";
  const subject = encodeURIComponent(
    `Kvittering fra Instalyd${request.receipt_reference ? ` - ${request.receipt_reference}` : ""}`,
  );
  const body = encodeURIComponent(
    `Hei ${request.name},\n\nHer er kvitteringen fra Instalyd.\n\nHusk å legge ved PDF-en før du sender denne e-posten.\n\nMed vennlig hilsen\nInstalyd`,
  );

  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

export function OfficeDashboard({
  contact,
  displayUser,
  error,
  initialRequests,
  supportsScheduling,
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [query, setQuery] = useState("");
  const [scopeFilter, setScopeFilter] = useState("active");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(
    initialRequests[0] ? String(initialRequests[0].id) : "",
  );
  const [notice, setNotice] = useState(null);
  const [pendingAction, setPendingAction] = useState("");
  const deferredQuery = useDeferredValue(query);

  const activeRequests = requests.filter((request) => !isArchived(request));
  const archivedRequests = requests.filter((request) => isArchived(request));
  const visibleRequests =
    scopeFilter === "archived"
      ? archivedRequests
      : scopeFilter === "all"
        ? requests
        : activeRequests;
  const filteredRequests = filterRequests(visibleRequests, deferredQuery, statusFilter, sortBy);
  const selectedRequest =
    filteredRequests.find((request) => String(request.id) === selectedId) ||
    filteredRequests[0] ||
    null;
  const selectedRequestId = selectedRequest ? String(selectedRequest.id) : "";
  const upcomingBookings = supportsScheduling ? getUpcomingBookings(activeRequests) : [];
  const officeManagementEnabled = true;
  const today = getStartOfToday();
  const weekStart = getStartOfWeek();
  const unscheduledRequests = activeRequests.filter((request) => !request.scheduled_for);
  const todayLabel = new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "full",
    timeZone: "Europe/Oslo",
  }).format(new Date());
  const officeStats = [
    { label: "Nye", value: String(activeRequests.filter((request) => request.status === "new").length) },
    { label: "I dag", value: String(activeRequests.filter((request) => new Date(request.created_at) >= today).length) },
    { label: "Denne uken", value: String(activeRequests.filter((request) => new Date(request.created_at) >= weekStart).length) },
    { label: "Booket", value: String(activeRequests.filter((request) => request.status === "booked").length) },
    { label: "Arkiv", value: String(archivedRequests.length) },
  ];

  useEffect(() => {
    if (!filteredRequests.length) {
      if (selectedId) {
        setSelectedId("");
      }
      return;
    }

    if (!filteredRequests.some((request) => String(request.id) === selectedId)) {
      setSelectedId(String(filteredRequests[0].id));
    }
  }, [filteredRequests, selectedId]);

  function openRequest(id, options = {}) {
    const nextId = String(id);

    if (options.scope) {
      setScopeFilter(options.scope);
    }

    setSelectedId(nextId);
    setNotice(null);

    if (options.scrollToDetail && typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.getElementById("office-main-panel")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }

  async function patchRequest(id, payload, successMessage) {
    setNotice(null);
    setPendingAction(String(id));

    try {
      const response = await fetch(`/api/contact-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result?.data) {
        throw new Error(result?.error || "Kunne ikke lagre endringen.");
      }

      setRequests((current) =>
        current.map((request) =>
          request.id === result.data.id ? { ...request, ...result.data } : request,
        ),
      );
      setSelectedId(String(result.data.id));
      setNotice({ type: "success", message: successMessage });
    } catch (saveError) {
      setNotice({
        type: "error",
        message: saveError.message || "Kunne ikke lagre endringen.",
      });
    } finally {
      setPendingAction("");
    }
  }

  async function handleScheduleSubmit(event) {
    event.preventDefault();

    if (!selectedRequest) {
      return;
    }

    setNotice(null);
    setPendingAction(String(selectedRequest.id));

    const formData = new FormData(event.currentTarget);
    const payload = {
      status: (formData.get("status") || "new").toString().trim(),
      bookingNotes: (formData.get("bookingNotes") || "").toString().trim(),
      scheduledFor: (formData.get("scheduledFor") || "").toString().trim(),
    };

    try {
      const response = await fetch(`/api/contact-requests/${selectedRequest.id}/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result?.data) {
        throw new Error(result?.error || "Kunne ikke lagre avtalen.");
      }

      setRequests((current) =>
        current.map((request) =>
          request.id === result.data.id ? { ...request, ...result.data } : request,
        ),
      );
      setSelectedId(String(result.data.id));
      setNotice({ type: "success", message: "Avtalen er lagret." });
    } catch (saveError) {
      setNotice({
        type: "error",
        message: saveError.message || "Kunne ikke lagre avtalen.",
      });
    } finally {
      setPendingAction("");
    }
  }

  async function handleArchiveToggle() {
    if (!selectedRequest) {
      return;
    }

    await patchRequest(
      selectedRequest.id,
      {
        archived_at: isArchived(selectedRequest) ? null : new Date().toISOString(),
      },
      isArchived(selectedRequest)
        ? "Saken er flyttet tilbake til oversikten."
        : "Saken er arkivert.",
    );
  }

  async function handleReceiptSubmit(event) {
    event.preventDefault();

    if (!selectedRequest) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    await patchRequest(
      selectedRequest.id,
      {
        receipt_reference: (formData.get("receiptReference") || "").toString().trim() || null,
        receipt_issued_at: (formData.get("receiptIssuedAt") || "").toString().trim() || null,
        receipt_location: (formData.get("receiptLocation") || "").toString().trim() || null,
        receipt_price: (formData.get("receiptPrice") || "").toString().trim() || null,
        receipt_payment_method:
          (formData.get("receiptPaymentMethod") || "").toString().trim() || null,
        receipt_work_summary:
          (formData.get("receiptWorkSummary") || "").toString().trim() || null,
        receipt_notes: (formData.get("receiptNotes") || "").toString().trim() || null,
      },
      "Kvitteringsutkastet er lagret.",
    );
  }

  async function handleManualBookingSubmit(event) {
    event.preventDefault();
    setNotice(null);
    setPendingAction("manual-booking");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const createPayload = {
      name: (formData.get("name") || "").toString().trim(),
      car: (formData.get("car") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      phone: (formData.get("phone") || "").toString().trim(),
      service: (formData.get("service") || "").toString().trim(),
      details: (formData.get("details") || "").toString().trim(),
      source: "phone",
      status: "booked",
    };
    const schedulePayload = {
      status: "booked",
      bookingNotes: (formData.get("bookingNotes") || "").toString().trim(),
      scheduledFor: (formData.get("scheduledFor") || "").toString().trim(),
    };

    try {
      const createResponse = await fetch("/api/contact-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createPayload),
      });
      const createResult = await createResponse.json();

      if (!createResponse.ok || !createResult?.data) {
        throw new Error(createResult?.error || "Kunne ikke opprette telefonbooking.");
      }

      const scheduleResponse = await fetch(
        `/api/contact-requests/${createResult.data.id}/schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schedulePayload),
        },
      );
      const scheduleResult = await scheduleResponse.json();

      if (!scheduleResponse.ok || !scheduleResult?.data) {
        throw new Error(
          scheduleResult?.error ||
            "Saken ble opprettet, men bookingdata kunne ikke lagres.",
        );
      }

      setRequests((current) => [
        scheduleResult.data,
        ...current.filter((request) => request.id !== scheduleResult.data.id),
      ]);
      setScopeFilter("active");
      setStatusFilter("all");
      setSortBy("scheduled");
      openRequest(scheduleResult.data.id, { scope: "active", scrollToDetail: true });
      setIsManualBookingOpen(false);
      setNotice({ type: "success", message: "Telefonbooking er opprettet." });
      form.reset();
    } catch (saveError) {
      setNotice({
        type: "error",
        message: saveError.message || "Kunne ikke opprette telefonbooking.",
      });
    } finally {
      setPendingAction("");
    }
  }

  return (
    <main className="office-shell">
      <a className="office-skip-link" href="#office-main-panel">
        Hopp til valgt sak
      </a>

      <section className="section office-dashboard-simple">
        <header className="office-header-simple" data-reveal="">
          <div className="office-header-simple__main">
            <div className="office-sidebar__logo">
              <img alt="Instalyd" className="office-sidebar__logo-mark" src="/icon.png" />
              <div className="office-sidebar__logo-copy">
                <span>Instalyd</span>
                <strong>Kontor</strong>
              </div>
            </div>
            <div className="office-header-simple__copy">
              <p className="eyebrow">Dashboard</p>
              <h2>Alt samlet pa en side</h2>
              <p>Finn sak, oppdater booking og fyll ut kvittering uten a bytte seksjon.</p>
            </div>
          </div>

          <div className="office-header-simple__side">
            <div className="office-user-card">
              <div className="office-user-card__avatar">
                <span>{displayUser.slice(0, 1)}</span>
              </div>
              <div className="office-user-card__copy">
                <strong>Admin</strong>
                <span>{displayUser}</span>
              </div>
            </div>
            <div className="office-header-simple__meta">
              <span>{todayLabel}</span>
            </div>
            <div className="office-header-simple__actions">
              <a className="button button--secondary" href={`tel:${contact.phoneHref}`}>
                Ring
              </a>
              <a className="button button--secondary" href={`mailto:${contact.email}`}>
                E-post
              </a>
              <a className="button button--secondary office-logout" href="/instalyd-kontor/logout">
                Logg ut
              </a>
            </div>
          </div>
        </header>

        <div className="office-kpis" data-reveal="">
          {officeStats.map((stat, index) => (
            <div className="office-kpi" key={stat.label}>
              <div className={`office-kpi__icon office-kpi__icon--${index + 1}`} />
              <div className="office-kpi__copy">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            </div>
          ))}
        </div>

        <section className="office-toolbar-simple" data-reveal="">
          <div className="office-filters">
            <label className="office-filters__search">
              <span>Sok</span>
              <input
                aria-label="Sok i kunder og saker"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Navn, bil, tjeneste, telefon ..."
                type="search"
                value={query}
              />
            </label>

            <label className="office-filters__status">
              <span>Visning</span>
              <select
                aria-label="Filtrer saker etter visning"
                onChange={(event) => setScopeFilter(event.target.value)}
                value={scopeFilter}
              >
                <option value="active">Aktive</option>
                <option value="archived">Arkiv</option>
                <option value="all">Alle</option>
              </select>
            </label>

            <label className="office-filters__status">
              <span>Status</span>
              <select
                aria-label="Filtrer pa status"
                onChange={(event) => setStatusFilter(event.target.value)}
                value={statusFilter}
              >
                <option value="all">Alle</option>
                <option value="new">Ny</option>
                <option value="contacted">Kontaktet</option>
                <option value="booked">Booket</option>
                <option value="done">Ferdig</option>
              </select>
            </label>

            <label className="office-filters__status">
              <span>Sorter</span>
              <select
                aria-label="Sorter saker"
                onChange={(event) => setSortBy(event.target.value)}
                value={sortBy}
              >
                <option value="newest">Nyeste</option>
                <option value="scheduled">Avtalt tid</option>
              </select>
            </label>

            <button
              className="button button--secondary"
              onClick={() => {
                setQuery("");
                setScopeFilter("active");
                setStatusFilter("all");
                setSortBy("newest");
                setNotice(null);
              }}
              type="button"
            >
              Nullstill
            </button>
          </div>
        </section>

        {notice ? (
          <div
            aria-live="polite"
            className={`office-notice ${
              notice.type === "error" ? "office-notice--error" : "office-notice--success"
            }`}
            role="status"
          >
            {notice.message}
          </div>
        ) : null}

        {error ? (
          <article className="office-card">
            <p className="eyebrow">Supabase</p>
            <h2>Kunne ikke hente foresporsler.</h2>
            <p>{error}</p>
          </article>
        ) : (
          <div className="office-simple-grid" data-reveal="">
            <div className="office-simple-grid__side">
              <article className="office-card office-card--inbox office-card--sidebar" aria-label="Saksliste">
                <div className="office-card__head">
                  <div>
                    <p className="eyebrow">Liste</p>
                    <h2>Saker</h2>
                  </div>
                  <span className="office-pill office-pill--soft">{filteredRequests.length}</span>
                </div>

                {filteredRequests.length ? (
                  <div className="office-inbox" role="list">
                    {filteredRequests.map((request) => {
                      const isActive = selectedRequestId === String(request.id);

                      return (
                        <button
                          aria-label={`${request.name}, ${request.car}, ${formatStatus(request.status)}`}
                          aria-pressed={isActive}
                          aria-controls="office-main-panel"
                          className={`office-inbox__item office-reset-button ${isActive ? "is-active" : ""}`}
                          key={request.id}
                          onClick={() => openRequest(request.id, { scrollToDetail: true })}
                          type="button"
                        >
                          <div className="office-listing__row">
                            <strong>{request.name}</strong>
                            <span className={getStatusClass(request.status)}>
                              {formatStatus(request.status)}
                            </span>
                          </div>
                          <div className="office-listing__meta">
                            <span>{request.car}</span>
                            <span>{formatCompactDate(request.created_at)}</span>
                          </div>
                          {request.scheduled_for ? (
                            <div className="office-listing__meta office-listing__meta--accent">
                              <span>Avtalt {formatCompactDate(request.scheduled_for)}</span>
                            </div>
                          ) : null}
                          <p className="office-listing__service">{request.service}</p>
                          <p className="office-listing__details">{request.details}</p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="office-empty">
                    <h3>Ingen treff.</h3>
                    <p>Prov et annet sok eller juster filtrene.</p>
                  </div>
                )}
              </article>

              {supportsScheduling ? (
                <article className="office-card office-card--overview">
                  <div className="office-card__head">
                    <div>
                      <p className="eyebrow">Oversikt</p>
                      <h2>Na og neste</h2>
                    </div>
                  </div>

                  <div className="office-queue">
                    <div className="office-queue__block">
                      <span>Kommende avtaler</span>
                      {upcomingBookings.length ? (
                        <div className="office-schedule">
                          {upcomingBookings.slice(0, 4).map((request) => (
                            <button
                              className="office-schedule__item office-schedule__item--link office-reset-button"
                              key={request.id}
                              onClick={() =>
                                openRequest(request.id, {
                                  scope: "active",
                                  scrollToDetail: true,
                                })
                              }
                              type="button"
                            >
                              <strong>{request.name}</strong>
                              <time>{formatCompactDate(request.scheduled_for)}</time>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="office-calendar__empty">Ingen kommende avtaler.</p>
                      )}
                      <button
                        className="button button--secondary"
                        onClick={() => setIsManualBookingOpen((current) => !current)}
                        type="button"
                      >
                        {isManualBookingOpen ? "Lukk telefonbooking" : "Ny telefonbooking"}
                      </button>
                    </div>

                    <div className="office-queue__block">
                      <span>Mangler tid</span>
                      {unscheduledRequests.length ? (
                        <div className="office-schedule">
                          {unscheduledRequests.slice(0, 4).map((request) => (
                            <button
                              className="office-schedule__item office-schedule__item--link office-reset-button"
                              key={request.id}
                              onClick={() =>
                                openRequest(request.id, {
                                  scope: "active",
                                  scrollToDetail: true,
                                })
                              }
                              type="button"
                            >
                              <strong>{request.name}</strong>
                              <time>{request.service}</time>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="office-calendar__empty">Alle aktive saker har avtalt tid.</p>
                      )}
                    </div>
                  </div>

                  {isManualBookingOpen ? (
                    <form
                      className="office-schedule-form office-manual-booking"
                      onSubmit={handleManualBookingSubmit}
                    >
                      <div className="office-card__head">
                        <div>
                          <p className="eyebrow">Manuell booking</p>
                          <h2>Opprett fra telefon</h2>
                        </div>
                      </div>

                      <div className="office-form-grid">
                        <label>
                          <span>Navn</span>
                          <input name="name" placeholder="Kundens navn" required />
                        </label>

                        <label>
                          <span>Telefon</span>
                          <input name="phone" placeholder="Telefonnummer" required />
                        </label>

                        <label>
                          <span>Bil</span>
                          <input name="car" placeholder="Bilmodell" required />
                        </label>

                        <label>
                          <span>Tjeneste</span>
                          <input name="service" placeholder="Hva skal gjøres" required />
                        </label>

                        <label>
                          <span>E-post</span>
                          <input name="email" placeholder="Valgfritt" type="email" />
                        </label>

                        <label>
                          <span>Avtalt tid</span>
                          <input name="scheduledFor" required type="datetime-local" />
                        </label>

                        <label className="office-form-grid__full">
                          <span>Beskrivelse</span>
                          <textarea
                            name="details"
                            placeholder="Kort beskrivelse av jobb eller behov"
                          />
                        </label>

                        <label className="office-form-grid__full">
                          <span>Interne notater</span>
                          <textarea
                            name="bookingNotes"
                            placeholder="Pris, deler, adresse eller annet avtalt pa telefon"
                          />
                        </label>
                      </div>

                      <div className="office-actions">
                        <button
                          className="button"
                          disabled={pendingAction === "manual-booking"}
                          type="submit"
                        >
                          {pendingAction === "manual-booking"
                            ? "Oppretter..."
                            : "Lagre telefonbooking"}
                        </button>
                        <button
                          className="button button--secondary"
                          onClick={() => setIsManualBookingOpen(false)}
                          type="button"
                        >
                          Avbryt
                        </button>
                      </div>
                    </form>
                  ) : null}
                </article>
              ) : null}
            </div>

            <article className="office-card office-card--detail" id="office-main-panel">
              {selectedRequest ? (
                <>
                  <div className="office-card__head">
                    <div>
                      <p className="eyebrow">Valgt sak</p>
                      <h2>{selectedRequest.name}</h2>
                    </div>
                    <span className={getStatusClass(selectedRequest.status)}>
                      {formatStatus(selectedRequest.status)}
                    </span>
                  </div>

                  <p className="office-selection-meta">
                    Bytt sak i listen til venstre for a endre tid, notater eller kvittering for en annen kunde.
                  </p>

                  <div className="office-summary-strip">
                    <div className="office-summary-chip">
                      <span>Bil</span>
                      <strong>{selectedRequest.car}</strong>
                    </div>
                    <div className="office-summary-chip">
                      <span>Tjeneste</span>
                      <strong>{selectedRequest.service}</strong>
                    </div>
                    <div className="office-summary-chip">
                      <span>E-post</span>
                      <strong>{selectedRequest.email || "Ikke oppgitt"}</strong>
                    </div>
                    <div className="office-summary-chip">
                      <span>Telefon</span>
                      <strong>{selectedRequest.phone}</strong>
                    </div>
                  </div>

                  <div className="office-actions">
                    <a className="button" href={`tel:${selectedRequest.phone}`}>
                      Ring kunde
                    </a>
                    {selectedRequest.email ? (
                      <a className="button button--secondary" href={`mailto:${selectedRequest.email}`}>
                        Svar pa e-post
                      </a>
                    ) : null}
                    {officeManagementEnabled ? (
                      <button
                        className="button button--secondary"
                        disabled={pendingAction === String(selectedRequest.id)}
                        onClick={handleArchiveToggle}
                        type="button"
                      >
                        {isArchived(selectedRequest) ? "Tilbake fra arkiv" : "Arkiver"}
                      </button>
                    ) : null}
                  </div>

                  <nav className="office-detail-nav" aria-label="Hopp til arbeidsflate">
                    <a className="button button--secondary" href="#office-booking-panel">
                      Booking
                    </a>
                    <a className="button button--secondary" href="#office-receipt-panel">
                      Kvittering
                    </a>
                  </nav>

                  <div className="office-detail-sections">
                    <section className="office-detail-block office-detail-block--wide">
                      <div className="office-card__head">
                        <div>
                          <p className="eyebrow">Detaljer</p>
                          <h2>Kunde og jobb</h2>
                        </div>
                      </div>

                      <div className="office-request__body">
                        <span>Beskrivelse</span>
                        <p>{selectedRequest.details}</p>
                      </div>

                      <div className="office-summary-strip">
                        <div className="office-summary-chip">
                          <span>Mottatt</span>
                          <strong>{formatRequestDate(selectedRequest.created_at)}</strong>
                        </div>
                        <div className="office-summary-chip">
                          <span>Kilde</span>
                          <strong>{selectedRequest.source || "website"}</strong>
                        </div>
                        <div className="office-summary-chip">
                          <span>Avtalt tid</span>
                          <strong>
                            {selectedRequest.scheduled_for
                              ? formatRequestDate(selectedRequest.scheduled_for)
                              : "Ikke satt"}
                          </strong>
                        </div>
                        <div className="office-summary-chip office-summary-chip--wide">
                          <span>Interne notater</span>
                          <strong>{selectedRequest.booking_notes || "Ingen notater enda."}</strong>
                        </div>
                        {selectedRequest.archived_at ? (
                          <div className="office-summary-chip office-summary-chip--wide">
                            <span>Arkiv</span>
                            <strong>
                              Arkivert {formatRequestDate(selectedRequest.archived_at)}. Slettes etter{" "}
                              {getHistoryDeleteDate(selectedRequest.archived_at)}.
                            </strong>
                          </div>
                        ) : null}
                      </div>
                    </section>

                    <div className="office-detail-grid">
                      <form
                        className="office-schedule-form office-detail-block"
                        id="office-booking-panel"
                        key={`schedule-${selectedRequest.id}`}
                        onSubmit={handleScheduleSubmit}
                      >
                        <div className="office-card__head">
                          <div>
                            <p className="eyebrow">Booking</p>
                            <h2>Planlegg jobb</h2>
                          </div>
                        </div>

                        <div className="office-form-grid">
                          <label>
                            <span>Status</span>
                            <select defaultValue={selectedRequest.status || "new"} name="status">
                              <option value="new">Ny</option>
                              <option value="contacted">Kontaktet</option>
                              <option value="booked">Booket</option>
                              <option value="done">Ferdig</option>
                            </select>
                          </label>

                          <label>
                            <span>Avtalt tid</span>
                            <input
                              defaultValue={toDateTimeInputValue(selectedRequest.scheduled_for)}
                              name="scheduledFor"
                              type="datetime-local"
                            />
                          </label>

                          <label className="office-form-grid__full">
                            <span>Interne notater</span>
                            <textarea
                              defaultValue={selectedRequest.booking_notes || ""}
                              name="bookingNotes"
                              placeholder="Pris, sted, deler, ekstra info"
                            />
                          </label>
                        </div>

                        <button
                          className="button"
                          disabled={pendingAction === String(selectedRequest.id)}
                          type="submit"
                        >
                          {pendingAction === String(selectedRequest.id) ? "Lagrer..." : "Lagre booking"}
                        </button>
                      </form>

                      <form
                        className="office-schedule-form office-detail-block"
                        id="office-receipt-panel"
                        key={`receipt-${selectedRequest.id}`}
                        onSubmit={handleReceiptSubmit}
                      >
                        <div className="office-card__head">
                          <div>
                            <p className="eyebrow">Kvittering</p>
                            <h2>Fyll ut kvittering</h2>
                          </div>
                        </div>

                        <div className="office-form-grid">
                          <label>
                            <span>Referanse</span>
                            <input
                              defaultValue={selectedRequest.receipt_reference || ""}
                              name="receiptReference"
                              placeholder="INST-2026-001"
                            />
                          </label>

                          <label>
                            <span>Dato</span>
                            <input
                              defaultValue={toDateInputValue(selectedRequest.receipt_issued_at)}
                              name="receiptIssuedAt"
                              type="date"
                            />
                          </label>

                          <label>
                            <span>Pris</span>
                            <input
                              defaultValue={selectedRequest.receipt_price || ""}
                              name="receiptPrice"
                              placeholder="4 500 kr"
                            />
                          </label>

                          <label>
                            <span>Sted</span>
                            <input
                              defaultValue={selectedRequest.receipt_location || ""}
                              name="receiptLocation"
                              placeholder="Drammen"
                            />
                          </label>

                          <label>
                            <span>Betalingsmate</span>
                            <input
                              defaultValue={selectedRequest.receipt_payment_method || ""}
                              name="receiptPaymentMethod"
                              placeholder="Vipps, kort, bank"
                            />
                          </label>

                          <label className="office-form-grid__full">
                            <span>Arbeid utført</span>
                            <textarea
                              defaultValue={
                                selectedRequest.receipt_work_summary || selectedRequest.service || ""
                              }
                              name="receiptWorkSummary"
                              placeholder="Hva som ble gjort"
                            />
                          </label>

                          <label className="office-form-grid__full">
                            <span>Merknader</span>
                            <textarea
                              defaultValue={selectedRequest.receipt_notes || ""}
                              name="receiptNotes"
                              placeholder="Garanti, tillegg, avtaler"
                            />
                          </label>
                        </div>

                        <div className="office-actions">
                          <button
                            className="button"
                            disabled={pendingAction === String(selectedRequest.id)}
                            type="submit"
                          >
                            {pendingAction === String(selectedRequest.id) ? "Lagrer..." : "Lagre kvittering"}
                          </button>
                          <a
                            className="button button--secondary"
                            href={`/instalyd-kontor/kvittering/${selectedRequest.id}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Aapne PDF
                          </a>
                          {selectedRequest.email ? (
                            <a className="button button--secondary" href={buildReceiptMailto(selectedRequest)}>
                              Klargjor e-post
                            </a>
                          ) : null}
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <div className="office-empty">
                  <h3>Ingen saker valgt.</h3>
                  <p>Velg en sak i listen for å se detaljer, booking og kvittering.</p>
                </div>
              )}
            </article>
          </div>
        )}
      </section>
    </main>
  );
}

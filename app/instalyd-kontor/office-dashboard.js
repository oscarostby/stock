"use client";

import { useDeferredValue, useEffect, useState } from "react";

const statusLabels = {
  new: "Ny",
  contacted: "Kontaktet",
  booked: "Booket",
  done: "Ferdig",
};

const workspaceConfig = {
  inbox: {
    title: "Innboks",
    lead: "Nye saker og henvendelser fra nettsiden.",
    listTitle: "Nye og aktive saker",
  },
  booking: {
    title: "Booking",
    lead: "Sett avtalt tid, status og interne notater.",
    listTitle: "Saker for booking",
  },
  planner: {
    title: "Kalender",
    lead: "Se plan, kommende avtaler og saker som mangler tid.",
    listTitle: "Planlagte og aktive saker",
  },
  receipt: {
    title: "Kvitteringer",
    lead: "Fyll ut og klargjor kvittering for kunden.",
    listTitle: "Saker med kvittering",
  },
  history: {
    title: "Historikk",
    lead: "Arkiverte saker. Eldre enn fem ar slettes automatisk.",
    listTitle: "Arkiverte saker",
  },
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

const osloDayFormatter = new Intl.DateTimeFormat("nb-NO", {
  timeZone: "Europe/Oslo",
  weekday: "short",
});

const osloDateFormatter = new Intl.DateTimeFormat("nb-NO", {
  timeZone: "Europe/Oslo",
  day: "numeric",
  month: "short",
});

const osloTimeFormatter = new Intl.DateTimeFormat("nb-NO", {
  timeZone: "Europe/Oslo",
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

function getCalendarStartDate() {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  return now;
}

function getOsloDateKey(value) {
  const parts = osloDateTimeFormatter.formatToParts(new Date(value));
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function isSameCalendarDay(left, right) {
  return getOsloDateKey(left) === getOsloDateKey(right);
}

function formatCalendarDay(date) {
  return osloDayFormatter.format(date).replace(".", "");
}

function formatCalendarDate(date) {
  return osloDateFormatter.format(date);
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

function getCalendarDays(requests, length = 7) {
  const start = getCalendarStartDate();

  return Array.from({ length }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const items = requests
      .filter(
        (request) =>
          !isArchived(request) &&
          request.scheduled_for &&
          isSameCalendarDay(request.scheduled_for, date),
      )
      .sort(
        (left, right) =>
          new Date(left.scheduled_for).getTime() - new Date(right.scheduled_for).getTime(),
      );

    return {
      key: date.toISOString(),
      label: formatCalendarDay(date),
      dateLabel: formatCalendarDate(date),
      isToday: isSameCalendarDay(date, start),
      items,
    };
  });
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
  const subject = encodeURIComponent(
    `Kvittering fra Instalyd${request.receipt_reference ? ` - ${request.receipt_reference}` : ""}`,
  );
  const body = encodeURIComponent(
    `Hei ${request.name},\n\nHer er kvitteringen fra Instalyd.\n\nHusk å legge ved PDF-en før du sender denne e-posten.\n\nMed vennlig hilsen\nInstalyd`,
  );

  return `mailto:${request.email}?subject=${subject}&body=${body}`;
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [workspace, setWorkspace] = useState("inbox");
  const [selectedId, setSelectedId] = useState(
    initialRequests[0] ? String(initialRequests[0].id) : "",
  );
  const [notice, setNotice] = useState(null);
  const [pendingAction, setPendingAction] = useState("");
  const deferredQuery = useDeferredValue(query);

  const isHistoryView = workspace === "history";
  const detailMode =
    workspace === "receipt" ? "receipt" : workspace === "booking" || workspace === "planner" ? "booking" : "overview";
  const activeRequests = requests.filter((request) => !isArchived(request));
  const archivedRequests = requests.filter((request) => isArchived(request));
  const currentPool = isHistoryView ? archivedRequests : activeRequests;
  const filteredRequests = filterRequests(currentPool, deferredQuery, statusFilter, sortBy);
  const selectedRequest =
    filteredRequests.find((request) => String(request.id) === selectedId) ||
    filteredRequests[0] ||
    null;
  const selectedRequestId = selectedRequest ? String(selectedRequest.id) : "";
  const upcomingBookings = supportsScheduling ? getUpcomingBookings(activeRequests) : [];
  const calendarDays = supportsScheduling ? getCalendarDays(activeRequests) : [];
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

  const currentView = workspaceConfig[workspace];

  return (
    <main className="office-shell">
      <a className="office-skip-link" href="#office-main-panel">
        Hopp til valgt sak
      </a>

      <section className="section office-workspace">
        <aside className="office-sidebar" data-reveal="">
          <div className="office-sidebar__brand">
            <div className="office-sidebar__logo">
              <img alt="Instalyd" className="office-sidebar__logo-mark" src="/icon.png" />
              <div className="office-sidebar__logo-copy">
                <span>Instalyd</span>
                <strong>Kontor</strong>
              </div>
            </div>

            <div className="office-user-card">
              <div className="office-user-card__avatar">
                <span>{displayUser.slice(0, 1)}</span>
              </div>
              <div className="office-user-card__copy">
                <strong>Admin</strong>
                <span>{displayUser}</span>
              </div>
            </div>
          </div>

          <nav className="office-nav" aria-label="Admin menyer">
            <button
              className={`office-nav__item ${workspace === "inbox" ? "is-active" : ""}`}
              onClick={() => setWorkspace("inbox")}
              type="button"
            >
              <span className="office-nav__label">Nye saker</span>
              <strong>{officeStats[0].value}</strong>
            </button>
            <button
              className={`office-nav__item ${workspace === "booking" ? "is-active" : ""}`}
              onClick={() => setWorkspace("booking")}
              type="button"
            >
              <span className="office-nav__label">Booking</span>
              <strong>{officeStats[3].value}</strong>
            </button>
            <button
              className={`office-nav__item ${workspace === "planner" ? "is-active" : ""}`}
              onClick={() => setWorkspace("planner")}
              type="button"
            >
              <span className="office-nav__label">Kalender</span>
              <strong>{upcomingBookings.length}</strong>
            </button>
            <button
              className={`office-nav__item ${workspace === "receipt" ? "is-active" : ""}`}
              onClick={() => setWorkspace("receipt")}
              type="button"
            >
              <span className="office-nav__label">Kvitteringer</span>
              <strong>{activeRequests.length}</strong>
            </button>
            <button
              className={`office-nav__item ${workspace === "history" ? "is-active" : ""}`}
              onClick={() => setWorkspace("history")}
              type="button"
            >
              <span className="office-nav__label">Historikk</span>
              <strong>{officeStats[4].value}</strong>
            </button>
          </nav>

           <div className="office-sidebar__footer">
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
        </aside>

        <div className="office-main">
          <header className="office-topbar-panel" data-reveal="">
            <div className="office-topbar-panel__intro">
              <p className="eyebrow">Dashboard</p>
              <h2>{currentView.title}</h2>
              <p>{currentView.lead}</p>
            </div>

            <div className="office-topbar-panel__meta">
              <span>{todayLabel}</span>
              <strong>{displayUser}</strong>
            </div>

            <div className="office-kpis">
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
          </header>

          <section className="office-board" data-reveal="">
            <div className="office-toolbar office-toolbar--flat">
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
                    setStatusFilter("all");
                    setSortBy("newest");
                    setNotice(null);
                  }}
                  type="button"
                >
                  Nullstill
                </button>
              </div>
            </div>

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
              <div className="office-board__grid">
                <article className="office-card office-card--inbox" aria-label="Saksliste">
                  <div className="office-card__head">
                    <div>
                      <p className="eyebrow">Liste</p>
                      <h2>{currentView.listTitle}</h2>
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
                            className={`office-inbox__item office-reset-button ${isActive ? "is-active" : ""}`}
                            key={request.id}
                            onClick={() => setSelectedId(String(request.id))}
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
                          <strong>{selectedRequest.email}</strong>
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
                        <a className="button button--secondary" href={`mailto:${selectedRequest.email}`}>
                          Svar pa e-post
                        </a>
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

                      {detailMode === "overview" ? (
                        <>
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
                            {selectedRequest.scheduled_for ? (
                              <div className="office-summary-chip">
                                <span>Avtalt tid</span>
                                <strong>{formatRequestDate(selectedRequest.scheduled_for)}</strong>
                              </div>
                            ) : null}
                            {selectedRequest.booking_notes ? (
                              <div className="office-summary-chip office-summary-chip--wide">
                                <span>Interne notater</span>
                                <strong>{selectedRequest.booking_notes}</strong>
                              </div>
                            ) : null}
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
                        </>
                      ) : null}

                      {detailMode === "booking" ? (
                        <form
                          className="office-schedule-form"
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
                      ) : null}

                      {detailMode === "receipt" ? (
                        <form
                          className="office-schedule-form"
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
                              {pendingAction === String(selectedRequest.id)
                                ? "Lagrer..."
                                : "Lagre kvittering"}
                            </button>
                            <a
                              className="button button--secondary"
                              href={`/instalyd-kontor/kvittering/${selectedRequest.id}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Aapne PDF
                            </a>
                            <a className="button button--secondary" href={buildReceiptMailto(selectedRequest)}>
                              Klargjor e-post
                            </a>
                          </div>
                        </form>
                      ) : null}
                    </>
                  ) : (
                    <div className="office-empty">
                      <h3>Ingen saker valgt.</h3>
                      <p>Velg en sak til venstre for å fortsette.</p>
                    </div>
                  )}
                </article>
              </div>
            )}

            {!error && supportsScheduling && workspace === "planner" ? (
              <div className="office-grid">
                <article className="office-card office-card--calendar">
                  <div className="office-card__head">
                    <div>
                      <p className="eyebrow">Kalender</p>
                      <h2>Kommende 7 dager</h2>
                    </div>
                    <span className="office-pill office-pill--soft">{calendarDays.length}</span>
                  </div>

                  <div className="office-calendar">
                    {calendarDays.map((day) => (
                      <div
                        className={`office-calendar__day ${day.isToday ? "is-today" : ""}`}
                        key={day.key}
                      >
                        <div className="office-calendar__day-head">
                          <span>{day.label}</span>
                          <strong>{day.dateLabel}</strong>
                          <small>{day.items.length ? `${day.items.length} avtaler` : "Ledig"}</small>
                        </div>

                        {day.items.length ? (
                          <div className="office-calendar__items">
                            {day.items.map((request) => (
                              <button
                                className="office-calendar__item office-reset-button"
                                key={request.id}
                                onClick={() => {
                                  setWorkspace("booking");
                                  setSelectedId(String(request.id));
                                }}
                                type="button"
                              >
                                <time>{formatCompactDate(request.scheduled_for)}</time>
                                <strong>{request.name}</strong>
                                <span>{request.service}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="office-calendar__empty">Ingen avtaler.</p>
                        )}
                      </div>
                    ))}
                  </div>
                </article>

                <article className="office-card">
                  <div className="office-card__head">
                    <div>
                      <p className="eyebrow">Uten tid</p>
                      <h2>Må planlegges</h2>
                    </div>
                    <span className="office-pill office-pill--soft">{unscheduledRequests.length}</span>
                  </div>

                  {unscheduledRequests.length ? (
                    <div className="office-schedule">
                      {unscheduledRequests.slice(0, 6).map((request) => (
                        <button
                          className="office-schedule__item office-schedule__item--link office-reset-button"
                          key={request.id}
                          onClick={() => {
                            setWorkspace("booking");
                            setSelectedId(String(request.id));
                          }}
                          type="button"
                        >
                          <strong>{request.name}</strong>
                          <span>{request.car}</span>
                          <time>{request.service}</time>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>Alle aktive saker har avtalt tid.</p>
                  )}
                </article>
              </div>
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}

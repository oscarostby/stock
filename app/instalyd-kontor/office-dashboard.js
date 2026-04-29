"use client";

import { useDeferredValue, useState } from "react";

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

function formatCalendarTime(value) {
  return osloTimeFormatter.format(new Date(value));
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
    .filter((request) => request.scheduled_for && new Date(request.scheduled_for).getTime() >= now)
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
      .filter((request) => request.scheduled_for && isSameCalendarDay(request.scheduled_for, date))
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
  const [selectedId, setSelectedId] = useState(initialRequests[0] ? String(initialRequests[0].id) : "");
  const [notice, setNotice] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const filteredRequests = filterRequests(requests, deferredQuery, statusFilter, sortBy);
  const selectedRequest =
    filteredRequests.find((request) => String(request.id) === selectedId) ||
    filteredRequests[0] ||
    null;
  const selectedRequestId = selectedRequest ? String(selectedRequest.id) : "";
  const upcomingBookings = supportsScheduling ? getUpcomingBookings(requests) : [];
  const calendarDays = supportsScheduling ? getCalendarDays(requests) : [];
  const today = getStartOfToday();
  const weekStart = getStartOfWeek();
  const newRequestsCount = requests.filter((request) => request.status === "new").length;
  const todayCount = requests.filter((request) => new Date(request.created_at) >= today).length;
  const weekCount = requests.filter((request) => new Date(request.created_at) >= weekStart).length;
  const bookedCount = requests.filter((request) => request.status === "booked").length;
  const unscheduledRequests = requests.filter((request) => !request.scheduled_for);
  const unscheduledCount = unscheduledRequests.length;
  const scheduledWeekCount = calendarDays.reduce((sum, day) => sum + day.items.length, 0);
  const officeStats = [
    { label: "Nye", value: String(newRequestsCount) },
    { label: "I dag", value: String(todayCount) },
    { label: "Denne uken", value: String(weekCount) },
    { label: "Booket", value: String(bookedCount) },
    { label: "Uten tid", value: String(unscheduledCount) },
  ];

  async function handleScheduleSubmit(event) {
    event.preventDefault();

    if (!selectedRequest) {
      return;
    }

    setNotice(null);
    setIsSaving(true);

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
      setNotice({
        type: "success",
        message: "Avtalen er lagret uten refresh.",
      });
    } catch (saveError) {
      setNotice({
        type: "error",
        message: saveError.message || "Kunne ikke lagre avtalen.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="office-shell">
      <section className="section office-hero">
        <div className="office-hero__copy" data-reveal="">
          <div className="office-topbar">
            <span className="office-pill office-pill--soft">Innlogget: {displayUser}</span>
            <a className="office-logout" href="/instalyd-kontor/logout">
              Logg ut
            </a>
          </div>

          <p className="eyebrow">Internt kontrollpanel</p>
          <h1>Kontor og booking.</h1>
          <p className="lead">
            Mindre stoy, raskere valg og full oversikt over nye saker og avtaler.
          </p>

          <div className="hero__actions">
            <a className="button" href={`mailto:${contact.email}`}>
              E-post
            </a>
            <a className="button button--secondary" href={`tel:${contact.phoneHref}`}>
              Ring
            </a>
          </div>
        </div>

        <div className="office-hero__aside" data-reveal="">
          <div className="hero__stats office-hero__stats">
            {officeStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>

          <article className="office-card office-card--compact">
            <div className="office-card__head">
              <div>
                <p className="eyebrow">Neste avtaler</p>
                <h2>Neste jobber</h2>
              </div>
              <span className="office-pill office-pill--soft">{upcomingBookings.length}</span>
            </div>

            {supportsScheduling && upcomingBookings.length ? (
              <div className="office-schedule">
                {upcomingBookings.map((request) => (
                  <button
                    className="office-schedule__item office-schedule__item--link office-reset-button"
                    key={request.id}
                    onClick={() => setSelectedId(String(request.id))}
                    type="button"
                  >
                    <strong>{request.name}</strong>
                    <span>{request.car}</span>
                    <time>{formatRequestDate(request.scheduled_for)}</time>
                  </button>
                ))}
              </div>
            ) : (
              <p>Ingen kommende avtaler registrert ennå.</p>
            )}
          </article>
        </div>
      </section>

      <section className="section section--spread office-desk">
        <div className="office-toolbar" data-reveal="">
          <div className="section-heading office-toolbar__heading">
            <div>
              <p className="eyebrow">Innboks</p>
              <h2>Innkomne foresporsler</h2>
            </div>
            <p className="lead">Alt velges og lagres her uten at siden refresher.</p>
          </div>

          <div className="office-filters">
            <label className="office-filters__search">
              <span>Sok</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Navn, bil, tjeneste, telefon ..."
                value={query}
              />
            </label>

            <label className="office-filters__status">
              <span>Status</span>
              <select onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                <option value="all">Alle</option>
                <option value="new">Ny</option>
                <option value="contacted">Kontaktet</option>
                <option value="booked">Booket</option>
                <option value="done">Ferdig</option>
              </select>
            </label>

            <label className="office-filters__status">
              <span>Sorter</span>
              <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
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
            className={`office-notice ${
              notice.type === "error" ? "office-notice--error" : "office-notice--success"
            }`}
            data-reveal=""
          >
            {notice.message}
          </div>
        ) : null}

        {!supportsScheduling && !error ? (
          <div className="office-notice office-notice--warning" data-reveal="">
            Booking mangler fortsatt i databasen. Kjor den nye SQL-en i Supabase SQL Editor
            for aa aktivere avtalt tid og interne notater.
          </div>
        ) : null}

        {error ? (
          <article className="office-card" data-reveal="">
            <p className="eyebrow">Supabase</p>
            <h2>Kunne ikke hente foresporsler.</h2>
            <p>{error}</p>
          </article>
        ) : null}

        {!error ? (
          <div className="office-desk__grid">
            <article className="office-card office-card--inbox" data-reveal="">
              <div className="office-card__head">
                <div>
                  <p className="eyebrow">Oversikt</p>
                  <h2>Alle saker</h2>
                </div>
                <span className="office-pill office-pill--soft">{filteredRequests.length} saker</span>
              </div>

              {filteredRequests.length ? (
                <div className="office-inbox">
                  {filteredRequests.map((request) => {
                    const isActive = selectedRequestId === String(request.id);

                    return (
                      <button
                        className={`office-inbox__item office-reset-button ${isActive ? "is-active" : ""}`}
                        key={request.id}
                        onClick={() => setSelectedId(String(request.id))}
                        type="button"
                      >
                        <div className="office-card__head">
                          <strong>{request.name}</strong>
                          <span className={getStatusClass(request.status)}>
                            {formatStatus(request.status)}
                          </span>
                        </div>

                        <div className="office-inbox__meta">
                          <span>{request.car}</span>
                          <span>{formatRequestDate(request.created_at)}</span>
                        </div>

                        {request.scheduled_for ? (
                          <div className="office-inbox__meta office-inbox__meta--booking">
                            <span>Avtalt: {formatRequestDate(request.scheduled_for)}</span>
                          </div>
                        ) : null}

                        <p className="office-inbox__service">{request.service}</p>
                        <p className="office-inbox__details">{request.details}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="office-empty">
                  <h3>Ingen treff.</h3>
                  <p>Prov et annet sok eller fjern filteret for aa se flere kunder.</p>
                </div>
              )}
            </article>

            <article className="office-card office-card--detail" data-reveal="">
              {selectedRequest ? (
                <>
                  <div className="office-card__head">
                    <div>
                      <p className="eyebrow">Kunde</p>
                      <h2>{selectedRequest.name}</h2>
                    </div>
                    <span className={getStatusClass(selectedRequest.status)}>
                      {formatStatus(selectedRequest.status)}
                    </span>
                  </div>

                  <div className="office-request__meta">
                    <span>{formatRequestDate(selectedRequest.created_at)}</span>
                    <span>{selectedRequest.source || "website"}</span>
                  </div>

                  <div className="office-request__grid">
                    <div className="office-request__item">
                      <span>Bil</span>
                      <strong>{selectedRequest.car}</strong>
                    </div>

                    <div className="office-request__item">
                      <span>Tjeneste</span>
                      <strong>{selectedRequest.service}</strong>
                    </div>

                    <div className="office-request__item">
                      <span>E-post</span>
                      <strong>
                        <a href={`mailto:${selectedRequest.email}`}>{selectedRequest.email}</a>
                      </strong>
                    </div>

                    <div className="office-request__item">
                      <span>Telefon</span>
                      <strong>
                        <a href={`tel:${selectedRequest.phone}`}>{selectedRequest.phone}</a>
                      </strong>
                    </div>
                  </div>

                  <div className="office-actions">
                    <a className="button" href={`tel:${selectedRequest.phone}`}>
                      Ring kunde
                    </a>
                    <a className="button button--secondary" href={`mailto:${selectedRequest.email}`}>
                      Svar pa e-post
                    </a>
                  </div>

                  <div className="office-request__body">
                    <span>Beskrivelse</span>
                    <p>{selectedRequest.details}</p>
                  </div>

                  {selectedRequest.scheduled_for || selectedRequest.booking_notes ? (
                    <div className="office-booking-summary">
                      <div className="office-card__head">
                        <div>
                          <p className="eyebrow">Sist lagret</p>
                          <h2>Bookingstatus</h2>
                        </div>
                        {selectedRequest.scheduled_for ? (
                          <span className="office-pill office-pill--booked">
                            {formatCalendarTime(selectedRequest.scheduled_for)}
                          </span>
                        ) : null}
                      </div>

                      <div className="office-request__grid">
                        <div className="office-request__item">
                          <span>Avtalt tid</span>
                          <strong>
                            {selectedRequest.scheduled_for
                              ? formatRequestDate(selectedRequest.scheduled_for)
                              : "Ikke satt ennå"}
                          </strong>
                        </div>

                        <div className="office-request__item">
                          <span>Status</span>
                          <strong>{formatStatus(selectedRequest.status)}</strong>
                        </div>
                      </div>

                      {selectedRequest.booking_notes ? (
                        <div className="office-request__body">
                          <span>Interne notater</span>
                          <p>{selectedRequest.booking_notes}</p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <form
                    className="office-schedule-form"
                    key={selectedRequest.id}
                    onSubmit={handleScheduleSubmit}
                  >
                    <div className="office-card__head">
                      <div>
                        <p className="eyebrow">Avtale</p>
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
                          placeholder="Pris, avtalt sted, deler, ting som ma huskes"
                        />
                      </label>
                    </div>

                    <button className="button" disabled={isSaving} type="submit">
                      {isSaving ? "Lagrer..." : "Lagre avtale"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="office-empty">
                  <h3>Ingen foresporsler ennå.</h3>
                  <p>Nye skjemaer fra nettsiden dukker opp her automatisk.</p>
                </div>
              )}
            </article>
          </div>
        ) : null}

        {!error && supportsScheduling ? (
          <div className="office-grid" data-reveal="">
            <article className="office-card office-card--calendar">
              <div className="office-card__head">
                <div>
                  <p className="eyebrow">Kalender</p>
                  <h2>Ukesplan</h2>
                </div>
                <span className="office-pill office-pill--soft">{scheduledWeekCount} avtaler</span>
              </div>

              <div className="office-calendar">
                {calendarDays.map((day) => (
                  <div className={`office-calendar__day ${day.isToday ? "is-today" : ""}`} key={day.key}>
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
                            onClick={() => setSelectedId(String(request.id))}
                            type="button"
                          >
                            <time>{formatCalendarTime(request.scheduled_for)}</time>
                            <strong>{request.name}</strong>
                            <span>{request.service}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="office-calendar__empty">Ledig dag.</p>
                    )}
                  </div>
                ))}
              </div>
            </article>

            <article className="office-card office-card--compact">
              <div className="office-card__head">
                <div>
                  <p className="eyebrow">Mangler tid</p>
                  <h2>Uplanlagte saker</h2>
                </div>
                <span className="office-pill office-pill--soft">{unscheduledCount}</span>
              </div>

              {unscheduledRequests.length ? (
                <div className="office-schedule">
                  {unscheduledRequests.slice(0, 6).map((request) => (
                    <button
                      className="office-schedule__item office-schedule__item--link office-reset-button"
                      key={request.id}
                      onClick={() => setSelectedId(String(request.id))}
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
    </main>
  );
}

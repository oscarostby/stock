import { NextResponse } from "next/server";
import { updateContactRequest } from "../../../../lib/contact-requests";

function getTimeZoneOffsetMs(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  const offsetText = parts.find((part) => part.type === "timeZoneName")?.value || "GMT+0";
  const match = offsetText.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);

  if (!match) {
    return 0;
  }

  const [, sign, hours, minutes = "0"] = match;
  const totalMinutes = Number(hours) * 60 + Number(minutes);

  return (sign === "-" ? -1 : 1) * totalMinutes * 60 * 1000;
}

function toOsloIsoString(value) {
  if (!value) {
    return null;
  }

  const [datePart, timePart] = value.split("T");

  if (!datePart || !timePart) {
    return null;
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  if ([year, month, day, hours, minutes].some((part) => Number.isNaN(part))) {
    return null;
  }

  const utcGuess = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const offsetMs = getTimeZoneOffsetMs(utcGuess, "Europe/Oslo");

  return new Date(utcGuess.getTime() - offsetMs).toISOString();
}

function getSafeReturnTo(value, fallback, requestUrl) {
  if (typeof value === "string" && value.startsWith("/instalyd-kontor")) {
    return value;
  }

  return new URL(fallback, requestUrl).pathname;
}

function buildUpdatePayload({ bookingNotes, scheduledFor, status }) {
  return {
    status,
    booking_notes: bookingNotes || null,
    scheduled_for: scheduledFor ? toOsloIsoString(scheduledFor) : null,
  };
}

export async function POST(request, { params }) {
  const { id } = await params;
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    const result = await updateContactRequest(
      id,
      buildUpdatePayload({
        bookingNotes: (body.bookingNotes || "").toString().trim(),
        scheduledFor: (body.scheduledFor || "").toString().trim(),
        status: (body.status || "new").toString().trim(),
      }),
    );

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ data: result.data });
  }

  const formData = await request.formData();
  const returnTo = getSafeReturnTo(
    (formData.get("returnTo") || "").toString(),
    `/instalyd-kontor?request=${id}`,
    request.url,
  );
  const result = await updateContactRequest(
    id,
    buildUpdatePayload({
      bookingNotes: (formData.get("bookingNotes") || "").toString().trim(),
      scheduledFor: (formData.get("scheduledFor") || "").toString().trim(),
      status: (formData.get("status") || "new").toString().trim(),
    }),
  );
  const redirectUrl = new URL(returnTo, request.url);

  if (result.error) {
    redirectUrl.searchParams.set("save", "error");
    return NextResponse.redirect(redirectUrl, 303);
  }

  redirectUrl.searchParams.set("save", "ok");
  redirectUrl.searchParams.set("request", id);

  return NextResponse.redirect(redirectUrl, 303);
}

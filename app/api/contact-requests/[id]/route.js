import { NextResponse } from "next/server";
import { updateContactRequest } from "../../../lib/contact-requests";

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

  if (!timePart) {
    const [year, month, day] = datePart.split("-").map(Number);

    if ([year, month, day].some((part) => Number.isNaN(part))) {
      return null;
    }

    const utcGuess = new Date(Date.UTC(year, month - 1, day, 12, 0));
    const offsetMs = getTimeZoneOffsetMs(utcGuess, "Europe/Oslo");

    return new Date(utcGuess.getTime() - offsetMs).toISOString();
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

function normalizePatch(body) {
  const patch = {};

  if ("status" in body) {
    patch.status = body.status || "new";
  }

  if ("booking_notes" in body) {
    patch.booking_notes = body.booking_notes || null;
  }

  if ("scheduled_for" in body) {
    patch.scheduled_for = body.scheduled_for ? toOsloIsoString(body.scheduled_for) : null;
  }

  if ("archived_at" in body) {
    patch.archived_at = body.archived_at || null;
  }

  if ("receipt_reference" in body) {
    patch.receipt_reference = body.receipt_reference || null;
  }

  if ("receipt_issued_at" in body) {
    patch.receipt_issued_at = body.receipt_issued_at
      ? toOsloIsoString(`${body.receipt_issued_at}T12:00`)
      : null;
  }

  if ("receipt_location" in body) {
    patch.receipt_location = body.receipt_location || null;
  }

  if ("receipt_price" in body) {
    patch.receipt_price = body.receipt_price || null;
  }

  if ("receipt_payment_method" in body) {
    patch.receipt_payment_method = body.receipt_payment_method || null;
  }

  if ("receipt_work_summary" in body) {
    patch.receipt_work_summary = body.receipt_work_summary || null;
  }

  if ("receipt_notes" in body) {
    patch.receipt_notes = body.receipt_notes || null;
  }

  return patch;
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const result = await updateContactRequest(id, normalizePatch(body));

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ data: result.data });
}

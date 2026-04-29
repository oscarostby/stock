const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://valjmiveeysyovkclrhs.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_o-BWIc31UfObGgzl85ACWw_EDt_ZIRS";
const contactRequestsTable = "contact_requests";
const baseSelectColumns = "id,name,car,email,phone,service,details,status,source,created_at";
const scheduleSelectColumns = `${baseSelectColumns},scheduled_for,booking_notes`;

function getSupabaseHeaders(extraHeaders = {}) {
  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    ...extraHeaders,
  };
}

function formatSupabaseError(responseText) {
  try {
    const parsed = JSON.parse(responseText);

    return parsed.message || parsed.error_description || parsed.error || responseText;
  } catch {
    return responseText || "Ukjent Supabase-feil";
  }
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseKey);
}

async function fetchContactRequests(limit, selectColumns) {
  const query = new URLSearchParams({
    select: selectColumns,
    order: "created_at.desc",
    limit: String(limit),
  });

  return fetch(
    `${supabaseUrl}/rest/v1/${contactRequestsTable}?${query.toString()}`,
    {
      headers: getSupabaseHeaders(),
      cache: "no-store",
    },
  );

}

export async function listContactRequests(limit = 50) {
  if (!isSupabaseConfigured()) {
    return {
      data: [],
      error: "Supabase er ikke konfigurert.",
      supportsScheduling: false,
    };
  }

  const scheduleResponse = await fetchContactRequests(limit, scheduleSelectColumns);

  if (scheduleResponse.ok) {
    return {
      data: await scheduleResponse.json(),
      error: null,
      supportsScheduling: true,
    };
  }

  const fallbackResponse = await fetchContactRequests(limit, baseSelectColumns);

  if (!fallbackResponse.ok) {
    return {
      data: [],
      error: formatSupabaseError(await fallbackResponse.text()),
      supportsScheduling: false,
    };
  }

  return {
    data: await fallbackResponse.json(),
    error: null,
    supportsScheduling: false,
  };
}

export async function createContactRequest(payload) {
  if (!isSupabaseConfigured()) {
    return {
      data: null,
      error: "Supabase er ikke konfigurert.",
    };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${contactRequestsTable}`, {
    method: "POST",
    headers: getSupabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify({
      name: payload.name,
      car: payload.car,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      details: payload.details,
      source: payload.source || "website",
      status: payload.status || "new",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      data: null,
      error: formatSupabaseError(await response.text()),
    };
  }

  const result = await response.json();

  return {
    data: result[0] || null,
    error: null,
  };
}

export async function updateContactRequest(id, payload) {
  if (!isSupabaseConfigured()) {
    return {
      data: null,
      error: "Supabase er ikke konfigurert.",
    };
  }

  const query = new URLSearchParams({
    id: `eq.${id}`,
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/${contactRequestsTable}?${query.toString()}`, {
    method: "PATCH",
    headers: getSupabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      data: null,
      error: formatSupabaseError(await response.text()),
    };
  }

  const result = await response.json();

  return {
    data: result[0] || null,
    error: null,
  };
}

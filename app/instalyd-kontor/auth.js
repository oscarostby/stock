export const officeCookieName = "instalyd-office-session";
export const officeCookieMaxAge = 60 * 60 * 24 * 14;

const officePassword = "siuronaldoisthegoatnocap";
const officeSessionSecret = "instalyd-office-session-v1";

export function normalizeOfficeUsername(value) {
  return value.toString().trim();
}

export function formatOfficeUsername(value) {
  return normalizeOfficeUsername(value);
}

export function verifyOfficeCredentials(username, password) {
  return Boolean(normalizeOfficeUsername(username)) && password === officePassword;
}

export function createOfficeSessionValue(username) {
  return `${normalizeOfficeUsername(username)}:${officeSessionSecret}`;
}

export function readOfficeSessionValue(value) {
  if (!value) {
    return null;
  }

  try {
    const decoded = decodeURIComponent(value);
    const parts = decoded.split(":");

    if (parts.length !== 2) {
      return null;
    }

    const [username, secret] = parts;

    if (secret !== officeSessionSecret || !normalizeOfficeUsername(username)) {
      return null;
    }

    return username;
  } catch {
    return null;
  }
}

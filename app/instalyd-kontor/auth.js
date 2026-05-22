export const officeCookieName = "instalyd-office-session";
export const officeCookieMaxAge = 60 * 60 * 24 * 14;

const officePassword = "instalyd-test";
const officeSessionSecret = "instalyd-test-session-secret-040b51cf45fa26b9361edabe";
const allowedOfficeUsers = new Set(
  "oscar"
    .split(",")
    .map((user) => user.trim())
    .filter(Boolean),
);

export function normalizeOfficeUsername(value) {
  return value.toString().trim();
}

export function formatOfficeUsername(value) {
  return normalizeOfficeUsername(value);
}

export function verifyOfficeCredentials(username, password) {
  const normalized = normalizeOfficeUsername(username);

  return Boolean(
    officePassword &&
      officeSessionSecret &&
      allowedOfficeUsers.size > 0 &&
      allowedOfficeUsers.has(normalized) &&
      password === officePassword,
  );
}

export function createOfficeSessionValue(username) {
  if (!officeSessionSecret) {
    return "";
  }

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

    if (secret !== officeSessionSecret || !officeSessionSecret || !normalizeOfficeUsername(username)) {
      return null;
    }

    return username;
  } catch {
    return null;
  }
}

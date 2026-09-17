const COOKIE = "dks_admin";

function hex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function adminToken() {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  if (!secret) {
    return "";
  }
  const data = new TextEncoder().encode(`dks-admin:${secret}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return hex(hash);
}

export async function isAdminToken(token?: string | null) {
  if (!token) {
    return false;
  }
  const expected = await adminToken();
  return Boolean(expected) && token === expected;
}

export function adminCookieName() {
  return COOKIE;
}

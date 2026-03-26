const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { nowIso, plusDays } = require("./db");

const SESSION_COOKIE = "qa_session";

function hashEmail(email) {
  return crypto
    .createHash("sha256")
    .update(String(email || "").trim().toLowerCase())
    .digest("hex");
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password, hashed) {
  return bcrypt.compare(password, hashed);
}

async function createSession(db, userId) {
  const id = crypto.randomUUID();
  const createdAt = nowIso();
  const expiresAt = plusDays(30);

  await db.run(
    "INSERT INTO sessions (id, user_id, created_at, expires_at, revoked_at) VALUES (?, ?, ?, ?, NULL)",
    [id, userId, createdAt, expiresAt],
  );

  return { id, expiresAt };
}

async function revokeSession(db, sessionId) {
  await db.run("UPDATE sessions SET revoked_at = ? WHERE id = ?", [nowIso(), sessionId]);
}

async function getSessionUser(db, sessionId) {
  const row = await db.get(
    `SELECT s.id as session_id, s.expires_at as session_expires_at, s.revoked_at,
            u.id, u.display_name, u.role, u.created_at
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = ?`,
    [sessionId],
  );
  if (!row) return null;
  if (row.revoked_at) return null;
  if (new Date(row.session_expires_at).getTime() < Date.now()) return null;
  return {
    id: row.id,
    displayName: row.display_name,
    role: row.role,
    createdAt: row.created_at,
    sessionId: row.session_id,
    sessionExpiresAt: row.session_expires_at,
  };
}

function sessionCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  };
}

module.exports = {
  SESSION_COOKIE,
  hashEmail,
  hashPassword,
  verifyPassword,
  createSession,
  revokeSession,
  getSessionUser,
  sessionCookieOptions,
};


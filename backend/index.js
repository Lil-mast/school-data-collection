const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { createDb, nowIso, plusDays } = require("./src/db");
const {
  SESSION_COOKIE,
  hashEmail,
  hashPassword,
  verifyPassword,
  createSession,
  revokeSession,
  getSessionUser,
  sessionCookieOptions,
} = require("./src/auth");

const app = express();
const db = createDb();
const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreDocument(query, doc) {
  const queryTokens = tokenize(query);
  const docTokens = new Set(
    tokenize(`${doc.title || ""} ${doc.content || ""} ${(doc.tags || []).join(" ")}`),
  );
  let score = 0;
  for (const token of queryTokens) {
    if (docTokens.has(token)) score += 1;
  }
  return score;
}

function classifyPriority(message) {
  const text = String(message || "").toLowerCase();
  if (
    /(suicid|self[-\s]?harm|panic attack|unsafe|threat|abuse|violence|emergency|cannot cope|urgent)/.test(
      text,
    )
  ) {
    return "hot";
  }
  if (/(anxiety|depress|stress|burnout|lonely|sleep|insomnia|mental health|overwhelm)/.test(text)) {
    return "warm";
  }
  return "cool";
}

function generateSummary(message) {
  const normalized = String(message || "").trim().replace(/\s+/g, " ");
  if (!normalized) return "No summary available.";
  return normalized.length > 180 ? `${normalized.slice(0, 177)}...` : normalized;
}

function mapRequestRow(row) {
  return {
    id: row.id,
    topic: row.topic,
    message: row.message,
    summary: row.summary,
    status: row.status,
    priority: row.priority,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    expiresAt: row.expires_at,
    archivedAt: row.archived_at,
    userId: row.user_id,
  };
}

function toPublicUser(user) {
  return {
    id: user.id,
    displayName: user.displayName,
    role: user.role,
    createdAt: user.createdAt,
  };
}

async function authRequired(req, res, next) {
  const sessionId = req.cookies[SESSION_COOKIE];
  if (!sessionId) return res.status(401).json({ error: "Authentication required" });
  const user = await getSessionUser(db, sessionId);
  if (!user) return res.status(401).json({ error: "Invalid or expired session" });
  req.user = user;
  return next();
}

function roleRequired(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  };
}

async function buildRagAnswer(question, user) {
  const kbRows = await db.all(
    "SELECT id, title, source, tags_json, content, created_at FROM knowledge_base ORDER BY created_at DESC LIMIT 50",
  );
  const requestRows = await db.all(
    `SELECT id, topic as title, summary as content, priority, status
     FROM support_requests
     WHERE archived_at IS NULL AND (? = 'mentor' OR user_id = ?)
     ORDER BY created_at DESC
     LIMIT 50`,
    [user.role, user.id],
  );

  const kbScored = kbRows
    .map((doc) => ({
      type: "knowledge",
      payload: {
        id: doc.id,
        title: doc.title,
        source: doc.source,
        content: doc.content,
        tags: JSON.parse(doc.tags_json || "[]"),
      },
      score: scoreDocument(question, {
        title: doc.title,
        content: doc.content,
        tags: JSON.parse(doc.tags_json || "[]"),
      }),
    }))
    .filter((item) => item.score > 0);

  const requestScored = requestRows
    .map((r) => ({
      type: "request",
      payload: r,
      score: scoreDocument(question, {
        title: r.title,
        content: r.content,
        tags: [r.priority, r.status],
      }),
    }))
    .filter((item) => item.score > 0);

  const retrieved = [...kbScored, ...requestScored]
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (!retrieved.length) {
    return {
      answer:
        "I could not find matching internal context yet. Please share more details and this support request can be reviewed by a mentor.",
      sources: [],
    };
  }

  const bullets = retrieved.map((item) => {
    if (item.type === "knowledge") {
      return `- ${item.payload.title}: ${item.payload.content}`;
    }
    return `- Related support case ${item.payload.id.slice(0, 8)} (${item.payload.priority.toUpperCase()}): ${item.payload.content}`;
  });

  return {
    answer: `Here is guidance based on the most relevant records:\n${bullets.join("\n")}\n\nRecommended next step: continue with a support request so a mentor can follow up.`,
    sources: retrieved.map((item) => ({
      type: item.type,
      id: item.payload.id,
      title: item.payload.title,
      score: item.score,
    })),
  };
}

app.get("/health", (_, res) => {
  res.json({ ok: true, service: "quiet-advocate-backend" });
});

app.post("/api/auth/register", async (req, res) => {
  const { displayName, email, password, role = "student" } = req.body || {};
  if (!displayName || !email || !password) {
    return res.status(400).json({ error: "displayName, email and password are required" });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ error: "password must be at least 8 characters" });
  }
  if (!["student", "mentor"].includes(role)) {
    return res.status(400).json({ error: "role must be student or mentor" });
  }

  const emailHash = hashEmail(email);
  const existing = await db.get("SELECT id FROM users WHERE email_hash = ?", [emailHash]);
  if (existing) return res.status(409).json({ error: "Account already exists" });

  const user = {
    id: crypto.randomUUID(),
    displayName: String(displayName).trim(),
    emailHash,
    passwordHash: await hashPassword(password),
    role,
    createdAt: nowIso(),
  };

  await db.run(
    "INSERT INTO users (id, display_name, email_hash, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [user.id, user.displayName, user.emailHash, user.passwordHash, user.role, user.createdAt],
  );

  const session = await createSession(db, user.id);
  res.cookie(SESSION_COOKIE, session.id, sessionCookieOptions());
  return res.status(201).json({
    user: toPublicUser({
      id: user.id,
      displayName: user.displayName,
      role: user.role,
      createdAt: user.createdAt,
    }),
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const emailHash = hashEmail(email);
  const user = await db.get("SELECT * FROM users WHERE email_hash = ?", [emailHash]);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const session = await createSession(db, user.id);
  res.cookie(SESSION_COOKIE, session.id, sessionCookieOptions());
  return res.json({
    user: {
      id: user.id,
      displayName: user.display_name,
      role: user.role,
      createdAt: user.created_at,
    },
  });
});

app.post("/api/auth/logout", authRequired, async (req, res) => {
  await revokeSession(db, req.user.sessionId);
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions());
  return res.json({ ok: true });
});

app.get("/api/auth/me", authRequired, (req, res) => {
  return res.json({ user: toPublicUser(req.user) });
});

app.post("/api/support-requests", authRequired, roleRequired("student"), async (req, res) => {
  const { topic, message } = req.body || {};
  if (!topic || !message) {
    return res.status(400).json({ error: "topic and message are required" });
  }

  const priority = classifyPriority(message);
  const summary = generateSummary(message);
  const id = crypto.randomUUID();
  const createdAt = nowIso();
  const expiresAt = plusDays(540);

  await db.run(
    `INSERT INTO support_requests (
      id, user_id, topic, message, summary, status, priority, created_at, updated_at, expires_at, archived_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`,
    [id, req.user.id, topic, message, summary, "submitted", priority, createdAt, createdAt, expiresAt],
  );

  await db.run(
    "INSERT INTO request_events (id, request_id, event_type, event_data_json, created_at) VALUES (?, ?, ?, ?, ?)",
    [crypto.randomUUID(), id, "created", JSON.stringify({ priority }), createdAt],
  );

  return res.status(201).json({
    grievance: {
      id,
      topic,
      message,
      summary,
      status: "submitted",
      priority,
      createdAt,
      updatedAt: createdAt,
      expiresAt,
    },
    aiTriage: {
      priority,
      rationale:
        priority === "hot"
          ? "Contains urgent wellbeing-risk indicators."
          : priority === "warm"
            ? "Contains mental-health concern indicators that need timely support."
            : "General wellbeing feedback pattern with lower urgency.",
    },
  });
});

app.get("/api/support-requests", authRequired, async (req, res) => {
  const rows =
    req.user.role === "mentor"
      ? await db.all(
          "SELECT * FROM support_requests WHERE archived_at IS NULL ORDER BY created_at DESC LIMIT 200",
        )
      : await db.all(
          "SELECT * FROM support_requests WHERE archived_at IS NULL AND user_id = ? ORDER BY created_at DESC LIMIT 200",
          [req.user.id],
        );
  return res.json({ grievances: rows.map(mapRequestRow) });
});

app.get("/api/support-requests/:id", authRequired, async (req, res) => {
  const row = await db.get("SELECT * FROM support_requests WHERE id = ?", [req.params.id]);
  if (!row) return res.status(404).json({ error: "Support request not found" });
  if (req.user.role !== "mentor" && row.user_id !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  return res.json({ grievance: mapRequestRow(row) });
});

app.post("/api/knowledge", authRequired, roleRequired("mentor"), async (req, res) => {
  const { title, content, source = "Manual Upload", tags = [] } = req.body || {};
  if (!title || !content) return res.status(400).json({ error: "title and content are required" });

  const doc = {
    id: crypto.randomUUID(),
    title,
    content,
    source,
    tags: Array.isArray(tags) ? tags : [],
    createdAt: nowIso(),
  };
  await db.run(
    "INSERT INTO knowledge_base (id, title, source, tags_json, content, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [doc.id, doc.title, doc.source, JSON.stringify(doc.tags), doc.content, doc.createdAt],
  );
  return res.status(201).json({ document: doc });
});

app.get("/api/knowledge", authRequired, async (req, res) => {
  const rows = await db.all(
    "SELECT id, title, source, tags_json, content, created_at FROM knowledge_base ORDER BY created_at DESC",
  );
  return res.json({
    knowledgeBase: rows.map((row) => ({
      id: row.id,
      title: row.title,
      source: row.source,
      tags: JSON.parse(row.tags_json || "[]"),
      content: row.content,
      createdAt: row.created_at,
    })),
  });
});

app.post("/api/chat", authRequired, async (req, res) => {
  const { question } = req.body || {};
  if (!question) return res.status(400).json({ error: "question is required" });
  const rag = await buildRagAnswer(question, req.user);
  return res.json({ question, ...rag });
});

app.post("/api/admin/archive-expired", authRequired, roleRequired("mentor"), async (_, res) => {
  const now = nowIso();
  const result = await db.run(
    "UPDATE support_requests SET archived_at = ? WHERE archived_at IS NULL AND expires_at < ?",
    [now, now],
  );
  return res.json({ archivedCount: result.changes || 0, archivedAt: now });
});

// Backwards-compatibility aliases.
app.post("/api/grievances", authRequired, roleRequired("student"), async (req, res) => {
  const { topic, message } = req.body || {};
  if (!topic || !message) {
    return res.status(400).json({ error: "topic and message are required" });
  }
  const priority = classifyPriority(message);
  const summary = generateSummary(message);
  const id = crypto.randomUUID();
  const createdAt = nowIso();
  const expiresAt = plusDays(540);

  await db.run(
    `INSERT INTO support_requests (
      id, user_id, topic, message, summary, status, priority, created_at, updated_at, expires_at, archived_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`,
    [id, req.user.id, topic, message, summary, "submitted", priority, createdAt, createdAt, expiresAt],
  );

  return res.status(201).json({
    grievance: {
      id,
      topic,
      message,
      summary,
      status: "submitted",
      priority,
      createdAt,
      updatedAt: createdAt,
      expiresAt,
    },
  });
});

app.get("/api/grievances", authRequired, async (req, res) => {
  const rows =
    req.user.role === "mentor"
      ? await db.all(
          "SELECT * FROM support_requests WHERE archived_at IS NULL ORDER BY created_at DESC LIMIT 200",
        )
      : await db.all(
          "SELECT * FROM support_requests WHERE archived_at IS NULL AND user_id = ? ORDER BY created_at DESC LIMIT 200",
          [req.user.id],
        );
  return res.json({ grievances: rows.map(mapRequestRow) });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${PORT}`);
});

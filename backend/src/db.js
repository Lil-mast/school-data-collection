const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const DATA_DIR = path.join(__dirname, "..", "data");
const DB_FILE = path.join(DATA_DIR, "app.db");
const SCHEMA_FILE = path.join(__dirname, "..", "schema.sql");

function nowIso() {
  return new Date().toISOString();
}

function plusDays(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function normalizeRow(row) {
  if (!row) return row;
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => {
      if (typeof value === "bigint") return [key, Number(value)];
      return [key, value];
    }),
  );
}

class NodeSqliteAdapter {
  constructor() {
    ensureDir();
    this.db = new DatabaseSync(DB_FILE);
    this.db.exec(fs.readFileSync(SCHEMA_FILE, "utf8"));
    this.seedKnowledgeBase();
  }

  async run(sql, params = []) {
    const stmt = this.db.prepare(sql);
    return stmt.run(...params);
  }

  async get(sql, params = []) {
    const stmt = this.db.prepare(sql);
    return normalizeRow(stmt.get(...params));
  }

  async all(sql, params = []) {
    const stmt = this.db.prepare(sql);
    return stmt.all(...params).map(normalizeRow);
  }

  seedKnowledgeBase() {
    const row = this.db.prepare("SELECT COUNT(*) as count FROM knowledge_base").get();
    if ((row?.count || 0) > 0) return;

    const createdAt = nowIso();
    const docs = [
      {
        id: crypto.randomUUID(),
        title: "University Student Mental Health Intake",
        source: "Student Wellbeing Handbook",
        tags: ["mental-health", "intake", "university-student"],
        content:
          "University students can submit anonymous mental-health support requests. Each submission is triaged into hot, warm, or cool priority and assigned to a mentor or counsellor for review.",
      },
      {
        id: crypto.randomUUID(),
        title: "Student Wellbeing Response Standards",
        source: "Wellbeing Operations SLA",
        tags: ["sla", "response", "wellbeing"],
        content:
          "Initial acknowledgement should happen within 24 hours. High-risk wellbeing concerns should be reviewed by a mentor within one business day.",
      },
    ];

    for (const doc of docs) {
      // Note: this is synchronous because we run it in the constructor.
      this.db
        .prepare(
          "INSERT INTO knowledge_base (id, title, source, tags_json, content, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        )
        .run(
          doc.id,
          doc.title,
          doc.source,
          JSON.stringify(doc.tags),
          doc.content,
          createdAt,
        );
    }
  }
}

class D1Adapter {
  constructor(d1) {
    this.d1 = d1;
  }

  async run(sql, params = []) {
    return this.d1.prepare(sql).bind(...params).run();
  }

  async get(sql, params = []) {
    const result = await this.d1.prepare(sql).bind(...params).first();
    return normalizeRow(result || null);
  }

  async all(sql, params = []) {
    const result = await this.d1.prepare(sql).bind(...params).all();
    const rows = result?.results || [];
    return rows.map(normalizeRow);
  }
}

function createDb(options = {}) {
  // For Cloudflare Workers, call createDb({ d1: env.DB }) from the request context.
  if (options.d1) return new D1Adapter(options.d1);
  return new NodeSqliteAdapter();
}

module.exports = {
  createDb,
  nowIso,
  plusDays,
};


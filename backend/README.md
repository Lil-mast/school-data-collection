# Quiet Advocate Backend

## Environment Variables

- `PORT` (default: `4000`)
- `FRONTEND_ORIGIN` (default: `http://localhost:3000`)
- `NODE_ENV` (`production` enables secure cookie behavior)
- `SESSION_SECRET` (recommended in production; reserved for future session signing/rotation)

## Cloudflare Deployment Notes

- Use Cloudflare D1 as the primary SQL store in production.
- Apply the schema from `schema.sql` to your D1 database.
- Configure CORS origin to your Cloudflare Pages domain.
- Keep cookies secure in production (`Secure` + `SameSite=None`).

## Data Model

- `users` stores pseudonymous identity (`email_hash`, role, display name, password hash).
- `sessions` stores stateful auth sessions for horizontal scaling.
- `support_requests` stores student wellbeing requests with retention metadata.
- `knowledge_base` stores RAG context documents.
- `request_events` stores audit trail events.

## Retention

- New support requests default to medium retention (`expires_at` around 18 months).
- Archive expired requests via `POST /api/admin/archive-expired` as a scheduled maintenance task.


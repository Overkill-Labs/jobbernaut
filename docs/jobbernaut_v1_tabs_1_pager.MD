# Jobbernaut V1 (Tabs) - The 1-Pager

## The Problem:
Job hunting is a fragmented, manual nightmare. Tracking applications requires tedious data entry, and tailoring resumes/cover letters for every job takes too much time.

## The Hypothesis:
By building a centralized, automated pipeline (Tabs -> Tailor -> Extract), I can reduce the friction of applying to jobs to a single click, allowing for higher volume and better quality applications.

## The Scope (V1 - Tabs MVP):
- **Auth:** LinkedIn OAuth2 only.
Master Resume: Simple CRUD for a master resume profile/document.
- **Job Tracking:** Simple CRUD for job applications.
- UI: A clean, filterable list view of jobs (No Kanban).
- **Infrastructure:** Cloudflare Pages (React), Cloudflare Workers (Hono API), D1 (SQLite via Drizzle), R2, and other Cloudflare Services. Vanilla JS only.
## Non-Goals (What we are NOT building in V1):
- NO custom email/password auth.
- NO TypeScript (Vanilla JS only to maximize iteration speed).
- NO Kanban boards (List view + filters only).
- NO Phase 2 (Tailor) or Phase 3 (Extract) integration yet.
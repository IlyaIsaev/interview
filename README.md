# Interview

A web app for practicing interview questions: browse a question bank, open a random prompt, reveal the answer, then move on to the next one. Guests can try a shared **demo** bank; signed-in users get a private **personal** bank.

## Business logic

### Question banks

| Mode | Who | Storage | Create limit |
|------|-----|---------|--------------|
| **Demo** | Logged-out guests | Shared `demo_questions` table | Max **30** questions |
| **Personal** | Signed-in users | Private `questions` table | Unlimited |

- The API picks the bank from the session cookie: no user → demo; authenticated user → personal.
- Signing in or out reloads home data so the correct bank is always shown.
- Demo creates beyond the limit are rejected by the API (`403`) and blocked in the UI.

### Practice flow (home)

1. Home loads the full question list and one **random** question (route loader).
2. The user sees the prompt; the answer stays hidden until **Show answer**.
3. **Next question** (or Enter after the answer is visible) loads another random question, preferably not the current one.
4. If the bank is empty, home shows an empty state and invites creating a question.

Keyboard: on home, **Enter** first reveals the answer, then advances to the next question (ignored when focus is in inputs or on a button).

### Managing questions

Users can create, update, and delete questions from the header and the questions drawer:

- **Create** — dialog with question text and a Markdown answer (live preview).
- **List** — left drawer with a virtualized list; select to open a question on home.
- **Update / delete** — per-row actions in the drawer (delete confirms first).

Mutations update the in-memory list immediately; create can also open the new question on home.

### Authentication & routes

| Route | Access |
|-------|--------|
| `/` (home) | Public after session is known (demo or personal). Blocked while the session is still loading. |
| `/sign-in` | Guests only; signed-in users are redirected home. |
| `/sign-up` | Guests only; app redirects this path to sign-in (sign-up UI is disabled for new accounts). |

- **Sign in** with email/password (Better Auth); success navigates home.
- **Sign out** returns the user to the demo bank on the next home load.
- Session is resolved before home data loads so the wrong bank is never shown first.

### Backend API (summary)

- `GET/POST /api/questions` — list / create (demo cap on create when logged out)
- `GET /api/questions/random?exclude=` — random question
- `GET/PUT/DELETE /api/questions/:id` — read / update / delete
- Auth routes under Better Auth
- `GET /api/health` — health check

Data is stored in Cloudflare D1 (SQLite) via Drizzle.

## Architecture (short)

The frontend follows **FEOD** (Feature-Oriented Domain layout):

| Layer | Role |
|-------|------|
| `app` | Shell, pages, route wiring |
| `modules` | Feature domains (`auth`, `questions`, …); public API via `@/modules/<name>` |
| `common` | Shared UI, auth client, routes, API client (no domain internals) |
| `global` | Cross-cutting tooling (e.g. auth schema CLI config) |
| `db` / `worker` | Schema and Cloudflare Worker API |

Rules: import other features only through `@/modules/<name>`; do not reach into another module’s `ui` / `model` / `api` / `lib`; keep domain-specific code out of `common`.

- **Frontend:** React SPA (Vite) with Reatom state and routing; home page uses a route **loader** for list + random question, then hydrates domain atoms in a page model.
- **Backend:** Hono Worker on Cloudflare; typed client via Hono RPC (`hc`).

## Technologies

### Application

| Area | Stack |
|------|--------|
| UI | React 19, TypeScript |
| Build / dev | Vite 8, React Compiler (Babel) |
| State & routing | Reatom (`@reatom/core`, `@reatom/react`) |
| Styling | Tailwind CSS 4, shadcn/ui, Base UI, CVA, `tailwind-merge` / `clsx` |
| Icons / fonts | Lucide, Geist (variable) |
| Toasts / themes | Sonner, `next-themes` |
| Markdown | `markdown-to-jsx` |
| Lists | TanStack Virtual (`@tanstack/react-virtual`) |
| Auth (client) | Better Auth |
| API client | Hono client (`hc`) against the Worker `AppType` |

### Backend & data

| Area | Stack |
|------|--------|
| Runtime | Cloudflare Workers |
| HTTP | Hono |
| Database | Cloudflare D1 (SQLite) |
| ORM / migrations | Drizzle ORM, Drizzle Kit |
| Auth (server) | Better Auth + Drizzle adapter |

### Tooling

| Area | Stack |
|------|--------|
| Package manager | pnpm |
| Deploy / local Worker | Wrangler |
| Lint | Oxlint |
| Types | TypeScript, `@cloudflare/workers-types` |
| Cloudflare Vite | `@cloudflare/vite-plugin` |

## Scripts

```bash
pnpm dev                 # Vite dev server
pnpm build               # Typecheck + production build
pnpm deploy              # Build and deploy Worker + assets
pnpm lint                # Oxlint
pnpm db:migrate:local    # Apply D1 migrations locally
pnpm db:migrate:remote   # Apply D1 migrations remotely
pnpm db:generate         # Generate Drizzle migrations
pnpm db:studio           # Drizzle Studio
```

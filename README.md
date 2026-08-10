# Interview

## Business logic

Interview is an app for practicing interview questions. Users work with a question bank (a shared demo bank as a guest, or a private bank when signed in): open random prompts, reveal answers, and manage their own questions.

## Architecture

**FEOD** — [documentation](https://feod-docs.vercel.app/en/)

## Technologies

### Application

| Area            | Stack                                                              |
| --------------- | ------------------------------------------------------------------ |
| UI              | React 19, TypeScript                                               |
| Build / dev     | Vite 8, React Compiler (Babel)                                     |
| State & routing | Reatom (`@reatom/core`, `@reatom/react`)                           |
| Styling         | Tailwind CSS 4, shadcn/ui, Base UI, CVA, `tailwind-merge` / `clsx` |
| Icons / fonts   | Lucide, Geist (variable)                                           |
| Toasts / themes | Sonner, `next-themes`                                              |
| Markdown        | `markdown-to-jsx`                                                  |
| Lists           | TanStack Virtual (`@tanstack/react-virtual`)                       |
| Auth (client)   | Better Auth                                                        |
| API client      | Hono client (`hc`) against the Worker `AppType`                    |

### Backend & data

| Area             | Stack                         |
| ---------------- | ----------------------------- |
| Runtime          | Cloudflare Workers            |
| HTTP             | Hono                          |
| Database         | Cloudflare D1 (SQLite)        |
| ORM / migrations | Drizzle ORM, Drizzle Kit      |
| Auth (server)    | Better Auth + Drizzle adapter |

### Tooling

| Area                  | Stack                                   |
| --------------------- | --------------------------------------- |
| Package manager       | pnpm                                    |
| Deploy / local Worker | Wrangler                                |
| Lint                  | Oxlint                                  |
| Format                | Prettier                                |
| Git hooks             | Lefthook                                |
| Types                 | TypeScript, `@cloudflare/workers-types` |
| Cloudflare Vite       | `@cloudflare/vite-plugin`               |

## Scripts

```bash
pnpm dev                 # Vite dev server
pnpm build               # Typecheck + production build
pnpm deploy              # Build and deploy Worker + assets
pnpm lint                # Oxlint
pnpm format              # Format with Prettier
pnpm format:check        # Check formatting without writing
pnpm db:migrate:local    # Apply D1 migrations locally
pnpm db:migrate:remote   # Apply D1 migrations remotely
pnpm db:generate         # Generate Drizzle migrations
pnpm db:studio           # Drizzle Studio
```

### Git hooks (Lefthook)

The project uses [Lefthook](https://lefthook.dev/) for Git hooks. On `pnpm install`, `prepare` runs `lefthook install`.

On every commit, Lefthook formats staged files with Prettier (`lefthook.yml` → `pre-commit` → `prettier --write`) and re-stages the fixes (`stage_fixed: true`).

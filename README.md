# Interview Quiz

A small web app for practicing technical interview questions stored as markdown.

Browse a searchable question list, open one at random, create or edit questions, archive or restore them, and sign in with email.

## Stack

- **App:** React 19, TypeScript, TanStack Start (SSR), TanStack Router, TanStack Form, TanStack Markdown, Valibot
- **UI:** Tailwind CSS v4, shadcn/ui (Base UI), Lucide, Motion, TanStack Virtual
- **Backend:** Cloudflare Workers, Cloudflare D1, Drizzle ORM, Better Auth
- **Tooling:** Vite+, pnpm, Wrangler, Vitest

## Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `vp dev`             | Local development server                         |
| `vp build`           | Production build                                 |
| `vp check`           | Format, lint, and typecheck                      |
| `vp test`            | Run tests                                        |
| `pnpm run cf:deploy` | Apply remote D1 migrations and deploy the Worker |
| `pnpm deploy`        | Build, then `cf:deploy`                          |

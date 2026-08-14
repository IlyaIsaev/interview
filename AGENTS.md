# AGENTS.md

Architectural conventions for AI agents working with this **FEOD (Fractal Entity Oriented Design)** project.

## Project Overview

TypeScript (latest) frontend app using **FEOD**, **Reatom**, **Valibot**, **shadcn + asciicn**, and **Vitest browser mode**.

- **FEOD** — primary architecture ([docs](https://feod-docs.vercel.app/) / [feod.dev](https://feod.dev/))
- **Reatom** — primary tool for business logic, state, data fetching, routing, and forms
- **Valibot** — all schemas and validation (forms, API payloads, domain types)
- Prefer Reatom over React state and other state managers
- UI: **shadcn + [asciicn](https://asciicn.fldr.zip/)**; font: **Meslo Nerd Font**
- Unit tests → Vitest browser mode; E2E → Playwright

## Tech Stack

- TypeScript latest (7.x), strict mode
- React 19
- Reatom + `@reatom/devtools` (required in development)
- Valibot (Standard Schema compatible)
- shadcn/ui + asciicn registry, Tailwind CSS, Meslo Nerd Font
- Vite, pnpm
- Vitest browser mode (unit), Playwright (E2E)
- FEOD

## Architecture (FEOD)

FEOD is modular and fractal. Business logic lives in **modules**. There are no separate `features` / `entities` / `widgets` layers.

### Levels (lowest → highest)

1. `global` / `globals` — styles, CSS variables, root tokens (rarely imported by app code)
2. `common` — tiny shared primitives (utilities, basic UI, pure helpers); **no** `index.ts` barrel
3. `modules` — core of the app (domain logic, UI, forms, APIs, submodules)
4. `pages` — thin route entry points
5. `app` — providers, root wiring, Reatom setup, DevTools

### Level import direction

```
global → common → modules → pages → app
```

- Higher levels may import lower levels; reverse is forbidden.
- Modules are the main unit of isolation. External code imports a module **only** via its public API (`index.ts`).
- Deep imports into another module’s internals are forbidden.
- Modules may depend on other modules only via public API.
- Prefer composition from above (pages) or IoC over tight module↔module coupling.
- Promote code from `common` to a real module when it gains domain meaning or grows.

```ts
// ✅
import { UserCard } from '@/modules/user'
import { formatDate } from '@/common/lib/date'

// ❌
import { userModel } from '@/modules/user/model' // deep import
import { something } from '@/pages/...' // reverse direction
```

### Modules & Submodules

Modules are the heart of the application. Treat them like internal packages: clear public contract, minimal external surface.

#### Core principles

- Access to a module’s internals is allowed **only** through its public API (`index.ts`).
- Submodules live under a parent’s `modules/` folder and are **isolated**.
- Submodules **cannot** be imported from outside their parent module.
- FEOD does not enforce a rigid internal structure — only the public API and the `modules/` folder for submodules matter.
- Prefer self-contained submodules so they can be extracted later.
- Minimize cross-module interactions; prefer IoC when modules must collaborate.
- Zigzag imports (Module A or any of its submodules importing a submodule of Module B) are forbidden.

#### Public API

```ts
// modules/user/index.ts
export { UserCard } from './ui/user-card'
export { userAtom, fetchUser } from './model'
```

#### Typical internal structure (flexible)

```
modules/user/
├── ui/
│   └── user-card.tsx
├── model/
│   └── user-model.ts
├── api/
│   └── user-api.ts
├── lib/                  # or shared/, helpers/, etc.
├── modules/              # optional submodules
│   └── user-settings/
└── index.ts              # public API only
```

#### Submodule import rules

| Direction                               | Allowed? | Notes                                                                |
| --------------------------------------- | -------- | -------------------------------------------------------------------- |
| Submodule → Parent module (any parts)   | Yes      | Technically allowed, but treat as an **exception**. Prefer autonomy. |
| Parent module → Submodule public API    | Yes      | Correct and preferred.                                               |
| Parent module → Submodule internals     | **No**   | Forbidden.                                                           |
| Outside code → Submodule                | **No**   | Submodules are private to the parent.                                |
| Sibling submodule → Sibling submodule   | **No**   | Forbidden / strongly discouraged.                                    |
| Module → Submodule of another module    | **No**   | Forbidden (zigzag).                                                  |
| Module → Submodule of its own submodule | **No**   | Forbidden.                                                           |

> From a submodule you can import any parts of the parent module, but not the other way around. However, importing parts of the parent should be considered an exception — prefer a fully autonomous submodule without parent dependencies.

#### Domain Decomposition (primary nesting strategy)

Break a large bounded context into cohesive subdomains under one parent:

```
modules/
  user-management/
    index.ts                    # public API of the whole context
    modules/
      user-profile/
        index.ts
        ui/
        model/
      user-settings/
        index.ts
      user-permissions/
        index.ts
```

```ts
// modules/user-management/index.ts
export { UserProfile } from './modules/user-profile'
export { UserSettings } from './modules/user-settings'
```

Use when subdomains share a strong boundary and change together, and consumers should have one entry point (`@/modules/user-management`).

Keep nesting shallow (1–2 levels preferred). Depth ≥ 3 needs strong justification.

#### Shared functionality between submodules

When sibling submodules need shared logic:

1. **Preferred**: put shared code in the **parent** (outside `modules/`). Both submodules may import from the parent.
2. Make one submodule the owner and re-export via the parent’s public API if needed.
3. Extract a new sibling submodule only if the shared piece is large and has clear boundaries.
4. Use the special сквозной (`_`) private-core pattern only for a rare private core adapted by several public submodules.

```
modules/
  UserManagement/
    index.ts
    shared/                 # or lib/, helpers/, composables/
      useSharedLogic.ts
      types.ts
    modules/
      UserProfile/
        index.ts
      UserSettings/
        index.ts
```

**Rule of thumb**

- Small shared code → parent.
- Growing shared code with clear boundaries → another submodule under the same parent (or later promote to top-level).
- Never let two sibling submodules depend on each other’s internals.

### Pages

Pages are thin. They compose modules and bind data.

- Prefer placing page-specific code close to the domain (pages may live inside modules when clearly owned by one).
- Top-level `pages/` remains useful for global/orphan routes (`404`, marketing, etc.).
- Every page that needs data loading **must** have both view and model.
- **Pages must use default export** for correct lazy imports (`React.lazy` / dynamic `import()`).

```
pages/user-profile/
├── ui/
│   └── user-profile-page.tsx
├── model/
│   └── user-profile-model.ts
└── index.ts
```

```ts
// pages/user-profile/ui/user-profile-page.tsx
import { reatomComponent } from '@reatom/react'
import { UserCard } from '@/modules/user'

const UserProfilePage = reatomComponent(() => (
  <div>
    <UserCard />
  </div>
), 'UserProfilePage')

export default UserProfilePage
```

```ts
// pages/user-profile/index.ts
export { default } from './ui/user-profile-page'
```

Page model hydrates via `effect` + `route.exact()`. Loader only fetches; it does **not** populate models.

### Composition patterns

| Need                             | Pattern                                   |
| -------------------------------- | ----------------------------------------- |
| Independent blocks on one screen | Page composes several modules             |
| One module needs UI from another | Prop / render prop / action slot          |
| Shared domain logic              | Proper module (or promote from `common`)  |
| Same composition on many pages   | Higher-level module or keep in pages      |
| Unavoidable module→module reuse  | Public API only + document the dependency |

```ts
// pages/post/ui/post-page.tsx
import { CommentList } from '@/modules/comment-list'
import { ReportButton } from '@/modules/report-content'

function PostPage({ comments }: { comments: Comment[] }) {
  return (
    <CommentList
      comments={comments}
      renderActions={(comment) => <ReportButton targetId={comment.id} />}
    />
  )
}

export default PostPage
```

**Anti-patterns:** deep imports, bidirectional module dependencies, god modules that are really pages, domain logic in `pages` or `common`.

### Common vs Modules

- `common` — only generic, tiny, domain-agnostic helpers and primitive UI.
- Domain meaning or growth → promote to a module.
- Design-system components usually live in a dedicated module (or stay in `common/ui` while primitive).

## Reatom

Primary tool for business logic, state, data fetching, routing, and forms.

### Rules

- Prefer Reatom atoms, actions, and async models over React state for business flows.
- Put models in the module’s `model/` (or page `model/` for pure page orchestration).
- Keep UI thin — components only bind to Reatom atoms/actions.
- Use **reatom forms** for all forms; validation **must** use Valibot (pass schema to `reatomForm`).
- Always name atoms and actions meaningfully.
- Data loading must use `withAsyncData` (or `withAsync` for mutations). Do not manage loading/error atoms manually.

### Atoms & Actions

```ts
// modules/user/model/user-model.ts
import {
  action,
  atom,
  computed,
  wrap,
  withAsyncData,
  withAsync,
} from '@reatom/core'
import { userApi } from '../api'

export const fetchUser = action(async (id: string) => {
  return await wrap(userApi.getById(id))
}, 'fetchUser').extend(withAsyncData({ initState: null as User | null }))

export const userIdAtom = atom('1', 'userIdAtom')
export const userResource = computed(async () => {
  const id = userIdAtom()
  return await wrap(userApi.getById(id))
}, 'userResource').extend(withAsyncData({ initState: null as User | null }))

export const updateUser = action(async (id: string, patch: Partial<User>) => {
  return await wrap(userApi.update(id, patch))
}, 'updateUser').extend(withAsync())
```

### Forms

```ts
// modules/login/model/login-form.ts
import { reatomForm } from '@reatom/core'
import * as v from 'valibot'
import { loginApi } from '../api'

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Password too short')),
})

export const loginForm = reatomForm(
  { email: '', password: '' },
  {
    name: 'loginForm',
    schema: LoginSchema,
    onSubmit: async (values) => loginApi.signIn(values),
  },
)
```

### Routing & Data Loading

- All reatom routes live in **`modules/routing`** (not `shared` or `common`).
- Route **loader** only fetches and returns data (no model population).
- Page **model** uses `effect` + `route.exact()` to read `route.loader.data()` and populate module atoms.
- Do **not** set atoms from the loader or hydrate inside components / page `ui/`.

```ts
// modules/routing/user-profile-route.ts
import { reatomRoute, wrap } from '@reatom/core'
import { userApi } from '@/modules/user'
import { postsApi } from '@/modules/post'

export const userProfileRoute = reatomRoute({
  path: '/users/:id',
  async loader({ params }) {
    const [user, posts] = await Promise.all([
      wrap(userApi.getById(params.id)),
      wrap(postsApi.getByUserId(params.id)),
    ])
    return { user, posts }
  },
})
```

```ts
// modules/routing/index.ts
export { userProfileRoute } from './user-profile-route'
export { homeRoute } from './home-route'
```

```ts
// pages/user-profile/model/user-profile-model.ts
import { effect } from '@reatom/core'
import { userProfileRoute } from '@/modules/routing'
import { userAtom } from '@/modules/user'
import { postsListAtom } from '@/modules/posts-list'

effect(() => {
  if (!userProfileRoute.exact()) return
  const data = userProfileRoute.loader.data()
  if (!data) return
  userAtom.set(data.user)
  postsListAtom.set(data.posts)
}, 'userProfilePageModel')
```

### DevTools (development only)

```ts
// app/devtools.ts
if (import.meta.env.DEV) {
  const [{ createDevtools }, { connectLogger }] = await Promise.all([
    import('@reatom/devtools'),
    import('@reatom/core'),
  ])
  globalThis.DEVTOOLS = createDevtools({
    initVisibility: true,
    initSize: 1000,
  })
  connectLogger()
}
```

### Error handling

Use `withAsyncData` / `withAsync` — they expose `.error()`, `.ready()`, `.pending()`. Do not create manual loading/error atoms.

## Valibot

Use **Valibot** for all schemas, form validation, and API/domain decoding. Prefer over Zod.

```ts
import * as v from 'valibot'

export const UserSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.pipe(v.string(), v.email()),
})

export type User = v.InferOutput<typeof UserSchema>
```

- Forms: pass schema to `reatomForm({ schema })`.
- API boundaries: `v.parse` / `v.safeParse`.

## UI Kit (shadcn + asciicn)

```bash
pnpm dlx shadcn@latest add https://asciicn.fldr.zip/r/input.json
pnpm dlx shadcn@latest add https://asciicn.fldr.zip/r/button.json
```

- Generated components live in `common/ui` or a dedicated UI module.
- Required font: **Meslo Nerd Font**.

## Testing

| Layer            | Tool                            | Scope                                   |
| ---------------- | ------------------------------- | --------------------------------------- |
| Unit / component | Vitest browser mode             | Schemas, utils, components, forms, a11y |
| E2E              | Playwright (`@playwright/test`) | Multi-page user journeys                |

- Assert visible outcomes, not Reatom atoms.
- Prefer `getByRole` / accessible names.

## Code Style

```ts
// ✅
export const UserCard = reatomComponent(() => { ... }, 'UserCard')
export { userAtom, fetchUser }

// ❌ (non-page components)
export default function UserCard() { ... }
const [user, setUser] = useState(null) // business state in component
```

- Files: `kebab-case.ts` / `kebab-case.tsx`
- Components: `PascalCase`
- Named exports only — **except pages**, which use **default export** for lazy imports
- No business logic in React components — move to module `model/`
- TypeScript: latest 7.x, strict

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
pnpm lint
pnpm test          # Vitest browser mode
pnpm test:watch
pnpm test:e2e      # Playwright
```

Always run `pnpm typecheck` and `pnpm lint` after non-trivial changes.

## Forbidden

- Breaking FEOD level import direction or deep-importing module internals
- Importing a submodule from outside its parent
- Parent importing submodule internals
- Sibling submodule ↔ sibling submodule dependencies
- Zigzag imports (module / submodule importing a submodule of another module)
- Casual tight module coupling (prefer public API + composition / IoC)
- Deep nesting (≥3 levels) without strong justification
- Effect.js or other effect systems for business logic or schemas
- Zod or other schema libraries — **Valibot** only
- `any` — use `unknown` + Valibot parse
- React state / other state managers for business logic when Reatom can express it
- Custom routers or form libraries
- Reatom routes outside `modules/routing`; routes in `shared` or `common`
- Loading or hydrating page data in components, page `ui/`, or route loaders
- “utils” folders outside `common` or module-local `lib`
- Other UI kits (MUI, Chakra, Ant Design)
- Shipping UI without Meslo Nerd Font
- jsdom/node-only as default for unit tests — Vitest browser mode required
- Writing E2E flows in Vitest — use Playwright

## File Locations

| Concern                               | Location                             |
| ------------------------------------- | ------------------------------------ |
| App providers, Reatom setup, DevTools | `app/`                               |
| Reatom routes + loaders               | `modules/routing`                    |
| Page view (default export)            | `pages/<page>/ui/` or inside module  |
| Page model                            | `pages/<page>/model/`                |
| Domain / feature logic                | `modules/<name>/`                    |
| Submodules                            | `modules/<parent>/modules/<child>/`  |
| Shared code for sibling submodules    | parent module (`lib/`, `shared/`, …) |
| Forms                                 | module (or page) `model/`            |
| shadcn / asciicn components           | `common/ui` or UI module             |
| Helpers, configs                      | `common/` or module `lib/`           |
| Valibot schemas                       | `common/` or module                  |
| Unit tests (Vitest browser mode)      | colocated `*.test.ts(x)`             |
| E2E tests (Playwright)                | `e2e/`                               |

When in doubt: keep the change local, respect FEOD dependency direction, prefer Reatom for business logic, and treat modules as the primary unit of organization.

```

```

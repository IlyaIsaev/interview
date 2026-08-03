import { Hono } from 'hono'

import { app as authApp, type AuthEnv } from './auth'

const app = new Hono<{ Bindings: AuthEnv }>()
  .get('/api/health', (c) => c.json({ ok: true as const }, 200))
  .route('/', authApp)

export default app

export type AppType = typeof app

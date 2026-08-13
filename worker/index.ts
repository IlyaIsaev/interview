import type {
  ExecutionContext,
  ScheduledController,
} from '@cloudflare/workers-types'
import { Hono } from 'hono'

import { createDb } from '@/db'

import {
  app as authApp,
  createAuth,
  type AuthEnv,
  type AuthVariables,
} from './auth'
import {
  deleteDemoProfileForRequest,
  purgeExpiredDemoProfiles,
} from './demo-profile'
import { app as questionsApp } from './questions'

const app = new Hono<{ Bindings: AuthEnv; Variables: AuthVariables }>()
  .use('/api/*', async (c, next) => {
    const auth = createAuth(c.env)

    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    c.set('auth', auth)

    c.set('user', session?.user ?? null)

    c.set('session', session?.session ?? null)

    await next()
  })
  .get('/api/health', (c) => c.json({ ok: true as const }, 200))
  .delete('/api/demo-profile', async (c) => {
    const db = createDb(c.env.interview)

    await deleteDemoProfileForRequest(c, db)

    return c.body(null, 204)
  })
  .route('/', authApp)
  .route('/', questionsApp)

export default {
  fetch: app.fetch,
  async scheduled(
    _controller: ScheduledController,
    env: AuthEnv,
    _ctx: ExecutionContext,
  ) {
    await purgeExpiredDemoProfiles(env)
  },
}

export type AppType = typeof app

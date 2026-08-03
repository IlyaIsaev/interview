import type { D1Database } from '@cloudflare/workers-types'
import { betterAuth } from 'better-auth/minimal'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { Hono } from 'hono'

import { createDb } from '@/db'
import * as schema from '@/db/schema'

export type AuthEnv = {
  interview: D1Database
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
}

export const createAuth = (env: AuthEnv) => {
  const db = createDb(env.interview)

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.BETTER_AUTH_URL],
  })
}

export type Auth = ReturnType<typeof createAuth>

type Variables = {
  auth: Auth
  user: Auth['$Infer']['Session']['user'] | null
  session: Auth['$Infer']['Session']['session'] | null
}

export const app = new Hono<{ Bindings: AuthEnv; Variables: Variables }>()
  .use('/api/*', async (c, next) => {
    const auth = createAuth(c.env)
    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    c.set('auth', auth)
    c.set('user', session?.user ?? null)
    c.set('session', session?.session ?? null)

    await next()
  })
  .on(['POST', 'GET'], '/api/auth/*', (c) => c.get('auth').handler(c.req.raw))
  .get('/api/me', (c) => {
    const user = c.get('user')

    if (!user) {
      return c.json({ error: 'Unauthorized' as const }, 401)
    }

    return c.json({ user }, 200)
  })

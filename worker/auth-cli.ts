import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

// Used only by Better Auth CLI (`pnpm auth:generate`).
export const auth = betterAuth({
  database: drizzleAdapter({} as never, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
})

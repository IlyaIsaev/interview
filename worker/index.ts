import { createAuth, type AuthEnv } from '@/auth/server'

export default {
  async fetch(request: Request, env: AuthEnv) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/auth')) {
      const auth = createAuth(env)

      return auth.handler(request)
    }

    return new Response('Not found', { status: 404 })
  },
}

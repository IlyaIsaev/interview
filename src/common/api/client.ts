import { hc } from 'hono/client'

import type { AppType } from '../../../worker/index'

const baseUrl =
  typeof globalThis.location === 'undefined'
    ? 'http://localhost'
    : globalThis.location.origin

export const api = hc<AppType>(baseUrl, {
  init: {
    credentials: 'include',
  },
})

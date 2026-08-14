import { reatomRoute, urlAtom } from '@reatom/core'

import { isLoggedIn, isSessionPending } from '@/modules/auth'

/**
 * Guest-only sign-in.
 * Blocks while the session is loading; redirects home when already authenticated.
 */
export const signInRoute = reatomRoute(
  {
    path: 'sign-in',
    params() {
      if (isSessionPending()) {
        return null
      }

      if (isLoggedIn()) {
        urlAtom.go('/')

        return null
      }

      return {}
    },
  },
  'signInRoute',
)

/**
 * Guest-only sign-up (legacy path).
 * Blocks while the session is loading; redirects home when already authenticated.
 */
export const signUpRoute = reatomRoute(
  {
    path: 'sign-up',
    params() {
      if (isSessionPending()) {
        return null
      }

      if (isLoggedIn()) {
        urlAtom.go('/')

        return null
      }

      return {}
    },
  },
  'signUpRoute',
)

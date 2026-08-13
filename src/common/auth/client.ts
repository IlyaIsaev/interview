import { computed, reatomObservable } from '@reatom/core'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient()

export const { signIn, signUp, signOut, useSession } = authClient

export type Session = typeof authClient.$Infer.Session

export type User = Session['user']

type SessionState = {
  data: Session | null

  error: Error | null

  isPending: boolean
  isRefetching: boolean
  refetch: () => Promise<void>
}

const betterAuthSession = authClient.$store.atoms.session

export const session = reatomObservable(
  {
    getState: () => betterAuthSession.get() as SessionState,
    subscribe: (listener) =>
      betterAuthSession.subscribe((value) => {
        listener(value as SessionState)
      }),
  },
  'session',
)

/** Current user, or `null` when logged out. */
export const user = computed(() => session().data?.user ?? null, 'user')

/** Whether a user is currently logged in. */
export const isLoggedIn = computed(() => user() !== null, 'isLoggedIn')

/** Whether the initial session is still loading (not a background refetch). */
export const isSessionPending = computed(() => {
  const sessionState = session()

  return sessionState.isPending && !sessionState.isRefetching
}, 'isSessionPending')

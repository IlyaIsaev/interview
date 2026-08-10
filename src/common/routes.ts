import { reatomRoute, urlAtom } from '@reatom/core'

import { api } from '@/common/api'
import { isLoggedIn, isSessionPending } from '@/common/auth'

/** Serializable question shape returned by the home route loader. */
export type HomeQuestion = {
  id: string
  question: string
  answer: string
  createdAt: Date | string | number
  updatedAt: Date | string | number
}

export type HomeLoaderData = {
  questions: HomeQuestion[]
  randomQuestion: HomeQuestion | null
}

export type HomeRouteParams = {
  /** Auth bank mode — included so the loader re-runs on sign-in / sign-out. */
  mode: 'demo' | 'personal'
}

const buildEmptyHomeLoaderData = (
  questions: HomeQuestion[],
): HomeLoaderData => ({
  questions,
  randomQuestion: null,
})

const loadHomeQuestionsAndRandom = async (): Promise<HomeLoaderData> => {
  const listResponse = await api.questions.$get()

  if (!listResponse.ok) {
    throw new Error('Failed to load questions')
  }

  const listPayload = await listResponse.json()
  const questions = listPayload.questions as HomeQuestion[]

  if (questions.length === 0) {
    return buildEmptyHomeLoaderData(questions)
  }

  const randomResponse = await api.questions.random.$get()

  if (!randomResponse.ok) {
    if (randomResponse.status === 404) {
      return buildEmptyHomeLoaderData(questions)
    }

    throw new Error('Failed to load question')
  }

  const randomPayload = await randomResponse.json()

  return {
    questions,
    randomQuestion: randomPayload.question as HomeQuestion,
  }
}

/**
 * Public home route.
 * `params` waits for the session and injects auth mode so the loader reloads
 * when switching between demo and personal banks.
 */
export const homeRoute = reatomRoute(
  {
    path: '',
    params(): HomeRouteParams | null {
      // Block until auth is known so demo vs personal bank is correct.
      if (isSessionPending()) {
        return null
      }

      return {
        mode: isLoggedIn() ? 'personal' : 'demo',
      }
    },
    loader: loadHomeQuestionsAndRandom,
  },
  'homeRoute',
)

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

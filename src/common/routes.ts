import { reatomRoute, urlAtom } from '@reatom/core'

import { api } from '@/common/api'
import { isLoggedIn, isSessionPending } from '@/common/auth'
import type { Question, QuestionsHydrationPayload } from '@/modules/questions'

export type HomeLoaderData = QuestionsHydrationPayload

export type HomeRouteParams = {
  /** Auth bank mode — included so the loader re-runs on sign-in / sign-out. */
  mode: 'demo' | 'personal'
}

const getHomeRouteParams = (): HomeRouteParams | null => {
  if (isSessionPending()) {
    return null
  }

  return {
    mode: isLoggedIn() ? 'personal' : 'demo',
  }
}

const buildEmptyHomeLoaderData = (
  questionBank: Question[],
): HomeLoaderData => ({
  questions: questionBank,
  randomQuestion: null,
})

const loadQuestions = async (): Promise<Question[]> => {
  const response = await api.questions.$get()

  if (!response.ok) {
    throw new Error('Failed to load questions')
  }

  const payload = await response.json()

  return payload.questions as Question[]
}

const loadQuestionsAndRandom = async (): Promise<HomeLoaderData> => {
  const questionBank = await loadQuestions()

  if (questionBank.length === 0) {
    return buildEmptyHomeLoaderData(questionBank)
  }

  const randomResponse = await api.questions.random.$get()

  if (!randomResponse.ok) {
    if (randomResponse.status === 404) {
      return buildEmptyHomeLoaderData(questionBank)
    }

    throw new Error('Failed to load question')
  }

  const randomPayload = await randomResponse.json()

  return {
    questions: questionBank,
    randomQuestion: randomPayload.question as Question,
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
    params: getHomeRouteParams,
    loader: loadQuestionsAndRandom,
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

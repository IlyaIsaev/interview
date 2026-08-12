import { reatomRoute, urlAtom } from '@reatom/core'

import { api } from '@/common/api'
import { isLoggedIn, isSessionPending } from '@/common/auth'

/** Serializable question shape returned by question page loaders. */
export type HomeQuestion = {
  id: string
  question: string
  answer: string
  createdAt: Date | string | number
  updatedAt: Date | string | number
}

export type QuestionsLoaderData = {
  questions: HomeQuestion[]
}

export type HomeLoaderData = QuestionsLoaderData & {
  randomQuestion: HomeQuestion | null
}

export type HomeRouteParams = {
  /** Auth bank mode — included so the loader re-runs on sign-in / sign-out. */
  mode: 'demo' | 'personal'
}

const getQuestionRouteParams = (): HomeRouteParams | null => {
  if (isSessionPending()) {
    return null
  }

  return {
    mode: isLoggedIn() ? 'personal' : 'demo',
  }
}

const buildEmptyHomeLoaderData = (
  questions: HomeQuestion[],
): HomeLoaderData => ({
  questions,
  randomQuestion: null,
})

const loadQuestions = async (): Promise<HomeQuestion[]> => {
  const response = await api.questions.$get()

  if (!response.ok) {
    throw new Error('Failed to load questions')
  }

  const payload = await response.json()

  return payload.questions as HomeQuestion[]
}

const loadQuestionsAndRandom = async (): Promise<HomeLoaderData> => {
  const questions = await loadQuestions()

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
    params: getQuestionRouteParams,
    loader: loadQuestionsAndRandom,
  },
  'homeRoute',
)

/** Public test page for the sidebar layout. */
export const testRoute = reatomRoute(
  {
    path: 'test',
    params: getQuestionRouteParams,
    loader: loadQuestionsAndRandom,
  },
  'testRoute',
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

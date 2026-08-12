import { reatomRoute, urlAtom } from '@reatom/core'

import { api } from '@/common/api'
import { isLoggedIn, isSessionPending } from '@/common/auth'
import type { Question, QuestionsHydrationPayload } from '@/modules/questions'

export type HomeRedirectLoaderData = {
  questions: Question[]
  /** First item in the bank (sidebar order); used for open-app redirect. */
  firstQuestion: Question | null
}

export type QuestionsLoaderData = QuestionsHydrationPayload

type AuthBankModeParams = {
  /** Auth bank mode — included so loaders re-run on sign-in / sign-out. */
  mode: 'demo' | 'personal'
}

const getAuthBankModeParams = (): AuthBankModeParams | null => {
  if (isSessionPending()) {
    return null
  }

  return {
    mode: isLoggedIn() ? 'personal' : 'demo',
  }
}

const loadQuestionBank = async (): Promise<Question[]> => {
  const response = await api.questions.$get()

  if (!response.ok) {
    throw new Error('Failed to load questions')
  }

  const payload = await response.json()

  return payload.questions as Question[]
}

const loadQuestionById = async (
  questionId: string,
): Promise<Question | null> => {
  const response = await api.questions[':id'].$get({
    param: {
      id: questionId,
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }

    throw new Error('Failed to load question')
  }

  const payload = await response.json()

  return payload.question as Question
}

/**
 * Root path: no UI. Loader takes the first bank question so the page can redirect
 * to `/questions/:id` (or `/questions` when the bank is empty).
 */
export const homeRoute = reatomRoute(
  {
    path: '',
    params: getAuthBankModeParams,
    loader: async (): Promise<HomeRedirectLoaderData> => {
      const questionBank = await loadQuestionBank()
      const firstQuestion = questionBank[0] ?? null

      return {
        questions: questionBank,
        firstQuestion,
      }
    },
  },
  'homeRoute',
)

/**
 * Empty / intermediate questions path (no id).
 * Sibling of `questionRoute` — not nested — so only one loader runs per URL.
 */
export const questionsRoute = reatomRoute(
  {
    path: 'questions',
    params: getAuthBankModeParams,
    loader: async (): Promise<QuestionsLoaderData> => {
      const questionBank = await loadQuestionBank()

      return {
        questions: questionBank,
        currentQuestion: questionBank[0] ?? null,
      }
    },
  },
  'questionsRoute',
)

/**
 * Deep-linkable question view: `/questions/:questionId`.
 * Top-level (not nested under questionsRoute) so parent loaders do not re-run on every click.
 */
export const questionRoute = reatomRoute(
  {
    path: 'questions/:questionId',
    params(rawParams) {
      if (isSessionPending()) {
        return null
      }

      const questionId =
        typeof rawParams.questionId === 'string'
          ? rawParams.questionId.trim()
          : ''

      if (!questionId) {
        return null
      }

      return {
        questionId,
        mode: isLoggedIn() ? 'personal' : 'demo',
      }
    },
    loader: async ({ questionId }): Promise<QuestionsLoaderData> => {
      const questionBank = await loadQuestionBank()
      const questionFromBank =
        questionBank.find((question) => question.id === questionId) ?? null

      // Prefer bank (same data as sidebar); fall back to by-id only if missing.
      const currentQuestion =
        questionFromBank ?? (await loadQuestionById(questionId))

      return {
        questions: questionBank,
        currentQuestion,
      }
    },
  },
  'questionRoute',
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

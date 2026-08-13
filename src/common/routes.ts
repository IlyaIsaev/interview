import { reatomRoute, urlAtom } from '@reatom/core'
import { z } from 'zod'

import { api } from '@/common/api'
import { isLoggedIn, isSessionPending } from '@/common/auth'
import type { Question, QuestionsHydrationPayload } from '@/modules/questions'

export type HomeRedirectLoaderData = {
  /** Random question id for open-app redirect; null when the bank is empty. */
  randomQuestionId: string | null
}

export type QuestionsIndexLoaderData = {
  /** Random question id to open; null when the bank is empty. */
  randomQuestionId: string | null
}

export type QuestionsLoaderData = QuestionsHydrationPayload

type AuthBankModeParams = {
  /** Auth bank mode — included so loaders re-run on sign-in / sign-out. */
  mode: 'demo' | 'personal'
}

const homePathnameSchema = z.literal('/')

const questionsPathnameSchema = z.literal('/questions')

const getNormalizedPathname = (): string => {
  const pathname = urlAtom().pathname.replace(/\/+$/, '')

  return pathname === '' ? '/' : pathname
}

const getAuthBankModeParams = (): AuthBankModeParams | null => {
  if (isSessionPending()) {
    return null
  }

  return {
    mode: isLoggedIn() ? 'personal' : 'demo',
  }
}

const getExactPathAuthBankModeParams = (
  pathnameSchema: z.ZodType<string>,
): AuthBankModeParams | null => {
  const parsedPathname = pathnameSchema.safeParse(getNormalizedPathname())

  if (!parsedPathname.success) {
    return null
  }

  return getAuthBankModeParams()
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

export const loadRandomQuestionId = async (
  excludeQuestionId?: string,
): Promise<string | null> => {
  const response = excludeQuestionId
    ? await api.questions.random.$get({
        query: {
          exclude: excludeQuestionId,
        },
      })
    : await api.questions.random.$get()

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }

    throw new Error('Failed to load question')
  }

  const payload = await response.json()

  return payload.questionId
}

/**
 * Root path: no UI. Loader takes a random question so the page can redirect
 * to `/questions/:id` (or `/questions` when the bank is empty).
 */
export const homeRoute = reatomRoute(
  {
    path: '',
    params: () => getExactPathAuthBankModeParams(homePathnameSchema),
    loader: async (): Promise<HomeRedirectLoaderData> => {
      const randomQuestionId = await loadRandomQuestionId()

      return {
        randomQuestionId,
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
    params: () => getExactPathAuthBankModeParams(questionsPathnameSchema),
    loader: async (): Promise<QuestionsIndexLoaderData> => {
      const randomQuestionId = await loadRandomQuestionId()

      return {
        randomQuestionId,
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
      const currentQuestion = await loadQuestionById(questionId)

      return {
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

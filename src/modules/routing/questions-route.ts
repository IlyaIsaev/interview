import { reatomRoute, wrap } from '@reatom/core'

import { isLoggedIn, isSessionPending } from '@/modules/auth'
import {
  fetchQuestion,
  fetchRandomQuestionId,
  type QuestionsHydrationPayload,
} from '@/modules/questions'

import { getAuthBankModeParams, getNormalizedPathname } from './pathname'

export type QuestionsIndexLoaderData = {
  /** Random question id to open; null when the bank is empty. */
  randomQuestionId: string | null
}

export type QuestionsLoaderData = QuestionsHydrationPayload

/**
 * Empty / intermediate questions path (no id).
 * Sibling of `questionRoute` — not nested — so only one loader runs per URL.
 */
export const questionsRoute = reatomRoute(
  {
    path: 'questions',
    params: () => {
      if (getNormalizedPathname() !== '/questions') {
        return null
      }

      return getAuthBankModeParams()
    },
    loader: async (): Promise<QuestionsIndexLoaderData> => {
      const randomQuestionId = await wrap(fetchRandomQuestionId())

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
      const currentQuestion = await wrap(fetchQuestion(questionId))

      return {
        currentQuestion,
      }
    },
  },
  'questionRoute',
)

import { reatomRoute, wrap } from '@reatom/core'

import { fetchRandomQuestionId } from '@/modules/questions'

import { getAuthBankModeParams, getNormalizedPathname } from './pathname'

export type HomeRedirectLoaderData = {
  /** Random question id for open-app redirect; null when the bank is empty. */
  randomQuestionId: string | null
}

/**
 * Root path: no UI. Loader takes a random question so the page can redirect
 * to `/questions/:id` (or `/questions` when the bank is empty).
 */
export const homeRoute = reatomRoute(
  {
    path: '',
    params: () => {
      if (getNormalizedPathname() !== '/') {
        return null
      }

      return getAuthBankModeParams()
    },
    loader: async (): Promise<HomeRedirectLoaderData> => {
      const randomQuestionId = await wrap(fetchRandomQuestionId())

      return {
        randomQuestionId,
      }
    },
  },
  'homeRoute',
)

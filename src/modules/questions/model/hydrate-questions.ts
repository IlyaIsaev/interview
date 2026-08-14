import { action } from '@reatom/core'

import { hydrateReadQuestionFromPayload } from '../modules/read'
import type { QuestionsHydrationPayload } from './question'
import { markQuestionsHydrationPayloadApplied } from './questions'

/**
 * Apply a route-loader snapshot into the shown-question atom.
 * Does not touch the question bank (loaded on sidebar open / CUD).
 */
export const hydrateQuestionsSession = action(
  (hydrationPayload: QuestionsHydrationPayload) => {
    hydrateReadQuestionFromPayload(hydrationPayload)

    markQuestionsHydrationPayloadApplied(hydrationPayload)
  },
  'hydrateQuestionsSession',
)

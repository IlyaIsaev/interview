import { action } from '@reatom/core'

import {
  markQuestionsHydrationPayloadApplied,
  type QuestionsHydrationPayload,
} from './questions'
import { hydrateReadQuestionFromPayload } from '../modules/read/model/read-question'

/**
 * Apply a route-loader snapshot into the read atom.
 * Does not touch the question bank (loaded on sidebar open / CUD).
 */
export const hydrateQuestionsSession = action(
  (hydrationPayload: QuestionsHydrationPayload) => {
    hydrateReadQuestionFromPayload(hydrationPayload)

    markQuestionsHydrationPayloadApplied(hydrationPayload)
  },
  'hydrateQuestionsSession',
)

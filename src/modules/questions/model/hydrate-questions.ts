import { action } from '@reatom/core'

import {
  hydrateQuestionsFromPayload,
  type QuestionsHydrationPayload,
} from './questions'
import { hydrateReadQuestionFromPayload } from '../modules/read/model/read-question'

/**
 * Apply a questions hydration snapshot into bank + read atoms.
 * Called from the page layer when loader payload is available.
 */
export const hydrateQuestionsSession = action(
  (hydrationPayload: QuestionsHydrationPayload) => {
    // Read first: it checks isQuestionsHydrationPayloadAlreadyApplied before questions marks the payload applied.
    hydrateReadQuestionFromPayload(hydrationPayload)

    hydrateQuestionsFromPayload(hydrationPayload)
  },
  'hydrateQuestionsSession',
)

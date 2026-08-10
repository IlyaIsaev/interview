import { action } from '@reatom/core'

import type { HomeLoaderData } from '@/common/routes'

import { hydrateQuestionsFromHomeLoader } from './questions'
import { hydrateReadQuestionFromHomeLoader } from '../modules/read/model/read-question'

/**
 * Apply home route loader payload into questions + read atoms.
 * Called from the home page model when loader payload is available.
 */
export const hydrateHomeLoaderData = action((homeLoaderPayload: HomeLoaderData) => {
  // Read first: it checks isHomeLoaderDataAlreadyHydrated before questions marks the payload applied.
  hydrateReadQuestionFromHomeLoader(homeLoaderPayload)

  hydrateQuestionsFromHomeLoader(homeLoaderPayload)
}, 'hydrateHomeLoaderData')

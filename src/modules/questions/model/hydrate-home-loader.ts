import { action } from '@reatom/core'

import type { HomeLoaderData } from '@/common/routes'

import { hydrateQuestionsFromHomeLoader } from './questions'
import { hydrateReadQuestionFromHomeLoader } from '../modules/read/model/read-question'

/**
 * Apply home route loader payload into questions + read atoms.
 * Call from the home page during render after `homeRoute.loader.data()` is available.
 */
export const hydrateHomeLoaderData = action((data: HomeLoaderData) => {
  // Read first: it uses wasHomeLoaderDataHydrated before questions marks the payload applied.
  hydrateReadQuestionFromHomeLoader(data)

  hydrateQuestionsFromHomeLoader(data)
}, 'hydrateHomeLoaderData')

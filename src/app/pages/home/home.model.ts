import { effect } from '@reatom/core'

import { homeRoute } from '@/common/routes'
import {
  clearReadQuestion,
  hydrateQuestionsSession,
  resetQuestionsHydration,
} from '@/modules/questions'

/**
 * Bridge the home route loader into the questions module.
 * Route awareness stays in the page layer — modules never import routes.
 */
effect(() => {
  if (!homeRoute()) {
    resetQuestionsHydration()
    clearReadQuestion()

    return
  }

  const homeLoaderPayload = homeRoute.loader.data()

  if (!homeLoaderPayload) {
    return
  }

  hydrateQuestionsSession(homeLoaderPayload)
}, 'homePageSyncQuestionsSession')

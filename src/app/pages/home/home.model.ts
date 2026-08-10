import { effect } from '@reatom/core'

import { homeRoute } from '@/common/routes'
import { hydrateHomeLoaderData } from '@/modules/questions'

/**
 * When the home route is active and its loader has payload, hydrate domain atoms.
 * Kept out of the view so render stays declarative.
 */
effect(() => {
  if (!homeRoute()) {
    return
  }

  const homeLoaderPayload = homeRoute.loader.data()

  if (!homeLoaderPayload) {
    return
  }

  hydrateHomeLoaderData(homeLoaderPayload)
}, 'homePageHydrateLoader')

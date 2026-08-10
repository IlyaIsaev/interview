import { effect } from '@reatom/core'

import { homeRoute } from '@/common/routes'
import { hydrateHomeLoaderData } from '@/modules/questions'

/**
 * When the home route is active and its loader has data, hydrate domain atoms.
 * Kept out of the view so render stays declarative.
 */
effect(() => {
  if (!homeRoute()) {
    return
  }

  const data = homeRoute.loader.data()

  if (!data) {
    return
  }

  hydrateHomeLoaderData(data)
}, 'homePageHydrateLoader')

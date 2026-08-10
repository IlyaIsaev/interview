import { reatomComponent } from '@reatom/react'

import { Spinner } from '@/common/components/ui/spinner'
import { homeRoute } from '@/common/routes'
import { ReadQuestion } from '@/modules/questions'

export const HomePage = reatomComponent(() => {
  // Route params gate: home is unmatched while session is pending.
  if (!homeRoute.exact()) {
    return null
  }

  const homeLoaderPayload = homeRoute.loader.data()
  const isHomeLoaderReady = homeRoute.loader.ready()
  const homeLoaderError = homeRoute.loader.error()

  if (!isHomeLoaderReady) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="size-5" />
      </div>
    )
  }

  if (homeLoaderError && !homeLoaderPayload) {
    return (
      <p className="w-full text-center text-sm text-destructive">
        {homeLoaderError.message || 'Failed to load questions'}
      </p>
    )
  }

  if (!homeLoaderPayload) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="size-5" />
      </div>
    )
  }

  return <ReadQuestion />
}, 'HomePage')

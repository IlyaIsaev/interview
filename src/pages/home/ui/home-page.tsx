import { reatomComponent } from '@reatom/react'

import { Spinner } from '@/common/ui/spinner'
import { homeRoute } from '@/modules/routing'

/** Empty redirect shell — content lives under `/questions`. */
const HomePage = reatomComponent(() => {
  if (!homeRoute.exact()) {
    return null
  }

  const homeLoaderError = homeRoute.loader.error()

  if (homeLoaderError) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center px-4">
        <p className="text-center text-sm text-destructive">
          {homeLoaderError.message || 'Failed to open questions'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <Spinner className="size-6" />
    </div>
  )
}, 'HomePage')

export default HomePage

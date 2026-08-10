import { reatomComponent } from '@reatom/react'

import { Spinner } from '@/common/components/ui/spinner'
import { homeRoute } from '@/common/routes'
import { ReadQuestion } from '@/modules/questions'

export const HomePage = reatomComponent(() => {
  // Route params gate: home is unmatched while session is pending.
  if (!homeRoute.exact()) {
    return null
  }

  const data = homeRoute.loader.data()
  const ready = homeRoute.loader.ready()
  const error = homeRoute.loader.error()

  if (!ready) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="size-5" />
      </div>
    )
  }

  if (error && !data) {
    return (
      <p className="w-full text-center text-sm text-destructive">
        {error.message || 'Failed to load questions'}
      </p>
    )
  }

  if (!data) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="size-5" />
      </div>
    )
  }

  return <ReadQuestion />
}, 'HomePage')

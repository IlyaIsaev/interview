import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { isLoggedIn, signOut } from '@/common/auth'
import { Button } from '@/common/components/ui/button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/common/components/ui/sidebar'
import { Spinner } from '@/common/components/ui/spinner'
import { homeRoute, signInRoute } from '@/common/routes'
import { questions, QuestionsSidebar, ReadQuestion } from '@/modules/questions'

export const HomePage = reatomComponent(() => {
  if (!homeRoute.exact()) {
    return null
  }

  const homeLoaderPayload = homeRoute.loader.data()
  const isHomeLoaderReady = homeRoute.loader.ready()
  const homeLoaderError = homeRoute.loader.error()

  if (!isHomeLoaderReady) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    )
  }

  const questionBank = questions()

  return (
    <SidebarProvider defaultOpen={false}>
      <QuestionsSidebar
        questions={homeLoaderPayload ? questionBank : []}
        isLoading={!isHomeLoaderReady}
        error={homeLoaderError}
      />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold">Interview</h1>
          {isLoggedIn() ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={wrap(() => {
                void signOut()
              })}
            >
              Sign out
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={wrap(() => {
                signInRoute.go()
              })}
            >
              Sign in
            </Button>
          )}
        </header>
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-10">
          {homeLoaderError && !homeLoaderPayload ? (
            <p className="w-full text-center text-sm text-destructive">
              {homeLoaderError.message || 'Failed to load questions'}
            </p>
          ) : homeLoaderPayload ? (
            <ReadQuestion />
          ) : (
            <div className="flex w-full justify-center">
              <Spinner className="size-5" />
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}, 'HomePage')

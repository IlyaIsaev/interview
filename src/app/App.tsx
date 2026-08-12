import { action, effect, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { lazy, Suspense } from 'react'

import { isSessionPending } from '@/common/auth'
import { Toaster } from '@/common/components/ui/sonner'
import { Spinner } from '@/common/components/ui/spinner'
import { TooltipProvider } from '@/common/components/ui/tooltip'
import { homeRoute, signInRoute, signUpRoute } from '@/common/routes'

const HomePage = lazy(() => import('./pages/home'))

const SignInPage = lazy(() => import('./pages/sign-in'))

function FullPageFallback() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <Spinner className="size-6" />
    </div>
  )
}

const navigateToHome = action(() => {
  homeRoute.go()
}, 'navigateToHome')

// Sign-up is disabled — send legacy /sign-up visits to sign-in (when guest).
effect(() => {
  if (!signUpRoute.exact()) {
    return
  }

  signInRoute.go()
}, 'redirectSignUpToSignIn')

const App = reatomComponent(() => {
  const isAuthSessionPending = isSessionPending()

  if (isAuthSessionPending) {
    return (
      <TooltipProvider>
        <FullPageFallback />
        <Toaster />
      </TooltipProvider>
    )
  }

  if (signInRoute.exact()) {
    return (
      <TooltipProvider>
        <div className="flex min-h-svh flex-col">
          <header className="border-b border-border">
            <nav className="mx-auto flex h-12 w-full max-w-7xl items-center gap-3 px-4">
              <button
                type="button"
                className="text-sm font-medium"
                onClick={wrap(navigateToHome)}
              >
                Interview
              </button>
            </nav>
          </header>
          <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-10">
            <Suspense fallback={<FullPageFallback />}>
              <SignInPage />
            </Suspense>
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Suspense fallback={<FullPageFallback />}>
        {homeRoute.exact() ? <HomePage /> : null}
      </Suspense>
      <Toaster />
    </TooltipProvider>
  )
}, 'App')

export default App

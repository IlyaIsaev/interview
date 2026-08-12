import { action, effect, urlAtom, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { lazy, Suspense } from 'react'

import { isLoggedIn, isSessionPending, signOut } from '@/common/auth'
import { Toaster } from '@/common/components/ui/sonner'
import { Spinner } from '@/common/components/ui/spinner'
import { TooltipProvider } from '@/common/components/ui/tooltip'
import { homeRoute, signInRoute, signUpRoute } from '@/common/routes'
import {
  CreateQuestionButton,
  CreateQuestionDialog,
  QuestionsDrawer,
} from '@/modules/questions'

const HomePage = lazy(() => import('./pages/home'))

const SignInPage = lazy(() => import('./pages/sign-in'))
const TestPage = lazy(() => import('./pages/test'))

function PageFallback() {
  return (
    <div className="flex w-full justify-center">
      <Spinner className="size-6" />
    </div>
  )
}

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

const navigateToSignIn = action(() => {
  signInRoute.go()
}, 'navigateToSignIn')

const signOutCurrentUser = action(() => {
  void signOut()
}, 'signOutCurrentUser')

// Sign-up is disabled — send legacy /sign-up visits to sign-in (when guest).
effect(() => {
  if (!signUpRoute.exact()) {
    return
  }

  signInRoute.go()
}, 'redirectSignUpToSignIn')

const App = reatomComponent(() => {
  if (urlAtom().pathname === '/test') {
    return (
      <TooltipProvider>
        <Suspense fallback={<FullPageFallback />}>
          <TestPage />
        </Suspense>
        <Toaster />
      </TooltipProvider>
    )
  }

  const isAuthSessionPending = isSessionPending()

  return (
    <TooltipProvider>
      <div className="flex min-h-svh flex-col">
        <header className="border-b border-border">
          <div className="relative flex h-12 w-full items-center">
            <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2">
              <QuestionsDrawer />
            </div>
            <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
              <CreateQuestionButton />
            </div>
            <CreateQuestionDialog />
            <nav className="mx-auto flex h-full w-full max-w-7xl items-center gap-3 px-4">
              <button
                type="button"
                className="text-sm font-medium"
                onClick={wrap(navigateToHome)}
              >
                Interview
              </button>
              <div className="ml-auto flex items-center gap-3">
                {isLoggedIn() ? (
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={wrap(signOutCurrentUser)}
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={wrap(navigateToSignIn)}
                  >
                    Sign in
                  </button>
                )}
              </div>
            </nav>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-10">
          {isAuthSessionPending ? (
            <PageFallback />
          ) : (
            <Suspense fallback={<PageFallback />}>
              {homeRoute.exact() ? <HomePage /> : null}
              {signInRoute.exact() ? <SignInPage /> : null}
            </Suspense>
          )}
        </main>
      </div>
      <Toaster />
    </TooltipProvider>
  )
}, 'App')

export default App

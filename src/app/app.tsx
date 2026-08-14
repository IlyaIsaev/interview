import { action, effect, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { lazy, Suspense } from 'react'

import { CookieConsent } from '@/common/ui/cookie-consent'
import { Toaster } from '@/common/ui/sonner'
import { Spinner } from '@/common/ui/spinner'
import { ThemeToggle } from '@/common/ui/theme-toggle'
import { TooltipProvider } from '@/common/ui/tooltip'
import { isLoggedIn, isSessionPending } from '@/modules/auth'
import {
  homeRoute,
  questionRoute,
  questionsRoute,
  signInRoute,
  signUpRoute,
} from '@/modules/routing'

const HomePage = lazy(() => import('@/pages/home'))

const QuestionsPage = lazy(() => import('@/pages/questions'))

const SignInPage = lazy(() => import('@/pages/sign-in'))

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

const declineCookieConsent = action(async () => {
  try {
    await fetch('/api/demo-profile', {
      method: 'DELETE',
      credentials: 'include',
    })
  } catch {
    // Leave even if the demo profile could not be deleted.
  }

  window.location.assign('https://www.google.com')
}, 'declineCookieConsent')

function GuestCookieConsent() {
  return (
    <CookieConsent
      variant="mini"
      onDeclineCallback={() => {
        void declineCookieConsent()
      }}
    />
  )
}

// Sign-up is disabled — send legacy /sign-up visits to sign-in (when guest).
effect(() => {
  if (!signUpRoute.exact()) {
    return
  }

  signInRoute.go()
}, 'redirectSignUpToSignIn')

export const App = reatomComponent(() => {
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
                className="text-ui font-medium tracking-wider uppercase"
                onClick={wrap(navigateToHome)}
              >
                Interview
              </button>
              <div className="ml-auto">
                <ThemeToggle />
              </div>
            </nav>
          </header>
          <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-10">
            <Suspense fallback={<FullPageFallback />}>
              <SignInPage />
            </Suspense>
          </main>
        </div>
        <Toaster />
        <GuestCookieConsent />
      </TooltipProvider>
    )
  }

  const isQuestionsShellActive =
    questionsRoute() !== null || questionRoute() !== null

  return (
    <TooltipProvider>
      <Suspense fallback={<FullPageFallback />}>
        {homeRoute.exact() ? <HomePage /> : null}
        {isQuestionsShellActive ? <QuestionsPage /> : null}
      </Suspense>
      <Toaster />
      {isLoggedIn() ? null : <GuestCookieConsent />}
    </TooltipProvider>
  )
}, 'App')

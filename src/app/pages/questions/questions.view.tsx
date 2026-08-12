import { action, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { isLoggedIn, signOut } from '@/common/auth'
import { Button } from '@/common/components/ui/button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/common/components/ui/sidebar'
import { Spinner } from '@/common/components/ui/spinner'
import {
  homeRoute,
  questionRoute,
  questionsRoute,
  signInRoute,
} from '@/common/routes'
import {
  questions,
  QuestionsSidebar,
  readQuestion,
  ReadQuestion,
} from '@/modules/questions'

import { goToNextQuestion, navigateToQuestion } from './questions.model'

const navigateToHome = action(() => {
  homeRoute.go()
}, 'navigateToHomeFromQuestionsShell')

export const QuestionsPage = reatomComponent(() => {
  const isQuestionsShellActive =
    questionsRoute() !== null || questionRoute() !== null

  if (!isQuestionsShellActive) {
    return null
  }

  const isQuestionDetail = questionRoute.exact()
  const activeLoader = isQuestionDetail
    ? questionRoute.loader
    : questionsRoute.loader

  const loaderPayload = activeLoader.data()
  const isLoaderReady = activeLoader.ready()
  const loaderError = activeLoader.error()
  const currentReadQuestion = readQuestion()
  const questionBank = questions()

  // Keep shell visible during in-place navigations if we already have bank/read state.
  const hasShellContent =
    questionBank.length > 0 ||
    currentReadQuestion !== null ||
    Boolean(loaderPayload)

  if (!isLoaderReady && !hasShellContent) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    )
  }

  const urlQuestionId = questionRoute()?.questionId
  const isQuestionMissing =
    isLoaderReady &&
    Boolean(urlQuestionId) &&
    Boolean(loaderPayload) &&
    loaderPayload?.currentQuestion === null &&
    !loaderError &&
    !currentReadQuestion

  return (
    <SidebarProvider defaultOpen={false}>
      <QuestionsSidebar
        questions={
          questionBank.length > 0
            ? questionBank
            : (loaderPayload?.questions ?? [])
        }
        isLoading={!isLoaderReady && questionBank.length === 0}
        error={loaderError}
        onQuestionSelect={wrap(navigateToQuestion)}
      />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <button
            type="button"
            className="text-lg font-semibold"
            onClick={wrap(navigateToHome)}
          >
            Interview
          </button>
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
          {loaderError && !loaderPayload && !currentReadQuestion ? (
            <p className="w-full text-center text-sm text-destructive">
              {loaderError.message || 'Failed to load questions'}
            </p>
          ) : isQuestionMissing ? (
            <p className="w-full text-center text-sm text-muted-foreground">
              Question not found
            </p>
          ) : currentReadQuestion || loaderPayload ? (
            <ReadQuestion
              onNextQuestion={wrap(() => {
                void goToNextQuestion()
              })}
              isNextQuestionPending={goToNextQuestion.pending() > 0}
            />
          ) : (
            <div className="flex w-full justify-center">
              <Spinner className="size-5" />
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}, 'QuestionsPage')

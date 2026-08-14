import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/ui/button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/common/ui/sidebar'
import { Spinner } from '@/common/ui/spinner'
import { ThemeToggle } from '@/common/ui/theme-toggle'
import { isLoggedIn } from '@/modules/auth'
import {
  canGoToNextQuestion,
  CreateQuestionButton,
  CreateQuestionDialog,
  DeleteQuestionButton,
  DeleteQuestionDialog,
  goToNextQuestion,
  isNextQuestionPending,
  isQuestionsSidebarOpen,
  openCreateQuestionDialog,
  QuestionsSidebar,
  ReadQuestion,
  UpdateQuestionButton,
  UpdateQuestionDialog,
} from '@/modules/questions'

import {
  isQuestionsShellActive,
  navigateToHome,
  navigateToQuestion,
  navigateToSignIn,
  questionsPageMain,
  signOutUser,
} from '../model/questions-page-model'

const QuestionsPage = reatomComponent(() => {
  if (!isQuestionsShellActive()) {
    return null
  }

  const questionsMain = questionsPageMain()

  if (questionsMain.kind === 'full-page-loading') {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    )
  }

  return (
    <SidebarProvider
      open={isQuestionsSidebarOpen()}
      onOpenChange={wrap(isQuestionsSidebarOpen.set)}
    >
      <QuestionsSidebar
        onQuestionSelect={wrap(navigateToQuestion)}
        renderHeaderAction={() => <CreateQuestionButton />}
        renderQuestionActions={(questionId) => (
          <>
            <UpdateQuestionButton questionId={questionId} />
            <DeleteQuestionButton questionId={questionId} />
          </>
        )}
      >
        <CreateQuestionDialog />
        <UpdateQuestionDialog />
        <DeleteQuestionDialog />
      </QuestionsSidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <button
            type="button"
            className="text-ui font-medium tracking-wider uppercase"
            onClick={wrap(navigateToHome)}
          >
            Interview
          </button>
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            {isLoggedIn() ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={wrap(signOutUser)}
              >
                Sign out
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={wrap(navigateToSignIn)}
              >
                Sign in
              </Button>
            )}
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-10">
          {questionsMain.kind === 'error' ? (
            <p className="w-full text-center text-sm text-destructive">
              {questionsMain.message}
            </p>
          ) : questionsMain.kind === 'missing' ? (
            <p className="w-full text-center text-sm text-muted-foreground">
              Question not found
            </p>
          ) : questionsMain.kind === 'loading' ? (
            <div className="flex w-full justify-center">
              <Spinner className="size-5" />
            </div>
          ) : (
            <ReadQuestion
              onAddQuestion={wrap(openCreateQuestionDialog)}
              canGoToNextQuestion={canGoToNextQuestion()}
              isNextQuestionPending={isNextQuestionPending()}
              onGoToNextQuestion={wrap(goToNextQuestion)}
            />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}, 'QuestionsPage')

export default QuestionsPage

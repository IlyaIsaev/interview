import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { PlusIcon } from 'lucide-react'
import { useEffect } from 'react'

import { MarkdownContent } from '@/common/components/markdown'
import { Button } from '@/common/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
} from '@/common/components/ui/empty'
import { Separator } from '@/common/components/ui/separator'
import { Spinner } from '@/common/components/ui/spinner'
import { isLoggedIn, isSessionPending } from '@/modules/auth'

import { openCreateQuestionDialog } from '../../create'
import {
  ensureReadQuestionLoaded,
  fetchQuestionById,
  fetchRandomQuestion,
  pickReadQuestion,
  readAnswerVisible,
  readQuestion,
  showReadAnswer,
} from '../model/read-question'

export const ReadQuestion = reatomComponent(() => {
  const sessionPending = isSessionPending()
  const loggedIn = isLoggedIn()

  useEffect(() => {
    if (sessionPending || !loggedIn) {
      return
    }

    void ensureReadQuestionLoaded()
  }, [sessionPending, loggedIn])

  if (sessionPending || !loggedIn) {
    return null
  }

  const question = readQuestion()
  const isLoading =
    fetchRandomQuestion.pending() > 0 || fetchQuestionById.pending() > 0
  const answerVisible = readAnswerVisible()

  if (isLoading && !question) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="size-5" />
      </div>
    )
  }

  if (!question) {
    return (
      <div className="mx-auto flex w-full max-w-sm flex-col items-center">
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyTitle>No questions yet</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" onClick={wrap(openCreateQuestionDialog)}>
              <PlusIcon data-icon="inline-start" />
              Add question
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-1 flex-col items-center gap-6 self-stretch">
      <h2 className="text-center text-2xl font-medium tracking-tight text-balance">
        {question.question}
      </h2>

      {answerVisible ? (
        <>
          <Separator />
          <MarkdownContent className="w-full text-base text-muted-foreground">
            {question.answer}
          </MarkdownContent>
        </>
      ) : (
        <Button type="button" variant="outline" onClick={wrap(showReadAnswer)}>
          Show answer
        </Button>
      )}

      {answerVisible ? (
        <Button
          type="button"
          variant="secondary"
          className="mt-auto"
          autoFocus
          disabled={isLoading}
          onClick={wrap(pickReadQuestion)}
        >
          {isLoading ? 'Loading…' : 'Next question'}
        </Button>
      ) : null}
    </div>
  )
}, 'ReadQuestion')

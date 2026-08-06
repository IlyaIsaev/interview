import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/components/ui/button'
import { Separator } from '@/common/components/ui/separator'
import { Spinner } from '@/common/components/ui/spinner'
import { isLoggedIn, isSessionPending } from '@/modules/auth'

import {
  fetchRandomQuestion,
  pickReadQuestion,
  readAnswerVisible,
  readQuestion,
  showReadAnswer,
} from '../model/read-question'

export const ReadQuestion = reatomComponent(() => {
  if (isSessionPending() || !isLoggedIn()) {
    return null
  }

  const question = readQuestion()
  const isLoading = fetchRandomQuestion.pending() > 0
  const answerVisible = readAnswerVisible()

  if (isLoading && !question) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="size-5" />
      </div>
    )
  }

  if (!question) {
    return null
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-1 flex-col items-center gap-6 self-stretch">
      <h2 className="text-center text-2xl font-medium tracking-tight text-balance">
        {question.question}
      </h2>

      {answerVisible ? (
        <>
          <Separator />
          <p className="text-center text-base leading-relaxed text-muted-foreground text-balance whitespace-pre-wrap break-words">
            {question.answer}
          </p>
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

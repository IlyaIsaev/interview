import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { PlusIcon } from 'lucide-react'

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

import { openCreateQuestionDialog } from '../../create'
import {
  fetchQuestionById,
  fetchRandomQuestion,
  pickReadQuestion,
  readAnswerVisible,
  readQuestion,
  showReadAnswer,
} from '../model/read-question'

export const ReadQuestion = reatomComponent(() => {
  const currentQuestion = readQuestion()
  const isQuestionLoading =
    fetchRandomQuestion.pending() > 0 || fetchQuestionById.pending() > 0
  const isAnswerVisible = readAnswerVisible()

  if (isQuestionLoading && !currentQuestion) {
    return (
      <div className="flex w-full justify-center">
        <Spinner className="size-5" />
      </div>
    )
  }

  if (!currentQuestion) {
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
      <MarkdownContent className="w-full text-center text-2xl font-medium tracking-tight text-balance">
        {currentQuestion.question}
      </MarkdownContent>

      {isAnswerVisible ? (
        <div className="w-full space-y-4">
          <Separator />
          <MarkdownContent size="answer" className="w-full text-foreground">
            {currentQuestion.answer}
          </MarkdownContent>
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center justify-center gap-2">
        {!isAnswerVisible ? (
          <Button
            type="button"
            size="lg"
            variant="outline"
            autoFocus
            onClick={wrap(showReadAnswer)}
          >
            Show answer
          </Button>
        ) : null}

        <Button
          type="button"
          size="lg"
          variant="secondary"
          disabled={isQuestionLoading}
          autoFocus={isAnswerVisible}
          onClick={wrap(pickReadQuestion)}
        >
          {isQuestionLoading ? 'Loading…' : 'Next question'}
        </Button>
      </div>
    </div>
  )
}, 'ReadQuestion')

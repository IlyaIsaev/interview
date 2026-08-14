import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/common/ui/button'
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from '@/common/ui/empty'
import { MarkdownContent } from '@/common/ui/markdown'
import { Spinner } from '@/common/ui/spinner'

import { shownQuestion } from '../../../model/shown-question'
import {
  fetchQuestionById,
  readAnswerVisible,
  showReadAnswer,
} from '../model/read-question'

type ReadQuestionProps = {
  onAddQuestion: () => void
  canGoToNextQuestion: boolean
  isNextQuestionPending: boolean
  onGoToNextQuestion: () => void
}

export const ReadQuestion = reatomComponent(
  ({
    onAddQuestion,
    canGoToNextQuestion: hasNextQuestion,
    isNextQuestionPending,
    onGoToNextQuestion,
  }: ReadQuestionProps) => {
    const currentQuestion = shownQuestion()
    const isQuestionLoading =
      isNextQuestionPending || fetchQuestionById.pending() > 0
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
              <Button type="button" onClick={onAddQuestion}>
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
        <MarkdownContent className="w-full text-left text-2xl font-medium tracking-tight text-balance">
          {currentQuestion.question}
        </MarkdownContent>

        {isAnswerVisible ? (
          <MarkdownContent size="answer" className="w-full text-foreground">
            {currentQuestion.answer}
          </MarkdownContent>
        ) : null}

        {!isQuestionLoading && (!isAnswerVisible || hasNextQuestion) ? (
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

            {hasNextQuestion ? (
              <Button
                type="button"
                size="lg"
                variant="secondary"
                autoFocus={isAnswerVisible}
                disabled={isNextQuestionPending}
                onClick={onGoToNextQuestion}
              >
                {isNextQuestionPending ? (
                  <Spinner className="size-4" />
                ) : (
                  'Next question'
                )}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
  'ReadQuestion',
)

import { action, reatomBoolean, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { PanelLeftIcon } from 'lucide-react'
import type { KeyboardEvent, ReactNode } from 'react'

import { Button } from '@/common/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/common/ui/drawer'
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from '@/common/ui/empty'
import { Spinner } from '@/common/ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/common/ui/tooltip'
import { isSessionPending } from '@/modules/auth'

import {
  canCreateQuestion,
  isQuestionsLoaded,
  questions,
  questionsError,
} from '../../../model/questions'
import { QuestionsVirtualList } from './questions-virtual-list'

const questionsDrawerOpen = reatomBoolean(false, 'questionsDrawerOpen')

const openQuestionsDrawer = action(() => {
  questionsDrawerOpen.setTrue()
}, 'openQuestionsDrawer')

const closeQuestionsDrawer = action(() => {
  questionsDrawerOpen.setFalse()
}, 'closeQuestionsDrawer')

type QuestionsDrawerProps = {
  onQuestionSelect: (questionId: string) => void
  renderHeaderAction?: () => ReactNode
  renderEmptyAction?: () => ReactNode
  renderQuestionActions?: (questionId: string) => ReactNode
  children?: ReactNode
}

export const QuestionsDrawer = reatomComponent(
  ({
    onQuestionSelect,
    renderHeaderAction,
    renderEmptyAction,
    renderQuestionActions,
    children,
  }: QuestionsDrawerProps) => {
    const questionBank = questions()
    const isQuestionsListLoading = isSessionPending() || !isQuestionsLoaded()
    const questionsLoadError = questionsError()
    const canAddQuestion = canCreateQuestion()

    const selectQuestion = wrap((questionId: string) => {
      closeQuestionsDrawer()
      onQuestionSelect(questionId)
    })

    const activateQuestionFromKeyboard = wrap(
      (keyboardEvent: KeyboardEvent, questionId: string) => {
        if (keyboardEvent.key !== 'Enter' && keyboardEvent.key !== ' ') {
          return
        }

        if (
          keyboardEvent.target instanceof HTMLElement &&
          keyboardEvent.target.closest('button')
        ) {
          return
        }

        keyboardEvent.preventDefault()
        selectQuestion(questionId)
      },
    )

    if (isSessionPending()) {
      return null
    }

    return (
      <Drawer
        open={questionsDrawerOpen()}
        swipeDirection="left"
        onOpenChange={wrap(questionsDrawerOpen.set)}
      >
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Show questions"
                onClick={wrap(openQuestionsDrawer)}
              />
            }
          >
            <PanelLeftIcon />
          </TooltipTrigger>
          <TooltipContent side="bottom">Show questions</TooltipContent>
        </Tooltip>
        <DrawerContent>
          <DrawerHeader className="flex flex-row items-start gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <DrawerTitle>Questions</DrawerTitle>
            </div>
            <div className="shrink-0">{renderHeaderAction?.()}</div>
          </DrawerHeader>
          <div className="flex min-h-0 flex-1 flex-col p-4 pt-3">
            {isQuestionsListLoading && questionBank.length === 0 ? (
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <Spinner className="size-5" />
              </div>
            ) : null}

            {!isQuestionsListLoading &&
            questionsLoadError &&
            questionBank.length === 0 ? (
              <p className="text-sm text-destructive">
                {questionsLoadError.message || 'Failed to load questions'}
              </p>
            ) : null}

            {!isQuestionsListLoading &&
            !questionsLoadError &&
            questionBank.length === 0 ? (
              <Empty className="border border-dashed">
                <EmptyHeader>
                  <EmptyTitle>No questions yet</EmptyTitle>
                </EmptyHeader>
                {canAddQuestion && renderEmptyAction ? (
                  <EmptyContent>{renderEmptyAction()}</EmptyContent>
                ) : null}
              </Empty>
            ) : null}

            {questionBank.length > 0 ? (
              <QuestionsVirtualList
                questions={questionBank}
                onQuestionSelect={selectQuestion}
                onQuestionKeyDown={activateQuestionFromKeyboard}
                renderQuestionActions={renderQuestionActions}
              />
            ) : null}
          </div>
          {children}
        </DrawerContent>
      </Drawer>
    )
  },
  'QuestionsDrawer',
)

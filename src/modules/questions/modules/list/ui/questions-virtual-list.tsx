import { wrap } from '@reatom/core'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, type KeyboardEvent, type ReactNode } from 'react'

import { Item, ItemActions, ItemContent, ItemTitle } from '@/common/ui/item'

import type { Question } from '../../../model/question'

/** Matches `Item` size="sm" height + visual density for the estimate. */
const QUESTION_ROW_ESTIMATE_PX = 48

const QUESTION_ROW_GAP_PX = 8

type QuestionsVirtualListProps = {
  questions: Question[]
  onQuestionSelect: (questionId: string) => void
  onQuestionKeyDown: (event: KeyboardEvent, questionId: string) => void
  renderQuestionActions?: (questionId: string) => ReactNode
}

export function QuestionsVirtualList({
  questions,
  onQuestionSelect,
  onQuestionKeyDown,
  renderQuestionActions,
}: QuestionsVirtualListProps) {
  const scrollParentRef = useRef<HTMLDivElement>(null)

  const questionRowVirtualizer = useVirtualizer({
    count: questions.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => QUESTION_ROW_ESTIMATE_PX,
    gap: QUESTION_ROW_GAP_PX,
    overscan: 8,
  })

  return (
    <div ref={scrollParentRef} className="min-h-0 flex-1 overflow-y-auto">
      <div
        role="list"
        className="relative w-full"
        style={{ height: questionRowVirtualizer.getTotalSize() }}
      >
        {questionRowVirtualizer.getVirtualItems().map((virtualRow) => {
          const question = questions[virtualRow.index]

          if (!question) {
            return null
          }

          return (
            <div
              key={question.id}
              role="listitem"
              data-index={virtualRow.index}
              ref={questionRowVirtualizer.measureElement}
              className="absolute top-0 left-0 w-full p-1"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Item
                tabIndex={0}
                variant="outline"
                size="sm"
                className="w-full cursor-pointer flex-nowrap"
                onClick={wrap(() => {
                  onQuestionSelect(question.id)
                })}
                onKeyDown={wrap((keyboardEvent: KeyboardEvent) => {
                  onQuestionKeyDown(keyboardEvent, question.id)
                })}
              >
                <ItemContent className="w-2/3 overflow-hidden">
                  <ItemTitle className="w-full overflow-hidden">
                    <span className="truncate">{question.question}</span>
                  </ItemTitle>
                </ItemContent>
                {renderQuestionActions ? (
                  <ItemActions className="opacity-0 transition-opacity group-hover/item:opacity-100 group-focus-within/item:opacity-100">
                    {renderQuestionActions(question.id)}
                  </ItemActions>
                ) : null}
              </Item>
            </div>
          )
        })}
      </div>
    </div>
  )
}

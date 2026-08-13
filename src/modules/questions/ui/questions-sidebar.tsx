import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { useEffect } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/common/components/ui/sidebar'
import { Spinner } from '@/common/components/ui/spinner'
import { ItemActions } from '@/common/components/ui/item'

import { CreateQuestionButton, CreateQuestionDialog } from '../modules/create'
import { DeleteQuestionButton, DeleteQuestionDialog } from '../modules/delete'
import { shownQuestion } from '../model/shown-question'
import {
  QuestionsSearchField,
  questionsSearchError,
  questionsSearchInput,
  questionsSearchResults,
  searchQuestions,
} from '../modules/search'
import { UpdateQuestionButton, UpdateQuestionDialog } from '../modules/update'
import {
  loadQuestionBank,
  questions,
  questionsError,
  type Question,
} from '../model/questions'

type QuestionsSidebarProps = {
  onQuestionSelect: (questionId: string) => void
}

export const QuestionsSidebar = reatomComponent(
  ({ onQuestionSelect }: QuestionsSidebarProps) => {
    const { open, openMobile, isMobile } = useSidebar()
    const isSidebarOpen = isMobile ? openMobile : open

    useEffect(() => {
      if (!isSidebarOpen) {
        return
      }

      void loadQuestionBank()
    }, [isSidebarOpen])

    const searchResults = questionsSearchResults()
    const isSearchActive = questionsSearchInput().trim().length > 0
    const isSearchPending = searchQuestions.pending() > 0
    const searchError = questionsSearchError()
    const questionBank = questions()
    const currentReadQuestionId = shownQuestion()?.id
    const isBankLoading = loadQuestionBank.pending() > 0
    const bankError = questionsError()

    const sidebarQuestions: Question[] =
      searchResults !== null ? searchResults : questionBank

    const isListLoading =
      isSearchPending || (isBankLoading && sidebarQuestions.length === 0)
    const listError = isSearchActive ? searchError : bankError

    return (
      <Sidebar>
        <SidebarHeader className="h-12 shrink-0 flex-row items-center justify-between border-b px-4 py-0">
          <h2 className="text-sm font-medium">Questions</h2>
          <CreateQuestionButton />
        </SidebarHeader>
        <QuestionsSearchField />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              {isListLoading && sidebarQuestions.length === 0 ? (
                <div className="flex h-16 items-center justify-center">
                  <Spinner />
                </div>
              ) : null}

              {!isListLoading && listError && sidebarQuestions.length === 0 ? (
                <p className="px-2 py-1 text-sm text-destructive">
                  {listError.message ||
                    (isSearchActive
                      ? 'Failed to search questions'
                      : 'Failed to load questions')}
                </p>
              ) : null}

              {!isListLoading && !listError && sidebarQuestions.length === 0 ? (
                <p className="px-2 py-1 text-sm text-sidebar-foreground/70">
                  {isSearchActive ? 'No matches' : 'No questions yet'}
                </p>
              ) : null}

              {sidebarQuestions.length > 0 ? (
                <SidebarMenu>
                  {sidebarQuestions.map((question) => {
                    const isCurrentReadQuestion =
                      question.id === currentReadQuestionId

                    return (
                      <SidebarMenuItem key={question.id}>
                        <SidebarMenuButton
                          type="button"
                          title={question.question}
                          className="pr-14"
                          isActive={isCurrentReadQuestion}
                          aria-current={
                            isCurrentReadQuestion ? 'page' : undefined
                          }
                          onClick={wrap(() => {
                            onQuestionSelect(question.id)
                          })}
                        >
                          <span>{question.question}</span>
                        </SidebarMenuButton>
                        <ItemActions className="absolute top-1 right-1 z-10 gap-0.5 opacity-100 transition-opacity md:opacity-0 md:group-hover/menu-item:opacity-100 md:group-focus-within/menu-item:opacity-100">
                          <UpdateQuestionButton questionId={question.id} />
                          <DeleteQuestionButton questionId={question.id} />
                        </ItemActions>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              ) : null}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <CreateQuestionDialog />
        <UpdateQuestionDialog />
        <DeleteQuestionDialog />
      </Sidebar>
    )
  },
  'QuestionsSidebar',
)

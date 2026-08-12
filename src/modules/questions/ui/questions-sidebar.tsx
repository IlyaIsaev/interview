import { wrap } from '@reatom/core'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/common/components/ui/sidebar'
import { Spinner } from '@/common/components/ui/spinner'
import { ItemActions } from '@/common/components/ui/item'

import { CreateQuestionButton, CreateQuestionDialog } from '../modules/create'
import { DeleteQuestionButton, DeleteQuestionDialog } from '../modules/delete'
import { selectReadQuestion } from '../modules/read'
import { UpdateQuestionButton, UpdateQuestionDialog } from '../modules/update'
import type { Question } from '../model/questions'

type QuestionsSidebarProps = {
  questions: Question[]
  isLoading: boolean
  error?: Error
}

export function QuestionsSidebar({
  questions,
  isLoading,
  error,
}: QuestionsSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="h-12 shrink-0 flex-row items-center justify-between border-b px-4 py-0">
        <h2 className="text-sm font-medium">Questions</h2>
        <CreateQuestionButton />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {isLoading && questions.length === 0 ? (
              <div className="flex h-16 items-center justify-center">
                <Spinner />
              </div>
            ) : null}

            {!isLoading && error && questions.length === 0 ? (
              <p className="px-2 py-1 text-sm text-destructive">
                {error.message || 'Failed to load questions'}
              </p>
            ) : null}

            {!isLoading && !error && questions.length === 0 ? (
              <p className="px-2 py-1 text-sm text-sidebar-foreground/70">
                No questions yet
              </p>
            ) : null}

            {questions.length > 0 ? (
              <SidebarMenu>
                {questions.map((question) => (
                  <SidebarMenuItem key={question.id}>
                    <SidebarMenuButton
                      type="button"
                      title={question.question}
                      className="pr-14"
                      onClick={wrap(() => {
                        void selectReadQuestion(question.id)
                      })}
                    >
                      <span>{question.question}</span>
                    </SidebarMenuButton>
                    <ItemActions className="absolute top-1 right-1 z-10 gap-0.5 opacity-100 transition-opacity md:opacity-0 md:group-hover/menu-item:opacity-100 md:group-focus-within/menu-item:opacity-100">
                      <UpdateQuestionButton questionId={question.id} />
                      <DeleteQuestionButton questionId={question.id} />
                    </ItemActions>
                  </SidebarMenuItem>
                ))}
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
}

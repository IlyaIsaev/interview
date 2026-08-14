import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/ui/button'
import { FieldGroup, FieldSet } from '@/common/ui/field'

import {
  MarkdownAnswerField,
  MarkdownField,
} from '../../../ui/markdown-answer-field'
import {
  closeCreateQuestionDialog,
  createQuestionForm,
  isCreateQuestionFormValid,
  submitCreateQuestionForm,
} from '../model/create-question-form'

export const CreateQuestionForm = reatomComponent(() => {
  const isCreateQuestionPending = !createQuestionForm.submit.ready()

  const handleCreateQuestionSubmit = wrap(
    (formEvent: React.FormEvent<HTMLFormElement>) => {
      formEvent.preventDefault()
      void submitCreateQuestionForm()
    },
  )

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleCreateQuestionSubmit}
    >
      <FieldSet
        className="flex min-h-0 flex-1 flex-col gap-4"
        disabled={isCreateQuestionPending}
      >
        <FieldGroup className="flex min-h-0 flex-1 flex-col gap-4">
          <MarkdownField
            field={createQuestionForm.fields.question}
            label="Question"
            name="question"
            placeholder="Write question in Markdown…"
            previewPlaceholder="Question preview"
            textareaClassName="p-3"
          />
          <MarkdownAnswerField
            field={createQuestionForm.fields.answer}
            label="Answer"
            name="answer"
            className="min-h-0 flex-1"
          />
          <div className="mt-auto flex shrink-0 items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isCreateQuestionPending}
              onClick={wrap(closeCreateQuestionDialog)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreateQuestionPending || !isCreateQuestionFormValid()}
            >
              {isCreateQuestionPending ? 'Saving…' : 'Save question'}
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'CreateQuestionForm')

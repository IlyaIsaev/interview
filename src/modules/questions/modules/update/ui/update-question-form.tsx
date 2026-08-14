import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/ui/button'
import { FieldGroup, FieldSet } from '@/common/ui/field'

import {
  MarkdownAnswerField,
  MarkdownField,
} from '../../../ui/markdown-answer-field'
import {
  closeUpdateQuestionDialog,
  isUpdateQuestionFormValid,
  loadUpdateQuestion,
  submitUpdateQuestionForm,
  updateQuestionForm,
} from '../model/update-question'

export const UpdateQuestionForm = reatomComponent(() => {
  const isUpdateQuestionSubmitting = !updateQuestionForm.submit.ready()
  const isUpdateQuestionLoading = loadUpdateQuestion.pending() > 0
  const isUpdateQuestionPending =
    isUpdateQuestionSubmitting || isUpdateQuestionLoading
  const isUpdateQuestionDirty = updateQuestionForm.focus().dirty

  const handleUpdateQuestionSubmit = wrap(
    (formEvent: React.FormEvent<HTMLFormElement>) => {
      formEvent.preventDefault()
      void submitUpdateQuestionForm()
    },
  )

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleUpdateQuestionSubmit}
    >
      <FieldSet
        className="flex min-h-0 flex-1 flex-col gap-4"
        disabled={isUpdateQuestionPending}
      >
        <FieldGroup className="flex min-h-0 flex-1 flex-col gap-4">
          <MarkdownField
            field={updateQuestionForm.fields.question}
            label="Question"
            name="question"
            placeholder="Write question in Markdown…"
            previewPlaceholder="Question preview"
            textareaClassName="p-3"
          />
          <MarkdownAnswerField
            field={updateQuestionForm.fields.answer}
            label="Answer"
            name="answer"
            className="min-h-0 flex-1"
          />
          <div className="mt-auto flex shrink-0 items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isUpdateQuestionPending}
              onClick={wrap(closeUpdateQuestionDialog)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isUpdateQuestionPending ||
                !isUpdateQuestionDirty ||
                !isUpdateQuestionFormValid()
              }
            >
              {isUpdateQuestionSubmitting ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'UpdateQuestionForm')

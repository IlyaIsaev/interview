import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/components/ui/button'
import {
  FieldError,
  FieldGroup,
  FieldSet,
} from '@/common/components/ui/field'

import { MarkdownAnswerField } from '../../../ui/markdown-answer-field'
import {
  closeUpdateQuestionDialog,
  loadUpdateQuestion,
  submitUpdateQuestionForm,
  updateQuestionForm,
} from '../model/update-question'
import { TextField } from './text-field'

export const UpdateQuestionForm = reatomComponent(() => {
  const submitError = updateQuestionForm.submit.error()
  const isSubmitting = updateQuestionForm.submit.pending() > 0
  const isLoading = loadUpdateQuestion.pending() > 0
  const isPending = isSubmitting || isLoading
  const isDirty = updateQuestionForm.focus().dirty

  const handleSubmit = wrap((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void submitUpdateQuestionForm()
  })

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleSubmit}
    >
      <FieldSet
        className="flex min-h-0 flex-1 flex-col gap-4"
        disabled={isPending}
      >
        <FieldGroup className="flex min-h-0 flex-1 flex-col gap-4">
          <TextField
            field={updateQuestionForm.fields.question}
            label="Question"
            type="text"
            name="question"
          />
          <MarkdownAnswerField
            field={updateQuestionForm.fields.answer}
            label="Answer"
            name="answer"
            className="min-h-0 flex-1"
          />
          <div className="mt-auto flex shrink-0 flex-col gap-2">
            <FieldError>{submitError?.message}</FieldError>
            <div className="flex items-center justify-between gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={wrap(closeUpdateQuestionDialog)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !isDirty}>
                {isSubmitting ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'UpdateQuestionForm')

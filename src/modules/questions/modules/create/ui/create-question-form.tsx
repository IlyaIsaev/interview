import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/components/ui/button'
import {
  FieldError,
  FieldGroup,
  FieldSet,
} from '@/common/components/ui/field'

import {
  closeCreateQuestionDialog,
  createQuestionForm,
  submitCreateQuestionForm,
} from '../model/create-question-form'
import { TextAreaField } from './text-area-field'
import { TextField } from './text-field'

export const CreateQuestionForm = reatomComponent(() => {
  const submitError = createQuestionForm.submit.error()
  const isPending = createQuestionForm.submit.pending() > 0

  const handleSubmit = wrap((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void submitCreateQuestionForm()
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
            field={createQuestionForm.fields.question}
            label="Question"
            type="text"
            name="question"
          />
          <TextAreaField
            field={createQuestionForm.fields.answer}
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
                onClick={wrap(closeCreateQuestionDialog)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving…' : 'Save question'}
              </Button>
            </div>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'CreateQuestionForm')

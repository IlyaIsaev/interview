import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui/dialog'
import { Spinner } from '@/common/components/ui/spinner'

import {
  closeUpdateQuestionDialog,
  loadUpdateQuestion,
  updateQuestionForm,
  updateQuestionId,
} from '../model/update-question'
import { UpdateQuestionForm } from './update-question-form'

export const UpdateQuestionDialog = reatomComponent(() => {
  const id = updateQuestionId()
  const isLoading = loadUpdateQuestion.pending() > 0
  const isSubmitting = updateQuestionForm.submit.pending() > 0
  const isBusy = isLoading || isSubmitting

  return (
    <Dialog
      open={id !== null}
      onOpenChange={wrap((open) => {
        if (!open && !isBusy) {
          closeUpdateQuestionDialog()
        }
      })}
    >
      <DialogContent
        showCloseButton={!isBusy}
        className="flex h-[66.666dvh] w-[min(calc(100%-2rem),66.666vw)] max-w-none flex-col gap-4 overflow-hidden sm:max-w-none"
      >
        <DialogHeader className="shrink-0">
          <DialogTitle>Update question</DialogTitle>
          <DialogDescription>
            Edit the question and its answer.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <Spinner className="size-5" />
          </div>
        ) : (
          <UpdateQuestionForm />
        )}
      </DialogContent>
    </Dialog>
  )
}, 'UpdateQuestionDialog')

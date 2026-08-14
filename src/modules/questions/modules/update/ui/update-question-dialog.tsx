import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/common/ui/dialog'
import { Spinner } from '@/common/ui/spinner'

import {
  loadUpdateQuestion,
  setUpdateQuestionDialogOpen,
  updateQuestionForm,
  updateQuestionId,
} from '../model/update-question'
import { UpdateQuestionForm } from './update-question-form'

export const UpdateQuestionDialog = reatomComponent(() => {
  const questionId = updateQuestionId()
  const isUpdateQuestionLoading = loadUpdateQuestion.pending() > 0
  const isUpdateQuestionSubmitting = updateQuestionForm.submit.pending() > 0
  const isUpdateDialogBusy =
    isUpdateQuestionLoading || isUpdateQuestionSubmitting

  const handleUpdateDialogOpenChange = wrap((isOpen: boolean) => {
    setUpdateQuestionDialogOpen(isOpen, isUpdateDialogBusy)
  })

  return (
    <Dialog
      open={questionId !== null}
      onOpenChange={handleUpdateDialogOpenChange}
    >
      <DialogContent
        showCloseButton={!isUpdateDialogBusy}
        className="flex h-[66.666dvh] w-[min(calc(100%-2rem),66.666vw)] max-w-none flex-col gap-4 overflow-hidden sm:max-w-none"
      >
        <DialogHeader className="shrink-0">
          <DialogTitle>Update question</DialogTitle>
          <DialogDescription>
            Edit the question and its answer.
          </DialogDescription>
        </DialogHeader>

        {isUpdateQuestionLoading ? (
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

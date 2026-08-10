import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui/dialog'
import { Spinner } from '@/common/components/ui/spinner'

import {
  closeDeleteQuestionDialog,
  deleteQuestion,
  deleteQuestionId,
  loadDeleteQuestion,
  questionPendingDeletion,
  setDeleteQuestionDialogOpen,
  submitDeleteQuestion,
} from '../model/delete-question'

export const DeleteQuestionDialog = reatomComponent(() => {
  const questionId = deleteQuestionId()
  const questionToDelete = questionPendingDeletion()
  const isLoadingQuestion = loadDeleteQuestion.pending() > 0
  const isDeletingQuestion = deleteQuestion.pending() > 0
  const isDialogBusy = isLoadingQuestion || isDeletingQuestion

  const handleDialogOpenChange = wrap((isOpen: boolean) => {
    setDeleteQuestionDialogOpen(isOpen, isDialogBusy)
  })

  const handleDeleteFormSubmit = wrap(
    (formEvent: React.FormEvent<HTMLFormElement>) => {
      formEvent.preventDefault()
      void submitDeleteQuestion()
    },
  )

  return (
    <Dialog open={questionId !== null} onOpenChange={handleDialogOpenChange}>
      <DialogContent showCloseButton={!isDialogBusy} className="min-w-0 overflow-hidden">
        {isLoadingQuestion || !questionToDelete ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-5" />
          </div>
        ) : (
          <form className="contents" onSubmit={handleDeleteFormSubmit}>
            <DialogHeader className="min-w-0">
              <DialogTitle>Delete question</DialogTitle>
              <DialogDescription className="min-w-0 break-all">
                {`Delete “${questionToDelete.question}”? This cannot be undone.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isDeletingQuestion}
                onClick={wrap(closeDeleteQuestionDialog)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isDeletingQuestion}
                autoFocus
              >
                {isDeletingQuestion ? 'Deleting…' : 'Delete'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}, 'DeleteQuestionDialog')

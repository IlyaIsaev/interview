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
  deleteQuestionData,
  deleteQuestionId,
  loadDeleteQuestion,
  setDeleteQuestionDialogOpen,
  submitDeleteQuestion,
} from '../model/delete-question'

export const DeleteQuestionDialog = reatomComponent(() => {
  const id = deleteQuestionId()
  const loaded = deleteQuestionData()
  const isLoading = loadDeleteQuestion.pending() > 0
  const isDeleting = deleteQuestion.pending() > 0
  const isBusy = isLoading || isDeleting

  const handleOpenChange = wrap((open: boolean) => {
    setDeleteQuestionDialogOpen(open, isBusy)
  })

  const handleSubmit = wrap((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void submitDeleteQuestion()
  })

  return (
    <Dialog open={id !== null} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isBusy} className="min-w-0 overflow-hidden">
        {isLoading || !loaded ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-5" />
          </div>
        ) : (
          <form className="contents" onSubmit={handleSubmit}>
            <DialogHeader className="min-w-0">
              <DialogTitle>Delete question</DialogTitle>
              <DialogDescription className="min-w-0 break-all">
                {`Delete “${loaded.question}”? This cannot be undone.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isDeleting}
                onClick={wrap(closeDeleteQuestionDialog)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={isDeleting}
                autoFocus
              >
                {isDeleting ? 'Deleting…' : 'Delete'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}, 'DeleteQuestionDialog')

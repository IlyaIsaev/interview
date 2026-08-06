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
} from '../model/delete-question'

export const DeleteQuestionDialog = reatomComponent(() => {
  const id = deleteQuestionId()
  const loaded = deleteQuestionData()
  const isLoading = loadDeleteQuestion.pending() > 0
  const isDeleting = deleteQuestion.pending() > 0
  const isBusy = isLoading || isDeleting

  return (
    <Dialog
      open={id !== null}
      onOpenChange={wrap((open) => {
        if (!open && !isBusy) {
          closeDeleteQuestionDialog()
        }
      })}
    >
      <DialogContent showCloseButton={!isBusy}>
        {isLoading || !loaded ? (
          <div className="flex items-center justify-center py-8">
            <Spinner className="size-5" />
          </div>
        ) : (
          <form
            className="contents"
            onSubmit={wrap(async (event) => {
              event.preventDefault()

              try {
                await deleteQuestion()
              } catch {
                // Error toast is shown by deleteQuestion.
              }
            })}
          >
            <DialogHeader>
              <DialogTitle>Delete question</DialogTitle>
              <DialogDescription>
                {`Delete “${loaded.question}”? This cannot be undone.`}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isDeleting}
                onClick={wrap(() => {
                  closeDeleteQuestionDialog()
                })}
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

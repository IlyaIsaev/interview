import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui/dialog'

import { createQuestionForm } from '../model/create-question-form'
import { createQuestionDialogOpen } from '../model/dialog-open'
import { CreateQuestionForm } from './create-question-form'

export const CreateQuestionDialog = reatomComponent(() => {
  return (
    <Dialog
      open={createQuestionDialogOpen()}
      onOpenChange={wrap((open) => {
        createQuestionDialogOpen.set(open)

        if (!open) {
          createQuestionForm.reset()
        }
      })}
    >
      <DialogContent className="flex h-[66.666dvh] w-[min(calc(100%-2rem),66.666vw)] max-w-none flex-col gap-4 overflow-hidden sm:max-w-none">
        <DialogHeader className="shrink-0">
          <DialogTitle>New question</DialogTitle>
          <DialogDescription>
            Add a question and its answer to the bank.
          </DialogDescription>
        </DialogHeader>

        <CreateQuestionForm />
      </DialogContent>
    </Dialog>
  )
}, 'CreateQuestionDialog')

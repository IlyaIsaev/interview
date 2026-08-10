import { action, reatomBoolean } from '@reatom/core'
import { toast } from 'sonner'

import {
  canCreateQuestion,
  demoQuestionsLimitMessage,
} from '../../../model/questions'

export const createQuestionDialogOpen = reatomBoolean(
  false,
  'createQuestionDialogOpen',
)

export const openCreateQuestionDialog = action(() => {
  if (!canCreateQuestion()) {
    toast.error(demoQuestionsLimitMessage)

    return
  }

  createQuestionDialogOpen.setTrue()
}, 'openCreateQuestionDialog')

import { action, reatomBoolean } from '@reatom/core'

export const createQuestionDialogOpen = reatomBoolean(
  false,
  'createQuestionDialogOpen',
)

export const openCreateQuestionDialog = action(() => {
  createQuestionDialogOpen.setTrue()
}, 'openCreateQuestionDialog')

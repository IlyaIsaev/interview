import { action } from '@reatom/core'

import { clearReadQuestionIfId } from '../modules/read'

export const afterQuestionRemoved = action(async (questionId: string) => {
  await clearReadQuestionIfId(questionId)
}, 'afterQuestionRemoved')

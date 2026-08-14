import { action } from '@reatom/core'

import { showCreatedReadQuestion } from '../modules/read'
import type { Question } from './question'

export const showCreatedQuestion = action((question: Question) => {
  showCreatedReadQuestion(question)
}, 'showCreatedQuestion')

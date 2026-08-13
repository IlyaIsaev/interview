import { action, atom } from '@reatom/core'

import type { Question } from './questions'

/** Question currently shown in the read pane. */
export const shownQuestion = atom<Question | null>(null, 'shownQuestion')

export const setShownQuestion = action((question: Question | null) => {
  shownQuestion.set(question)
}, 'setShownQuestion')

export const clearShownQuestion = action(() => {
  shownQuestion.set(null)
}, 'clearShownQuestion')

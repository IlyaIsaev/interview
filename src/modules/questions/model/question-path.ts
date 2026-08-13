import { action, atom } from '@reatom/core'

/**
 * Page layer consumes this to navigate (modules must not import routes).
 * - `{ type: 'question', questionId }` → `/questions/:id`
 * - `{ type: 'list' }` → `/questions`
 * - `null` → no pending request
 */
export type QuestionPathNavigationRequest =
  | { type: 'question'; questionId: string }
  | { type: 'list' }

export const questionPathNavigationRequest =
  atom<QuestionPathNavigationRequest | null>(
    null,
    'questionPathNavigationRequest',
  )

export const requestQuestionPath = action((questionId: string) => {
  questionPathNavigationRequest.set({
    type: 'question',
    questionId,
  })
}, 'requestQuestionPath')

export const requestQuestionsListPath = action(() => {
  questionPathNavigationRequest.set({
    type: 'list',
  })
}, 'requestQuestionsListPath')

export const clearQuestionPathNavigationRequest = action(() => {
  questionPathNavigationRequest.set(null)
}, 'clearQuestionPathNavigationRequest')

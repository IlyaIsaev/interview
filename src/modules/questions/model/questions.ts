import { action, atom, computed, withAsyncData, wrap } from '@reatom/core'

import { isLoggedIn } from '@/modules/auth'

import { fetchQuestions } from '../api/questions-api'
import type { Question, QuestionsHydrationPayload } from './question'

/** Max questions allowed per demo profile (logged-out mode). Keep in sync with worker. */
export const DEMO_QUESTIONS_LIMIT = 30

/** Fetch the full question bank. Used when the sidebar opens or after CUD. */
export const loadQuestionBank = action(async () => {
  return await wrap(fetchQuestions())
}, 'loadQuestionBank').extend(
  withAsyncData({
    initState: [] as Question[],
    status: true,
  }),
)

/** Questions bank for the current auth mode (loaded on sidebar open / CUD). */
export const questions = loadQuestionBank.data

/** True after the bank has been fetched or locally mutated. */
export const isQuestionsLoaded = computed(() => {
  const hasLoadedQuestionBank = loadQuestionBank.status().isFulfilled
  const hasLocalQuestionBank = loadQuestionBank.data().length > 0

  return hasLoadedQuestionBank || hasLocalQuestionBank
}, 'isQuestionsLoaded')

export const questionsError = loadQuestionBank.error

/** Last hydration payload applied — identity check avoids re-render loops. */
const lastHydratedQuestionsPayload = atom<QuestionsHydrationPayload | null>(
  null,
  'lastHydratedQuestionsPayload',
)

export const isQuestionsHydrationPayloadAlreadyApplied = (
  hydrationPayload: QuestionsHydrationPayload,
) => lastHydratedQuestionsPayload() === hydrationPayload

export const markQuestionsHydrationPayloadApplied = action(
  (hydrationPayload: QuestionsHydrationPayload) => {
    lastHydratedQuestionsPayload.set(hydrationPayload)
  },
  'markQuestionsHydrationPayloadApplied',
)

export const resetQuestionBank = action(() => {
  questions.reset()
  loadQuestionBank.error.set(undefined)
  loadQuestionBank.status.reset()
}, 'resetQuestionBank')

/** Clear hydration cache and bank when the questions UI unmounts. */
export const resetQuestionsHydration = action(() => {
  lastHydratedQuestionsPayload.set(null)
  resetQuestionBank()
}, 'resetQuestionsHydration')

export const prependQuestion = action((question: Question) => {
  questions.set([question, ...questions()])
}, 'prependQuestion')

export const replaceQuestion = action((question: Question) => {
  questions.set(
    questions().map((existingQuestion) =>
      existingQuestion.id === question.id ? question : existingQuestion,
    ),
  )
}, 'replaceQuestion')

export const removeQuestion = action((questionId: string) => {
  questions.set(questions().filter((question) => question.id !== questionId))
}, 'removeQuestion')

/** Whether the current auth mode may create another question. */
export const canCreateQuestion = computed(() => {
  if (isLoggedIn()) {
    return true
  }

  return questions().length < DEMO_QUESTIONS_LIMIT
}, 'canCreateQuestion')

export const demoQuestionsLimitMessage = `Demo mode allows up to ${DEMO_QUESTIONS_LIMIT} questions. Sign in to add more.`

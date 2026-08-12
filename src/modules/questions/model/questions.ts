import { action, atom, computed } from '@reatom/core'

import { isLoggedIn } from '@/common/auth'

/** Max questions allowed per demo profile (logged-out mode). Keep in sync with worker. */
export const DEMO_QUESTIONS_LIMIT = 30

export type Question = {
  id: string
  question: string
  answer: string
  createdAt: Date | string | number
  updatedAt: Date | string | number
}

/** Snapshot used to hydrate the questions bank and current read question. */
export type QuestionsHydrationPayload = {
  questions: Question[]
  randomQuestion: Question | null
}

/** Questions bank for the current auth mode (hydrated from loaders / mutations). */
export const questions = atom<Question[]>([], 'questions')

/** True after hydration data has been applied (or a mutation refreshed the list). */
export const isQuestionsLoaded = atom(false, 'isQuestionsLoaded')

export const questionsError = atom<Error | undefined>(
  undefined,
  'questionsError',
)

/** Last hydration payload applied — identity check avoids re-render loops. */
let lastHydratedQuestionsPayload: QuestionsHydrationPayload | null = null

export const isQuestionsHydrationPayloadAlreadyApplied = (
  hydrationPayload: QuestionsHydrationPayload,
) => lastHydratedQuestionsPayload === hydrationPayload

const hydrateQuestions = action((questionBank: Question[]) => {
  questions.set(questionBank)
  isQuestionsLoaded.set(true)
  questionsError.set(undefined)
}, 'hydrateQuestions')

/** Apply a hydration snapshot into questions atoms. */
export const hydrateQuestionsFromPayload = action(
  (hydrationPayload: QuestionsHydrationPayload) => {
    if (lastHydratedQuestionsPayload === hydrationPayload) {
      return
    }

    hydrateQuestions(hydrationPayload.questions)
    lastHydratedQuestionsPayload = hydrationPayload
  },
  'hydrateQuestionsFromPayload',
)

/** Clear hydration cache when the questions UI unmounts (e.g. leave home). */
export const resetQuestionsHydration = action(() => {
  lastHydratedQuestionsPayload = null
  isQuestionsLoaded.set(false)
}, 'resetQuestionsHydration')

export const prependQuestion = action((question: Question) => {
  questions.set([question, ...questions()])
  isQuestionsLoaded.set(true)
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

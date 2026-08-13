import { action, atom, computed, withAsync } from '@reatom/core'

import { api } from '@/common/api'
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

/** Snapshot used to hydrate the current read question from a route loader. */
export type QuestionsHydrationPayload = {
  currentQuestion: Question | null
}

/** Pick a random id from the bank, preferring anything other than `excludeQuestionId`. */
export const pickRandomQuestionId = (
  questionBank: readonly Question[],
  excludeQuestionId?: string,
): string | null => {
  const candidateQuestionIds = questionBank
    .filter((question) => question.id !== excludeQuestionId)
    .map((question) => question.id)

  const questionIdsToPickFrom =
    candidateQuestionIds.length > 0
      ? candidateQuestionIds
      : questionBank.map((question) => question.id)

  if (questionIdsToPickFrom.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * questionIdsToPickFrom.length)

  return questionIdsToPickFrom[randomIndex] ?? null
}

/** Questions bank for the current auth mode (loaded on sidebar open / CUD). */
export const questions = atom<Question[]>([], 'questions')

/** True after the bank has been fetched (sidebar open or a mutation refresh). */
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

export const markQuestionsHydrationPayloadApplied = action(
  (hydrationPayload: QuestionsHydrationPayload) => {
    lastHydratedQuestionsPayload = hydrationPayload
  },
  'markQuestionsHydrationPayloadApplied',
)

/** Fetch the full question bank. Used when the sidebar opens or after CUD. */
export const loadQuestionBank = action(async () => {
  const response = await api.questions.$get()

  if (!response.ok) {
    const loadError = new Error('Failed to load questions')

    questionsError.set(loadError)

    throw loadError
  }

  const payload = await response.json()
  const questionBank = payload.questions as Question[]

  questions.set(questionBank)
  isQuestionsLoaded.set(true)
  questionsError.set(undefined)

  return questionBank
}, 'loadQuestionBank').extend(withAsync())

export const resetQuestionBank = action(() => {
  questions.set([])
  isQuestionsLoaded.set(false)
  questionsError.set(undefined)
}, 'resetQuestionBank')

/** Clear hydration cache and bank when the questions UI unmounts. */
export const resetQuestionsHydration = action(() => {
  lastHydratedQuestionsPayload = null
  resetQuestionBank()
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

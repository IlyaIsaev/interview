import { action, atom, computed, effect } from '@reatom/core'

import { isLoggedIn } from '@/common/auth'
import type { HomeLoaderData, HomeQuestion } from '@/common/routes'
import { homeRoute } from '@/common/routes'

/** Max questions allowed in the shared demo bank (logged-out mode). Keep in sync with worker. */
export const DEMO_QUESTIONS_LIMIT = 30

export type Question = HomeQuestion

/** Questions bank for the current auth mode (hydrated from route loaders / mutations). */
export const questions = atom<Question[]>([], 'questions')

/** True after home loader data has been applied (or a mutation refreshed the list). */
export const isQuestionsLoaded = atom(false, 'isQuestionsLoaded')

export const questionsError = atom<Error | undefined>(undefined, 'questionsError')

/** Last home loader payload applied — identity check avoids re-render loops. */
let lastHydratedHomeLoaderPayload: HomeLoaderData | null = null

export const isHomeLoaderDataAlreadyHydrated = (homeLoaderPayload: HomeLoaderData) =>
  lastHydratedHomeLoaderPayload === homeLoaderPayload

/** Apply home route loader payload into questions atoms (from the home page model). */
export const hydrateQuestionsFromHomeLoader = action(
  (homeLoaderPayload: HomeLoaderData) => {
    if (lastHydratedHomeLoaderPayload === homeLoaderPayload) {
      return
    }

    questions.set(homeLoaderPayload.questions)
    isQuestionsLoaded.set(true)
    questionsError.set(undefined)
    lastHydratedHomeLoaderPayload = homeLoaderPayload
  },
  'hydrateQuestionsFromHomeLoader',
)

/** Clear hydration cache when the home route unmatches (e.g. auth mode switch). */
export const resetQuestionsHydration = action(() => {
  lastHydratedHomeLoaderPayload = null
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

// Clear list hydration when home is blocked/unmatched (session pending, leave home).
// Loader re-runs automatically when `params().mode` changes (demo ↔ personal).
effect(() => {
  if (homeRoute() !== null) {
    return
  }

  resetQuestionsHydration()
}, 'resetQuestionsWhenHomeUnmatched')

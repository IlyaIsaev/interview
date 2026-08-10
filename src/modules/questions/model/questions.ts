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
let lastHydratedHomeData: HomeLoaderData | null = null

export const wasHomeLoaderDataHydrated = (data: HomeLoaderData) =>
  lastHydratedHomeData === data

/** Apply home route loader payload into questions atoms (call from component render). */
export const hydrateQuestionsFromHomeLoader = action((data: HomeLoaderData) => {
  if (lastHydratedHomeData === data) {
    return
  }

  questions.set(data.questions)
  isQuestionsLoaded.set(true)
  questionsError.set(undefined)
  lastHydratedHomeData = data
}, 'hydrateQuestionsFromHomeLoader')

/** Clear hydration cache when the home route unmatches (e.g. auth mode switch). */
export const resetQuestionsHydration = action(() => {
  lastHydratedHomeData = null
  isQuestionsLoaded.set(false)
}, 'resetQuestionsHydration')

export const prependQuestion = action((question: Question) => {
  questions.set([question, ...questions()])
  isQuestionsLoaded.set(true)
}, 'prependQuestion')

export const replaceQuestion = action((question: Question) => {
  questions.set(
    questions().map((item) => (item.id === question.id ? question : item)),
  )
}, 'replaceQuestion')

export const removeQuestion = action((id: string) => {
  questions.set(questions().filter((item) => item.id !== id))
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

import { action, atom, computed, effect, withAsyncData, wrap } from '@reatom/core'

import { api } from '@/common/api'
import { isLoggedIn, isSessionPending } from '@/modules/auth'

/** Max questions allowed in the shared demo bank (logged-out mode). Keep in sync with worker. */
export const DEMO_QUESTIONS_LIMIT = 10

export type Question = {
  id: string
  question: string
  answer: string
  createdAt: Date | string | number
  updatedAt: Date | string | number
}

/** True after a successful list load for the current auth mode. */
export const isQuestionsLoaded = atom(false, 'isQuestionsLoaded')

export const fetchQuestions = action(async () => {
  const response = await api.questions.$get()

  if (!response.ok) {
    throw new Error('Failed to load questions')
  }

  const data = await response.json()

  return data.questions as Question[]
}, 'fetchQuestions').extend(
  withAsyncData({
    initState: [] as Question[],
  }),
)

/** In-flight list load shared so concurrent callers share one network request. */
let questionsInflight: Promise<Question[]> | null = null

type LoadQuestionsOptions = {
  /** Bypass cache and fetch again (mutations, auth mode switch). */
  force?: boolean
}

/**
 * Load the questions bank.
 * Concurrent non-force callers share one in-flight request; after success, cache is reused.
 */
export const loadQuestions = action(
  async (options?: LoadQuestionsOptions): Promise<Question[]> => {
    const force = options?.force === true

    if (!force) {
      if (questionsInflight) {
        return questionsInflight
      }

      if (isQuestionsLoaded()) {
        return fetchQuestions.data()
      }
    }

    const request = fetchQuestions()
      .then((questions) => {
        isQuestionsLoaded.set(true)

        return questions
      })
      .finally(() => {
        if (questionsInflight === request) {
          questionsInflight = null
        }
      })

    questionsInflight = request

    return request
  },
  'loadQuestions',
)

/** Whether the current auth mode may create another question. */
export const canCreateQuestion = computed(() => {
  if (isLoggedIn()) {
    return true
  }

  return fetchQuestions.data().length < DEMO_QUESTIONS_LIMIT
}, 'canCreateQuestion')

export const demoQuestionsLimitMessage = `Demo mode allows up to ${DEMO_QUESTIONS_LIMIT} questions. Sign in to add more.`

// Sole automatic list load on open / auth mode change.
effect(async () => {
  if (isSessionPending()) {
    return
  }

  // Track login state so the effect re-runs on sign-in / sign-out.
  isLoggedIn()

  isQuestionsLoaded.set(false)

  try {
    await wrap(loadQuestions({ force: true }))
  } catch {
    // Keep previous list on transient errors; UI shows fetch error when opened.
  }
}, 'reloadQuestionsOnAuthChange')

import { action, effect, withAsyncData, wrap } from '@reatom/core'

import { api } from '@/common/api'
import { isLoggedIn, isSessionPending } from '@/modules/auth'

export type Question = {
  id: string
  question: string
  answer: string
  createdAt: Date | string | number
  updatedAt: Date | string | number
}

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

// Reload the list when auth mode switches between demo and personal banks.
effect(async () => {
  if (isSessionPending()) {
    return
  }

  // Track login state so the effect re-runs on sign-in / sign-out.
  isLoggedIn()

  try {
    await wrap(fetchQuestions())
  } catch {
    // Keep previous list on transient errors; UI shows fetch error when opened.
  }
}, 'reloadQuestionsOnAuthChange')

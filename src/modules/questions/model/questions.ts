import { action, withAsyncData } from '@reatom/core'

import { api } from '@/common/api'

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
    if (response.status === 401) {
      return [] as Question[]
    }

    throw new Error('Failed to load questions')
  }

  const data = await response.json()

  return data.questions as Question[]
}, 'fetchQuestions').extend(
  withAsyncData({
    initState: [] as Question[],
  }),
)
